import { UserType } from '@/lib/db/model/user.ts'
import { StoreType } from '@/lib/db/model/store.ts'
import { MenuCategoryType } from '@/lib/db/model/menuCategory.ts'
import { OrderItemsType, OrderType } from '@/lib/db/model/order.ts'
import {
    FixedMenuItem,
    FixedMenuItemType,
} from '@/lib/classes/FixedMenuItem.ts'
import PizzaMenuItem, {
    PizzaMenuItemType,
} from '@/lib/classes/PizzaMenuItem.ts'
import { IngredientType } from '@/lib/classes/Ingredient.ts'

export const userInitialState: UserInitialStateType = {
    _id: '',
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    city: '',
    zipcode: '',
    state: '',
    profileIMG: '',
    type: '',
    orders: [],
}

export type UserInitialStateType = Omit<UserType, 'password'>

export const storeInitialState: StoreInitialState = {
    store: {
        _id: '',
        menu: [],
        city: '',
        orders: [],
        image: '',
        zipcode: '',
        streetAddress: '',
        waitTime: '',
        state: '',
    },
    stores: [],
    refreshStores: 0,
}
export type StoreInitialState = {
    store: StoreType
    stores: StoreType[]
    refreshStores: number
}

export const ingredientInitialState: IngredientInitialStateType = {
    ingredients: [],
    ingredient: {
        name: '',
        category: '',
        IngredientOptions: [],
        _id: '',
        icon: '',
    },
    refreshIngredients: 0,
}
export type IngredientInitialStateType = {
    ingredients: IngredientType[]
    ingredient: IngredientType
    refreshIngredients: number
}

export const menuItemInitialState: MenuItemInitialStateType = {
    menuItem: {
        image: '',
        description: '',
        title: '',
        _id: '',
        sizes: [],
        amount: false,
        amountLimit: 0,
        ingredients: [],
        sauce: ingredientInitialState.ingredient,
        unit: {
            label: '',
            price: '',
            usd: 0,
        },
    },
    category: {
        name: '',
        _id: '',
        items: [],
        variant: '',
    },
    menuItems: [],
    size: 0,
    refreshMenuItems: 0,
}

export type MenuItemTypes = FixedMenuItemType | PizzaMenuItemType

export type MenuItems = FixedMenuItem | PizzaMenuItem

export type MenuItemInitialStateType = {
    menuItem: MenuItemTypes
    menuItems: MenuItemTypes[]
    category: MenuCategoryType
    size: number
    refreshMenuItems: number
}

export type CartInitialStateType = {
    cart: OrderItemsType[]
}

export const cartInitialState: CartInitialStateType = {
    cart: [],
}

type OrderInitialStateType = {
    order: OrderType
    loading: boolean
    orders: OrderType[]
}

export const orderInitialState: OrderInitialStateType = {
    order: {
        _id: '',
        code: '',
        items: [],
        tax: '',
        status: '',
        store: storeInitialState['store'],
        customer: userInitialState,
        tip: '',
        statusDescription: '',
        total: '',
        subtotal: '',
    },
    orders: [],
    loading: false,
}
