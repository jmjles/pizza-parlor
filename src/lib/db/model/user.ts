import mongoose from 'mongoose'
import { OrderType } from '@/lib/db/model/order.ts'
import { ItemType } from '@/lib/classes/Item.ts'

export interface UserType extends ItemType {
    firstName: string
    lastName: string
    email: string
    address: string
    city: string
    zipcode: string
    state: string
    profileIMG: string
    type: string
    password: string
    orders: OrderType[]
}

const UserSchema = new mongoose.Schema<UserType>({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    address: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    zipcode: {
        type: String,
        required: true,
    },
    state: {
        type: String,
        required: true,
    },
    profileIMG: {
        type: String,
        default: '',
    },
    type: {
        type: String,
        default: 'customer',
    },
    password: {
        type: String,
        required: true,
    },
})

export default mongoose.models.User ||
    mongoose.model<UserType>('User', UserSchema)
