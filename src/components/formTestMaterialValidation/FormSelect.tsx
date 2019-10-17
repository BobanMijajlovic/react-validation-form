import React                                          from 'react'
import {FormHelperText, InputLabel, MenuItem, Select} from "@material-ui/core";

const FormSelect = ({state,label,helperText,array}:any) => {
  return (
    <>
      <InputLabel shrink>
        {label}
      </InputLabel>
      <Select
        value={state.vat}
        onChange={(event : any) => alert(event)}
      >
        {array.map((x:any, index:number) => {
          return (
            <MenuItem key={index} value={x.value}>
              <span>{x.label} </span>
            </MenuItem>
          )
        })}
      </Select>
      <FormHelperText>{helperText}</FormHelperText>
    </>

  )

}

export default FormSelect