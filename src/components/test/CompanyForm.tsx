import React                                                           from 'react'
import FormValidation                                                  from '../formTestValidation/FormValidation'
import FormValidationMaterial                                          from '../formTestMaterialValidation/FormValidation'
import {IValidationModelRules, useValidationForm}                      from '../../validation/validator'
import {IAddressModel, ICompanyModel, IContactInfoModel, IPersonModel} from '../../testForms/Models'
import {minLength, onlyNumbers, required}                              from '../../validation/validations'

const CompanyForm =  () => {

  const personValidation : IValidationModelRules<IPersonModel,IContactInfoModel> = {
    firstName :{
      required
    },
    lastName : {
      required
    },
    contact: {
      phone :{
        required
      },
      email : {
        required
      }
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
    address: {
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
    },
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

  return (
    <div style = {{display:'flex'}}>
      <FormValidation <ICompanyModel>
        validation = {validation}
      />
      <FormValidationMaterial
        useValidation= {validation}
      />
      <div style ={{display: 'flex', justifyContent:'space-around', }}>

        <button
          className="btn btn-primary"
          onClick = {validation.submit}
        >
          SUBMIT
        </button>

        <button
          className="btn btn-secondary"
          onClick = {validation.resetValidations}
        >
          RESET
        </button>

        <button
          className="btn btn-info"
          onClick = {() => validation.setErrorGlobal('This is global error string')}
        >
          GLOBAL ERROR
        </button>

        <button
          className="btn btn-info"
          onClick = {() => validation.setFieldError('address.zip','Zip not valid!')}
        >
          FIELD ERROR
        </button>
      </div>
    </div>
  )
}

export default  CompanyForm