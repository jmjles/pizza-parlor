import { ApiError, callApi, createHeader } from '@/lib/api/utils.ts'
import { UserType } from '@/lib/db/model/user.ts'
import { StoreType } from '@/lib/db/model/store.ts'

const userApi = '/api/user'
export default {
    login: async (email: string, password: string, remember = false) => {
        return await callApi(
            `${userApi}/login`,
            createHeader({
                token: '',
                method: 'POST',
                body: { email, password, remember },
            })
        )
    },
    signup: async (
        user: Omit<UserType, '_id' | 'type' | 'profileIMG' | 'orders'>
    ) => {
        return await callApi(
            `${userApi}/signup`,
            createHeader({
                method: 'POST',
                body: user,
            })
        )
    },
    getUserOrders: (_id: string) => {
        return callApi(
            `${userApi}/orders`,
            createHeader({
                token: localStorage.getItem('token') || '',
                method: 'POST',
                body: { fields: { _id } },
            })
        )
    },
    updateUser: async (
        user: Omit<UserType, 'password'> & { password?: string }
    ) => {
        const token = localStorage.getItem('token') || ''
        return await callApi(
            userApi,
            createHeader({
                token: token,
                method: 'PUT',
                body: { fields: user },
            })
        )
    },
    deleteUser: async (_id: string) => {
        const token = localStorage.getItem('token') || ''
        return await callApi(
            userApi,
            createHeader({
                token: token,
                method: 'DELETE',
                body: { fields: { _id } },
            })
        )
    },
}
