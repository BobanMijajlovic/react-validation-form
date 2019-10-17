import React                         from 'react'
import {Grid, TextField, withStyles} from '@material-ui/core'
import MaterialTextFieldValidation   from '../MaterialTextFieldValidation'
import {IContextValidationProps}     from './interface'
import BasicInputValidation          from '../BasicInputValidation'

const styleContactInfo : any = {
  mainGridClass: {
    margin: '4px 0px 4px 0px'
  },
  gridClass: {
    padding: '10px 15px'
  },
}

const ContactInfo = <T extends any> ({classes, useValidation, fieldParentName} : IContextValidationProps<T>) => {
  return (
    <Grid container className={classes.mainGridClass}>
      <Grid item md={6} className={classes.gridClass}>
        <MaterialTextFieldValidation
          helperText={'enter email'}
          label={'EMAIL'}
          modelField={`${fieldParentName}.email`}
          useValidation={useValidation}
        />
      </Grid>
      <Grid item md={6} className={classes.gridClass}>
        <MaterialTextFieldValidation
            helperText={'enter mobile phone'}
            label={'MOBILE'}
            modelField={`${fieldParentName}.phone`}
            useValidation={useValidation}
        />
      </Grid>
    </Grid>
  )

}

export default withStyles(styleContactInfo)(ContactInfo)