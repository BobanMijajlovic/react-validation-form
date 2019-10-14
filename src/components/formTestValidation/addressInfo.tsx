import React      from 'react'
import FormSelect from './formSelect'

const AddressInfo = () => {

  return (
    <div className="row col-md-12">
      <span className="header">ADDRESS INFO</span>
      <div className="form-group p-md-3  col-md-6">
        <label className="custom-label">STREET: </label>
        <input
          className="form-control"
          type="text"
        />
        <small  className="form-text text-muted">enter street address</small>
      </div>

      <div className="form-group p-md-3  col-md-2">
        <label className="custom-label">ZIP:</label>
        <input
          className="form-control"
          type="text"
        />
        <small  className="form-text text-muted">enter zip code</small>
      </div>

      <div className="form-group p-md-3  col-md-4">
        <label className="custom-label">STATE:</label>
        <input
            className="form-control"
            type="text"
        />
        <small  className="form-text text-muted">enter state</small>
      </div>

    </div>
  )

}

export default AddressInfo