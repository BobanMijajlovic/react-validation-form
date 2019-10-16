import React                   from 'react'
import {IFieldInputBasicProps} from '../../testForms/Models'
import BasicInputValidation    from '../BasicInputValidation'

const AddressInfo = <T extends {}> ({useValidation, modelFieldBasicString} : IFieldInputBasicProps<T>) => {

  return (
    <div className="row col-md-12">
      <span className="header">ADDRESS INFO</span>
      <div className="form-group p-md-3  col-md-5">
        <BasicInputValidation
          helpText={'enter street address'}
          label={'STREET:'}
          modelField={`${modelFieldBasicString}.street`}
          useValidationFormInstance={useValidation}
        />
      </div>

      <div className="form-group p-md-3  col-md-2">
        <BasicInputValidation
          helpText={'enter  zip'}
          label={'ZIP:'}
          modelField={`${modelFieldBasicString}.zip`}
          useValidationFormInstance={useValidation}
        />
      </div>

      <div className="form-group p-md-3  col-md-3">
        <BasicInputValidation
          helpText={'enter  city'}
          label={'City:'}
          modelField={`${modelFieldBasicString}.city`}
          useValidationFormInstance={useValidation}
        />
      </div>

      <div className="form-group p-md-3  col-md-2">
        <BasicInputValidation
          helpText={'enter  state'}
          label={'State:'}
          modelField={`${modelFieldBasicString}.state`}
          useValidationFormInstance={useValidation}
        />
      </div>

    </div>
  )

}

export default AddressInfo