export const createHeader = ({
    token = '',
    method = 'POST',
    body = {},
}): RequestInit => {
    return {
        method,
        headers: {
            'Content-Type': 'application/json',
            Authorization: token ? `Bearer ${token}` : '',
        },
        body: method !== 'GET' ? JSON.stringify(body) : undefined,
    }
}

export const callApi = async (url: string, header: RequestInit) => {
    try {
        const res = await fetch(url, header)
        if (res.status === 400 || res.status === 500) {
            const errorRes = await res.json()
            return {
                status: res.status,
                error: errorRes,
            }
        }
        return await res.json().catch(() => res)
    } catch (e: any) {
        return {
            status: e.status,
            error: e.message,
        }
    }
}
export type ApiError = {
    status: number
    error: string
}
