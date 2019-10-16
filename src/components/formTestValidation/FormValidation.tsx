import React, {isValidElement, useEffect}                              from 'react'
import CompanyInfo                                                     from './CompanyInfo'
import AddressInfo                                                     from './AddressInfo'
import PersonalInfo                                                    from './PersonalInfo'
import {IValidationModelRules, useValidationForm}                      from '../../validation/validator'
import {IAddressModel, ICompanyModel, IContactInfoModel, IPersonModel} from '../../testForms/Models'
import {maxValue, minLength, required, onlyNumbers}                    from '../../validation/validations'

const  FormValidation  = () => {

  const contactValidation : IValidationModelRules<IContactInfoModel> = {
    phone :{
      required
    },
    email : {
      required
    }
  }

  const personValidation : IValidationModelRules<IPersonModel,IContactInfoModel> = {
    firstName :{
      required
    },
    lastName : {
      required
    },
    contact: contactValidation
  }

  const addressValidation : IValidationModelRules<IAddressModel> = {
    street : {
      required
    },
    zip : {
      required,
      minLength: minLength({
        message: 'Min 5 chars',
        min: 5
      })
    },
    city :  {
      required
    }
  }

  const companyValidation : IValidationModelRules<ICompanyModel,IAddressModel,IPersonModel> = {
    name: {
      required,
      minLength:minLength({min: 4})
    },
    tin: {
      required,
      onlyNumbers,
      minLength: minLength({min: 9}),
    },
    address: addressValidation,
    person: personValidation
  }

  const initialValue = {
    name: void(0),
    tin: '1234',

  }

  const validation = useValidationForm({
    initialData: initialValue,
    validationRules: companyValidation,
    submitSuccess: () => {
      const {stateForm} = validation
      console.log('state',stateForm)
    },

  })

  const styleGlobalError = {
    color: validation.modelError ? 'red' : 'inherit'
  }

  useEffect(() => {
    console.log('form render')
  })

  return (
    <div className="container">
      <div className="mainDiv p-md-4 col-md-9">
        <h3 style={styleGlobalError}> FORM VALIDATION </h3>
        <div>
          <CompanyInfo
              useValidation={validation}
          />
          <AddressInfo
              useValidation={validation}
              modelFieldBasicString={'address'}
          />
          <PersonalInfo
              useValidation={validation}
              modelFieldBasicString={'person'}
          />
          <button
             className="btn btn-primary my-button"
              onClick = {validation.fnSubmit}
          >SUBMIT</button>
        </div>
      </div>
    </div>
  )

}

export default FormValidation