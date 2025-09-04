import mongoose from 'mongoose'
import { MenuItemTypes } from '@/store/initialState.ts'

const MenuItemSchema = new mongoose.Schema<MenuItemTypes>({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    unit: {
        type: {
            label: {
                type: String,
                required: true,
            },
            price: {
                required: true,
                type: String,
            },
            usd: {
                required: true,
                type: Number,
            },
        },
        required: false,
    },
    amount: {
        required: true,
        type: Boolean,
    },
    amountLimit: {
        required: true,
        type: Number,
    },
    sauce: {
        required: false,
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Ingredient',
    },
    sizes: {
        type: [
            {
                title: {
                    type: String,
                    required: true,
                },
                iconSize: {
                    type: String,
                    required: true,
                },
                icon: {
                    type: String,
                    required: true,
                },
                price: {
                    type: String,
                    required: true,
                },
                usd: {
                    type: Number,
                    required: true,
                },
            },
        ],
    },
    ingredients: {
        type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Ingredient' }],
        required: false,
    },
})

export default mongoose.models.MenuItem ||
    mongoose.model<MenuItemTypes>('MenuItem', MenuItemSchema)
