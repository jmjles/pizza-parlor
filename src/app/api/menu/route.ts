import { CallQuery } from '@/app/api/utils.ts'
import MenuItem from '@/lib/db/model/menuItem.ts'
import Ingredient from '@/lib/db/model/ingredient.ts'
import MenuCategory from '@/lib/db/model/menuCategory.ts'

export async function POST(req: Request, res: Response) {
    return await new CallQuery(req, MenuItem).setVendorOnly().create()
}
export async function GET(req: Request, res: Response) {
    Ingredient
    MenuCategory
    return await new CallQuery(req, MenuItem)
        .setPopulate([
            { path: 'ingredients' },
            { path: 'sauce' },
            { path: 'category', strictPopulate: false, model: MenuCategory },
        ])
        .readAll()
}

export async function DELETE(req: Request, res: Response) {
    return await new CallQuery(req, MenuItem).setVendorOnly().delete()
}

export async function PUT(req: Request, res: Response) {
    return await new CallQuery(req, MenuItem).setVendorOnly().update()
}
