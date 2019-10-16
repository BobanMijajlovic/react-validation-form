import React                   from 'react'
import {IFieldInputBasicProps} from '../../testForms/Models'
import BasicInputValidation    from '../BasicInputValidation'

const CompanyInfo = <T extends {}> ({useValidation} : IFieldInputBasicProps<T>) => {

  return (

    <div className="row col-md-12">
      <span className="header">COMPANY INFO</span>
      <div className="form-group p-md-3  col-md-5 ">
        <BasicInputValidation
          helpText={'company name'}
          label={'Company Name:'}
          modelField={'name'}
          useValidationFormInstance={useValidation}
        />
      </div>
      <div className="form-group p-md-3  col-md-3">
        <BasicInputValidation
          helpText={'company tin'}
          label={'Company TIN:'}
          modelField={'tin'}
          useValidationFormInstance={useValidation}
        />
      </div>
    </div>
  )

}

export default CompanyInfo