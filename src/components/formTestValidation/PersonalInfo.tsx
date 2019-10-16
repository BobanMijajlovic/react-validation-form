import React          from 'react'
import ContactInfo             from './ContactInfo'
import BasicInputValidation    from '../BasicInputValidation'
import {IFieldInputBasicProps} from '../../testForms/Models'

const PersonalInfo = <T extends {}>({useValidation, modelFieldBasicString} : IFieldInputBasicProps<T>) => {

  return (
    <div className="row col-md-12">
      <div className="form-group p-md-3  col-md-6">
        <BasicInputValidation
            helpText={'enter first name'}
            label={'First NAME:'}
            modelField={`${modelFieldBasicString}.firstName`}
            useValidationFormInstance={useValidation}
        />
      </div>
      <div className="form-group p-md-3  col-md-6">
        <BasicInputValidation
              helpText={'enter last name'}
              label={'LAST NAME:'}
              modelField={`${modelFieldBasicString}.lastName`}
              useValidationFormInstance={useValidation}
        />
      </div>

      <ContactInfo
        useValidation={useValidation}
        modelFieldBasicString={`${modelFieldBasicString}.contact`}
      />
    </div>
  )

}

export default PersonalInfo