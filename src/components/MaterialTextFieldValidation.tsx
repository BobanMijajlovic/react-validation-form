import React                        from 'react'
import {Grid, TextField,withStyles} from '@material-ui/core'
import withValidation,{IWithValidationProps}       from '../validation/components/withValidation'
import {TextFieldProps}             from '@material-ui/core/TextField'
import {IWithStyles}                from './formTestMaterialValidation/interface'

const style = {
  inputRoot:{
    padding: 12
  },
  label:{
    fontSize: 14,
    transform: 'translate(14px, 14px) scale(1)'
  }
}

const MaterialTextFieldValidation = ({classes,helperText,error, ...rest} : TextFieldProps & IWithValidationProps & IWithStyles ) => {
  return (
    <TextField
      {...rest}
      error = {!!error}
      variant={'outlined'}
      fullWidth
      helperText={error ? error : helperText}
      InputLabelProps={{
        classes: {
          outlined: classes.label
        }
      }}
      InputProps={{
        classes:{
          input: classes.inputRoot
        }
      }}
    />
  )
}

export default withStyles(style)(withValidation(MaterialTextFieldValidation))