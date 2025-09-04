import Modal from '@/components/modal/Modal.tsx'
import { useAppDispatch, useAppSelector } from '@/store/hooks.tsx'
import { selectModal, selectOrder, selectStore } from '@/store/selectors.tsx'
import { toggleCheckoutModal } from '@/store/slices.tsx'
import { Divider, Stack, Typography as Font } from '@mui/material'
import OrderTracker from '@/components/orderTracker/OrderTracker.tsx'

const Checkout = () => {
    const { checkoutModal } = useAppSelector(selectModal)
    const { store } = useAppSelector(selectStore)
    const { order } = useAppSelector(selectOrder)
    const dispatch = useAppDispatch()
    const handleClose = () => {
        dispatch(toggleCheckoutModal())
    }

    return (
        <Modal
            title="Order Information"
            open={checkoutModal}
            handleClose={handleClose}
        >
            <Stack spacing={3}>
                <Font variant="h2" align="center" id="order-code">
                    #{order.code}
                </Font>
                <Divider />
                <Font>Your order will be ready in about: </Font>
                <Font variant="h4" align="center">
                    {store.waitTime}
                </Font>
                <Divider />
                <OrderTracker status="received" />
            </Stack>
        </Modal>
    )
}
export default Checkout
