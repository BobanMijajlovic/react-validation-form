import React                     from 'react'
import ContactInfo               from './ContactInfo'
import BasicInputValidation      from '../BasicInputValidation'
import {IContextValidationProps} from '../../validation/interfaces'

const PersonalInfo = <T extends {}> ({useValidation, fieldParentName} : IContextValidationProps<T>) => {

  return (
    <div className="row col-md-12">
      <div className="form-group p-md-3  col-md-6">
        <BasicInputValidation
            helpText={'enter first name'}
            label={'First NAME:'}
            modelField={`${fieldParentName}.firstName`}
            useValidation={useValidation}
        />
      </div>
      <div className="form-group  p-md-3  col-md-6">
        <BasicInputValidation
              helpText={'enter last name'}
              label={'LAST NAME:'}
              modelField={`${fieldParentName}.lastName`}
              useValidation={useValidation}
        />
      </div>

      <ContactInfo
        useValidation={useValidation}
        fieldParentName={`${fieldParentName}.contact`}
      />
    </div>
  )

}

export default PersonalInfo