import mongoose from 'mongoose'
import { IngredientType } from '@/lib/classes/Ingredient.ts'

const IngredientSchema = new mongoose.Schema<IngredientType>({
    name: {
        type: String,
        required: true,
    },
    icon: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    IngredientOptions: {
        required: true,
        type: [
            {
                quantity: String,
                price: Number,
            },
        ],
    },
})

export default mongoose.models.Ingredient ||
    mongoose.model<IngredientType>('Ingredient', IngredientSchema)
