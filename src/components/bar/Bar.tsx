'use client'
import { AppBar } from '@mui/material'
import blackBoard from '@/assets/images/blackboard.jpg'
import woodBorder from '@/assets/images/wood-border.jpg'
import { useAppDispatch, useAppSelector } from '@/store/hooks.tsx'
import { selectUser } from '@/store/selectors.tsx'
import CustomerBar from '@/components/bar/CustomerBar.tsx'
import VendorBar from '@/components/bar/VendorBar.tsx'
import {
    clearStore,
    signOutUser,
    toggleLoginModal,
    toggleUserModal,
    toggleWelcomeModal,
} from '@/store/slices'
import { useState } from 'react'
import { BarTabType } from './bar'

const Bar = (props: Partial<BarTabType>) => {
    const user = useAppSelector(selectUser)
    const dispatch = useAppDispatch()
    const [open, setOpen] = useState(false)

    const showCustomer = () =>
        user.type === 'customer' || user.type === 'example' || user.type === ''

    const showVendor = () =>
        user.type === 'vendor' || user.type === 'exampleVendor'

    const handleMenu = () => {
        setOpen((p) => !p)
    }

    const handleLogout = () => {
        dispatch(signOutUser())
        dispatch(clearStore())
        handleMenu()
        dispatch(toggleWelcomeModal())
    }

    const handleUser = () => {
        if (user.email) {
            dispatch(toggleUserModal())
        } else {
            dispatch(toggleLoginModal())
        }
        handleMenu()
    }

    const barProps = {
        open,
        handleLogout,
        handleMenu,
        handleUser,
    }

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
            {showCustomer() && <CustomerBar {...barProps} />}
            {showVendor() && (
                <VendorBar
                    tab={props.tab}
                    handleTab={props.handleTab}
                    {...barProps}
                />
            )}
        </AppBar>
    )
}

export default Bar
