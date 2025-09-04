import { MenuItemTypes } from '@/store/initialState.ts'
import { FixedMenuItem } from '@/lib/classes/FixedMenuItem.ts'
import PizzaMenuItem from '@/lib/classes/PizzaMenuItem.ts'
import { Ingredient } from '@/lib/classes/Ingredient.ts'

export const isNumber = (num: string): boolean =>
    Number.isFinite(Number(num.replaceAll('$', '')))

export const toNumber = (num: any) => parseFloat(num.replaceAll('$', '') || '')

export const isFixedMenuItem = (
    item: FixedMenuItem | PizzaMenuItem
): item is FixedMenuItem => {
    return (item as FixedMenuItem).unit !== undefined
}

export const isIngredient = (item: any): item is Ingredient => {
    return (
        (item as Ingredient)?.name !== undefined && item?.variant === undefined
    )
}
