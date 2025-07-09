import User from '@/lib/db/model/user.ts'
import dbConnect from '@/lib/db/connectDB.ts'
import { serverError, wrongCredentialsError } from '@/app/api/errors.ts'
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
export async function POST(req: Request, res: Response) {
    try {
        const { email, password, remember } = await req.json()
        await dbConnect()
        const user = await User.findOne({ email })
        if (user) {
            if (await bcrypt.compare(password, user.password)) {
                const {
                    _doc: { password, _id, __v, ...secureUser },
                } = user
                const token = await jwt.sign(
                    { data: secureUser },
                    process.env.JWT_SECRET,
                    { expiresIn: remember ? '30d' : '24h' }
                )
                return new Response(
                    JSON.stringify({ user: secureUser, token }),
                    { status: 200 }
                )
            }
            return wrongCredentialsError()
        } else {
            return wrongCredentialsError()
        }
    } catch (e) {
        return serverError()
    }
}
