import { Button, Grid2 } from '@mui/material'
import Store from '@/components/stores/Store'
import Modal from '@/components/modal/Modal'
import { useAppDispatch, useAppSelector } from '@/store/hooks.tsx'
import { selectModal, selectStore } from '@/store/selectors.tsx'
import { setStore, toggleStoreModal } from '@/store/slices.tsx'
import { StoreType } from '@/lib/db/model/store.ts'

const Stores = (props: StoresType) => {
    const { stores } = props
    const dispatch = useAppDispatch()
    const modals = useAppSelector(selectModal)
    const store = useAppSelector(selectStore).store

    const handleClose = () => {
        dispatch(toggleStoreModal())
    }

    const handleStore = (store: StoreType) => {
        dispatch(setStore(store))
        handleClose()
    }

    return (
        <Modal
            open={modals.storeModal}
            title="Locations"
            handleClose={handleClose}
            disableCloseButton={!store.city.length}
        >
            <Grid2 container spacing={2} justifyContent="space-between">
                {stores.map((s, i) => (
                    <Grid2 key={s._id} size={{ xs: 12, md: 6, lg: 4 }}>
                        <Button
                            id={`store-button-${i}`}
                            fullWidth
                            style={{
                                textAlign: 'left',
                            }}
                            onClick={() => handleStore(s)}
                            variant={
                                s.streetAddress === store.streetAddress
                                    ? 'contained'
                                    : 'text'
                            }
                        >
                            <Store {...s} />
                        </Button>
                    </Grid2>
                ))}
            </Grid2>
        </Modal>
    )
}

type StoresType = {
    stores: StoreType[]
}

export default Stores
