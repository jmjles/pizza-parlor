'use client'
import CustomerDashboard from '@/components/customerDashboard/CustomerDashboard.tsx'
import StoreDashboard from '@/components/storeDashboard/StoreDashboard.tsx'
import Welcome from '@/components/welcome/Welcome.tsx'
import { useAppDispatch, useAppSelector } from '@/store/hooks.tsx'
import { selectModal, selectStore, selectUser } from '@/store/selectors.tsx'
import Stores from '@/components/stores/Stores.tsx'
import stores from '@/components/stores/Stores.tsx'
import { storeSampleData } from '@/assets/sampleData.tsx'
import Login from '@/components/login/Login.tsx'
import SignUp from '@/components/signUp/SignUp.tsx'
import CartModal from '@/components/cart/CartModal.tsx'
import User from '@/components/user/User.tsx'
import NewPassword from '@/components/password/NewPassword.tsx'
import ConfirmPassword from '@/components/password/ConfirmPassword.tsx'
import { useEffect, useLayoutEffect, useState } from 'react'
import { setUser, toggleStoreModal } from '@/store/slices.tsx'

export default function Home() {
    const [loading, setLoading] = useState(true)
    const store = useAppSelector(selectStore).store
    const modals = useAppSelector(selectModal)
    const user = useAppSelector(selectUser)
    const dispatch = useAppDispatch()

    const showWelcome = () => !user.email && !loading
    const showDashboard = () =>
        !modals.signupModal &&
        !modals.loginModal &&
        !modals.welcomeModal &&
        user.type !== 'exampleVendor'
    const showLogin = () => modals.loginModal
    const showSignup = () => modals.signupModal
    const showUser = () => modals.userModal
    const showStore = () => modals.storeModal && user.type !== 'exampleVendor'
    useEffect(() => {
        setLoading(true)
        const token = localStorage.getItem('token')
        const verifyToken = async () => {
            if (token && !user.email) {
                const res = await fetch('/api/user/auth', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ token }),
                })
                dispatch(setUser(await res.json()))
                dispatch(toggleStoreModal())
            }
            setLoading(false)
        }
        console.log(user.email)
        verifyToken()

    }, [user])

    return (
        <div>
            {showDashboard() && <CustomerDashboard />}
            {showStore() && <Stores stores={storeSampleData} />}
            {showLogin() && <Login />}
            {showSignup() && <SignUp />}
            <StoreDashboard />
            {showWelcome() && <Welcome />}
            <CartModal />
            {showUser() && <User />}
            <NewPassword />
        </div>
    )
}
