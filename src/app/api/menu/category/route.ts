import { CallQuery } from '@/app/api/utils.ts'
import MenuCategory from '@/lib/db/model/menuCategory.ts'

export async function POST(req: Request, res: Response) {
    return await new CallQuery(req, MenuCategory).setVendorOnly().create()
}
export async function GET(req: Request, res: Response) {
    return await new CallQuery(req, MenuCategory).setVendorOnly().readAll()
}

export async function DELETE(req: Request, res: Response) {
    return await new CallQuery(req, MenuCategory).setVendorOnly().delete()
}

export async function PUT(req: Request, res: Response) {
    return await new CallQuery(req, MenuCategory).setVendorOnly().update()
}
