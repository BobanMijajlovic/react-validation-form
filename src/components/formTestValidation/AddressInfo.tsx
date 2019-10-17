import React                     from 'react'
import BasicInputValidation      from '../BasicInputValidation'
import {IContextValidationProps} from '../../validation/interfaces'

const AddressInfo = <T extends {}> ({useValidation, fieldParentName} : IContextValidationProps<T>) => {

  return (
    <div className="row col-md-12">
      <span className="header">ADDRESS INFO</span>
      <div className="form-group p-md-3  col-md-5">
        <BasicInputValidation
          helpText={'enter street address'}
          label={'STREET:'}
          modelField={`${fieldParentName}.street`}
          useValidation={useValidation}
        />
      </div>

      <div className="form-group p-md-3  col-md-2">
        <BasicInputValidation
          helpText={'enter  zip'}
          label={'ZIP:'}
          modelField={`${fieldParentName}.zip`}
          useValidation={useValidation}
        />
      </div>

      <div className="form-group p-md-3  col-md-3">
        <BasicInputValidation
          helpText={'enter  city'}
          label={'City:'}
          modelField={`${fieldParentName}.city`}
          useValidation={useValidation}
        />
      </div>

      <div className="form-group p-md-3  col-md-2">
        <BasicInputValidation
          helpText={'enter  state'}
          label={'State:'}
          modelField={`${fieldParentName}.state`}
          useValidation={useValidation}
        />
      </div>
    </div>
  )
}

export default AddressInfo