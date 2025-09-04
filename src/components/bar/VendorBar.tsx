import {
    Avatar,
    Container,
    Grid2,
    IconButton,
    Menu as MUIMenu,
    MenuItem,
    Stack,
    Tab,
    TabProps,
    Tabs,
    Typography as Font,
} from '@mui/material'
import { Logout, Settings } from '@mui/icons-material'
import { useRef, useState } from 'react'
import { useAppDispatch, useAppSelector } from '@/store/hooks.tsx'
import { selectUser } from '@/store/selectors.tsx'
import {
    clearStore,
    signOutUser,
    toggleLoginModal,
    toggleUserModal,
    toggleWelcomeModal,
} from '@/store/slices.tsx'

const VendorBar = (props: VendorBarPropsType) => {
    const {
        tab: [tab, setTab],
    } = props
    const [open, setOpen] = useState(false)
    const anchorEl = useRef(null)
    const user = useAppSelector(selectUser)
    const dispatch = useAppDispatch()
    const handleMenu = () => {
        setOpen((p) => !p)
    }
    const tabs: TabProps[] = [
        { label: 'Menu' },
        { label: 'Items' },
        { label: 'Ingredients' },
        { label: 'Reports' },
        { label: 'Orders' },
    ]

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

    return (
        <Container>
            <Grid2
                container
                ref={anchorEl}
                justifyContent="space-between"
                alignItems="center"
            >
                <Grid2>
                    <Tabs value={tab} onChange={(_, v) => setTab(v)}>
                        {tabs.map((t, i) => (
                            <Tab
                                key={i}
                                label={t.label}
                                id={`simple-tab-${i}`}
                                sx={{ color: '#FFF' }}
                            />
                        ))}
                    </Tabs>
                </Grid2>
                <Grid2>
                    <IconButton color="inherit">
                        <Settings fontSize="medium" onClick={handleMenu} />
                    </IconButton>
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
                        <Font>{`${user.firstName} ${user.lastName}`}</Font>
                    </Stack>
                </MenuItem>
                {user.email && (
                    <MenuItem onClick={handleLogout}>
                        <Stack direction="row" alignItems="center" spacing={2}>
                            <Logout fontSize="large" />
                            <Font>Log out</Font>
                        </Stack>
                    </MenuItem>
                )}
            </MUIMenu>
        </Container>
    )
}
export type VendorBarPropsType = { tab: [number, any] }
export default VendorBar
