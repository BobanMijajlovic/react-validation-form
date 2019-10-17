import React                       from 'react'
import {Grid, withStyles}          from '@material-ui/core'
import MaterialTextFieldValidation from '../MaterialTextFieldValidation'
import {IContextValidationProps}   from './interface'

const styleAddressInfo : any = {
  header:{
    position: 'absolute',
    fontSize: 12,
    right: 0,
    borderBottom: '1px solid #eee',
    paddingBottom: 3,
    width: 150,
    textAlign: 'end',
    color: '#031d34',
    textShadow: '0px 1px 1px white',
    top: -18
  },
  mainGridClass: {
    position: 'relative',
    margin: '12px 0px 4px 0px'
  },
  gridClass: {
    padding: '10px 15px'
  },
}

const AddressInfo =   <T extends any> ({classes, useValidation, fieldParentName} : IContextValidationProps<T>) => {
  return (
    <Grid container className={classes.mainGridClass}>
      <span className={classes.header}>ADDRESS INFO</span>
      <Grid item md={6} className={classes.gridClass}>
        <MaterialTextFieldValidation
          helperText={'enter street address'}
          label={'STREET'}
          modelField={`${fieldParentName}.street`}
          useValidation={useValidation}
        />
      </Grid>

      <Grid item md={2} className={classes.gridClass}>
        <MaterialTextFieldValidation
          helperText={'enter  zip'}
          label={'ZIP'}
          modelField={`${fieldParentName}.zip`}
          useValidation={useValidation}
        />
      </Grid>

      <Grid item md={4} className={classes.gridClass}>
        <MaterialTextFieldValidation
          helperText={'enter  city'}
          label={'CITY'}
          modelField={`${fieldParentName}.city`}
          useValidation={useValidation}
        />
      </Grid>

      <Grid item md={4} className={classes.gridClass}>
        <MaterialTextFieldValidation
          helperText={'enter  state'}
          label={'STATE'}
          modelField={`${fieldParentName}.state`}
          useValidation={useValidation}
        />
      </Grid>

    </Grid>
  )

}

export default withStyles(styleAddressInfo)(AddressInfo)