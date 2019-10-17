import React from 'react'
import {IUseValidationForm} from './validator'

export interface IFieldValidationProps<T> {
  modelField : string,
  useValidation : IUseValidationForm<T>

}

export interface IContextValidationProps<T> {
  fieldParentName ? : string,
  useValidation : IUseValidationForm<T>

}

export interface IFieldInputValidationProps<T>  extends IFieldValidationProps<T>{
  onChange ? : (event : React.ChangeEvent<HTMLInputElement>) => void
  onBlur ?: (event : React.FocusEvent<HTMLInputElement>) => void
  helpText : string,
  label : string
}

