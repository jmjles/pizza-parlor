import { NextResponse, NextRequest } from 'next/server'
import { checkValidToken } from '@/lib/auth/checkValidToken.ts'
import { authError } from '@/app/api/errors.ts'
export async function middleware(request: NextRequest) {
    const excludedPaths = ['/api/store', '/api/ingredients', '/api/menu']
    if (
        excludedPaths.includes(
            request.url.substring(request.url.indexOf('/', 10))
        )
    ) {
        if (request.method === 'GET') return NextResponse.next()
    }
    if (await checkValidToken(request)) return NextResponse.next()
    return authError()
}

export const config = {
    runtime: 'nodejs',
    matcher: [
        { source: '/api/user/auth' },
        { source: '/api/store' },
        { source: '/api/ingredients' },
        { source: '/api/menu' },
        { source: '/api/menu/category' },
        { source: '/api/order' },
        { source: '/api/user' },
    ],
}
