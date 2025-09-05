import {
    Breakpoint,
    Container,
    Dialog,
    DialogContent,
    DialogTitle,
    IconButton,
    useMediaQuery,
    useTheme,
} from '@mui/material'
import { Close } from '@mui/icons-material'
import { JSX } from 'react'

const Modal = (props: ModalType) => {
    const theme = useTheme()
    const fullscreen = useMediaQuery(
        theme.breakpoints.down(props.fullscreen || 'sm')
    )
    return (
        <Dialog
            open={props.open}
            maxWidth={props.maxWidth || 'lg'}
            onClose={props.disableCloseButton ? () => {} : props.handleClose}
            scroll="paper"
            fullScreen={fullscreen}
        >
            <Container
                style={{
                    textAlign: 'right',
                    display: props.disableCloseButton ? 'none' : '',
                    position: 'sticky',
                    top: 0,
                    backgroundColor: '#FFF',
                    zIndex: 20,
                }}
                disableGutters
            >
                <IconButton color="error" onClick={props.handleClose}>
                    <Close />
                </IconButton>
            </Container>
            <DialogTitle
                align="center"
                variant="h3"
                sx={{ paddingTop: props.disableCloseButton ? '' : '0px' }}
            >
                {props.title}
            </DialogTitle>
            <DialogContent sx={{ overflowY: 'visible' }}>
                {props.children}
            </DialogContent>
        </Dialog>
    )
}

interface ModalType extends ModalPropType {
    title: string
    children: JSX.Element
}

export type ModalPropType = {
    open: boolean
    handleClose: any
    maxWidth?: Breakpoint
    fullscreen?: Breakpoint
    disableCloseButton?: boolean
}
export default Modal
