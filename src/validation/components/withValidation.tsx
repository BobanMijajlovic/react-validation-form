import React, {PropsWithChildren, useEffect} from 'react'
import {IFieldInputValidationProps}          from '../interfaces'

export interface IWithValidationProps {
  error ? : string|boolean,
  onBlur ?: (event : React.FocusEvent<HTMLInputElement>) => void,
  onChange ? : (event : React.ChangeEvent<HTMLInputElement>) => void
  value ?: string
}

// eslint-disable-next-line react/display-name
const withValidation  = <T,P>(Component : React.FC<P>) => (props : PropsWithChildren<any> &  IFieldInputValidationProps<T>) => {

  const  {
    useValidation,
    modelField,
    onChange,
    onBlur,
    ...restProps
  } = props

  const {setFieldValue, assignField, onBlurField, getFieldError, getFieldValue } = useValidation

  useEffect(() => {
    assignField(modelField)
  },[])

  const onChangeHandler = (event : React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    event.persist()
    event.target.value = value
    onChange ? onChange(event) : setFieldValue(modelField,value)
  }

  const onBlurHandler = (event : React.FocusEvent<HTMLInputElement>) => {
    onBlurField(modelField)
    onBlur &&  onBlur(event)
  }

  const errorString =  getFieldError(modelField)
  const _value = getFieldValue(modelField) || ''

  return (
    <Component
      {
        ... restProps
      }
        onChange={onChangeHandler}
        onBlur ={onBlurHandler}
        error={errorString}
        value = {_value}

    />
  )
}

export default  withValidation