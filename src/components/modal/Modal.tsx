import { Container, Dialog, DialogContent, DialogTitle, IconButton } from '@mui/material'
import { Close } from '@mui/icons-material'
import { JSX } from 'react'

const Modal = (props: ModalType) => {

    return (
        <Dialog open={props.open} maxWidth="lg" onClose={props.handleClose}>
            <Container style={{ textAlign: 'right' }} disableGutters>
                <IconButton color="error"><Close /></IconButton>
            </Container>
            <DialogTitle align="center" variant="h3" sx={{ paddingTop: '0px' }}>
                {props.title}
            </DialogTitle>
            <DialogContent>
                {props.children}
            </DialogContent>
        </Dialog>
    )
}

interface ModalType extends ModalPropType {
    title: string;
    children: JSX.Element;
}

export type ModalPropType = {
    open: boolean;
    handleClose: any;
}
export default Modal