import React                     from 'react'
import BasicInputValidation      from '../BasicInputValidation'
import {IContextValidationProps} from '../../validation/interfaces'

const ContactInfo = <T extends {}> ({useValidation, fieldParentName} : IContextValidationProps<T>) => {

  return (
    <div>
      <div className="row col-md-12">
        <div className="form-group p-md-3  col-md-6">
          <BasicInputValidation
            helpText={'enter email'}
            label={'EMAIL:'}
            modelField={`${fieldParentName}.email`}
            useValidation={useValidation}
          />
        </div>
        <div className="form-group p-md-3  col-md-6">
          <BasicInputValidation
                helpText={'enter mobile phone'}
                label={'MOBILE: '}
                modelField={`${fieldParentName}.phone`}
                useValidation={useValidation}
          />
        </div>
      </div>
    </div>
  )

}

export default ContactInfo