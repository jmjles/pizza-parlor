import { Grid2 } from '@mui/material'
import Bar from '@/components/bar/Bar.tsx'
import Menu from '@/components/menu/Menu.tsx'
import Cart from '@/components/cart/Cart.tsx'
import Stores from '@/components/stores/Stores.tsx'
import ItemCustomization from '@/components/itemCustomization/ItemCustomization.tsx'
import { useAppSelector } from '@/store/hooks.tsx'
import { selectItem, selectModal, selectStore } from '@/store/selectors.tsx'
import Checkout from '@/components/checkout/Checkout.tsx'

const CustomerDashboard = () => {
    const modals = useAppSelector(selectModal)
    const { store, stores } = useAppSelector(selectStore)
    const { menuItem } = useAppSelector(selectItem)

    return (
        <>
            <Grid2 container flexDirection="column" wrap="nowrap">
                <Grid2>
                    <Bar />
                </Grid2>
                <Grid2>
                    <Grid2
                        container
                        justifyContent="space-around"
                        direction="row"
                        wrap="nowrap"
                        marginTop={2}
                    >
                        <Grid2
                            size={{ xs: 12, lg: 10, xl: 9 }}
                            height="calc(100vh - 87.9833px - 32px)"
                            overflow="auto"
                        >
                            <Menu items={store.menu} />
                        </Grid2>
                        <Grid2
                            size={{ xl: 2 }}
                            display={{ xs: 'none', xl: 'initial' }}
                        >
                            <Cart />
                        </Grid2>
                    </Grid2>
                </Grid2>
            </Grid2>
            <Stores stores={stores} />
            {menuItem && modals.itemModal && <ItemCustomization />}
            <Checkout />
        </>
    )
}
export default CustomerDashboard
