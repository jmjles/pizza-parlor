'use client'
import { AppBar } from '@mui/material'
import blackBoard from '@/assets/images/blackboard.jpg'
import woodBorder from '@/assets/images/wood-border.jpg'
import { useAppSelector } from '@/store/hooks.tsx'
import { selectStore, selectUser } from '@/store/selectors.tsx'
import CustomerBar from '@/components/bar/CustomerBar.tsx'
import VendorBar, { VendorBarPropsType } from '@/components/bar/VendorBar.tsx'

const Bar = (props: BarProps) => {
    const store = useAppSelector(selectStore)
    const user = useAppSelector(selectUser)
    const showCustomer = () =>
        user.type === 'customer' || user.type === 'example' || user.type === ''

    const showVendor = () =>
        user.type === 'vendor' || user.type === 'exampleVendor'
    return (
        <AppBar
            position="sticky"
            style={{
                backgroundImage: `url(${blackBoard.src})`,
                borderImage: `url(${woodBorder.src}) 20`,
                borderImageRepeat: 'repeat',
                borderWidth: '10px',
                borderBottomStyle: 'solid',
            }}
        >
            {showCustomer() && <CustomerBar user={user} store={store.store} />}
            {showVendor() && <VendorBar tab={props.tab || [0, () => {}]} />}
        </AppBar>
    )
}
interface BarProps {
    tab?: VendorBarPropsType['tab']
}
export default Bar
