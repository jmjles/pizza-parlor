import mongoose from 'mongoose'
import { StoreType } from '@/lib/db/model/store.ts'
import { UserType } from '@/lib/db/model/user.ts'
import { OrderCounter } from '@/lib/db/model/orderCounter.ts'
import { MenuItemType } from '@/lib/classes/MenuItem.ts'
import { ItemType } from '@/lib/classes/Item.ts'
import { UserInitialStateType } from '@/store/initialState.ts'

export type ItemModificationType = {
    price: string
    description: string
    ingredientId: string
}

export type OrderItemsType = {
    menuItem: MenuItemType
    modifications: ItemModificationType[]
    quantity: number
    price: string
}

export interface OrderType extends ItemType {
    code: string
    status: string
    statusDescription: string
    store: StoreType
    customer: UserInitialStateType
    items: OrderItemsType[]
    tax: string
    subtotal: string
    tip: string
    total: string
}

const OrderSchema = new mongoose.Schema<OrderType>({
    code: {
        type: String,
        required: true,
    },
    store: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Store',
    },
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    status: {
        type: String,
        required: true,
    },
    statusDescription: {
        type: String,
        required: true,
    },
    items: [
        {
            menuItem: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'MenuItem',
                required: true,
            },
            modifications: [
                {
                    price: {
                        type: String,
                        required: true,
                    },
                    description: {
                        type: String,
                        required: true,
                    },
                },
            ],
            quantity: {
                type: Number,
                required: true,
            },
            price: {
                type: String,
                required: true,
            },
        },
    ],
    tax: {
        type: String,
        required: true,
    },
    subtotal: {
        type: String,
        required: true,
    },
    tip: {
        type: String,
        required: true,
    },
    total: {
        type: String,
        required: true,
    },
})

OrderSchema.pre('validate', async function (next) {
    const order = this as any

    if (!order.code) {
        const today = new Date().toISOString().slice(0, 10)

        const counter = await OrderCounter.findOneAndUpdate(
            { date: today },
            { $inc: { count: 1 } },
            { new: true, upsert: true }
        )
        order.code = String(counter.count).padStart(3, '0')
    }
    next()
})

export default mongoose.models.Order ||
    mongoose.model<OrderType>('Order', OrderSchema)
