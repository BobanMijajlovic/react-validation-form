import React                 from 'react'
import CompanyInfo           from './companyInfo'
import AddressInfo           from './addressInfo'
import ContactInfo           from './contactInfo'
import ContactInfoAdditional from './constactInfoAdditional'

class ValidationForm extends React.Component {

  render () {
    return (
      <div className="container">
        <div className="mainDiv col-md-9">
          <h3> FORM VALIDATION </h3>
          <form>
            <CompanyInfo/>
            <AddressInfo/>
            <ContactInfo/>
            <ContactInfoAdditional/>
            <button className="btn btn-primary my-button">SUBMIT</button>
          </form>
        </div>
      </div>
    )
  }

}

export default ValidationForm