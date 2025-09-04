import {
    Box,
    Button,
    Divider,
    Grid2,
    Paper,
    Stack,
    Typography as Font,
} from '@mui/material'
import BlackBoard from '@/assets/images/blackboard.jpg'
import WoodBorder from '@/assets/images/wood-border.jpg'
import { useAppDispatch, useAppSelector } from '@/store/hooks.tsx'
import { selectCart, selectStore, selectUser } from '@/store/selectors.tsx'
import { toNumber } from '@/utils/Form.tsx'
import orderApi from '@/lib/api/orderApi.ts'
import { setCart, setOrder, toggleCheckoutModal } from '@/store/slices.tsx'

const Cart = () => {
    const { store } = useAppSelector(selectStore)
    const { cart } = useAppSelector(selectCart)
    const user = useAppSelector(selectUser)
    const dispatch = useAppDispatch()
    const subtotal = () => cart.reduce((x, y) => x + toNumber(y.price), 0)
    const salesTax = () => subtotal() * 0.1
    const total = () => subtotal() + salesTax()

    const handleCheckout = async () => {
        try {
            const res = await orderApi.createOrder({
                tip: '0.00',
                total: Number(total()).toFixed(2),
                code: '',
                statusDescription: 'Order has been received',
                store: store._id,
                status: 'received',
                tax: Number(salesTax()).toFixed(2),
                customer: user._id,
                subtotal: Number(subtotal()).toFixed(2),
                items: cart.map((c) => {
                    return { ...c, menuItem: c.menuItem._id }
                }),
            })
            dispatch(setOrder(res))
            dispatch(toggleCheckoutModal())
            dispatch(setCart([]))
        } catch {
            alert("Order can't be made")
        }
    }
    const canCheckout = () => {
        return user._id.length > 0 && cart.length > 0
    }
    return (
        <Paper
            style={{
                padding: 16,
                backgroundImage: `url(${BlackBoard.src})`,
                color: '#FFF',
                borderImage: `url(${WoodBorder.src}) 20`,
                borderImageRepeat: 'repeat',
                borderWidth: '10px',
                borderStyle: 'solid',
            }}
        >
            <Button fullWidth style={{ color: '#FFF' }}>
                <Stack>
                    <Font variant="h4" align="center">
                        My Order
                    </Font>
                    <Divider style={{ borderColor: '#FFF' }} />
                    <Font align="center" variant="h5">
                        Take Out
                    </Font>
                </Stack>
            </Button>

            <Font variant="h6">Order Time: {store.waitTime}</Font>
            <Divider />
            <Box maxHeight={300} overflow="auto">
                {cart.map((c) => (
                    <Stack>
                        <Grid2 container justifyContent="space-between">
                            <Font>
                                {c.quantity} x {c.menuItem.title}
                            </Font>
                            <Font>{c.price}</Font>
                        </Grid2>
                        {c.modifications.length > 0 &&
                            c.modifications.map((m) => (
                                <Font whiteSpace="pre-wrap">
                                    {'      '}
                                    {m.description}
                                </Font>
                            ))}
                    </Stack>
                ))}
            </Box>

            <Font></Font>
            <Divider />
            <Grid2 container flexWrap="nowrap" justifyContent="space-between">
                <Font>SubTotal</Font>
                <Font>${Number(subtotal()).toFixed(2)}</Font>
            </Grid2>
            <Grid2 container flexWrap="nowrap" justifyContent="space-between">
                <Font>Sales Tax</Font>
                <Font>${Number(salesTax()).toFixed(2)}</Font>
            </Grid2>
            <Grid2 container flexWrap="nowrap" justifyContent="space-between">
                <Font>Total</Font>
                <Font>${Number(total()).toFixed(2)}</Font>
            </Grid2>
            <Divider />
            <Button
                variant="outlined"
                fullWidth
                onClick={handleCheckout}
                disabled={!canCheckout()}
                id="checkout-button"
            >
                Checkout
            </Button>
        </Paper>
    )
}

export default Cart
