import { useAppDispatch, useAppSelector } from '@/store/hooks.tsx'
import { selectStore } from '@/store/selectors.tsx'
import ListPanel from '@/components/Panel/ListPanel.tsx'
import { useState } from 'react'
import Categories from '@/components/vendor/MenuBuilder/Category/Categories.tsx'
import { StoreType } from '@/lib/db/model/store.ts'
import { setStore } from '@/store/slices.tsx'
import NewCategory from '@/components/vendor/MenuBuilder/Category/NewCategory.tsx'
import EditCategory from '@/components/vendor/MenuBuilder/Category/EditCategory.tsx'
import Category from '@/components/vendor/MenuBuilder/Category/Category.tsx'

const MenuBuilder = () => {
    const { stores } = useAppSelector(selectStore)
    const dispatch = useAppDispatch()
    const [screen, setScreen] = useState('stores')
    const handleStore = (store: StoreType) => {
        setScreen('categories')
        dispatch(setStore(store))
    }

    const showStores = () => screen === 'stores'
    const showCategories = () => screen === 'categories'
    const showNewCategory = () => screen === 'newCategory'
    const showEditCategory = () => screen === 'editCategory'
    const showCategory = () => screen === 'category'
    return (
        <>
            {showStores() && (
                <ListPanel
                    title="My Stores"
                    list={stores}
                    onClick={handleStore}
                    emptyList="No stores available!"
                />
            )}
            {showCategories() && <Categories screen={[screen, setScreen]} />}
            {showEditCategory() && (
                <EditCategory screen={[screen, setScreen]} />
            )}
            {showNewCategory() && <NewCategory screen={[screen, setScreen]} />}
            {showCategory() && <Category screen={[screen, setScreen]} />}
        </>
    )
}

export default MenuBuilder

export type ScreenProps = {
    screen: [string, any]
}
