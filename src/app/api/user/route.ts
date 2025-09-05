import { CallQuery } from '@/app/api/utils.ts'
import User from '@/lib/db/model/user.ts'

export async function PUT(req: Request) {
    return await new CallQuery(req, User).update()
}

export async function DELETE(req: Request) {
    return await new CallQuery(req, User).delete()
}
