import dbConnect from '@/lib/db/connectDB.ts'
import User from '@/lib/db/model/user.ts'
const jwt = require('jsonwebtoken')

export const checkValidToken = async (
    req: Request,
    userType?: UserTypes | UserTypes[]
) => {
    const auth = req.headers.get('authorization')
    const token = auth?.split(' ')[1]
    try {
        await dbConnect()
        const { data } = jwt.verify(token, process.env.JWT_SECRET)
        const user = await User.findOne({ email: data.email })
        if (!user) return false
        if (!userType) return user
        if (user.type === userType || userType.includes(user.type)) {
            return user
        } else {
            return false
        }
    } catch (e) {
        console.log(e)
        return false
    }
}
export type UserTypes = 'example' | 'customer' | 'exampleVendor' | 'vendor'
