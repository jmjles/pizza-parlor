import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { StoreType } from '@/lib/db/model/store.ts'
import {
    cartInitialState,
    ingredientInitialState,
    menuItemInitialState,
    MenuItemTypes,
    orderInitialState,
    storeInitialState,
    userInitialState,
} from '@/store/initialState.ts'
import { UserType } from '@/lib/db/model/user.ts'
import { MenuCategoryType } from '@/lib/db/model/menuCategory.ts'
import { OrderItemsType, OrderType } from '@/lib/db/model/order.ts'
import { IngredientType } from '@/lib/classes/Ingredient.ts'

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
        checkoutModal: false,
    },
    reducers: {
        toggleStoreModal: (state) => {
            state.storeModal = !state.storeModal
        },
        toggleItemModal: (state) => {
            state.itemModal = !state.itemModal
        },
        toggleOrderModal: (state) => {
            state.orderModal = !state.orderModal
        },
        togglePastOrderModal: (state) => {
            state.pastOrderModal = !state.pastOrderModal
        },
        toggleLoginModal: (state) => {
            state.loginModal = !state.loginModal
        },
        toggleSignupModal: (state) => {
            state.signupModal = !state.signupModal
        },
        toggleWelcomeModal: (state) => {
            state.welcomeModal = !state.welcomeModal
        },
        setWelcomeModal: (state, action: PayloadAction<boolean>) => {
            state.welcomeModal = action.payload
        },
        toggleUserModal: (state) => {
            state.userModal = !state.userModal
        },
        toggleCartModal: (state) => {
            state.cartModal = !state.cartModal
        },
        toggleConfirmPasswordModal: (state) => {
            state.confirmPasswordModal = !state.confirmPasswordModal
        },
        toggleDeleteAccountModal: (state) => {
            state.deleteAccountModal = !state.deleteAccountModal
        },
        toggleChangePasswordModal: (state) => {
            state.changePasswordModal = !state.changePasswordModal
        },
        toggleCheckoutModal: (state) => {
            state.checkoutModal = !state.checkoutModal
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
    setWelcomeModal,
    toggleWelcomeModal,
    toggleDeleteAccountModal,
    toggleChangePasswordModal,
    toggleConfirmPasswordModal,
    toggleCheckoutModal,
} = modalSlice.actions

export const itemSlice = createSlice({
    name: 'item',
    initialState: menuItemInitialState,
    reducers: {
        setSelectedItem: (
            state,
            action: PayloadAction<{ item: MenuItemTypes; size?: number }>
        ) => {
            state.menuItem = action.payload.item
            if (typeof action.payload.size === 'number')
                state.size = action.payload.size
        },
        setItem: (state, action: PayloadAction<MenuItemTypes>) => {
            state.menuItem = action.payload
        },
        setItems: (state, action: PayloadAction<MenuItemTypes[]>) => {
            state.menuItems = action.payload
        },
        setSize: (state, action: PayloadAction<number>) => {
            state.size = action.payload
        },
        setCategory: (state, action: PayloadAction<MenuCategoryType>) => {
            state.category = action.payload
        },
        refreshMenuItems: (state) => {
            state.refreshMenuItems += 1
        },
    },
})
export const {
    setItem,
    setSize,
    setSelectedItem,
    setItems,
    refreshMenuItems,
    setCategory,
} = itemSlice.actions

export const storeSlice = createSlice({
    name: 'store',
    initialState: storeInitialState,
    reducers: {
        setStore: (state, action: PayloadAction<StoreType>) => {
            state.store = action.payload
        },
        clearStore: (state) => {
            state.store = storeInitialState['store']
        },
        setStores: (state, action: PayloadAction<StoreType[]>) => {
            state.stores = action.payload
        },
        refreshStores: (state) => {
            state.refreshStores += 1
        },
    },
})

export const { setStore, clearStore, setStores, refreshStores } =
    storeSlice.actions

export const cartSlice = createSlice({
    name: 'cart',
    initialState: cartInitialState,
    reducers: {
        setCart: (state, action: PayloadAction<OrderItemsType[]>) => {
            state.cart = action.payload
        },
    },
})
export const { setCart } = cartSlice.actions

export const userSlice = createSlice({
    name: 'user',
    initialState: userInitialState,
    reducers: {
        setUser: (state, action: PayloadAction<UserType>) => {
            return { ...state, ...action.payload }
        },
        signOutUser: (state) => {
            localStorage.removeItem('token')
            return {
                ...state,
                ...userInitialState,
            }
        },
    },
})

export const { setUser, signOutUser } = userSlice.actions

export const ingredientSlice = createSlice({
    name: 'ingredient',
    initialState: ingredientInitialState,
    reducers: {
        setIngredients: (state, action: PayloadAction<IngredientType[]>) => {
            state.ingredients = action.payload
        },
        setIngredient: (state, action: PayloadAction<IngredientType>) => {
            state.ingredient = action.payload
        },
        refreshIngredients: (state) => {
            state.refreshIngredients += 1
        },
    },
})

export const { setIngredients, setIngredient, refreshIngredients } =
    ingredientSlice.actions

export const orderSlice = createSlice({
    name: 'order',
    initialState: orderInitialState,
    reducers: {
        setOrder: (state, action: PayloadAction<OrderType>) => {
            state.order = action.payload
        },
        setLoadingOrder: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload
        },
        setOrders: (state, action: PayloadAction<OrderType[]>) => {
            state.orders = action.payload
        },
    },
})

export const { setOrder, setLoadingOrder, setOrders } = orderSlice.actions
