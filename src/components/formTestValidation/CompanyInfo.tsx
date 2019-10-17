import React                     from 'react'
import BasicInputValidation      from '../BasicInputValidation'
import {IContextValidationProps} from '../../validation/interfaces'

const CompanyInfo = <T extends {}> ({useValidation} : IContextValidationProps<T>) => {

  return (

    <div className="row col-md-12">
      <span className="header">COMPANY INFO</span>
      <div className="form-group p-md-3  col-md-5 ">
        <BasicInputValidation
          helpText={'company name'}
          label={'Company Name:'}
          modelField={'name'}
          useValidation={useValidation}
        />
      </div>
      <div className="form-group p-md-3 col-md-3">
        <BasicInputValidation
          helpText={'company tin'}
          label={'Company TIN:'}
          modelField={'tin'}
          useValidation={useValidation}
        />
      </div>
    </div>
  )

}

export default CompanyInfo