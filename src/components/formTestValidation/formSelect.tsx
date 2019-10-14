import React from 'react'

const FormSelect = () => {
  return (
    <div className="form-group p-md-3 col-md-4">
      <label className="custom-label" >CLIENT TYPE:</label>
      <select className="form-control" >
        <option></option>
        <option>customer</option>
        <option>client</option>
        <option>supplier</option>
        <option>customer-supplier</option>
      </select>
      <small  className="form-text text-muted">choose client type</small>
    </div>

  )

}

export default FormSelect