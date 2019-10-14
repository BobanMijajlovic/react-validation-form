import {  isLength } from 'validator'

const DEFAULT_MESSAGE_REQUIRED = 'Required Field'
const DEFAULT_MESSAGE_MAX_VALUE = 'Max value is {max}'
const DEFAULT_MESSAGE_MIN_LENGTH = 'Min length is {min}'
const DEFAULT_MESSAGE_NOT_EMPTY = 'Field can be empty'

export interface IValidatorParams {
  message ?: string
}

const isDefined = (value : any) => {
  return value !== void 0 && value !== null
}

export const required = ( {message} : IValidatorParams = {}) => ( value : any ) => {
  return !isDefined(value) ?  message || DEFAULT_MESSAGE_REQUIRED : false
}

export const notEmpty = ( {message} : IValidatorParams ) => ( value : number|string ) => {
  if (!isDefined(value)) {
    return false
  }
  if (typeof value === 'number') {
    value = `${value}`
  }
  value = value.trim()
  return  value.length !== 0 ? false : ( message || DEFAULT_MESSAGE_NOT_EMPTY)
}

/** *  Validation min length **/
export interface IValidatorMinLength extends IValidatorParams{
  min : number
}

export const minLength = ( {message, min} : IValidatorMinLength) => ( value ? : string|number ) => {
  if (!isDefined(value)) {
    return false 
  }
  if (typeof value === 'number') {
    value = `${value}`
  }
  return isLength(value as string,{min:min}) ? false : (message ? message : DEFAULT_MESSAGE_MIN_LENGTH.replace(/{min}/g, `${min}`))
}

/** *  Validation max value **/
export interface IValidatorMaxValue extends IValidatorParams{
  max : number
}

export const maxValue = ({message, max} : IValidatorMaxValue) => ( value ? : number|string ) => {
  /** only check valid values , not NaN, not string that are not represents number */
  if (!isDefined(value)) {
    return false 
  }
  value = +(value as (string|number))
  if (isNaN(value)) {
    return false 
  }
  return value <= max ? false : (message ? message : DEFAULT_MESSAGE_MAX_VALUE.replace(/{max}/g, `${max}`))
}

