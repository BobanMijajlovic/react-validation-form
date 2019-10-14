import React                 from 'react'
import CompanyInfo           from './companyInfo'
import AddressInfo           from './addressInfo'
import PersonalInfo          from './personalInfo'

class ValidationForm extends React.Component {

  render () {
    return (
      <div className="container">
        <div className="mainDiv p-md-4 col-md-9">
          <h3> FORM VALIDATION </h3>
          <form>
            <CompanyInfo/>
            <AddressInfo/>
            <PersonalInfo/>
            <button className="btn btn-primary my-button">SUBMIT</button>
          </form>
        </div>
      </div>
    )
  }

}

export default ValidationForm