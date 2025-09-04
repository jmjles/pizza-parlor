import {
    Collapse,
    IconButton,
    MenuItem,
    Select,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Typography as Font,
} from '@mui/material'
import { ArrowDownward, ArrowUpward } from '@mui/icons-material'
import { ObjectId } from 'bson'
import { Order } from '@/lib/classes/Order.ts'
import { useState } from 'react'
import OrderTracker from '@/components/orderTracker/OrderTracker.tsx'

const PastOrder = (props: { order: Order }) => {
    const { order } = props
    const [showMenuItems, setShowMenuItems] = useState(false)
    const toggleItems = () => {
        setShowMenuItems((p) => !p)
    }
    return (
        <>
            <TableRow key={order._id}>
                <TableCell>
                    <IconButton color="primary" onClick={toggleItems}>
                        {showMenuItems ? <ArrowUpward /> : <ArrowDownward />}
                    </IconButton>
                </TableCell>
                <TableCell>{order.createdAt().toDateString()}</TableCell>
                <TableCell>#{order.code}</TableCell>
                <TableCell>{order.status}</TableCell>
                <TableCell>${order.total}</TableCell>
            </TableRow>
            {order.status !== 'complete' && order.status !== 'cancelled' && (
                <TableRow>
                    <TableCell
                        style={{
                            paddingBottom: 0,
                            paddingTop: 0,
                        }}
                        colSpan={6}
                    >
                        <OrderTracker status={order.status} />
                    </TableCell>
                </TableRow>
            )}

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
                                {order.items.map((i) => {
                                    return (
                                        <TableRow>
                                            <TableCell>{i.quantity}</TableCell>
                                            <TableCell>
                                                {i.menuItem.title}
                                            </TableCell>
                                            <TableCell>
                                                <Stack>
                                                    {i.modifications.map(
                                                        (m) => (
                                                            <Font>
                                                                {m.description}
                                                            </Font>
                                                        )
                                                    )}
                                                    {i.modifications.length ===
                                                        0 && 'None'}
                                                </Stack>
                                            </TableCell>
                                            <TableCell>{i.price}</TableCell>
                                        </TableRow>
                                    )
                                })}
                            </TableBody>
                        </Table>
                    </Collapse>
                </TableCell>
            </TableRow>
        </>
    )
}
export default PastOrder
