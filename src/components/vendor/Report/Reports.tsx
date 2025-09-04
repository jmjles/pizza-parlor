import Panel from '@/components/Panel/Panel.tsx'
import {
    Checkbox,
    FormControlLabel,
    Grid2,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    TextField,
} from '@mui/material'
import { useAppSelector } from '@/store/hooks.tsx'
import { selectItem, selectOrder } from '@/store/selectors.tsx'
import { toNumber } from '@/utils/Form.tsx'
import { ChangeEvent, useState } from 'react'
import { ObjectId } from 'bson'

const Reports = () => {
    const { menuItems } = useAppSelector(selectItem)
    const { orders } = useAppSelector(selectOrder)
    const [search, setSearch] = useState('')
    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')
    const [filterDate, setFilterDate] = useState(false)

    const header = ['Menu Item', 'Quantity', 'Revenue']

    const filteredList = () => {
        if (search)
            return menuItems.filter((m) =>
                m.title.toLowerCase().includes(search)
            )
        return menuItems
    }

    const handleStartDateChange = (event: ChangeEvent<HTMLInputElement>) => {
        event.preventDefault()
        if (
            Date.parse(new Date(event.target.value).toDateString()) >
            Date.parse(new Date().toDateString())
        ) {
            alert('Start date must be before current Date')
            return
        }
        setStartDate(event.target.value)
    }

    const handleEndDateChange = (event: ChangeEvent<HTMLInputElement>) => {
        event.preventDefault()
        const formattedStartDate = Date.parse(startDate)
        const formattedEndDate = Date.parse(event.target.value)
        const formattedCurrentDate = Date.parse(new Date().toDateString())

        if (formattedStartDate > formattedEndDate) {
            alert('End date must be after start date')
            return
        }

        if (formattedEndDate > formattedCurrentDate) {
            alert('End date must be before current date')
            return
        }
        setEndDate(event.target.value)
    }

    return (
        <Panel title="Sales Report">
            <Stack>
                <Stack spacing={2}>
                    <TextField
                        value={search}
                        onChange={(event) => setSearch(event.target.value)}
                        label="Search Menu Items"
                    />
                    <Grid2 container spacing={2}>
                        <FormControlLabel
                            control={<Checkbox />}
                            checked={filterDate}
                            onChange={() => setFilterDate((p) => !p)}
                            label="By Date"
                            labelPlacement="start"
                        />
                        {filterDate && [
                            <TextField
                                type="date"
                                value={startDate}
                                onChange={handleStartDateChange}
                            />,
                            <TextField
                                type="date"
                                value={endDate}
                                onChange={handleEndDateChange}
                                disabled={!startDate}
                            />,
                        ]}
                    </Grid2>
                </Stack>

                <Table>
                    <TableHead>
                        <TableRow>
                            {header.map((x, i) => (
                                <TableCell key={i}>{x}</TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredList().map((item) => {
                            let quantity = 0
                            let revenue = 0
                            orders.forEach((o) =>
                                o.items.forEach((i) => {
                                    if (i.menuItem._id !== item._id) return
                                    if (!filterDate) {
                                        quantity += i.quantity
                                        revenue += toNumber(i.price)
                                        return
                                    }

                                    const formattedStartDate =
                                        Date.parse(startDate)
                                    const formattedEndDate = Date.parse(endDate)
                                    const createdAt = Date.parse(
                                        new ObjectId(o._id)
                                            .getTimestamp()
                                            .toDateString()
                                    )

                                    if (
                                        formattedStartDate <= createdAt &&
                                        createdAt <= formattedEndDate
                                    ) {
                                        quantity += i.quantity
                                        revenue += toNumber(i.price)
                                    }
                                })
                            )
                            return (
                                <TableRow key={item._id}>
                                    <TableCell>{item.title}</TableCell>
                                    <TableCell>{quantity}</TableCell>
                                    <TableCell>${revenue.toFixed(2)}</TableCell>
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
            </Stack>
        </Panel>
    )
}
export default Reports
