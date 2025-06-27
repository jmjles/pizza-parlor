import Modal from '@/components/modal/Modal.tsx'
import { useAppDispatch, useAppSelector } from '@/store/hooks.tsx'
import { selectModal, selectUser } from '@/store/selectors.tsx'
import { toggleDeleteAccountModal } from '@/store/slices.tsx'
import { Button, Stack, Typography as Font } from '@mui/material'
import { Cancel, Delete } from '@mui/icons-material'

const DeleteUser = () => {
    const modals = useAppSelector(selectModal)
    const user = useAppSelector(selectUser)
    const dispatch = useAppDispatch()

    const handleClose = () => {
        dispatch(toggleDeleteAccountModal())
    }

    const handleDelete = () => {
        if (user.type === 'example') {
            alert("Can't delete example user")
            return
        }
        //TODO
    }

    return (
        <Modal
            title="Delete Account?"
            open={modals.deleteAccountModal}
            handleClose={handleClose}
        >
            <Stack direction="row" spacing={2}>
                <Button variant="contained" color="error" onClick={handleDelete}>
                    <Stack direction="row" spacing={2}>
                        <Delete />
                        <Font variant="button">Delete Account</Font>
                    </Stack>
                </Button>
                <Button variant="contained" onClick={handleClose}>
                    <Stack direction="row" spacing={2}>
                        <Cancel /> <Font variant="button">Cancel</Font>
                    </Stack>
                </Button>
            </Stack>
        </Modal>
    )
}
export default DeleteUser
