import Modal from '@/components/modal/Modal.tsx'
import { useAppDispatch, useAppSelector } from '@/store/hooks.tsx'
import { selectModal } from '@/store/selectors.tsx'
import { toggleConfirmPasswordModal } from '@/store/slices.tsx'
import {
    Button,
    Grid2,
    Stack,
    TextField,
    Typography as Font,
} from '@mui/material'
import { Cancel } from '@mui/icons-material'
import { ChangeEvent, FormEvent, useState } from 'react'

const ConfirmPassword = () => {
    const modals = useAppSelector(selectModal)
    const dispatch = useAppDispatch()
    const [password, setPassword] = useState('')
    const [passwordError, setPasswordError] = useState('')
    const handleClose = () => {
        dispatch(toggleConfirmPasswordModal())
    }

    const handleConfirm = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        //TODO
    }

    const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        const { value } = e.target
        setPassword(value
        )
    }

    return (
        <Modal
            title="Change Password"
            open={modals.confirmPasswordModal}
            handleClose={handleClose}
        >
            <Grid2
                container
                component="form"
                onSubmit={handleConfirm}
                spacing={2}
            >
                <TextField
                    name="Password"
                    type="password"
                    label="Password"
                    error={passwordError.length > 0}
                    value={password}
                    helperText={passwordError}
                    onChange={handleChange}
                />
                <Stack direction="row" spacing={2}>
                    <Button variant="contained">
                        <Stack
                            direction="row"
                            spacing={2}
                            onClick={handleClose}
                        >
                            <Cancel />
                            <Font variant="button">Cancel</Font>
                        </Stack>
                    </Button>
                    <Button variant="contained" type="submit">
                        <Stack direction="row" spacing={2}>
                            <Font variant="button">Confirm</Font>
                        </Stack>
                    </Button>
                </Stack>
            </Grid2>
        </Modal>
    )
}
export default ConfirmPassword
