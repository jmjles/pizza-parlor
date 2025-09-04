import { callApi, createHeader } from '@/lib/api/utils.ts'
import { OrderItemsType, OrderType } from '@/lib/db/model/order.ts'

const orderURL = '/api/order'

export default {
    createOrder: async (
        order: Omit<OrderType, '_id' | 'customer' | 'store' | 'items'> & {
            customer: string
            store: string
            items: (Omit<OrderItemsType, 'menuItem'> & { menuItem: string })[]
        }
    ) => {
        const token = localStorage.getItem('token') || ''
        return await callApi(
            orderURL,
            createHeader({ token, method: 'POST', body: { fields: order } })
        )
    },
    updateOrder: async (
        order: Omit<OrderType, 'customer'> & { customer: string }
    ) => {
        const token = localStorage.getItem('token') || ''
        return await callApi(
            orderURL,
            createHeader({ token, method: 'PUT', body: { fields: order } })
        )
    },
    removeOrder: async (id: string) => {
        const token = localStorage.getItem('token') || ''
        return await callApi(
            orderURL,
            createHeader({ token, method: 'DELETE', body: { id } })
        )
    },
    getOrders: async () => {
        const token = localStorage.getItem('token') || ''
        return await callApi(orderURL, createHeader({ token, method: 'GET' }))
    },
}
