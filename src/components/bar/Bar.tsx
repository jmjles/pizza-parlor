'use client'
import {
    Menu,
    LocalPizza,
    Settings,
    ShoppingCart,
    Logout,
    ShoppingBag,
} from '@mui/icons-material'
import {
    AppBar,
    Button,
    Container,
    Grid2,
    IconButton,
    Stack,
    Typography as Font,
    Menu as MUIMenu,
    MenuItem,
    Avatar,
} from '@mui/material'
import blackBoard from '@/assets/images/blackboard.jpg'
import woodBorder from '@/assets/images/wood-border.jpg'
import { useEffect, useRef, useState } from 'react'
import { useAppDispatch, useAppSelector } from '@/store/hooks.tsx'
import { selectStore, selectUser } from '@/store/selectors.tsx'
import {
    signOutUser,
    toggleCartModal,
    toggleLoginModal,
    togglePastOrderModal,
    toggleStoreModal,
    toggleUserModal,
} from '@/store/slices.tsx'

const Bar = () => {
    const anchorEl = useRef(null)
    const [open, setOpen] = useState(false)
    const dispatch = useAppDispatch()
    const store = useAppSelector(selectStore).store
    const user = useAppSelector(selectUser)
    const handleMenu = () => {
        setOpen((p) => !p)
    }
    const [location, setLocation] = useState('')

    useEffect(() => {
        setLocation(
            store.city
                ? `${store.streetAddress}, ${store.state} ${store.zipcode}`
                : 'Select a Store'
        )
    }, [store])

    const handleLogout = () => {
        dispatch(signOutUser())
        handleMenu()
    }

    const handleUser = () => {
        if (user.email) {
            dispatch(toggleUserModal())
        } else {
            dispatch(toggleLoginModal())
        }
        handleMenu()
    }

    const handleCart = () => {
        dispatch(toggleCartModal())
        if (open) handleMenu()
    }

    const handleOrders = () => {
        dispatch(togglePastOrderModal())
        handleMenu()
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
            <Container>
                <Grid2
                    container
                    ref={anchorEl}
                    justifyContent="space-between"
                    wrap="nowrap"
                >
                    <Button
                        color="inherit"
                        onClick={() => dispatch(toggleStoreModal())}
                    >
                        <Grid2
                            container
                            alignItems="center"
                            spacing={2}
                            justifyContent="space-around"
                            wrap="nowrap"
                        >
                            <Grid2>
                                <LocalPizza fontSize="large" />
                            </Grid2>
                            <Grid2>
                                <Stack alignItems="start">
                                    <Font
                                        variant="h4"
                                        textOverflow="ellipsis"
                                        maxWidth="100%"
                                        overflow="hidden"
                                        whiteSpace="nowrap"
                                    >
                                        {store.city}
                                    </Font>
                                    <Font
                                        textOverflow="ellipsis"
                                        maxWidth="100%"
                                        overflow="hidden"
                                        whiteSpace="nowrap"
                                    >
                                        {location}
                                    </Font>
                                </Stack>
                            </Grid2>
                        </Grid2>
                    </Button>
                    <Grid2
                        container
                        spacing={2}
                        wrap="nowrap"
                        alignItems="center"
                    >
                        <Grid2
                            display={{ xs: 'none', sm: 'initial', xl: 'none' }}
                        >
                            <IconButton color="inherit" onClick={handleCart}>
                                <ShoppingCart fontSize="medium" />
                            </IconButton>
                        </Grid2>
                        <Grid2
                            display={{ xs: 'initial', xl: 'none' }}
                            onClick={handleMenu}
                        >
                            <IconButton color="inherit">
                                <Menu fontSize="medium" />
                            </IconButton>
                        </Grid2>
                        <Grid2 display={{ xs: 'none', xl: 'initial' }}>
                            <IconButton color="inherit">
                                <Settings
                                    fontSize="medium"
                                    onClick={handleMenu}
                                />
                            </IconButton>
                        </Grid2>
                    </Grid2>
                </Grid2>
                <MUIMenu
                    keepMounted
                    anchorEl={anchorEl.current}
                    open={open}
                    onClose={handleMenu}
                    anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    anchorPosition={{ top: 50, left: 0 }}
                >
                    <MenuItem onClick={handleUser}>
                        <Stack direction="row" alignItems="center" spacing={2}>
                            <Avatar src={user.profileIMG} />
                            <Font>
                                {user.email
                                    ? `${user.firstName} ${user.lastName}`
                                    : 'Sign in/Sign up'}
                            </Font>
                        </Stack>
                    </MenuItem>
                    <MenuItem onClick={handleCart}>
                        <Stack direction="row" alignItems="center" spacing={2}>
                            <ShoppingCart fontSize="large" />
                            <Font>My Cart</Font>
                        </Stack>
                    </MenuItem>
                    {user.email && [
                        <MenuItem onClick={handleOrders}>
                            <Stack
                                direction="row"
                                alignItems="center"
                                spacing={2}
                            >
                                <ShoppingBag fontSize="large" />
                                <Font>My Orders</Font>
                            </Stack>
                        </MenuItem>,
                        <MenuItem onClick={handleLogout}>
                            <Stack
                                direction="row"
                                alignItems="center"
                                spacing={2}
                            >
                                <Logout fontSize="large" />
                                <Font>Log out</Font>
                            </Stack>
                        </MenuItem>,
                    ]}
                </MUIMenu>
            </Container>
        </AppBar>
    )
}

export default Bar
