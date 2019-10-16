import {useEffect, useRef, useState} from 'react'
import * as _                        from 'lodash'

export type ValidationRulesNamesKey =  'required' |'minLength' | 'maxValue' | 'onlyNumbers' |  'notEmpty' | '__$restParamValidation'

export type IValidationFieldRules = {
  [key in ValidationRulesNamesKey] ?: ((params ?: any) => any)
}

export type IValidationModelRules<T,T1 = null, T2 = null, T3 = null,T4 = null, T5 = null, T6 = null> = {
  [key in keyof T] ?: IValidationFieldRules | IValidationModelRules<T1>  | IValidationModelRules<T2> | IValidationModelRules<T3>
  | IValidationModelRules<T4>  | IValidationModelRules<T5> | IValidationModelRules<T6>
}

export type IValidationField = {
  error : boolean | string;
  dirty ? : boolean;
  validation : {
    [key in ValidationRulesNamesKey] ?: boolean | string
  }
}

export type IValidationSubModel<T> = {
  [key in keyof T] :  IValidationField | IValidationSubModel<any>
}

export type IValidationModel<T> = {
  validations : {
    [key in keyof T] :  IValidationField | IValidationSubModel<any>
  },
  error : boolean|string,
  global : boolean | string,
}

export interface  IUseValidationForm<T> {
  fnCheckInModelField : (field : string) => void,
  fnFieldValue : (field : string) => string | undefined,
  fnSetStateFormFieldValue : (field : string,value : string) => void, /** */
  fnOnBlurValidation : (field : string) => void,
  fnErrorField : (key : string) => string | undefined,
  fnSubmit : () => boolean,
  stateForm : T,
  setStateForm : (r : T) => void,
  modelError : boolean
}

export interface IUseValidationFormProps<T> {
  initialData ? : Partial<T>
  validationRules : IValidationModelRules<T>,
  submitSuccess ? : () => void
}

class ValidationRulesGenerator<T> {
  rule : IValidationModelRules<T>
  validationKeys : string[]
  validator : IValidationModel<T>
  constructor (rule : IValidationModelRules<T>) {
    this.rule = rule
    this.validationKeys = []
    this.validator = {
      error: false,
      global: false,
      validations: { }
    } as IValidationModel<T>
  }

  public createValidationForObject (parent ? : string) : void{
    const value = parent ? _.get(this.rule,parent) : this.rule
    Object.keys(value).forEach(key => {
      this.createValidationForField( key, parent )
    })
  }

  private createValidationForField (key : string, parent : string|undefined) : void {
    const path = (parent ? `${parent}.` : '') + key
    const value = _.get(this.rule, path)
    if (typeof value === 'object') {
      this.createValidationForObject(path)
      return
    }
    if (typeof value === 'function') {
      const validatorField : IValidationField = {
        error: false,
        dirty: false,
        validation: {
          [key]: false
        }
      }
      const parentStr = parent as string
      const pathArray = parentStr.split('.')
      const attribute : string = pathArray.pop() as string
      if (this.validationKeys.findIndex(x => x === parentStr) === -1) {
        this.validationKeys.push(parentStr) 
      }
      const modelV = pathArray.reduceRight((acc : any,x : string) => {
        return {
          [x]: {
            ...acc
          }
        }
      },{[attribute]: validatorField})
      this.validator = _.merge({}, this.validator, {
        validations: modelV
      })
    }
  }
}

export const useValidationForm = <T>({initialData,validationRules, submitSuccess} : IUseValidationFormProps<T>) : IUseValidationForm<T> => {

  const validationKeys = useRef<string[]>([])
  const [validationState, setValidationState] : [ IValidationModel<T>, (r : IValidationModel<T>) => void ] = useState(() => {
    const rules = new ValidationRulesGenerator<T>(validationRules)
    rules.createValidationForObject()
    validationKeys.current = rules.validationKeys
    return rules.validator
  })
  const [stateForm, setStateForm] : [T,(r : T) => void] = useState( () => {
    let object : T = validationKeys.current.reduce((obj : T,x : string) => {
      return _.merge(obj, _.set({},x,void(0)))
    },{} as T)
    object = initialData ? _.merge({},object, initialData) : object
    return  object
  })
  useEffect(() => {
    console.log('pera', stateForm,validationState)
  },[])

  useEffect(() => {
    console.log('hooks render')
  })

  const fnCheckInModelField = (field : string) => {
    if (_.has(stateForm,field)) {
      return 
    }
    const object = _.merge({},stateForm,_.set({},field,void(0)))
    setStateForm(object)
  }

  const fnFieldValue = (field : string) : string| undefined => {
    return _.get(stateForm,field)
  }

  const fnErrorField = (key : string) : string|undefined => {
    return _.get(validationState,`validations.${key}.error`)
  }

  const fnOnBlurValidation = (key : string) => {
    fnValidateField(key,_.get(stateForm,key),true)
  }

  const  checkModelErrors = (state ?: IValidationModel<T>) : boolean => {
    return !validationKeys.current.every(key =>  !_.get(state ? state : validationState, `validations.${key}.error`) )
  }

  const  fnValidateField = (key : string, value : string , dirty : boolean = false) : void => {
    const  field : IValidationField = _.get(validationState, `validations.${key}`)
    if (!field || (!dirty && !field.dirty))  {
      return
    }
    const validationObject = _.get(validationRules,key)
    if (!validationObject) {
      return void(0)
    }
    const obj = Object.keys(field.validation).reduce((acc,fName) => {
      const fn = validationObject[fName]
      return fn ? Object.assign(acc,{[fName]:fn.length === 0 ? fn()(value) : fn(value)}) : acc
    },{})
    const validObj =  _.merge({},validationState,_.set({},`validations.${key}`,{
      error: Object.values(obj).find(x => !!x) || false,
      dirty: dirty || field.dirty,
      validation:obj
    }))
    validObj.error = checkModelErrors(validObj)
    setValidationState(validObj)
  }

  const fnSetStateFormFieldValue = (field : string, value : string) : void => {
    setStateForm(_.merge({},stateForm,_.set({},field,value)))
    fnValidateField(field,value,false)
  }

  const fnSubmit = () : boolean => {

    const validObj = validationKeys.current.reduce((acc : IValidationModel<T>,key : string) => {
      const  field : IValidationField = _.get(validationState, `validations.${key}`)
      if (!field) {
        return acc
      }
      const validationObject = _.get(validationRules,key)
      if (!validationObject) {
        return acc
      }
      const value = _.get(stateForm,key)
      const obj = Object.keys(field.validation).reduce((acc,fName) => {
        const fn = validationObject[fName]
        return fn ? Object.assign(acc,{[fName]:fn.length === 0 ? fn()(value) : fn(value)}) : acc
      },{})

      return  _.merge({},acc,_.set({},`validations.${key}`,{
        error: Object.values(obj).find(x => !!x) || false,
        dirty: false,
        validation:obj
      }))

    },validationState)

    validObj.error = checkModelErrors(validObj)
    setValidationState(validObj)
 /*   if (validObj.error) {
      return false 
    }*/
    if (submitSuccess) {
      submitSuccess()
    }
    return true
  }

  return {
    fnCheckInModelField,
    fnFieldValue,
    fnSetStateFormFieldValue,
    fnOnBlurValidation,
    fnErrorField,
    fnSubmit,
    stateForm,
    setStateForm,
    modelError: !!validationState.error
  }
}