import React                                 from 'react'
import {withStyles}                          from '@material-ui/core/styles'
import CompanyInfo                           from './CompanyInfo'
import {Button, Container, Grid, Typography} from '@material-ui/core'
import AddressInfo                           from './AddressInfo'
import PersonalInfo                          from './PersonalInfo'
import cx                                    from 'classnames'
import {IWithStyles}                         from './interface'
import {IUseValidationForm}                  from '../../validation/validator'

const styleValidationForm : any = {
  root: {
    padding: '20px',
    width: '80%',
    margin: '10px auto',
    maxWidth: ' 1000px'
  },
  typography: {
    padding: '10px 15px'
  },
  gridClassButton: {
    marginTop: '30px'
  },
  button: {
    margin: '10px',
    minWidth: '120px'
  },
}

interface  IFormValidationProps<T>  extends IWithStyles{
  useValidation : IUseValidationForm<T>
}

const FormValidation = <T extends any>({classes, useValidation} : IFormValidationProps<T>) => {

  const styleGlobalError : any = {
    background: 'rgba(230,28,8,0.14)',
    color: 'red',
    right: 0,
    position: 'absolute'
  }

  const styleModelError = {
    color: useValidation.errorModel ? 'red' : 'inherit'
  }

  return (
    <Container  className={classes.root} >
      <Grid style={{position: 'relative'}}>
        {
          useValidation.errorGlobal ? <div style={styleGlobalError}>
            {useValidation.errorGlobal}
          </div> : null
        }
        <Typography variant={'h5'} className={classes.typography} style={styleModelError} >FORM VALIDATION</Typography>
        <div>
          <CompanyInfo useValidation={useValidation} />
          <AddressInfo
            useValidation={useValidation}
            fieldParentName={'address'}
          />
          <PersonalInfo
            useValidation={useValidation}
            fieldParentName={'person'}
          />
          <Grid item className={cx(classes.gridClass, classes.gridClassButton)} md={12}
                  style={{textAlign: 'right', position: 'relative'}}>
            <Button variant='outlined' component="span" color="secondary" className={classes.button}>
                  CANCEL
            </Button>
            <Button variant='outlined' component="span" color="primary" className={classes.button}>
                  SUBMIT
            </Button>
          </Grid>
        </div>
      </Grid>
    </Container>
  )
}

export default withStyles(styleValidationForm)(FormValidation)