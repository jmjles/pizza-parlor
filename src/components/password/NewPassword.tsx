import { useAppDispatch, useAppSelector } from '@/store/hooks.tsx'
import { selectModal, selectUser } from '@/store/selectors.tsx'
import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { setUser, toggleChangePasswordModal } from '@/store/slices.tsx'
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
import userApi from '@/lib/api/userApi.ts'

const NewPassword = () => {
    const modals = useAppSelector(selectModal)
    const user = useAppSelector(selectUser)
    const dispatch = useAppDispatch()
    const [password, setPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [passwordError, setPasswordError] = useState('')
    const [confirmError, setConfirmError] = useState('')
    const handleClose = () => {
        dispatch(toggleChangePasswordModal())
    }
    const handleConfirm = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setPasswordError('')
        if (newPassword !== confirmPassword) {
            setConfirmError("Passwords don't match")
            return
        }
        try {
            const verifiedUser = await userApi.login(user.email, password)
            if (!verifiedUser.user._id) {
                setPasswordError('Incorrect password')
                return
            }
            console.table([user, user])
            const res = await userApi.updateUser({
                ...user,
                password: newPassword,
            })
            if (res._id) {
                const updatedUser = await userApi.login(user.email, newPassword)
                localStorage.setItem('token', updatedUser.token)
                dispatch(setUser(updatedUser.user))
                alert('Password updated successfully')
                handleClose()
            }
            alert('Failed to update password')
        } catch {
            alert('Failed to update password')
        }
    }

    useEffect(() => {
        setConfirmError('')
    }, [newPassword, confirmPassword])

    useEffect(() => {
        setPasswordError('')
    }, [password])

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
                    <Button
                        variant="contained"
                        color="error"
                        onClick={handleClose}
                    >
                        <Grid2 container alignItems="center" spacing={2}>
                            <Cancel />
                            <Font variant="button">Cancel</Font>
                        </Grid2>
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
