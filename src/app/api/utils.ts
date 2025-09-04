import { Model } from 'mongoose'
import { checkValidToken } from '@/lib/auth/checkValidToken.ts'
import { authError, serverError } from '@/app/api/errors.ts'
import dbConnect from '@/lib/db/connectDB.ts'
import { array } from 'prop-types'
import { Ingredient } from '@/lib/classes/Ingredient.ts'

export class CallQuery {
    req
    model = Model
    private vendorOnly = false
    private populate: PopulateType[] = []
    private id = ''
    private fields: any = {}

    constructor(req: Request, model: Model<any>) {
        this.req = req
        this.model = model
    }

    private async setData() {
        if (this.req.method === 'GET') return
        const data = await this.req.json()
        const fields = data.fields
        const msg = 'Path requested'
        console.log(msg.padStart(100 * 0.5, ' - ').padEnd(100, ' - '))
        console.log('URL: ', this.req.url)
        console.log(
            'Endpoint: ',
            this.req.url.substring(this.req.url.indexOf('/', 10))
        )
        console.log('Method: ', this.req.method)
        console.log('Data:')
        console.table(fields)
        console.log(''.padStart(100, ' - '))

        if (fields) this.fields = fields
        if (fields._id) this.id = fields._id
    }

    setVendorOnly() {
        this.vendorOnly = true
        return this
    }

    setPopulate(fields: PopulateType[]) {
        this.populate = fields
        return this
    }

    private async verifyVendor() {
        const vendor = await checkValidToken(this.req, [
            'vendor',
            'exampleVendor',
        ])
        if (!vendor) return authError()
    }

    async create() {
        await this.setData()
        try {
            if (this.vendorOnly) await this.verifyVendor()
            await dbConnect()
            const newDoc = await this.model.create(this.fields)

            return new Response(JSON.stringify(newDoc), { status: 201 })
        } catch (e) {
            console.log(e)
            return serverError()
        }
    }

    async readAll() {
        try {
            if (this.vendorOnly) await this.verifyVendor()
            await dbConnect()
            const docs = await this.model
                .find({})
                .populate(this.populate)
                .lean()
            return new Response(JSON.stringify(docs), { status: 200 })
        } catch (e) {
            console.log(e)
            return serverError()
        }
    }

    async read() {
        await this.setData()
        try {
            if (this.vendorOnly) await this.verifyVendor()
            await dbConnect()
            const doc = await this.model.findById(this.id)
            return new Response(JSON.stringify(doc), { status: 201 })
        } catch (e) {
            console.log(e)
            return serverError()
        }
    }

    async allFromUser() {
        await this.setData()
        try {
            if (this.vendorOnly) await this.verifyVendor()
            await dbConnect()
            const docs = await this.model
                .find({ customer: this.id })
                .populate(this.populate)
            return new Response(JSON.stringify(docs), { status: 200 })
        } catch (e) {
            console.log(e)
            return serverError()
        }
    }

    async update() {
        await this.setData()
        try {
            if (this.vendorOnly) await this.verifyVendor()
            await dbConnect()
            const updatedDoc = await this.model.findByIdAndUpdate(
                this.id,
                this.fields
            )

            return new Response(JSON.stringify(updatedDoc), {
                status: 200,
            })
        } catch (e) {
            console.log(e)
            return serverError()
        }
    }

    async delete() {
        await this.setData()
        try {
            if (this.vendorOnly) await this.verifyVendor()
            await dbConnect()
            const deletedDoc = await this.model.findByIdAndDelete(this.id)

            return new Response(JSON.stringify(deletedDoc), {
                status: 200,
            })
        } catch (e) {
            console.log(e)
            return serverError()
        }
    }
}

type PopulateType = {
    path: string
    strictPopulate?: boolean
    model?: Model<any>
    populate?: PopulateType[]
}
