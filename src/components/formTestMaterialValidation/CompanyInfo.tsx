import React                       from 'react'
import {Grid, withStyles}          from '@material-ui/core'
import MaterialTextFieldValidation from '../MaterialTextFieldValidation'
import {IContextValidationProps}   from './interface'

const styleCompanyInfo : any = {
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
  inputRoot:{
    padding: 12
  }
}

const CompanyInfo = <T extends any> ({ classes, useValidation } : IContextValidationProps<T>) => {
  return (
    <Grid container className={classes.mainGridClass}>
      <span className={classes.header}>COMPANY INFO</span>
      <Grid item md={6} className={classes.gridClass}>
        <MaterialTextFieldValidation
            helperText={'enter company name'}
            label={'NAME'}
            modelField={'name'}
            useValidation={useValidation}
        />
      </Grid>
      <Grid item md={3} className={classes.gridClass}>
        <MaterialTextFieldValidation
            helperText={'enter tax id'}
            label={'TAX ID'}
            modelField={'tin'}
            useValidation={useValidation}        />
      </Grid>
    </Grid>
  )

}

export default withStyles(styleCompanyInfo)(CompanyInfo)