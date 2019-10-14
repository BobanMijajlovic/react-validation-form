import React       from 'react'
import ContactInfo from './contactInfo'

const PersonalInfo = () => {

  return (
    <div>

      <div className="row col-md-12">
        <span className="header">PERSONAL INFO</span>
        <div className="form-group p-md-3  col-md-6">
          <label className="custom-label">FIRST NAME: </label>
          <input
                    className="form-control"
                    type="text"
          />
          <small  className="form-text text-muted">enter first name</small>
        </div>
        <div className="form-group p-md-3  col-md-6">
          <label className="custom-label">LAST NAME:</label>
          <input
                    className="form-control"
                    type="text"
          />
          <small  className="form-text text-muted">enter last name</small>
        </div>
      </div>

      <ContactInfo/>
    </div>
  )

}

export default PersonalInfo