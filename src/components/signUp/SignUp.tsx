import Modal from '@/components/modal/Modal'
import { ArrowBack, ArrowForward, Send } from '@mui/icons-material'
import { Button, Divider, Grid2, Stack, TextField } from '@mui/material'
import { useAppDispatch, useAppSelector } from '@/store/hooks.tsx'
import { selectModal, selectStore } from '@/store/selectors.tsx'
import {
    setUser,
    toggleLoginModal,
    toggleSignupModal,
    toggleStoreModal,
} from '@/store/slices.tsx'
import { ChangeEvent, FormEvent, useState } from 'react'

const SignUp = () => {
    const modals = useAppSelector(selectModal)
    const store = useAppSelector(selectStore).store
    const dispatch = useAppDispatch()
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [address, setAddress] = useState('')
    const [city, setCity] = useState('')
    const [zip, setZip] = useState('')
    const [state, setState] = useState('')
    const [step, setStep] = useState(1)
    const [loading, setLoading] = useState(false)
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
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
            case 'Password':
                setPassword(value)
                break
            case 'ConfirmPassword':
                setConfirmPassword(value)
                break
            case 'ConfirmPasswordConfirm':
                setConfirmPassword(value)
                break
            case 'Address':
                setAddress(value)
                break
            case 'City':
                setCity(value)
                break
            case 'Zip':
                setZip(value)
                break
            case 'State':
                setState(value)
                break
            default:
                break
        }
    }

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setLoading(true)
        const data = {
            firstName,
            lastName,
            email,
            password,
            address,
            city,
            zipcode: zip,
            state,
        }

        const res = await fetch('/api/user/signup', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: { 'Content-Type': 'multipart/form-data' },
        })
        if (res.status !== 201) {
            return
        }
        const { user, token } = await res.json()
        localStorage.setItem('token', token)
        dispatch(setUser(user))
        dispatch(toggleSignupModal())
        dispatch(toggleStoreModal())
    }
    const handleClose = () => {
        dispatch(toggleSignupModal())
    }

    const handleLogin = () => {
        dispatch(toggleLoginModal())
        handleClose()
    }
    const handleStepForward = () => {
        setStep((p) => p + 1)
    }

    const handleStepBack = () => {
        setStep((p) => p - 1)
    }

    return (
        <Modal
            title="Create Account"
            open={modals.signupModal}
            handleClose={handleClose}
            disableCloseButton={!store.streetAddress}
        >
            <Grid2
                container
                direction="column"
                alignItems="center"
                spacing={2}
                component="form"
                onSubmit={handleSubmit}
            >
                {step === 1
                    ? [
                          <TextField
                              label="First Name"
                              name="FirstName"
                              required
                              fullWidth
                              value={firstName}
                              onChange={handleChange}
                          />,
                          <TextField
                              label="Last Name"
                              name="LastName"
                              required
                              fullWidth
                              value={lastName}
                              onChange={handleChange}
                          />,
                          <TextField
                              label="Email"
                              type="email"
                              name="Email"
                              required
                              fullWidth
                              value={email}
                              onChange={handleChange}
                          />,
                          <TextField
                              label="Password"
                              type="password"
                              name="Password"
                              required
                              fullWidth
                              value={password}
                              onChange={handleChange}
                          />,
                          <TextField
                              label="Re-enter Password"
                              type="password"
                              name="ConfirmPassword"
                              required
                              fullWidth
                              value={confirmPassword}
                              onChange={handleChange}
                          />,
                      ]
                    : [
                          <TextField
                              label="Address"
                              type="text"
                              name="Address"
                              required
                              fullWidth
                              value={address}
                              onChange={handleChange}
                          />,
                          <TextField
                              label="City"
                              type="text"
                              name="City"
                              required
                              fullWidth
                              value={city}
                              onChange={handleChange}
                          />,
                          <TextField
                              label="State"
                              type="text"
                              name="State"
                              required
                              fullWidth
                              value={state}
                              onChange={handleChange}
                          />,
                          <TextField
                              label="Zipcode"
                              type="text"
                              name="Zip"
                              required
                              fullWidth
                              value={zip}
                              onChange={handleChange}
                          />,
                      ]}
                <Divider flexItem />
                <Stack
                    direction="row"
                    spacing={2}
                    justifyContent="space-between"
                    width="100%"
                >
                    {step === 1 ? (
                        <Button variant="contained" onClick={handleLogin}>
                            Sign in
                        </Button>
                    ) : (
                        <Button variant="contained" onClick={handleStepBack}>
                            <ArrowBack /> Back
                        </Button>
                    )}
                    {step === 1 ? (
                        <Button
                            variant="contained"
                            onClick={handleStepForward}
                            disabled={loading}
                        >
                            Next <ArrowForward />
                        </Button>
                    ) : (
                        <Button
                            variant="contained"
                            type="submit"
                            loading={loading}
                        >
                            Sign Up <Send />
                        </Button>
                    )}
                </Stack>
            </Grid2>
        </Modal>
    )
}

export default SignUp
