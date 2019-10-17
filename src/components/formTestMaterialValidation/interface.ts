import {IUseValidationForm} from '../../validation/validator'

export interface IWithStyles {
  classes ? : any
}

export  interface IComponentUseValidationProps<T> extends IWithStyles{
  useValidation : IUseValidationForm<T>
}

export interface IContextValidationProps<T> extends  IWithStyles{
  fieldParentName ? : string,
  useValidation : IUseValidationForm<T>

}