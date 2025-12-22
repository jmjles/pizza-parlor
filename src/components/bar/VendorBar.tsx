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
import { useRef } from 'react'
import { useAppSelector } from '@/store/hooks.tsx'
import { selectUser } from '@/store/selectors.tsx'
import { BarProps } from './bar'

const VendorBar = (props: BarProps) => {
    const anchorEl = useRef(null)
    const user = useAppSelector(selectUser)

    const tabs: TabProps[] = [
        { label: 'Menu' },
        { label: 'Items' },
        { label: 'Ingredients' },
        { label: 'Reports' },
        { label: 'Orders' },
    ]

    return (
        <Container>
            <Grid2
                container
                ref={anchorEl}
                justifyContent="space-between"
                alignItems="center"
            >
                <Grid2>
                    <Tabs value={props.tab} onChange={(_, v) => props.handleTab}>
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
                        <Settings fontSize="medium" onClick={props.handleMenu} />
                    </IconButton>
                </Grid2>
            </Grid2>
            <MUIMenu
                keepMounted
                anchorEl={anchorEl.current}
                open={props.open}
                onClose={props.handleMenu}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                anchorPosition={{ top: 50, left: 0 }}
            >
                <MenuItem onClick={props.handleUser}>
                    <Stack direction="row" alignItems="center" spacing={2}>
                        <Avatar src={user.profileIMG} />
                        <Font>{`${user.firstName} ${user.lastName}`}</Font>
                    </Stack>
                </MenuItem>
                {user.email && (
                    <MenuItem onClick={props.handleLogout}>
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

export default VendorBar
