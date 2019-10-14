import React from 'react'

const ContactInfo = () => {

  return (
    <div className="row col-md-12">
      <span className="header">CONTACT INFO</span>
      <div className="form-group p-md-3  col-md-6">
        <label className="custom-label">PHONE: </label>
        <input
          className="form-control"
          type="text"
        />
        <small  className="form-text text-muted">enter phone #</small>
      </div>
      <div className="form-group p-md-3  col-md-6">
        <label className="custom-label">MOBILE:</label>
        <input
          className="form-control"
          type="text"
        />
        <small  className="form-text text-muted">enter mobile phone</small>
      </div>

    </div>
  )

}

export default ContactInfo