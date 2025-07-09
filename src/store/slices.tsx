import { createSlice, PayloadAction, Slice } from '@reduxjs/toolkit'
import { StoreType } from '@/components/stores/Store.tsx'
import { MenuItemType } from '@/components/menuItem/MenuItem.tsx'

export const modalSlice = createSlice({
    name: 'modals',
    initialState: {
        storeModal: false,
        itemModal: false,
        cartModal: false,
        orderModal: false,
        pastOrderModal: false,
        loginModal: false,
        signupModal: false,
        welcomeModal: true,
        userModal: false,
        confirmPasswordModal: false,
        deleteAccountModal: false,
        changePasswordModal: false,
    },
    reducers: {
        toggleStoreModal: (state) => {
            return { ...state, storeModal: !state.storeModal }
        },
        toggleItemModal: (state) => {
            return { ...state, itemModal: !state.itemModal }
        },
        toggleOrderModal: (state) => {
            return { ...state, orderModal: !state.orderModal }
        },
        togglePastOrderModal: (state) => {
            return { ...state, pastOrderModal: !state.pastOrderModal }
        },
        toggleLoginModal: (state) => {
            return { ...state, loginModal: !state.loginModal }
        },
        toggleSignupModal: (state) => {
            return { ...state, signupModal: !state.signupModal }
        },
        toggleWelcomeModal: (state) => {
            return { ...state, welcomeModal: !state.welcomeModal }
        },
        toggleUserModal: (state) => {
            return { ...state, userModal: !state.userModal }
        },
        toggleCartModal: (state) => {
            return { ...state, cartModal: !state.cartModal }
        },
        toggleConfirmPasswordModal: (state) => {
            return {
                ...state,
                confirmPasswordModal: !state.confirmPasswordModal,
            }
        },
        toggleDeleteAccountModal: (state) => {
            return { ...state, deleteAccountModal: !state.deleteAccountModal }
        },
        toggleChangePasswordModal: (state) => {
            return { ...state, changePasswordModal: !state.changePasswordModal }
        },
    },
})
export const {
    toggleStoreModal,
    toggleItemModal,
    toggleOrderModal,
    toggleSignupModal,
    togglePastOrderModal,
    toggleUserModal,
    toggleLoginModal,
    toggleCartModal,
    toggleWelcomeModal,
    toggleDeleteAccountModal,
    toggleChangePasswordModal,
    toggleConfirmPasswordModal,
} = modalSlice.actions

export const itemSlice: Slice<{ item: MenuItemType; size: number }> =
    createSlice({
        name: 'item',
        initialState: {
            item: {
                title: '',
                description: '',
                image: '',
                sauce: { name: '', amount: '', price: 0 },
            },
            size: -1,
        },
        reducers: {
            setItem: (state, action: PayloadAction<MenuItemType>) => {
                return {
                    ...state,
                    item: action.payload,
                }
            },
            setSize: (state, action: PayloadAction<number>) => {
                return {
                    ...state,
                    size: action.payload,
                }
            },
        },
    })
export const { setItem, setSize } = itemSlice.actions

export const storeSlice: Slice<{ store: StoreType }> = createSlice({
    name: 'store',
    initialState: {
        store: {
            state: '',
            city: '',
            image: '',
            zipcode: '',
            waitTime: '',
            streetAddress: '',
        },
    },
    reducers: {
        setStore: (state, action: PayloadAction<StoreType>) => {
            return {
                ...state,
                store: action.payload,
            }
        },
    },
})
export const { setStore } = storeSlice.actions

export const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        cart: {},
    },
    reducers: {
        setCart: (state, action) => {
            return {
                ...state,
                order: action.payload,
            }
        },
    },
})
export const { setCart } = cartSlice.actions

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        firstName: '',
        lastName: '',
        email: '',
        address: '',
        city: '',
        zipcode: '',
        state: '',
        profileIMG: '',
        type: '',
    },
    reducers: {
        setUser: (state, action: PayloadAction<UserType>) => {
            return { ...state, ...action.payload }
        },
        signOutUser: (state) => {
            localStorage.removeItem('token')
            return {
                ...state,
                firstName: '',
                lastName: '',
                email: '',
                address: '',
                city: '',
                zipcode: '',
                state: '',
                profileIMG: '',
                type: '',
            }
        },
    },
})
export type UserType = {
    firstName: string
    lastName: string
    email: string
    address: string
    city: string
    zipcode: string
    state: string
    profileIMG: string
    type: string
}
export const { setUser, signOutUser } = userSlice.actions
