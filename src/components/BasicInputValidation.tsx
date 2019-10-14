import React                                               from 'react'
import {IFieldInputValidationProps} from '../validation/Interfaces'

const BasicInputValidation = <T extends object>({modelField, onChange, onBlur, useValidationFormInstance} : IFieldInputValidationProps<T>) => {

  const {fnFieldValue,fnSetStateFormFieldValue, fnOnBlurValidation} = useValidationFormInstance

  const _value = fnFieldValue(modelField) || ''

  const onChangeHandler = (event : React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value

    event.persist()
    event.target.value = value
    onChange ? onChange(event) : fnSetStateFormFieldValue(modelField,value)
  }

  const onBlurHandler = (event : React.FocusEvent<HTMLInputElement>) => {
    fnOnBlurValidation(modelField)
    if (onBlur) {
      onBlur(event) 
    }
  }

  return (
    <>
      <input
             onBlur ={onBlurHandler}
             onChange ={onChangeHandler}
             value = {_value }
      />
    </>
  )

}

export  default  BasicInputValidation

