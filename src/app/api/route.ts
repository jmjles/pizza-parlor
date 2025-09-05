import { serverError } from '@/app/api/errors.ts'

export async function GET(req: Request) {
    try {
        return new Response('Welcome to the api!', {
            status: 200,
        })
    } catch (e) {
        console.log(e)
        return serverError()
    }
}
