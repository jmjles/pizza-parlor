import User from '@/lib/db/model/user.ts'
import dbConnect from '@/lib/db/connectDB.ts'
import { serverError, wrongCredentialsError } from '@/app/api/errors.ts'
const bcrypt = require('bcrypt')

export async function POST(req: Request, res: Response) {
    try {
        const { email, password } = await req.json()
        await dbConnect()
        const user = await User.findOne({ email })
        if (user) {
            if (await bcrypt.compare(password, user.password))
                return new Response(null, { status: 200 })

            return wrongCredentialsError()
        } else {
            return wrongCredentialsError()
        }
    } catch (e) {
        return serverError()
    }
}
