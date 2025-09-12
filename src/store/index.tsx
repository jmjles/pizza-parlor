import { configureStore } from '@reduxjs/toolkit'
import {
    storeSlice,
    cartSlice,
    modalSlice,
    itemSlice,
    userSlice,
    ingredientSlice,
    orderSlice,
    loadingSlice,
} from '@/store/slices.tsx'

export const makeStore = () => {
    return configureStore({
        reducer: {
            modals: modalSlice.reducer,
            item: itemSlice.reducer,
            store: storeSlice.reducer,
            cart: cartSlice.reducer,
            user: userSlice.reducer,
            ingredient: ingredientSlice.reducer,
            order: orderSlice.reducer,
            loading: loadingSlice.reducer,
        },
    })
}

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
