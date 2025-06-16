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

const SignUp = (props: SignUpType) => {
    const { modal } = props
    return (
        <Modal title="Create Account" open={modal.open} handleClose={modal.handleClose}>
            <Grid2 container direction="column" alignItems="center" spacing={2} component="form">
                <TextField label="First Name" required fullWidth />
                <TextField label="Last Name" required fullWidth />
                <TextField label="Email" type="email" required fullWidth />
                <TextField label="Password" type="password" required fullWidth />
                <TextField label="Re-enter Password" type="password" required fullWidth />
                <Divider flexItem />
                <Button variant="contained" fullWidth type="submit">Sign in</Button>
            </Grid2>
        </Modal>
    )
}
type SignUpType = {
    modal: ModalPropType
}

export default SignUp