'use client'
import { Grid2 } from '@mui/material'
import Menu from '@/components/menu/Menu'
import Bar from '@/components/bar/Bar'
import Cart from '@/components/cart/Cart'
import { pizzas, storeSampleData } from '@/assets/sampleData'

import Stores from '@/components/stores/Stores'
import { useState } from 'react'
import { StoreType } from '@/components/stores/Store'

export default function Home() {
    const [storeModal, setStoreModal] = useState(false)
    const [selectedStore, setSelectedStore] = useState<StoreType>()
    const handleStoreModal = () => {
        setStoreModal(p => !p)
    }

    const handleStore = (store: StoreType) => {
        setSelectedStore(store)
        handleStoreModal()
    }

    return (
        <div>
            <Grid2 container flexDirection="column" wrap="nowrap">
                <Grid2>
                    <Bar city={selectedStore?.city ? selectedStore.city : 'At Your Service'}
                         location={selectedStore?.city ? `${selectedStore.streetAddress}, ${selectedStore.state} ${selectedStore.zipcode}` : 'Select a Store'}
                         openLocations={handleStoreModal} />
                </Grid2>
                <Grid2>
                    <Grid2 container justifyContent="space-around" direction="row" wrap="nowrap" marginTop={2}>
                        <Grid2 size={{ xs: 12, lg: 10, xl: 9 }} height="calc(100vh - 87.9833px - 32px)" overflow="auto">
                            <Menu items={pizzas} />
                        </Grid2>
                        <Grid2 size={{ xl: 2 }} display={{ xs: 'none', xl: 'initial' }}>
                            <Cart />
                        </Grid2>
                    </Grid2>
                </Grid2>
            </Grid2>
            <Stores stores={storeSampleData} modal={{ open: storeModal, handleClose: handleStoreModal }}
                    selectedStore={selectedStore} selectStore={handleStore} />
        </div>
    )
}
