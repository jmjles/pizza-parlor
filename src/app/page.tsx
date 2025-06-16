'use client'
import { Grid2 } from '@mui/material'
import Menu from '@/components/menu/Menu'
import Bar from '@/components/bar/Bar'
import Cart from '@/components/cart/Cart'
import { pizzas, storeSampleData } from '@/assets/sampleData'

import Stores from '@/components/stores/Stores'
import { useEffect, useState } from 'react'
import { StoreType } from '@/components/stores/Store'
import ItemCustomization from '@/components/itemCustomization/ItemCustomization'
import Login from '@/components/login/Login'
import SignUp from '@/components/signUp/SignUp'
import Order from '@/components/order/Order'
import { MenuItemType } from '@/components/menuItem/MenuItem'

export default function Home() {
    const [storeModal, setStoreModal] = useState(false)
    const [selectedStore, setSelectedStore] = useState<StoreType>()
    const [orderModal, setOrderModal] = useState(false)
    const [itemModal, setItemModal] = useState(false)
    const [selectedItem, setSelectedItem] = useState<MenuItemType>()
    const [size, setSize] = useState(-1)

    useEffect(() => {
        if (!itemModal) setSize(-1)
    }, [itemModal])

    const handleStoreModal = () => {
        setStoreModal(p => !p)
    }

    const handleOrderModal = () => {
        setOrderModal(p => !p)
    }

    const handleItemModal = () => {
        setItemModal(p => !p)
    }

    const handleItemSelect = (item: MenuItemType, size: number) => {
        setSelectedItem(item)
        setSize(size)
        handleItemModal()
    }

    const handleStore = (store: StoreType) => {
        setSelectedStore(store)
        handleStoreModal()
    }

    return (
        <div>
            <Grid2 container flexDirection="column" wrap="nowrap">
                <Grid2>
                    <Bar city={selectedStore?.city ? selectedStore.city : 'Pizza Parlor'}
                         location={selectedStore?.city ? `${selectedStore.streetAddress}, ${selectedStore.state} ${selectedStore.zipcode}` : 'Select a Store'}
                         openLocations={handleStoreModal} />
                </Grid2>
                <Grid2>
                    <Grid2 container justifyContent="space-around" direction="row" wrap="nowrap" marginTop={2}>
                        <Grid2 size={{ xs: 12, lg: 10, xl: 9 }} height="calc(100vh - 87.9833px - 32px)" overflow="auto">
                            <Menu items={pizzas} onSelect={handleItemSelect} />
                        </Grid2>
                        <Grid2 size={{ xl: 2 }} display={{ xs: 'none', xl: 'initial' }}>
                            <Cart />
                        </Grid2>
                    </Grid2>
                </Grid2>
            </Grid2>
            <Stores stores={storeSampleData} modal={{ open: storeModal, handleClose: handleStoreModal }}
                    selectedStore={selectedStore} selectStore={handleStore} />
            {(selectedItem && itemModal) &&
                <ItemCustomization item={selectedItem} modal={{ open: itemModal, handleClose: handleItemModal }}
                                   size={size} />}
            {/*<Login modal={{ open: true, handleClose: '' }} />*/}
            {/*<SignUp modal={{ open: true, handleClose: '' }} />*/}
            <Order modal={{ open: orderModal, handleClose: handleOrderModal }} selectedStore={selectedStore}
                   storeModal={handleStoreModal} />
        </div>
    )
}
