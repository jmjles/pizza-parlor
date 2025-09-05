import mongoose from 'mongoose'

const OrderCounterSchema = new mongoose.Schema({
    date: {
        type: String,
        required: true,
        unique: true,
    },
    count: {
        type: Number,
        default: 0,
    },
})

export const OrderCounter = mongoose.model('OrderCounter', OrderCounterSchema)
