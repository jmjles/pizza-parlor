import { UserType } from '@/lib/db/model/user.ts'
import { ApiError, callApi, createHeader } from '@/lib/api/utils.ts'

const authUrl = '/api/user/auth'
export default {
    verifyToken: async (): Promise<UserType | ApiError> => {
        const token = localStorage.getItem('token') || ''
        return await callApi(authUrl, createHeader({ token, method: 'GET' }))
    },
    verifyPassword: async (password: string): Promise<void | ApiError> => {
        const token = localStorage.getItem('token') || ''
        return await callApi(
            authUrl,
            createHeader({
                token: token,
                method: 'POST',
                body: { password },
            })
        )
    },
}
