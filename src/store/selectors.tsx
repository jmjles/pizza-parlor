import { RootState } from '@/store/index.tsx'

export const selectModal = (state: RootState) => state.modals
export const selectStore = (state: RootState) => state.store
export const selectItem = (state: RootState) => state.item
export const selectCart = (state:RootState) => state.cart
export const selectUser = (state:RootState) => state.user