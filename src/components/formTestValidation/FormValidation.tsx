import React, {useEffect}                     from 'react'
import CompanyInfo                            from './CompanyInfo'
import AddressInfo                            from './AddressInfo'
import PersonalInfo                           from './PersonalInfo'
import {IUseValidationForm} from '../../validation/validator'

interface IFormValidationProps<T> {
  validation : IUseValidationForm<T>
}

const  FormValidation  = <T extends {}>({validation}  : IFormValidationProps<T>) => {

  const styleModelError = {
    color: validation.errorModel ? 'red' : 'inherit'
  }

  const styleGlobalError : any = {
    background: 'rgba(230,28,8,0.14)',
    color: 'red',
    position: 'absolute'
  }

  return (
    <div className="container">
      <div className="mainDiv p-md-4 col-md-9" style={{position: 'relative'}}>
        {
          validation.errorGlobal ? <div style={styleGlobalError}>
            {validation.errorGlobal}
          </div> : null
        }
        <h3 style={styleModelError}> FORM VALIDATION </h3>
        <div>
          <CompanyInfo  useValidation={validation} />
          <AddressInfo
              useValidation={validation}
              fieldParentName={'address'}
          />
          <PersonalInfo
              useValidation={validation}
              fieldParentName={'person'}
          />
        </div>
      </div>
    </div>
  )

}

export default FormValidation