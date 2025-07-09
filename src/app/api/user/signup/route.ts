import User from '@/lib/db/model/user.ts'
import dbConnect from '@/lib/db/connectDB.ts'
import { failedToCreateUserError, serverError } from '@/app/api/errors.ts'

const gravatar = require('gravatar')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

export async function POST(req: Request, res: Response) {
    try {
        const data = await req.json()
        data.profileIMG = gravatar.url(
            data.email,
            { s: '40', r: 'pg', d: 'retro' },
            true
        )
        data.password = await bcrypt.hash(data.password, 10)
        await dbConnect()
        const user = await User.create(data)
        if (user) {
            const {
                _doc: { password, _id, __v, ...secureUser },
            } = user
            const token = await jwt.sign(
                { data: secureUser },
                process.env.JWT_SECRET,
                { expiresIn: '24h' }
            )
            return new Response(JSON.stringify({ user: secureUser, token }), {
                status: 200,
            })
        } else {
            return failedToCreateUserError()
        }
    } catch (e) {
        console.log(e)
        return serverError()
    }
}
