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

/** Return object definitions for useValidationForm */
export interface  IUseValidationForm<T> {
  /** Check the field value in state and set field value to undefined if not set in the initial values.
   * @param field  name of the field in model like  person.address.zip
   */
  assignField : (field : string) => void,
  /** @param field - name of the field in model like  person.address.city
   *  @return current value for the field or undefined
   */
  getFieldValue : (field : string) => string | undefined,

  /** @param field  name of the field in model like  person.address.zip
   *  @return error for that field ( string or true) or false if error not exists for field
   */
  getFieldError : (field : string) => string | undefined,
  setFieldValue : (field : string, value : string) => void,
  setFieldError : (field : string, error : string) => void

  /** Set the global error for validation. This error is not like global model error, this is error that not belongs to any field
   * @param error - error like string or boolean false|true
   */
  setErrorGlobal : (error : string  |boolean) => void,

  /** function that is called when field has onBlur event, validation should be made and field set to dirty */
  onBlurField : (field : string) => void,

  /**
   * @return  true|false depends of is there error in validation or not. If error exists then return false and break
   *  if there is no error true is backed and function execute submitSuccess() function (entry param function )
   */
  submit : () => boolean,

  /** Reset all validation for model, all flags set to false, all field  set dirty: false */
  resetValidations : () => void,

  /** State of the model */
  stateForm : T,
  setStateForm : (r : T) => void,

  /** Flag true|false that represent is there any error in validation in model, if one field or errorGlobal is set the this flag is true. */
  errorModel : boolean,
  /** value for error that is  set external ( setErrorGlobal ) and can be used to set error that can't be determine to belongs to any field */
  errorGlobal : boolean|string
}

/** Entry properties for useValidationForm hook */
export interface IUseValidationFormProps<T> {
  /** initial/ start data  values for model */
  initialData ? : Partial<T>
  /** Object that define rules for model */
  validationRules : IValidationModelRules<T>,
  /** Function that will be called in submit if validation passed */
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
    Object.keys(parent ? _.get(this.rule,parent) : this.rule).forEach(key => this.createValidationForField( key, parent ))
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
      (this.validationKeys.findIndex(x => x === parentStr) === -1) &&   this.validationKeys.push(parentStr)
      const modelV = pathArray.reduceRight((acc : any,x : string) =>  _.set({},x,acc) ,{[attribute]: validatorField})
      this.validator = _.merge(this.validator, { validations: modelV  })
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
    const object : T = validationKeys.current.reduce((obj : T,x : string) =>  _.merge(obj, _.set({},x,void(0))),{} as T)
    return initialData ? _.merge({},object, initialData) : object
  })

  useEffect(() => {
    console.log('hooks render' ,stateForm,validationState)
  })

  const  _fnCheckModelErrors = (state ?: IValidationModel<T>) : boolean =>  !validationKeys.current.every(key =>  !_.get(state ? state : validationState, `validations.${key}.error`) )

  const  _fnValidateField = (key : string, value : string , dirty : boolean = false) : void => {
    const  field : IValidationField = _.get(validationState, `validations.${key}`)
    if (!field || (!dirty && !field.dirty))  {
      return
    }
    const validationObject = _.get(validationRules,key)
    if (!validationObject) {
      return
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
    validObj.error = _fnCheckModelErrors(validObj)
    setValidationState(validObj)
  }

  const setFieldValue = (field : string, value : string) : void => {
    setStateForm(_.merge({},stateForm,_.set({},field,value)))
    _fnValidateField(field,value,false)
  }

  const submit = () : boolean => {

    const validObj = validationKeys.current.reduce((acc : IValidationModel<T>,key : string) => {
      const  field : IValidationField = _.get(validationState, `validations.${key}`)
      const value = _.get(stateForm,key)
      const obj = Object.keys(field.validation).reduce((acc,fName) => {
        const fn = _.get(validationRules,key)[fName]
        return fn ? Object.assign(acc,{[fName]:fn.length === 0 ? fn()(value) : fn(value)}) : acc
      },{})

      return  _.merge({},acc,_.set({},`validations.${key}`,{
        error: Object.values(obj).find(x => !!x) || false,
        dirty: false,
        validation:obj
      }))

    },validationState)

    validObj.error = _fnCheckModelErrors(validObj)
    setValidationState(validObj)
 /*   if (validObj.error) {
      return false 
    }*/
    submitSuccess &&  submitSuccess()
    return true
  }

  return {
    assignField: (field : string) => {
      !_.has(stateForm,field) && setStateForm( _.merge({},stateForm,_.set({},field,void(0))))
    },

    getFieldValue: (field : string) : string| undefined =>  _.get(stateForm,field),
    setFieldValue,
    setFieldError: (field : string, error : string) : void =>  setValidationState(_.merge({},validationState,_.set({error: true},`validations.${field}.error`,error))),

    onBlurField: (key : string) =>     _fnValidateField(key,_.get(stateForm,key),true),

    getFieldError:(field : string) : string|undefined =>  _.get(validationState,`validations.${field}.error`),
    setErrorGlobal: (error : string | boolean) : void =>  setValidationState({ ...validationState, ...{  global: error,    error: true } }),

    resetValidations: () =>   setValidationState( validationKeys.current.reduce((accObj : IValidationModel<T> ,key : string) => _.merge(accObj,_.set({},`validations.${key}`,{
      dirty: false,
      error: false,
      validation: Object.keys(_.get(validationState,`validations.${key}.validation`)).reduce((acc, key) =>  Object.assign(acc,{[key]:false}),{ })
    })),{
      error: false,
      global: false,
      validations: {}
    } as IValidationModel<T>)),

    submit,

    stateForm,
    setStateForm,

    errorModel: !!validationState.error,
    errorGlobal: validationState.global
  }
}