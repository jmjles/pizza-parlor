import User from '@/lib/db/model/user.ts'
import dbConnect from '@/lib/db/connectDB.ts'
import { serverError, wrongCredentialsError } from '@/app/api/errors.ts'
const jwt = require('jsonwebtoken')

export async function GET(req: Request) {
    try {
        const token = await req.headers.get('Authorization')?.split(' ')[1]
        await dbConnect()
        const { data } = jwt.verify(token, process.env.JWT_SECRET)
        const user = await User.findOne({ email: data.email })
        if (user) {
            return new Response(JSON.stringify(data), { status: 200 })
        } else {
            return wrongCredentialsError()
        }
    } catch (e) {
        console.log(e)
        return serverError()
    }
}
