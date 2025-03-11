import { Button, Grid2 } from '@mui/material'
import Store, { StoreType } from '@/components/stores/Store'
import Modal, { ModalPropType } from '@/components/modal/Modal'

const Stores = (props: StoresType) => {
    const { stores, modal } = props
    return (
        <Modal open={modal.open} title="Locations" handleClose={modal.handleClose}>
            <Grid2 container spacing={2} justifyContent="space-between">
                {
                    stores.map((s, i) => (
                        <Grid2 key={i} size={{ xs: 12, md: 6, lg: 4 }}>
                            <Button fullWidth style={{ justifyContent: 'start', textAlign: 'left' }}
                                    onClick={() => props.selectStore(s)}
                                    variant={s.streetAddress === props.selectedStore?.streetAddress ? 'contained' : 'text'}>
                                <Store {...s} />
                            </Button>
                        </Grid2>
                    ))
                }
            </Grid2>
        </Modal>
    )
}

type StoresType = {
    stores: StoreType[]
    selectedStore: StoreType | undefined
    selectStore: any
    modal: ModalPropType
}

export default Stores