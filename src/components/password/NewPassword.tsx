import { useAppDispatch, useAppSelector } from '@/store/hooks.tsx'
import { selectModal } from '@/store/selectors.tsx'
import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { toggleChangePasswordModal } from '@/store/slices.tsx'
import {
    Button,
    Grid2,
    Stack,
    TextField,
    TextFieldProps,
    Typography as Font,
} from '@mui/material'
import { Cancel } from '@mui/icons-material'
import Modal from '@/components/modal/Modal.tsx'

const NewPassword = () => {
    const modals = useAppSelector(selectModal)
    const dispatch = useAppDispatch()
    const [password, setPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [passwordError, setPasswordError] = useState('')
    const [confirmError, setConfirmError] = useState('')
    const handleClose = () => {
        dispatch(toggleChangePasswordModal())
    }
    const handleConfirm = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        //TODO
        if(newPassword !== confirmPassword) {
            setConfirmError("Passwords don't match")
            return
        }
    }

    useEffect(()=>{
        setConfirmError('')
    },[newPassword, confirmPassword])

    useEffect(()=>{
        setPasswordError('')
    },[password])

    const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        const { name, value } = e.target
        switch (name) {
            case 'Password':
                setPassword(value)
                break
            case 'NewPassword':
                setNewPassword(value)
                break
            case 'ConfirmPassword':
                setConfirmPassword(value)
                break
            default:
                break
        }
    }

    const fields: TextFieldProps[] = [
        {
            name: 'Password',
            type: 'password',
            label: 'Password',
            error: passwordError.length > 0,
            value: password,
            helperText: passwordError,
        },
        {
            name: 'NewPassword',
            type: 'text',
            label: 'New Password',
            error: confirmError.length > 0,
            value: newPassword,
            helperText: confirmError,
        },
        {
            name: 'ConfirmPassword',
            type: 'text',
            label: 'Confirm Password',
            error: confirmError.length > 0,
            value: confirmPassword,
            helperText: confirmError,
        },
    ]
    return (
        <Modal
            title="Change Password"
            open={modals.changePasswordModal}
            handleClose={handleClose}
        >
            <Grid2
                container
                component="form"
                onSubmit={handleConfirm}
                spacing={2}
                direction="column"
            >
                {fields.map((field) => (
                    <TextField {...field} onChange={handleChange} />
                ))}
                <Stack
                    direction="row"
                    spacing={2}
                    justifyContent="space-between"
                >
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
                            <Font variant="button">Change Password</Font>
                        </Stack>
                    </Button>
                </Stack>
            </Grid2>
        </Modal>
    )
}
export default NewPassword
