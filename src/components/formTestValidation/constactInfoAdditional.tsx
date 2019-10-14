import React        from 'react'
import FormCheckbox from "./formCheckbox";

const ContactInfoAdditional = () => {

  return (

    <div className="row col-md-12">
      <span className="header">CONTACT INFO 2</span>
      <div className="form-group p-md-3  col-md-6">
        <label className="custom-label">EMAIL: </label>
        <input
          className="form-control"
          type="text"
        />
        <small  className="form-text text-muted">enter email </small>
      </div>
      <div className="form-group p-md-3  col-md-6">
        <label className="custom-label">WEB:</label>
        <input
          className="form-control"
          type="text"
        />
        <small  className="form-text text-muted">enter web</small>
      </div>
      <FormCheckbox/>

    </div>
  )

}

export default ContactInfoAdditional