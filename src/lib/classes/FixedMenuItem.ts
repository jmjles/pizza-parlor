import { MenuItem, MenuItemType } from '@/lib/classes/MenuItem.ts'

export class FixedMenuItem extends MenuItem {
    unit: MenuUnitType = { label: '', price: '', usd: 0.0 }
    static requiredFields = [...super.requiredFields, 'unit']
    constructor({
        _id,
        unit,
        ingredients,
        amount,
        amountLimit,
        sizes,
        description,
        title,
        image,
    }: FixedMenuItemType) {
        super({
            _id,
            image,
            ingredients,
            sizes,
            amountLimit,
            title,
            description,
            amount,
        })
        this.unit = unit
    }
    data(): FixedMenuItemType {
        return { ...super.data(), unit: this.unit }
    }
}

export interface FixedMenuItemType extends MenuItemType {
    unit: MenuUnitType
}

export type MenuUnitType = {
    label: string
    price: string
    usd: number
}
