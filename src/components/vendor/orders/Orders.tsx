import Panel from '@/components/Panel/Panel.tsx'
import {
    Checkbox,
    FormControlLabel,
    Grid2,
    MenuItem,
    Select,
    SelectChangeEvent,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    TextField,
} from '@mui/material'
import { useAppSelector } from '@/store/hooks.tsx'
import { selectOrder, selectStore } from '@/store/selectors.tsx'
import Order from '@/components/vendor/orders/Order.tsx'
import { ChangeEvent, useEffect, useState } from 'react'
import { Order as OrderClass } from '@/lib/classes/Order.ts'

const Orders = () => {
    const { orders } = useAppSelector(selectOrder)
    const { stores } = useAppSelector(selectStore)
    const [selectedStore, setSelectedStore] = useState('all')
    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')
    const [filterDate, setFilterDate] = useState(false)
    const [filteredOrders, setFilteredOrders] = useState<OrderClass[]>([])
    const [searchCustomer, setSearchCustomer] = useState(false)
    const [customerEmail, setCustomerEmail] = useState('')

    const header = ['', 'Date', 'Store', 'Order Number', 'Status', 'Total']

    useEffect(() => {
        let o = orders.toReversed()
        if (searchCustomer)
            o = o.filter((order) =>
                order.customer.email
                    .toLowerCase()
                    .includes(customerEmail.toLowerCase())
            )

        if (filterDate && startDate && endDate) {
            o = o.filter((order) =>
                order.isInBetweenDate(new Date(startDate), new Date(endDate))
            )
        }

        setFilteredOrders(
            selectedStore === 'all'
                ? o
                : o.filter((order) => order.store._id === selectedStore)
        )
    }, [
        filterDate,
        startDate,
        endDate,
        selectedStore,
        customerEmail,
        searchCustomer,
    ])

    const handleStore = async (e: SelectChangeEvent) => {
        setSelectedStore(e.target.value)
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
    const handleCustomerEmail = (event: ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target
        setCustomerEmail(value)
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
        <Panel title="Orders">
            <Stack spacing={1}>
                <Grid2 container justifyContent="space-between" spacing={2}>
                    <Grid2 container>
                        <Select value={selectedStore} onChange={handleStore}>
                            <MenuItem value="all">Show all</MenuItem>
                            {stores.map((s) => (
                                <MenuItem value={s._id} key={s._id}>
                                    {s.streetAddress}, {s.city}
                                </MenuItem>
                            ))}
                        </Select>
                        <FormControlLabel
                            control={<Checkbox />}
                            checked={searchCustomer}
                            onChange={() => setSearchCustomer((p) => !p)}
                            label="Search Customer"
                            labelPlacement="start"
                        />
                        {searchCustomer && (
                            <TextField
                                value={customerEmail}
                                label={'Search by email'}
                                onChange={handleCustomerEmail}
                            />
                        )}
                    </Grid2>
                    <Grid2 container spacing={2}>
                        <FormControlLabel
                            control={<Checkbox />}
                            checked={filterDate}
                            onChange={() => setFilterDate((p) => !p)}
                            label="By Date"
                            labelPlacement="start"
                        />
                        {filterDate && (
                            <>
                                <TextField
                                    type="date"
                                    value={startDate}
                                    onChange={handleStartDateChange}
                                />
                                <TextField
                                    type="date"
                                    value={endDate}
                                    onChange={handleEndDateChange}
                                    disabled={!startDate}
                                />
                            </>
                        )}
                    </Grid2>
                </Grid2>
                <Table>
                    <TableHead>
                        <TableRow>
                            {header.map((x, i) => (
                                <TableCell key={i}>{x}</TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredOrders.map((order) => (
                            <Order order={order} key={order._id} />
                        ))}
                    </TableBody>
                </Table>
            </Stack>
        </Panel>
    )
}
export default Orders
