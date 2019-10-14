import {useEffect, useState} from 'react'
import * as _                from 'lodash'

export type ValidationRulesNamesKey = 'required' | 'minLength'  |  'notEmpty' | 'maxValue' | '__$restParamValidation'

export type IValidationFieldRules = {
  [key in ValidationRulesNamesKey] ?: ((params ?: any) => any)
}

export type IValidationModelRules<T,T1=null, T2=null, T3=null,T4=null, T5=null, T6=null> = {
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
  fnFieldValue : (field : string) => string | undefined,
  fnSetStateFormFieldValue : (field : string,value : string) => void
  fnOnBlurValidation : (field : string) => void,
  stateForm : T,
  setStateForm : (r : T) => void
}

export interface IUseValidationFormProps<T> {
  initialData ? : Partial<T>
  validationRules : IValidationModelRules<T>
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

export const useValidationForm = <T>({initialData,validationRules} : IUseValidationFormProps<T>) : IUseValidationForm<T> => {

  const [stateForm, setStateForm] : [T,(r : T) => void] = useState( () => initialData ? initialData as T : {} as T )
  const [validationState, setValidationState] : [ IValidationModel<T>, (r : IValidationModel<T>) => void ] = useState(() => {
    const rules = new ValidationRulesGenerator<T>(validationRules)
    rules.createValidationForObject()
    console.log(rules)
    return rules.validator

  })
  const fnFieldValue = (field : string) : string| undefined => {
    return _.get(stateForm,field)
  }

  const fnOnBlurValidation = (key : string) => {
    const value = _.get(stateForm,key)
    fnValidateField(key,value,true)
  }

  const  fnValidateField = (key : string, value : string , dirty : boolean = false) : void => {
    const  field : IValidationField = _.get(validationState, `validations.${key}`)
    if (!field || (!dirty && !field.dirty))  {
      return
    }
    const validationObject = _.get(validationRules,key)
    if (!validationObject) {
      return
    }
    let _validObj = Object.keys(field.validation).reduce((acc,fName) => {
      const fn = validationObject[fName]
      return fn ? Object.assign(acc,{[fName]:fn.length === 0 ? fn()(value) : fn(value)}) : acc
    },{})

    _validObj = {
      error: !Object.values(_validObj).every(x => !(x)),
      dirty: dirty || field.dirty,
      validation:_validObj
    }
    const _obj = _.merge({},validationState,_.set({},`validations.${key}`,_validObj))
    console.log(_obj)
    setValidationState(_obj)
  }

  const fnSetStateFormFieldValue = (field : string, value : string) : void => {
    const object = _.merge({},stateForm,_.set({},field,value))
    setStateForm(object)
    fnValidateField(field,value,false)
  }

  return {
    fnFieldValue,
    fnSetStateFormFieldValue,
    fnOnBlurValidation,
    stateForm,
    setStateForm
  }
}