import React      from 'react'
import FormSelect from './formSelect'

const CompanyInfo = () => {

  return (

    <div className="row col-md-12">
      <span className="header">COMPANY INFO</span>
      <div className="form-group p-md-3  col-md-5 ">
        <label className="custom-label">NAME: </label>
        <input
          className="form-control"
          type="text"
        />
        <small  className="form-text text-muted">enter company name</small>
      </div>
      <div className="form-group p-md-3  col-md-3">
        <label className="custom-label">TAX ID:</label>
        <input
          className="form-control"
          type="text"
        />
        <small  className="form-text text-muted">enter tax id</small>
      </div>
      <FormSelect/>
    </div>
  )

}

export default CompanyInfo