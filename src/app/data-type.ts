export interface signUp {

    name:string,
    password:string,
    email:string
}

export interface Login {
    password:string,
    email:string
}

export interface product{
  name:string,
  price:number,
  category:string,
  color:string,
  image:string,
  description:string,
  id:number
  quantity:undefined | number,
  productId:undefined|number
}

export interface cart{
  name:string,
  price:number,
  category:string,
  color:string,
  image:string,
  description:string,
  id?:number| undefined,
  quantity:undefined | number,
  productId:number,
  userId:number
}

export interface priceSummary{
  price:number,
  discount:number,
  tax:number,
  delivery:number,
  total:number
}
export interface orders {
  email:string,
  address:string,
  contact:string,
  totalprice:number,
  userId:string,
  id:number|undefined
}