import {IUseValidationForm} from '../validation/validator'

export  type  IBasicModel  = {
}

export interface IAddressModel extends  IBasicModel{
  street : string,
  zip : number,
  city : string,
  state ?: string
}
export interface IContactInfoModel  extends  IBasicModel{
  phone ?: string,
  email ? : string
}
export interface  IPersonModel extends  IBasicModel{
  firstName : string,
  lastName : string,
  contact ? : IContactInfoModel
}

export interface ICompanyModel {
  name : string,
  tin : string,
  address : IAddressModel,
  person ? : IPersonModel
}

export interface  IFieldInputBasicProps<T> {
  useValidation : IUseValidationForm<T>
  modelFieldBasicString ? : string
}