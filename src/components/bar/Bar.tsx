'use client'
import { Menu, LocalPizza, Settings, ShoppingCart, Logout, ShoppingBag } from '@mui/icons-material'
import {
    AppBar, Button,
    Container,
    Grid2,
    IconButton, Stack,
    Typography as Font,
    Menu as MUIMenu, MenuItem, Avatar,
} from '@mui/material'
import blackBoard from '@/assets/images/blackboard.jpg'
import woodBorder from '@/assets/images/wood-border.jpg'
import { useRef, useState } from 'react'

const Bar = (props: BarType) => {
    const anchorEl = useRef(null)
    const [open, setOpen] = useState(false)

    const handleMenu = () => {
        setOpen(p => !p)
    }
    return (
        <AppBar position="sticky" style={{
            backgroundImage: `url(${blackBoard.src})`,
            borderImage: `url(${woodBorder.src}) 20`,
            borderImageRepeat: 'repeat',
            borderWidth: '10px',
            borderBottomStyle: 'solid',
        }}>
            <Container>
                <Grid2 container ref={anchorEl} justifyContent="space-between" wrap="nowrap">
                    <Button color="inherit" onClick={props.openLocations}>
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
                                    <Font variant="h4" textOverflow="ellipsis" maxWidth="100%" overflow="hidden"
                                          whiteSpace="nowrap">{props.city}</Font>
                                    <Font textOverflow="ellipsis" maxWidth="100%" overflow="hidden"
                                          whiteSpace="nowrap">{props.location}</Font>
                                </Stack>
                            </Grid2>
                        </Grid2>
                    </Button>
                    <Grid2 container spacing={2} wrap="nowrap" alignItems="center">
                        <Grid2 display={{ xs: 'none', sm: 'initial', xl: 'none' }}>
                            <IconButton color="inherit">
                                <ShoppingBag fontSize="medium" />
                            </IconButton>
                        </Grid2>
                        <Grid2 display={{ xs: 'initial', xl: 'none' }}  onClick={handleMenu}>
                            <IconButton color="inherit">
                                <Menu fontSize="medium" />
                            </IconButton>
                        </Grid2>
                        <Grid2 display={{ xs: 'none', xl: 'initial' }}>
                            <IconButton color="inherit">
                                <Settings fontSize="medium" onClick={handleMenu} />
                            </IconButton>
                        </Grid2>
                    </Grid2>
                </Grid2>
                <MUIMenu keepMounted anchorEl={anchorEl.current} open={open} onClose={handleMenu}
                         anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }} transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }} anchorPosition={{ top: 50, left: 0 }}>
                    <MenuItem>
                        <Stack direction="row" alignItems="center" spacing={2}>
                            <Avatar />
                            <Font>Username</Font>
                        </Stack>
                    </MenuItem>
                    <MenuItem>
                        <Stack direction="row" alignItems="center" spacing={2}>
                            <ShoppingCart fontSize="large" />
                            <Font>My Orders</Font>
                        </Stack>
                    </MenuItem>
                    <MenuItem>
                        <Stack direction="row" alignItems="center" spacing={2}>
                            <Logout fontSize="large" />
                            <Font>Log out</Font>
                        </Stack>
                    </MenuItem>
                </MUIMenu>
            </Container>
        </AppBar>
    )
}

export type BarType = {
    city: string;
    location: string
    openLocations: any
};

export default Bar
