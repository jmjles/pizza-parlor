import mongoose from 'mongoose'

import { ItemType } from '@/lib/classes/Item.ts'
import { MenuItemTypes } from '@/store/initialState.ts'

export interface MenuCategoryType extends ItemType {
    name: string
    variant: string
    items: MenuItemTypes[]
}

const MenuCategorySchema = new mongoose.Schema<MenuCategoryType>({
    name: {
        type: String,
        required: true,
    },
    variant: {
        type: String,
        default: 'default',
    },
    items: {
        type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'MenuItem' }],
    },
})

export default mongoose.models.MenuCategory ||
    mongoose.model<MenuCategoryType>('MenuCategory', MenuCategorySchema)
