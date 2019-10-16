import React                   from 'react'
import BasicInputValidation    from '../BasicInputValidation'
import {IFieldInputBasicProps} from '../../testForms/Models'

const ContactInfo = <T extends {}>({ useValidation, modelFieldBasicString} : IFieldInputBasicProps<T>) => {

  return (
    <div>
      <div className="row col-md-12">
        <div className="form-group p-md-3  col-md-6">
          <BasicInputValidation
            helpText={'enter email'}
            label={'EMAIL:'}
            modelField={`${modelFieldBasicString}.email`}
            useValidationFormInstance={useValidation}
          />
        </div>
        <div className="form-group p-md-3  col-md-6">
          <BasicInputValidation
                helpText={'enter mobile phone'}
                label={'MOBILE: '}
                modelField={`${modelFieldBasicString}.phone`}
                useValidationFormInstance={useValidation}
          />
        </div>
      </div>
    </div>
  )

}

export default ContactInfo