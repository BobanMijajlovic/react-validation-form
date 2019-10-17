import React                  from 'react'
import withValidation, {IWithValidationProps}  from '../validation/components/withValidation'

interface IBasicInputValidationProps extends IWithValidationProps{
  label : string,
  helpText ? : string
}

const BasicInputValidation = ({value,error,helpText,label,onChange, onBlur} : IBasicInputValidationProps) => {

  return (
    <div className= "form-group">
      <label className={error ? 'custom-label text-danger' : 'custom-label'}>{label}</label>
      <input
             className={`form-control ${error ? 'is-invalid' : ''}`}
             type="text"
             onBlur ={onBlur}
             onChange ={onChange}
             value = { value }
      />
      { error ?  <small className="invalid-feedback">{error}</small>  :
        (helpText ? <small>{helpText}</small> : <small>&nbsp;</small>)
      }
    </div>
  )
}

export  default  withValidation(BasicInputValidation)

