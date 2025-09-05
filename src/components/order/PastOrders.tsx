import Modal from '@/components/modal/Modal.tsx'
import { useAppDispatch, useAppSelector } from '@/store/hooks.tsx'
import { selectModal, selectUser } from '@/store/selectors.tsx'
import { togglePastOrderModal } from '@/store/slices.tsx'
import {
    Stack,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
} from '@mui/material'
import { useEffect, useState } from 'react'
import userApi from '@/lib/api/userApi.ts'
import { Order } from '@/lib/classes/Order.ts'
import PastOrder from '@/components/order/PastOrder.tsx'

const PastOrders = () => {
    const { pastOrderModal } = useAppSelector(selectModal)
    const { _id } = useAppSelector(selectUser)
    const [orders, setOrders] = useState<Order[]>([])
    const [activeOrders, setActiveOrders] = useState<Order[]>([])
    const dispatch = useAppDispatch()

    const header = ['', 'Date', 'Order Number', 'Status', 'Total']
    useEffect(() => {
        const getOrders = async () => {
            try {
                const allOrders: Order[] = (await userApi.getUserOrders(_id))
                    .map((o: any) => new Order(o))
                    .toReversed()
                setActiveOrders(
                    allOrders.filter(
                        (order) =>
                            order.status !== 'complete' &&
                            order.status !== 'cancelled'
                    )
                )
                setOrders(
                    allOrders.filter(
                        (order) =>
                            order.status === 'complete' ||
                            order.status === 'cancelled'
                    )
                )
            } catch {
                alert('Failed to get orders')
            }
        }
        getOrders()
    }, [])

    const handleClose = () => {
        dispatch(togglePastOrderModal())
    }
    return (
        <Modal
            title="My Orders"
            open={pastOrderModal}
            handleClose={handleClose}
        >
            <Stack>
                <Table>
                    <TableHead>
                        <TableRow>
                            {header.map((h, i) => (
                                <TableCell key={i}>{h}</TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {activeOrders.map((a) => (
                            <PastOrder order={a} key={a._id} />
                        ))}
                        {orders.map((order) => (
                            <PastOrder order={order} key={order._id} />
                        ))}
                    </TableBody>
                </Table>
            </Stack>
        </Modal>
    )
}
export default PastOrders
