import Modal from '@/components/modal/Modal.tsx'
import { useAppDispatch, useAppSelector } from '@/store/hooks.tsx'
import { selectModal, selectUser } from '@/store/selectors.tsx'
import { setUser, toggleConfirmPasswordModal } from '@/store/slices.tsx'
import {
    Button,
    Grid2,
    Stack,
    TextField,
    Typography as Font,
} from '@mui/material'
import { Cancel } from '@mui/icons-material'
import { ChangeEvent, FormEvent, useState } from 'react'
import userApi from '@/lib/api/userApi.ts'
import { UserInitialStateType } from '@/store/initialState.ts'

const ConfirmPassword = (props: {
    user: UserInitialStateType
    handleUpdate: any
}) => {
    const modals = useAppSelector(selectModal)
    const user = useAppSelector(selectUser)
    const dispatch = useAppDispatch()
    const [password, setPassword] = useState('')
    const [passwordError, setPasswordError] = useState('')
    const handleClose = () => {
        dispatch(toggleConfirmPasswordModal())
    }

    const handleConfirm = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const {
            user: { firstName, lastName, email, address, zipcode, city, state },
        } = props
        try {
            setPasswordError('')
            const userCheck = await userApi.login(user.email, password)

            if (!userCheck.user._id) {
                setPasswordError('Wrong Password')
                return
            }

            const res = await userApi.updateUser({
                ...user,
                firstName,
                lastName,
                email,
                address,
                zipcode,
                city,
                state,
            })
            if (!res._id) {
                alert('Creating user failed!')
                return
            }
            const newUser = await userApi.login(res.email, password)
            setUser(newUser.user)
            localStorage.setItem('token', newUser.token)
            props.handleUpdate()
            handleClose()
            alert('Account updated!')
        } catch {
            alert('Account update failed!')
        }
    }

    const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        const { value } = e.target
        setPassword(value)
    }

    return (
        <Modal
            title="Confirm Password"
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
                    <Button
                        variant="contained"
                        onClick={handleClose}
                        color="error"
                    >
                        <Grid2 container alignItems="center" spacing={1}>
                            <Cancel />
                            <Font variant="button">Cancel</Font>
                        </Grid2>
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
