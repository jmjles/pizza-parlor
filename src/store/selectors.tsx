import { RootState } from '@/store/index.tsx'
import { Ingredient } from '@/lib/classes/Ingredient.ts'
import { createSelector } from 'reselect'
import {
    FixedMenuItem,
    FixedMenuItemType,
} from '@/lib/classes/FixedMenuItem.ts'
import PizzaMenuItem from '@/lib/classes/PizzaMenuItem.ts'
import { Order } from '@/lib/classes/Order.ts'

export const selectModal = (state: RootState) => state.modals

export const selectStore = (state: RootState) => state.store

const _selectItem = (state: RootState) => state.item

export const selectItem = createSelector(_selectItem, (state) => {
    const { menuItem, size, menuItems, refreshMenuItems, category } = state

    return {
        menuItem: FixedMenuItem.verifyData(
            menuItem,
            FixedMenuItem.requiredFields
        )
            ? new FixedMenuItem(menuItem as FixedMenuItemType)
            : new PizzaMenuItem(menuItem as PizzaMenuItem),
        size,
        menuItems: menuItems.map((m) =>
            FixedMenuItem.verifyData(m, FixedMenuItem.requiredFields)
                ? new FixedMenuItem(m as FixedMenuItemType)
                : new PizzaMenuItem(m as PizzaMenuItem)
        ),
        refreshMenuItems,
        category,
    }
})

export const selectCart = (state: RootState) => state.cart

export const selectUser = (state: RootState) => state.user

const _selectIngredient = (state: RootState) => state.ingredient

export const selectIngredient = createSelector(_selectIngredient, (state) => {
    const { ingredient, ingredients, refreshIngredients } = state
    return {
        ingredient: new Ingredient(ingredient),
        ingredients: ingredients.map((i) => new Ingredient(i)),
        refreshIngredients,
    }
})

const _selectOrder = (state: RootState) => state.order
export const selectOrder = createSelector(_selectOrder, (state) => {
    const { orders, order, loading } = state
    return {
        order: new Order(order),
        orders: orders.map((o) => new Order(o)),
        loading,
    }
})

export const selectLoading = (state: RootState) => state.loading
