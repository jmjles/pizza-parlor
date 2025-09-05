import ListPanel from '@/components/Panel/ListPanel.tsx'
import { useState } from 'react'
import { useAppDispatch, useAppSelector } from '@/store/hooks.tsx'
import { selectItem } from '@/store/selectors.tsx'
import { setItem } from '@/store/slices.tsx'
import Item from '@/components/vendor/Item/Item.tsx'
import { Stack, Typography as Font } from '@mui/material'
import { Add } from '@mui/icons-material'
import EditItem from '@/components/vendor/Item/EditItem.tsx'
import NewItem from '@/components/vendor/Item/NewItem.tsx'
import { MenuItems } from '@/store/initialState.ts'

const Items = () => {
    const item = useAppSelector(selectItem)
    const dispatch = useAppDispatch()
    const [screen, setScreen] = useState('items')

    const handleCategory = () => {
        setScreen('newItem')
    }

    const handleItem = (i: MenuItems) => {
        dispatch(setItem({ ...i.data() }))
        setScreen('item')
    }

    const Btn = () => (
        <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            spacing={1}
        >
            <Font>Create Item</Font>
            <Add />
        </Stack>
    )

    const showItems = () => screen === 'items'
    const showItem = () => screen === 'item'
    const showNewItem = () => screen === 'newItem'
    const showEditItem = () => screen === 'editItem'
    return (
        <>
            {showItems() && (
                <ListPanel
                    title="Menu Items"
                    list={item.menuItems}
                    emptyList="No menu items available!"
                    handleAction={handleCategory}
                    onClick={handleItem}
                    actionBtn={<Btn />}
                />
            )}
            {showItem() && (
                <Item item={item.menuItem} screen={[screen, setScreen]} />
            )}
            {showNewItem() && <NewItem screen={[screen, setScreen]} />}
            {showEditItem() && <EditItem screen={[screen, setScreen]} />}
        </>
    )
}

export default Items
