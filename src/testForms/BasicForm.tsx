import React                                                       from 'react'
import {maxValue, minLength, required}                             from '../validation/validations'
import {
  IValidationModelRules,
  useValidationForm
}                                                                  from '../validation/validator'
import BasicInputValidation                                        from '../components/BasicInputValidation'
import {IAddressModel, ICompanyModel, IContactModel, IPersonModel} from './Models'

/*

const validationIContacts: IValidationModelRules<IContacts> = {
     mobile:  {
           required
     }
}

const validationRulesBasicForm : IValidationModelRules<ISimpleModel,IAddress,IContacts,IPerson> = {
  pib: {
    required,
    minLength: minLength({
      min: 5,
      message: 'Has to be at least 5 chars'
    })
  },
  person: validationPerson,
  person2: validationPerson,
  contact: validationIContacts,
  address: validationAddress,

  }
*/

const BasicForm = () => {

  const validationAddress : IValidationModelRules<IAddressModel> = {
    zip: {
      required,
      maxValue: maxValue({
        max: 3000
      })
    }
  }

  const validationContact : IValidationModelRules<IContactModel> = {
    email:{
      required
    }
  }

  const validationPerson : IValidationModelRules<IPersonModel,IContactModel> = {
    contact: validationContact,
    firstName : {
      required
    }
  }

  const validationRulesCompany : IValidationModelRules<ICompanyModel,IAddressModel,IPersonModel> = {
    name: {
      required,
      minLength: minLength({
        min: 3
      })
    },
    contactPerson: validationPerson,
    address: validationAddress
  }

  const useFormValidation = useValidationForm<ICompanyModel>({
    validationRules: validationRulesCompany
  })
  const style = {
    display: 'flex',
    padding: '10px',
    margin: 10,
    border: '1px solid red'
  }

  return (
    <div style={style}>

      <BasicInputValidation <ICompanyModel>
         modelField={'name'}
         useValidationFormInstance={useFormValidation}
      />

    </div>
  )

}

export default BasicForm