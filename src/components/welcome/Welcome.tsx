import Modal from '@/components/modal/Modal.tsx'
import { useAppDispatch, useAppSelector } from '@/store/hooks.tsx'
import { selectModal } from '@/store/selectors.tsx'
import {
    toggleLoginModal,
    toggleStoreModal,
    toggleWelcomeModal,
} from '@/store/slices.tsx'
import { Button, Grid2, Typography as Font } from '@mui/material'
import { LocalPizza } from '@mui/icons-material'

const Welcome = () => {
    const modals = useAppSelector(selectModal)
    const dispatch = useAppDispatch()
    const handleClose = () => {
        dispatch(toggleWelcomeModal())
    }

    const browseMenu = () => {
        handleClose()
        dispatch(toggleStoreModal())
    }

    const openLogin = () => {
        handleClose()
        dispatch(toggleLoginModal())
    }

    return (
        <Modal
            title="Pizza Parlor"
            open={modals.welcomeModal}
            handleClose={() => {}}
            maxWidth={'md'}
            disableCloseButton
        >
            <Grid2
                container
                direction="column"
                alignItems="center"
                spacing={2}
                component="form"
            >
                <LocalPizza style={{ fontSize: '128px' }} />
                <Font variant="h4">Get Started</Font>
                <Grid2 container spacing={6}>
                    <Grid2>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={browseMenu}
                            id="browse-menu-button"
                        >
                            Browse Menu
                        </Button>
                    </Grid2>
                    <Grid2>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={openLogin}
                            id="order-now-button"
                        >
                            Order Now
                        </Button>
                    </Grid2>
                </Grid2>
            </Grid2>
        </Modal>
    )
}
export default Welcome
