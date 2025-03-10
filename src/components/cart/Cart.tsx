import { Button, Divider, Paper, Stack, Typography as Font } from '@mui/material'
import BlackBoard from '@/assets/images/blackboard.jpg'
import WoodBorder from '@/assets/images/wood-border.jpg'

const Cart = () => {

    return (
        <Paper style={{
            padding: 16,
            backgroundImage: `url(${BlackBoard.src})`,
            color: '#FFF',
            borderImage: `url(${WoodBorder.src}) 20`,
            borderImageRepeat: 'repeat',
            borderWidth: '10px',
            borderStyle:"solid"
        }}>
            <Font variant="h4" align="center">My Order</Font>
            <Divider style={{borderColor:"#FFF"}}/>
            <Font align="center" variant="h5">
                Take Out
            </Font>
            <Font variant="h6">
                Order Time:
            </Font>
            <Font>order-time</Font>
            <Divider />
            <Font>items</Font>
            <Divider />
            <Stack direction="row" flexWrap="nowrap" justifyContent="space-between">
                <Font>SubTotal</Font>
                <Font>$0.00</Font>
            </Stack>
            <Stack direction="row" flexWrap="nowrap" justifyContent="space-between">
                <Font>Total</Font>
                <Font>$0.00</Font>
            </Stack>
            <Divider />
            <Button variant="outlined" fullWidth>Checkout</Button>
        </Paper>
    )
}
type CartType = {
    orderType: string;
    orderTime: string;
    subtotal: string;
}
export default Cart