'use client'
import CustomerDashboard from '@/components/customerDashboard/CustomerDashboard.tsx'
import Welcome from '@/components/welcome/Welcome.tsx'
import { useAppDispatch, useAppSelector } from '@/store/hooks.tsx'
import {
    selectIngredient,
    selectItem,
    selectModal,
    selectStore,
    selectUser,
} from '@/store/selectors.tsx'
import Stores from '@/components/stores/Stores.tsx'
import Login from '@/components/login/Login.tsx'
import SignUp from '@/components/signUp/SignUp.tsx'
import CartModal from '@/components/cart/CartModal.tsx'
import User from '@/components/user/User.tsx'
import NewPassword from '@/components/password/NewPassword.tsx'
import { useEffect, useState } from 'react'
import {
    setIngredient,
    setIngredients,
    setItems,
    setStore,
    setStores,
    setUser,
    setWelcomeModal,
    toggleStoreModal,
} from '@/store/slices.tsx'
import { storeApi } from '@/lib/api/storeApi.ts'
import authApi from '@/lib/api/authApi.ts'
import VendorDashboard from '@/components/vendorDashboard/VendorDashboard.tsx'
import ingredientApi from '@/lib/api/ingredientApi.ts'
import menuItemApi from '@/lib/api/menuItemApi.ts'
import PastOrders from '@/components/order/PastOrders.tsx'

export default function Home() {
    const [loading, setLoading] = useState(true)
    const { stores, store, refreshStores } = useAppSelector(selectStore)
    const { menuItem, refreshMenuItems } = useAppSelector(selectItem)
    const { ingredient, refreshIngredients } = useAppSelector(selectIngredient)
    const modals = useAppSelector(selectModal)
    const user = useAppSelector(selectUser)
    const dispatch = useAppDispatch()
    const showWelcome = () => !user.email && !loading && modals.welcomeModal

    const showDashboard = () =>
        !modals.signupModal &&
        !modals.loginModal &&
        !modals.welcomeModal &&
        user.type !== 'exampleVendor' &&
        user.type !== 'vendor'

    const showVendorDashboard = () =>
        !modals.signupModal &&
        !modals.loginModal &&
        !showWelcome() &&
        user.type !== 'example' &&
        user.type !== 'customer'
    const showLogin = () => modals.loginModal
    const showSignup = () => modals.signupModal
    const showUser = () => modals.userModal
    const showStore = () => modals.storeModal && user.type !== 'exampleVendor'
    const showOrders = () => modals.pastOrderModal
    useEffect(() => {
        if (!user.email) return
        dispatch(setWelcomeModal(false))
    }, [user])

    useEffect(() => {
        setLoading(true)
        const token = localStorage.getItem('token')
        const verifyToken = async () => {
            if (token && !user.email) {
                setLoading(true)
                const fetchedUser = await authApi.verifyToken()
                if ('error' in fetchedUser) {
                    localStorage.removeItem('token')
                    setLoading(false)
                    return
                }
                dispatch(setUser(fetchedUser))
                dispatch(toggleStoreModal())
            }
            setLoading(false)
        }
        verifyToken()
    }, [user])

    useEffect(() => {
        const getStores = async () => {
            try {
                const storesRes = await storeApi.getStores()
                if (!storesRes.length) {
                    dispatch(setStores([]))
                    return
                }
                if (store._id) {
                    const updatedStore = storesRes.find(
                        (s: any) => s._id === store._id
                    )
                    if (updatedStore) dispatch(setStore(updatedStore))
                }
                dispatch(setStores(storesRes))
            } catch (e: any) {}
        }
        getStores()
    }, [refreshStores, user])

    useEffect(() => {
        const getIngredients = async () => {
            try {
                const ingredientsRes = await ingredientApi.getIngredients()
                if ('status' in ingredientsRes) {
                    dispatch(setIngredients([]))
                    return
                }
                if (ingredient._id) {
                    const updatedIngredient = ingredientsRes.find(
                        (i: any) => i._id === ingredient._id
                    )
                    if (updatedIngredient)
                        dispatch(setIngredient(updatedIngredient))
                }
                dispatch(setIngredients(ingredientsRes))
            } catch (e: any) {}
        }
        getIngredients()
    }, [refreshIngredients, user])

    useEffect(() => {
        const getItems = async () => {
            try {
                const itemsRes = await menuItemApi.getMenuItems()
                if ('status' in itemsRes) {
                    dispatch(setItems([]))
                    return
                }
                if (itemsRes.id) {
                    const updatedItem = itemsRes.find(
                        (s: any) => s._id === menuItem._id
                    )
                    if (updatedItem) dispatch(setStore(updatedItem))
                }
                dispatch(setItems(itemsRes))
            } catch (e: any) {}
        }
        getItems()
    }, [refreshMenuItems, user])

    return (
        <div>
            {showDashboard() && <CustomerDashboard />}
            {showVendorDashboard() && <VendorDashboard />}
            {showStore() && <Stores stores={stores} />}
            {showLogin() && <Login />}
            {showSignup() && <SignUp />}
            {showWelcome() && <Welcome />}
            <CartModal />
            {showUser() && <User />}
            {modals.changePasswordModal && <NewPassword />}
            {showOrders() && <PastOrders />}
        </div>
    )
}
