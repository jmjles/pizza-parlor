import { CallQuery } from '@/app/api/utils.ts'
import Order from '@/lib/db/model/order.ts'
import Store from '@/lib/db/model/store.ts'
import menuItem from '@/lib/db/model/menuItem.ts'

export async function POST(req: Request) {
    Store
    menuItem
    return await new CallQuery(req, Order)
        .setPopulate([
            {
                path: 'items',
                populate: [{ path: 'menuItem' }],
            },
            { path: 'store' },
        ])
        .allFromUser()
}
