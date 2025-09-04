import Item, { ItemType } from '@/lib/classes/Item.ts'
import { IngredientType } from '@/lib/classes/Ingredient.ts'
import { IconNameType } from '@/components/Icon/Icon.tsx'

export class MenuItem extends Item {
    title = ''
    description = ''
    ingredients: IngredientType[] = []
    image: string = ''
    amount: boolean = false
    amountLimit: number = 0
    sizes: MenuSizeButtonType[] = []

    static requiredFields: string[] = [
        ...super.requiredFields,
        'title',
        'description',
        'ingredients',
        'image',
        'amount',
        'amountLimit',
        'sizes',
    ]

    constructor({
        _id,
        title,
        description,
        amountLimit,
        amount,
        ingredients,
        sizes,
        image,
    }: MenuItemType) {
        super({ _id })
        this.title = title
        this.description = description
        this.amountLimit = amountLimit
        this.amount = amount
        this.ingredients = ingredients
        this.image = image
        this.sizes = sizes
    }

    data(): MenuItemType {
        return {
            ...super.data(),
            title: this.title,
            description: this.description,
            image: this.image,
            amount: this.amount,
            amountLimit: this.amountLimit,
            ingredients: this.ingredients,
            sizes: this.sizes,
        }
    }
}

export interface MenuItemType extends ItemType {
    title: string
    description: string
    image: string
    sizes: MenuSizeButtonType[]
    amount: boolean
    amountLimit: number
    ingredients: IngredientType[]
}

export type MenuSizeButtonType = {
    title: string
    iconSize: 'small' | 'medium' | 'large'
    icon: IconNameType
    price: string
    usd: number
}
