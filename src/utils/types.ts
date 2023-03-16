export interface IIngredient {
   "_id": string
   "name": string
   "type": 'bun' | 'main' | 'sauce'
   "proteins": number
   "fat": number
   "carbohydrates": number
   "calories": number
   "price": number
   "image": string
   "image_mobile": string
   "image_large": string
   "__v": number
   index?: number
   item_id?: number
}

export interface IUser {
   email: string
   name: string
   password: string
   token?: string
}

export type TStoreUser = {
   email: string
   name: string
}

export interface ILoginForm {
   login: string
   password: string
}

export interface IResponseUser {
   success: boolean
   user: TStoreUser
}

export interface IResponseToken {
   success: boolean
   accessToken: string
   refreshToken: string
}

export type TRequestLogin = IResponseUser & IResponseToken

export interface IResponseAuth {
   success: boolean
   message: string
}

export interface IResponseRegister {
   success: boolean
   user: TStoreUser
   accessToken: string
   refreshToken: string
}

export interface IResetForm {
   password: string
   token: string
}

export interface IEmailForm {
   email?: string
}

export interface TOrderIdRequest {
   success: boolean
   name: string,
   order: {
      ingredients: IIngredient[]
      _id: string
      owner: {
         name: string
         email: string
         createdAt: string
         updatedAt: string
      }
      status: string
      name: string
      createdAt: string
      updatedAt: string
      number: string
      price: string
   }
}

export type TOrder = {
   _id: string,
   ingredients: Array<IIngredient>,
   status: 'created' | 'pending' | 'done',
   name: string,
   createdAt: string,
   updatedAt: string,
   number: number,
}

export type TWsData = {
   success: boolean,
   total: number,
   totalToday: number,
   orders: Array<TOrder>
}
