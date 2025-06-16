import Modal, { ModalPropType } from '@/components/modal/Modal'
import { LocalPizza } from '@mui/icons-material'
import {
    Button,
    Checkbox, Divider,
    FormControlLabel,
    Grid2,
    Stack,
    TextField,
    Typography as Font,
} from '@mui/material'

const Login = (props: LoginType) => {
    const { modal } = props
    return (
        <Modal title="Pizza Parlor" open={modal.open} handleClose={modal.handleClose}>
            <Grid2 container direction="column" alignItems="center" spacing={2} component="form">
                <LocalPizza style={{ fontSize: '128px' }} />
                <Font variant="h4">Sign In</Font>
                <TextField label="Email" type="email" required fullWidth />
                <TextField label="Password" type="password" required fullWidth />
                <Stack direction="row" alignItems="center">
                    <FormControlLabel control={<Checkbox />} label="Remember me for 30 days" />
                    <Button variant="text">Reset Password</Button>
                </Stack>
                <Button variant="contained" fullWidth type="submit">Sign in</Button>
                <Divider flexItem />
                <Font variant="h4">New to Pizza Parlor?</Font>
                <Stack direction="row" width="100%" spacing={2}>
                    <Button variant="contained" fullWidth>Sign up</Button>
                    <Button variant="contained" fullWidth>Order as Guest</Button>
                </Stack>
                <Font variant="subtitle2" alignSelf="start">* sample user in sign up</Font>
            </Grid2>

        </Modal>
    )
}
type LoginType = {
    modal: ModalPropType
}

export default Login