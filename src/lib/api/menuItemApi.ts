import { callApi, createHeader } from '@/lib/api/utils.ts'
import { MenuItemTypes } from '@/store/initialState.ts'

const menuItemURL = '/api/menu'

export default {
    createMenuItem: async (menuItem: Omit<MenuItemTypes, '_id'>) => {
        const token = localStorage.getItem('token') || ''
        return await callApi(
            menuItemURL,
            createHeader({ token, method: 'POST', body: { fields: menuItem } })
        )
    },
    updateMenuItem: async (menuItem: MenuItemTypes) => {
        const token = localStorage.getItem('token') || ''
        return await callApi(
            menuItemURL,
            createHeader({ token, method: 'PUT', body: { fields: menuItem } })
        )
    },
    removeMenuItem: async (menuItemId: string) => {
        const token = localStorage.getItem('token') || ''
        return await callApi(
            menuItemURL,
            createHeader({
                token,
                method: 'DELETE',
                body: { fields: { _id: menuItemId } },
            })
        )
    },
    getMenuItems: async () => {
        const token = localStorage.getItem('token') || ''
        return await callApi(
            menuItemURL,
            createHeader({ token, method: 'GET' })
        )
    },
}
