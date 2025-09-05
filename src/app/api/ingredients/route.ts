import Ingredient from '@/lib/db/model/ingredient.ts'
import { CallQuery } from '@/app/api/utils.ts'

export async function POST(req: Request) {
    return await new CallQuery(req, Ingredient).create()
}
export async function GET(req: Request) {
    return await new CallQuery(req, Ingredient).readAll()
}

export async function DELETE(req: Request) {
    return await new CallQuery(req, Ingredient).setVendorOnly().delete()
}

export async function PUT(req: Request) {
    return await new CallQuery(req, Ingredient).setVendorOnly().update()
}
