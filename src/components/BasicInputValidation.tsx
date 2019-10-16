import React, {useEffect}           from 'react'
import {IFieldInputValidationProps} from '../validation/Interfaces'

const BasicInputValidation = <T  extends {}>({modelField, onChange, onBlur, helpText, label, useValidationFormInstance} : IFieldInputValidationProps<T>) => {

  const {fnFieldValue, fnCheckInModelField, fnSetStateFormFieldValue, fnOnBlurValidation,  fnErrorField } = useValidationFormInstance

  const _value = fnFieldValue(modelField) || ''

  useEffect(() => {
    fnCheckInModelField(modelField)
  },[])

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
  const errorString =  fnErrorField(modelField)
  return (
    <div className= "form-group">
      <label className="custom-label">{label}</label>
      <input
             className={`form-control ${errorString ? 'is-invalid' : ''}`}
             type="text"
             onBlur ={onBlurHandler}
             onChange ={onChangeHandler}
             value = {_value }
      />
      { errorString ?  <small className="invalid-feedback">{errorString}</small>  :
        (helpText ? <small>{helpText}</small> : <small>&nbsp;</small>)
      }
    </div>
  )

}

export  default  BasicInputValidation

