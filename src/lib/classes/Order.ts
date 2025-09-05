import { MenuItemType } from '@/lib/classes/MenuItem.ts'
import Item, { ItemType } from '@/lib/classes/Item.ts'
import { StoreType } from '@/lib/db/model/store.ts'
import {
    storeInitialState,
    userInitialState,
    UserInitialStateType,
} from '@/store/initialState.ts'

export class Order extends Item {
    code = ''
    status = ''
    statusDescription = ''
    store: StoreType = storeInitialState.store
    customer: UserInitialStateType = userInitialState
    items: OrderItemsType[] = []
    tax = ''
    subtotal = ''
    tip = ''
    total = ''
    constructor({
        _id,
        code,
        items,
        status,
        statusDescription,
        tip,
        customer,
        store,
        tax,
        subtotal,
        total,
    }: OrderType) {
        super({ _id })
        this.code = code
        this.status = status
        this.statusDescription = statusDescription
        this.store = store
        this.customer = customer
        this.items = items
        this.tip = tip
        this.total = total
        this.tax = tax
        this.subtotal = subtotal
    }

    data(): OrderType {
        return {
            ...super.data(),
            code: this.code,
            status: this.status,
            statusDescription: this.statusDescription,
            store: this.store,
            customer: this.customer,
            items: this.items,
            tip: this.tip,
            total: this.total,
            tax: this.tax,
            subtotal: this.subtotal,
        }
    }
}

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
