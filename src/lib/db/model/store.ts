import mongoose from 'mongoose'
import { MenuCategoryType } from '@/lib/db/model/menuCategory.ts'
import { OrderType } from '@/lib/db/model/order.ts'
import { ItemType } from '@/lib/classes/Item.ts'
import { ObjectId } from 'bson'

export interface StoreType extends ItemType {
    city: string
    state: string
    streetAddress: string
    zipcode: string
    waitTime: string
    image: string
    menu: MenuCategoryType[]
    orders: OrderType[]
}
type Store = Omit<StoreType, 'menu'> & { menu: ObjectId[] }
const StoreSchema = new mongoose.Schema<Store>({
    city: {
        type: String,
        required: true,
    },
    state: {
        type: String,
        required: true,
    },
    streetAddress: {
        type: String,
        required: true,
        unique: true,
    },
    zipcode: {
        type: String,
        required: true,
    },
    waitTime: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    menu: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'MenuCategory',
    },
})

export default mongoose.models.Store ||
    mongoose.model<Store>('Store', StoreSchema)
