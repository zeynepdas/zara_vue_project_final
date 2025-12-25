export interface IProduct {
  id: string
  title: string
  price: string | number
  description: string
  category: string
  image: string
  selectedSize?: string
  rating?: {
    rate: number
    count: number
  }
}

export interface ICartItem extends IProduct {
  quantity: number
}

export interface IUser {
  uid: string
  email: string | null
  displayName: string | null
}

export interface ICategory {
  id: string
  name: string
  slug: string
}

export interface IMessage {
  id?: string
  email: string
  subject: string
  message: string
  createdAt: string
}
