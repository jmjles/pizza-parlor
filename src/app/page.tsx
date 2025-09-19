'use client'
import CustomerDashboard from '@/components/customerDashboard/CustomerDashboard.tsx'
import Welcome from '@/components/welcome/Welcome.tsx'
import { useAppDispatch, useAppSelector } from '@/store/hooks.tsx'
import {
    selectIngredient,
    selectItem,
    selectLoading,
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
import { useEffect } from 'react'
import {
    setIngredient,
    setIngredients,
    setItems,
    setStore,
    setStores,
    setUser,
    setWelcomeModal,
    toggleLoadingIngredients,
    toggleLoadingMenuItems,
    toggleLoadingStores,
    toggleLoadingUsers,
    toggleStoreModal,
} from '@/store/slices.tsx'
import { storeApi } from '@/lib/api/storeApi.ts'
import authApi from '@/lib/api/authApi.ts'
import VendorDashboard from '@/components/vendorDashboard/VendorDashboard.tsx'
import ingredientApi from '@/lib/api/ingredientApi.ts'
import menuItemApi from '@/lib/api/menuItemApi.ts'
import PastOrders from '@/components/order/PastOrders.tsx'
import Loading from '@/components/loading/Loading.tsx'

export default function Home() {
    const { stores, store, refreshStores } = useAppSelector(selectStore)
    const { menuItem, refreshMenuItems } = useAppSelector(selectItem)
    const { ingredient, refreshIngredients } = useAppSelector(selectIngredient)
    const {
        initialLoad,
        loadingIngredients,
        loadingStores,
        loadingUsers,
        loadingMenuItems,
    } = useAppSelector(selectLoading)
    const modals = useAppSelector(selectModal)
    const user = useAppSelector(selectUser)
    const dispatch = useAppDispatch()
    const showWelcome = () => !user.email && !initialLoad && modals.welcomeModal

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
    const showStore = () => modals.storeModal && showDashboard()
    const showOrders = () => modals.pastOrderModal
    useEffect(() => {
        if (!user.email) return
        dispatch(setWelcomeModal(false))
    }, [user])

    useEffect(() => {
        const token = localStorage.getItem('token')
        const verifyToken = async () => {
            try {
                if (!loadingUsers) dispatch(toggleLoadingUsers())
                if (token && !user.email) {
                    const fetchedUser = await authApi.verifyToken()
                    if ('error' in fetchedUser) {
                        localStorage.removeItem('token')
                        return
                    }
                    dispatch(setUser(fetchedUser))
                    dispatch(toggleStoreModal())
                }
            } catch (e: any) {}
            dispatch(toggleLoadingUsers())
        }
        verifyToken()
    }, [user])

    useEffect(() => {
        const getStores = async () => {
            if (!loadingStores) dispatch(toggleLoadingStores())
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
            dispatch(toggleLoadingStores())
        }
        getStores()
    }, [refreshStores, user])

    useEffect(() => {
        const getIngredients = async () => {
            try {
                if (!loadingIngredients) dispatch(toggleLoadingIngredients())
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
            dispatch(toggleLoadingIngredients())
        }
        getIngredients()
    }, [refreshIngredients, user])

    useEffect(() => {
        const getItems = async () => {
            try {
                if (!loadingMenuItems) dispatch(toggleLoadingMenuItems())
                const itemsRes = await menuItemApi.getMenuItems()
                if ('status' in itemsRes) {
                    dispatch(setItems([]))
                    return
                }
                if (itemsRes._id) {
                    const updatedItem = itemsRes.find(
                        (s: any) => s._id === menuItem._id
                    )
                    if (updatedItem) dispatch(setStore(updatedItem))
                }
                dispatch(setItems(itemsRes))
            } catch (e: any) {}
            dispatch(toggleLoadingMenuItems())
        }
        getItems()
    }, [refreshMenuItems, user])

    if (initialLoad) return <Loading />
    if (showWelcome()) return <Welcome />

    return (
        <div>
            {showDashboard() && <CustomerDashboard />}
            {showVendorDashboard() && <VendorDashboard />}
            {showStore() && <Stores stores={stores} />}
            {showLogin() && <Login />}
            {showSignup() && <SignUp />}
            <CartModal />
            {showUser() && <User />}
            {modals.changePasswordModal && <NewPassword />}
            {showOrders() && <PastOrders />}
        </div>
    )
}
