
export interface IAddressModel {
  street : string,
  zip : number,
  city : string
}
export interface IContactModel {
  phone : string,
  email : string
}
export interface  IPersonModel {
  firstName : string,
  lastName : string,
  age ?: number,
  contact : IContactModel
}

export interface ICompanyModel {
  name : string,
  tin : string,
  address : IAddressModel,
  contactPerson : IPersonModel
}
