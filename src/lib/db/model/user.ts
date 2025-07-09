import mongoose from 'mongoose'

export interface User extends mongoose.Document {
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
}

const UserSchema = new mongoose.Schema<User>({
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
    }
})

export default mongoose.models.User || mongoose.model<User>('User', UserSchema)
