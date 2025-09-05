import Modal from '@/components/modal/Modal.tsx'
import { useAppDispatch, useAppSelector } from '@/store/hooks.tsx'
import { selectModal, selectUser } from '@/store/selectors.tsx'
import {
    toggleChangePasswordModal,
    toggleConfirmPasswordModal,
    toggleDeleteAccountModal,
    toggleUserModal,
} from '@/store/slices.tsx'
import { Button, Grid2, Stack, TextField, Typography } from '@mui/material'
import { ChangeEvent, FormEvent, use, useEffect, useState } from 'react'
import { Delete, Edit } from '@mui/icons-material'
import DeleteUser from '@/components/user/DeleteUser.tsx'
import userApi from '@/lib/api/userApi.ts'
import ConfirmPassword from '@/components/password/ConfirmPassword.tsx'

const User = () => {
    const dispatch = useAppDispatch()
    const modals = useAppSelector(selectModal)
    const user = useAppSelector(selectUser)

    const [firstName, setFirstName] = useState(user.firstName)
    const [lastName, setLastName] = useState(user.lastName)
    const [email, setEmail] = useState(user.email)
    const [address, setAddress] = useState(user.address)
    const [city, setCity] = useState(user.city)
    const [state, setState] = useState(user.state)
    const [zipcode, setZipcode] = useState(user.zipcode)

    const [update, setUpdate] = useState(false)

    useEffect(() => {
        reset()
    }, [user])

    const reset = () => {
        setFirstName(user.firstName)
        setLastName(user.lastName)
        setEmail(user.email)
        setAddress(user.address)
        setCity(user.city)
        setState(user.state)
        setZipcode(user.zipcode)
    }

    const handleClose = () => {
        dispatch(toggleUserModal())
        reset()
        setUpdate(false)
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()
        const { value, name } = e.target
        switch (name) {
            case 'FirstName':
                setFirstName(value)
                break
            case 'LastName':
                setLastName(value)
                break
            case 'Email':
                setEmail(value)
                break
            case 'Address':
                setAddress(value)
                break
            case 'City':
                setCity(value)
                break
            case 'State':
                setState(value)
                break
            case 'Zipcode':
                setZipcode(value)
                break
            default:
                break
        }
    }

    const handleUpdate = () => {
        setUpdate((p) => !p)
    }

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        console.log('in')
        dispatch(toggleConfirmPasswordModal())
    }

    const handleDelete = () => {
        dispatch(toggleDeleteAccountModal())
    }

    const handleChangePassword = () => {
        dispatch(toggleChangePasswordModal())
    }

    return (
        <Modal
            title="My Account"
            open={modals.userModal}
            handleClose={handleClose}
            maxWidth="sm"
        >
            <>
                <Grid2
                    container
                    component="form"
                    spacing={2}
                    onSubmit={handleSubmit}
                >
                    <Stack
                        spacing={2}
                        direction="row"
                        justifyContent="space-between"
                        width="100%"
                    >
                        <TextField
                            label="First Name"
                            name="FirstName"
                            required
                            fullWidth
                            disabled={!update}
                            value={firstName}
                            onChange={handleChange}
                        />
                        <TextField
                            label="Last Name"
                            name="LastName"
                            required
                            fullWidth
                            disabled={!update}
                            value={lastName}
                            onChange={handleChange}
                        />
                    </Stack>
                    <TextField
                        label="Email"
                        type="email"
                        name="Email"
                        required
                        fullWidth
                        disabled={!update}
                        value={email}
                        onChange={handleChange}
                    />
                    <TextField
                        label="Address"
                        name="Address"
                        required
                        fullWidth
                        disabled={!update}
                        value={address}
                        onChange={handleChange}
                    />
                    <TextField
                        label="City"
                        name="City"
                        required
                        fullWidth
                        disabled={!update}
                        value={city}
                        onChange={handleChange}
                    />
                    <TextField
                        label="State"
                        name="State"
                        required
                        fullWidth
                        disabled={!update}
                        value={state}
                        onChange={handleChange}
                    />
                    <TextField
                        label="Zipcode"
                        name="Zipcode"
                        required
                        fullWidth
                        disabled={!update}
                        value={zipcode}
                        onChange={handleChange}
                    />
                    <Stack
                        spacing={2}
                        direction="row"
                        justifyContent="space-between"
                        width="100%"
                    >
                        {update ? (
                            <Button
                                color="error"
                                variant="contained"
                                onClick={handleDelete}
                            >
                                <Stack direction="row" spacing={1}>
                                    <Delete /> Delete Account
                                </Stack>
                            </Button>
                        ) : (
                            <Button
                                variant="contained"
                                onClick={handleChangePassword}
                            >
                                Change Password
                            </Button>
                        )}
                        {update && (
                            <Button variant="contained" type="submit">
                                <Typography variant="button">
                                    Submit Changes
                                </Typography>
                            </Button>
                        )}
                        {!update && (
                            <Button variant="contained" onClick={handleUpdate}>
                                <Grid2
                                    container
                                    spacing={1}
                                    alignContent="center"
                                >
                                    <Edit />
                                    <Typography variant="button">
                                        Edit Account
                                    </Typography>
                                </Grid2>
                            </Button>
                        )}
                    </Stack>
                    <DeleteUser />
                </Grid2>
                <ConfirmPassword
                    user={{
                        ...user,
                        firstName,
                        lastName,
                        email,
                        address,
                        zipcode,
                        city,
                        state,
                    }}
                    handleUpdate={handleUpdate}
                />
            </>
        </Modal>
    )
}

export default User
