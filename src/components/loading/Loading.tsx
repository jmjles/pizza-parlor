import { useAppDispatch, useAppSelector } from '@/store/hooks.tsx'
import { selectLoading } from '@/store/selectors.tsx'
import Modal from '@/components/modal/Modal.tsx'
import { Box, CircularProgress, Grid2 } from '@mui/material'
import { useEffect, useState } from 'react'
import { toggleInitialLoad } from '@/store/slices.tsx'

const Loading = () => {
    const [init, setInit] = useState(false)
    const {
        loadingMenuItems,
        loadingUsers,
        loadingStores,
        loadingIngredients,
        initialLoad,
    } = useAppSelector(selectLoading)
    const dispatch = useAppDispatch()

    const loadingStates = [
        loadingIngredients,
        loadingStores,
        loadingUsers,
        loadingStores,
        loadingMenuItems,
    ]

    useEffect(() => {
        if (!initialLoad) return
        if (loadingStates.every((v) => !v)) {
            if (init) return
            setInit(true)
            setTimeout(() => dispatch(toggleInitialLoad()), 3000)
        }
    }, loadingStates)

    return (
        <Modal
            disableCloseButton
            open={initialLoad}
            title="One Moment"
            handleClose={() => {}}
        >
            <Grid2
                container
                justifyContent="center"
                height="250px"
                position="relative"
            >
                <Box
                    style={{
                        position: 'absolute',
                        top: '50%',
                        transform: 'translateY(-50%)',
                    }}
                >
                    <CircularProgress size={'72px'} />
                </Box>
            </Grid2>
        </Modal>
    )
}
export default Loading
