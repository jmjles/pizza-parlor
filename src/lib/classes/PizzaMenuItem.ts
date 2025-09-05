import { MenuItem, MenuItemType } from '@/lib/classes/MenuItem.ts'
import { Ingredient, IngredientType } from '@/lib/classes/Ingredient.ts'

export default class PizzaMenuItem extends MenuItem {
    sauce
    static requiredFields: string[] = [...super.requiredFields, 'sauce']
    constructor({
        _id,
        title,
        description,
        amount,
        amountLimit,
        ingredients,
        sauce,
        image,
        sizes,
    }: PizzaMenuItemType) {
        super({
            _id,
            title,
            description,
            amount,
            amountLimit,
            sizes,
            ingredients,
            image,
        })
        this.sauce = sauce
    }

    data(): PizzaMenuItemType {
        return { ...super.data(), sauce: this.sauce }
    }
}

export interface PizzaMenuItemType extends MenuItemType {
    sauce: IngredientType
}
