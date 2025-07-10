import { NextResponse, NextRequest } from 'next/server'
import dbConnect from '@/lib/db/connectDB.ts'
import User from '@/lib/db/model/user.ts'
var jwt = require('jsonwebtoken')
export async function middleware(request: NextRequest) {
    const excludedPaths = ['/api/store']
    if (
        excludedPaths.includes(
            request.url.substring(request.url.indexOf('/', 10))
        )
    ) {
        if (request.method === 'GET') return NextResponse.next()
    }
    const auth = request.headers.get('authorization')
    const token = auth?.split(' ')[1]
    try {
        await dbConnect()
        const { data } = jwt.verify(token, process.env.JWT_SECRET)
        const user = await User.findOne({ email: data.email })
        if (user) {
            return NextResponse.next()
        } else {
            return NextResponse.json({
                status: 400,
                error: 'Invalid credentials',
            })
        }
    } catch (e) {
        console.log(e)
        return NextResponse.json({ status: 500, error: 'Server Error' })
    }
}

export const config = {
    runtime: 'nodejs',
    matcher: [{ source: '/api/user/auth' }, { source: '/api/store' }],
}
