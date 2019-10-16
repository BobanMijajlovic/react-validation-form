import React from 'react'
import {IUseValidationForm} from './validator'

export interface IFieldValidationProps<T> {
  modelField : string,
  useValidationFormInstance : IUseValidationForm<T>

}

export interface IFieldInputValidationProps<T>  extends IFieldValidationProps<T>{
  onChange ? : (event : React.ChangeEvent<HTMLInputElement>) => void
  onBlur ?: (event : React.FocusEvent<HTMLInputElement>) => void
  helpText : string,
  label : string
}