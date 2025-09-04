import { ObjectId } from 'bson'

export default class Item {
    _id = ''
    static requiredFields: string[] = ['_id']

    constructor({ _id }: ItemType) {
        this._id = _id
    }

    createdAt(): Date {
        return new ObjectId(this._id).getTimestamp()
    }

    isBeforeDate(date: Date) {
        return (
            Date.parse(this.createdAt().toDateString()) <
            Date.parse(date.toDateString())
        )
    }

    isAfterDate(date: Date) {
        return (
            Date.parse(this.createdAt().toDateString()) >
            Date.parse(date.toDateString())
        )
    }

    isInBetweenDate(minDate: Date, maxDate: Date) {
        const min = new Date(
            minDate.getUTCFullYear(),
            minDate.getUTCMonth(),
            minDate.getUTCDate()
        )
        const max = new Date(
            maxDate.getUTCFullYear(),
            maxDate.getUTCMonth(),
            maxDate.getUTCDate()
        )
        const c = this.createdAt()
        const current = new Date(
            c.getUTCFullYear(),
            c.getUTCMonth(),
            c.getUTCDate()
        )
        return min <= current && current <= max
    }

    static verifyData(data: { [key: string]: any }, fields: string[]) {
        let valid = true
        fields.forEach((f) => {
            if (!data[f]) valid = false
        })
        return valid
    }

    data(): ItemType {
        return { _id: this._id }
    }
}

export type ItemType = {
    _id: string
}
