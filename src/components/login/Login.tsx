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
import { FormEvent, useEffect, useState } from 'react'
import userApi from '@/lib/api/userApi.ts'

const Login = () => {
    const modals = useAppSelector(selectModal)
    const store = useAppSelector(selectStore).store
    const dispatch = useAppDispatch()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [remember, setRemember] = useState(false)
    const [useSample, setUseSample] = useState(false)
    const [useSampleVendor, setUseSampleVendor] = useState(false)
    const [loginError, setLoginError] = useState('')
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoginError('')
    }, [email, password])

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setLoading(true)
        const res = await userApi.login(email, password)
        setLoading(false)
        if (res.status === 400 || res.status === 500) {
            const errorRes = await res.json()
            setLoginError(errorRes.error)
            return
        }
        const { user, token } = res
        localStorage.setItem('token', token)
        dispatch(toggleLoginModal())
        dispatch(setUser(user))
        if (!modals.storeModal) dispatch(toggleStoreModal())
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

    const handleSample = (vendor?: boolean) => {
        const pwd = 'password'
        if (useSample || useSampleVendor) {
            setEmail('')
            setPassword('')
        } else {
            setEmail(vendor ? 'vendor@example.com' : 'customer@example.com')
            setPassword(pwd)
        }
        if (vendor) setUseSampleVendor((p) => !p)
        else setUseSample((p) => !p)
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
                <Grid2
                    container
                    direction="column"
                    alignItems="start"
                    width="100%"
                    spacing={0}
                >
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={useSampleVendor}
                                onClick={() => handleSample(true)}
                                disabled={useSample}
                            />
                        }
                        label="Use Sample Vendor Login"
                    />
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={useSample}
                                onClick={() => handleSample()}
                                disabled={useSampleVendor}
                                id={'user-login-checkbox'}
                            />
                        }
                        label="Use Sample User Login"
                    />
                </Grid2>

                <TextField
                    label="Email"
                    type="email"
                    required
                    fullWidth
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={useSample || useSampleVendor}
                    error={loginError.length > 0}
                    helperText={loginError}
                />
                <TextField
                    label="Password"
                    type="password"
                    required
                    fullWidth
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={useSample || useSampleVendor}
                    error={loginError.length > 0}
                    helperText={loginError}
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
                <Button
                    variant="contained"
                    fullWidth
                    type="submit"
                    loading={loading}
                    id="login-button"
                >
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
                        Browse Menu
                    </Button>
                </Stack>
            </Grid2>
        </Modal>
    )
}

export default Login
