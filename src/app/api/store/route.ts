import Store from '@/lib/db/model/store.ts'
import { CallQuery } from '@/app/api/utils.ts'
import menuItem from '@/lib/db/model/menuItem.ts'

export async function POST(req: Request, res: Response) {
    return await new CallQuery(req, Store).setVendorOnly().create()
}
export async function GET(req: Request, res: Response) {
    menuItem
    return await new CallQuery(req, Store)
        .setPopulate([{ path: 'menu', populate: [{ path: 'items' }] }])
        .readAll()
}

export async function DELETE(req: Request, res: Response) {
    return await new CallQuery(req, Store).setVendorOnly().delete()
}

export async function PUT(req: Request, res: Response) {
    return await new CallQuery(req, Store).setVendorOnly().update()
}
