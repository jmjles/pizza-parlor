import { StoreType } from '@/lib/db/model/store.ts'
import { ApiError, callApi, createHeader } from '@/lib/api/utils.ts'

const storeURL = '/api/store'

export const storeApi = {
    getStores: async () => {
        return callApi(storeURL, createHeader({ method: 'GET' }))
    },
    createStore: async (store: StoreType) => {
        const token = localStorage.getItem('token') || ''
        return await callApi(
            storeURL,
            createHeader({
                token: token,
                method: 'POST',
                body: { fields: store },
            })
        )
    },
    editStore: async (store: StoreType) => {
        const token = localStorage.getItem('token') || ''
        return await callApi(
            storeURL,
            createHeader({
                token: token,
                method: 'PUT',
                body: { fields: store },
            })
        )
    },
    deleteStore: async (id: string) => {
        const token = localStorage.getItem('token') || ''
        return await callApi(
            storeURL,
            createHeader({ token: token, method: 'DELETE', body: { id } })
        )
    },
}
