import React      from 'react'

const FormCheckbox = () => {
  return (

    <div className="form-group p-md-3 col-md-12">
      <span className="header">CHECKBOX</span>
      <div className="form-check-inline">
        <div className="custom-control custom-checkbox">
          <input type="checkbox" className="custom-control-input" />
          <label className="custom-control-label" >test check 1</label>
        </div>

      </div>

      <div className="form-check-inline">
        <div className="custom-control custom-checkbox">
          <input type="checkbox" className="custom-control-input" />
          <label className="custom-control-label" >test check 2</label>
        </div>

      </div>

      <div className="form-check-inline">
        <div className="custom-control custom-checkbox">
          <label className="custom-control-label" >test check 3</label>
          <input type="checkbox" className="custom-control-input" />
        </div>
      </div>

    </div>

  )
}

export default FormCheckbox