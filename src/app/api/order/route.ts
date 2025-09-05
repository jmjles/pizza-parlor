import { CallQuery } from '@/app/api/utils.ts'
import Order from '@/lib/db/model/order.ts'
import MenuItem from '@/lib/db/model/menuItem.ts'
import Store from '@/lib/db/model/store.ts'

export async function POST(req: Request) {
    return await new CallQuery(req, Order).create()
}

export async function GET(req: Request) {
    MenuItem
    Store
    return await new CallQuery(req, Order)
        .setPopulate([
            {
                path: 'items',
                populate: [{ path: 'menuItem' }],
            },
            { path: 'store' },
            { path: 'customer' },
        ])
        .readAll()
}

export async function DELETE(req: Request) {
    return await new CallQuery(req, Order).setVendorOnly().delete()
}

export async function PUT(req: Request) {
    return await new CallQuery(req, Order).setVendorOnly().update()
}
