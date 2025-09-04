import {
    Collapse,
    IconButton,
    MenuItem,
    Select,
    SelectChangeEvent,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Typography as Font,
} from '@mui/material'
import { ArrowDownward, ArrowUpward } from '@mui/icons-material'
import { Order as OrderClass } from '@/lib/classes/Order.ts'
import { useState } from 'react'
import orderApi from '@/lib/api/orderApi.ts'

const Order = ({ order }: { order: OrderClass }) => {
    const [showMenuItems, setShowMenuItems] = useState(false)
    const [status, setStatus] = useState(order.status)
    const [loading, setLoading] = useState(false)

    const name = `${order.store.streetAddress}, ${order.store.city}`

    const toggleItems = () => {
        setShowMenuItems((p) => !p)
    }

    const handleStatus = async (e: SelectChangeEvent) => {
        e.preventDefault()
        try {
            const res = await orderApi.updateOrder({
                ...order,
                customer: order.customer._id,
                status: e.target.value,
            })
            if (!res._id) {
                setLoading(false)
                alert('Order not updated!')
                return
            }
            setStatus(e.target.value)
            alert('Order updated!')
        } catch {
            setLoading(false)
        }
    }

    return (
        <>
            <TableRow>
                <TableCell>
                    <IconButton color="primary" onClick={toggleItems}>
                        {showMenuItems ? <ArrowUpward /> : <ArrowDownward />}
                    </IconButton>
                </TableCell>
                <TableCell>{order.createdAt().toDateString()}</TableCell>
                <TableCell>{name}</TableCell>
                <TableCell>#{order.code}</TableCell>
                <TableCell>
                    <Select
                        value={status}
                        onChange={handleStatus}
                        disabled={loading}
                        fullWidth
                    >
                        <MenuItem value="received">received</MenuItem>
                        <MenuItem value="pending">pending</MenuItem>
                        <MenuItem value="done">done</MenuItem>
                        <MenuItem value="complete">complete</MenuItem>
                        <MenuItem value="cancelled">cancelled</MenuItem>
                    </Select>
                </TableCell>
                <TableCell>${order.total}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell
                    style={{
                        paddingBottom: 0,
                        paddingTop: 0,
                    }}
                    colSpan={6}
                >
                    <Collapse in={showMenuItems}>
                        <Font variant={'h5'} paddingTop={2}>
                            Order Items
                        </Font>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Quantity</TableCell>
                                    <TableCell>Menu Item</TableCell>
                                    <TableCell>Modifications</TableCell>
                                    <TableCell>Price</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {order.items.map((i) => (
                                    <TableRow key={i.menuItem._id}>
                                        <TableCell>{i.quantity}</TableCell>
                                        <TableCell>
                                            {i.menuItem.title}
                                        </TableCell>
                                        <TableCell>
                                            <Stack>
                                                {i.modifications.map((m, i) => (
                                                    <Font key={i}>
                                                        {m.description}
                                                    </Font>
                                                ))}
                                            </Stack>
                                        </TableCell>
                                        <TableCell>{i.price}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </Collapse>
                </TableCell>
            </TableRow>
        </>
    )
}
export default Order
