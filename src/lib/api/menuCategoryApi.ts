import { callApi, createHeader } from '@/lib/api/utils.ts'
import { MenuCategoryType } from '@/lib/db/model/menuCategory.ts'
const menuCategoryUrl = '/api/menu/category'

export default {
    createMenuCategory: async (menuCategory: Omit<MenuCategoryType, '_id'>) => {
        const token = localStorage.getItem('token') || ''
        return await callApi(
            menuCategoryUrl,
            createHeader({
                token,
                method: 'Post',
                body: { fields: menuCategory },
            })
        )
    },
    updateMenuCategory: async (
        menuCategory: Omit<MenuCategoryType, 'items'> & { items: string[] }
    ) => {
        const token = localStorage.getItem('token') || ''
        return await callApi(
            menuCategoryUrl,
            createHeader({
                token,
                method: 'PUT',
                body: { fields: menuCategory },
            })
        )
    },
    removeMenuCategory: async (_id: string) => {
        const token = localStorage.getItem('token') || ''
        return await callApi(
            menuCategoryUrl,
            createHeader({ token, method: 'DELETE', body: { fields: { _id } } })
        )
    },
    getMenuCategories: async () => {
        const token = localStorage.getItem('token') || ''
        return await callApi(
            menuCategoryUrl,
            createHeader({ token, method: 'GET' })
        )
    },
}
