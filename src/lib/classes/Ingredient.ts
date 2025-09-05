import Item, { ItemType } from '@/lib/classes/Item.ts'

export class Ingredient extends Item {
    name = ''
    icon = ''
    category = ''
    IngredientOptions: IngredientOption[] = []

    static requiredFields: string[] = [
        ...super.requiredFields,
        'name',
        'icon',
        'category',
        'IngredientOptions',
    ]

    constructor({
        _id,
        name,
        icon,
        IngredientOptions,
        category,
    }: IngredientType) {
        super({ _id })
        this.name = name
        this.icon = icon
        this.category = category
        this.IngredientOptions = IngredientOptions
    }

    data(): IngredientType {
        return {
            ...super.data(),
            name: this.name,
            icon: this.icon,
            IngredientOptions: this.IngredientOptions,
            category: this.category,
        }
    }
}

export interface IngredientType extends ItemType {
    name: string
    icon: string
    category: string
    IngredientOptions: IngredientOption[]
}

export type IngredientOption = {
    quantity: string
    price: number
}
