import { CallQuery } from '@/app/api/utils.ts'
import MenuCategory from '@/lib/db/model/menuCategory.ts'

export async function POST(req: Request) {
    return await new CallQuery(req, MenuCategory).setVendorOnly().create()
}
export async function GET(req: Request) {
    return await new CallQuery(req, MenuCategory).setVendorOnly().readAll()
}

export async function DELETE(req: Request) {
    return await new CallQuery(req, MenuCategory).setVendorOnly().delete()
}

export async function PUT(req: Request) {
    return await new CallQuery(req, MenuCategory).setVendorOnly().update()
}
