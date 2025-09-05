import { Grid2, Stack, Typography as Font } from '@mui/material'
import { Kitchen, LocalPizza, Receipt } from '@mui/icons-material'

const OrderTracker = (props: { status: string }) => {
    return (
        <Grid2 container justifyContent="space-between">
            <Stack alignItems="center" width={1 / 3}>
                <Font>Order Received</Font>
                <Receipt
                    style={{ fontSize: '64px' }}
                    color={props.status === 'received' ? 'primary' : 'inherit'}
                />
            </Stack>
            <Stack alignItems="center" width={1 / 3}>
                <Font>Cooking</Font>
                <Kitchen
                    style={{ fontSize: '64px' }}
                    color={props.status === 'pending' ? 'primary' : 'inherit'}
                />
            </Stack>
            <Stack alignItems="center" width={1 / 3}>
                <Font>Done</Font>
                <LocalPizza
                    style={{ fontSize: '64px' }}
                    color={props.status === 'done' ? 'primary' : 'inherit'}
                />
            </Stack>
        </Grid2>
    )
}
export default OrderTracker
