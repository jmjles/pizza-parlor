import Modal from '@/components/modal/Modal'
import { LocalPizza } from '@mui/icons-material'
import {
    Button,
    Checkbox,
    Divider,
    FormControlLabel,
    Grid2,
    Stack,
    TextField,
    Typography as Font,
} from '@mui/material'
import { useAppDispatch, useAppSelector } from '@/store/hooks.tsx'
import { selectModal, selectStore } from '@/store/selectors.tsx'
import {
    setUser,
    toggleLoginModal,
    toggleSignupModal,
    toggleStoreModal,
    toggleWelcomeModal,
} from '@/store/slices.tsx'
import { FormEvent, useState } from 'react'

const Login = () => {
    const modals = useAppSelector(selectModal)
    const store = useAppSelector(selectStore).store
    const dispatch = useAppDispatch()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [remember, setRemember] = useState(false)
    const [useSample, setUseSample] = useState(false)

    const sampleUser = {
        email: 'user@example.com',
        password: 'password',
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        //! TODO: create submit
        dispatch(toggleLoginModal())
        dispatch(
            setUser({
                email,
                type:"example",
                firstName: 'Sample',
                lastName: 'User',
                address: '123 Abc St.',
                city: 'City',
                zipcode: '2345',
                state: 'SL',
                profileIMG: 'https://s3.amazonaws.com/images/profiles/123.jpg',
            })
        )
        dispatch(toggleStoreModal())
    }

    const handleSignUp = () => {
        dispatch(toggleLoginModal())
        dispatch(toggleSignupModal())
    }

    const handleClose = () => {
        dispatch(toggleLoginModal())
    }

    const handleGuest = () => {
        dispatch(toggleLoginModal())
        dispatch(toggleStoreModal())
    }
    const handleSample = () => {
        if (useSample) {
            setEmail('')
            setPassword('')
        } else {
            setEmail(sampleUser.email)
            setPassword(sampleUser.password)
        }
        setUseSample((p) => !p)
    }
    return (
        <Modal
            title="Pizza Parlor"
            open={modals.loginModal}
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
                <LocalPizza style={{ fontSize: '128px' }} />
                <Font variant="h4">Sign In</Font>
                <FormControlLabel
                    control={
                        <Checkbox checked={useSample}
                                  onClick={handleSample}/>
                    }
                    label="Use Sample User Login"
                />
                <TextField
                    label="Email"
                    type="email"
                    required
                    fullWidth
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={useSample}
                />
                <TextField
                    label="Password"
                    type="password"
                    required
                    fullWidth
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={useSample}
                />
                <Stack direction="row" alignItems="center">
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={remember}
                                onChange={() => setRemember((p) => !p)}
                            />
                        }
                        label="Remember me for 30 days"
                    />
                    <Button variant="text">Reset Password</Button>
                </Stack>
                <Button variant="contained" fullWidth type="submit">
                    Sign in
                </Button>
                <Divider flexItem />
                <Font variant="h4">New to Pizza Parlor?</Font>
                <Stack direction="row" width="100%" spacing={2}>
                    <Button
                        variant="contained"
                        fullWidth
                        onClick={handleSignUp}
                    >
                        Sign up
                    </Button>
                    <Button variant="contained" fullWidth onClick={handleGuest}>
                        Order as Guest
                    </Button>
                </Stack>
            </Grid2>
        </Modal>
    )
}

export default Login
