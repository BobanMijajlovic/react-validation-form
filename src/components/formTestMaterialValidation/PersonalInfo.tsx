import React                       from 'react'
import ContactInfo                 from './ContactInfo'
import {Grid, withStyles}          from '@material-ui/core'
import MaterialTextFieldValidation from '../MaterialTextFieldValidation'
import {IContextValidationProps}   from './interface'

const stylePersonalInfo : any = {
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
  inputRoot: {
    padding: '2px auto'
  }
}

const PersonalInfo = <T extends any> ({classes, useValidation, fieldParentName} : IContextValidationProps<T>) => {

  return (

    <Grid container className={classes.mainGridClass}>
      <span className={classes.header}>PERSONAL INFO</span>
      <Grid item md={6} className={classes.gridClass}>
        <MaterialTextFieldValidation
          helperText={'enter first name'}
          label={'FIRST NAME'}
          modelField={`${fieldParentName}.firstName`}
          useValidation={useValidation}
        />
      </Grid>

      <Grid item md={6} className={classes.gridClass}>
        <MaterialTextFieldValidation
            helperText={'enter last name'}
            label={'LAST NAME'}
            modelField={`${fieldParentName}.lastName`}
            useValidation={useValidation}
        />
      </Grid>

      <ContactInfo
        useValidation={useValidation}
        fieldParentName={`${fieldParentName}.contact`}/>
    </Grid>
  )

}

export default withStyles(stylePersonalInfo)(PersonalInfo)