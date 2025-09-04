import Modal from '@/components/modal/Modal'
import {
    Button,
    Grid2,
    Stack,
    Typography as Font,
    FormControlLabel,
    Radio,
    RadioGroup,
} from '@mui/material'
import { DeliveryDining, FoodBank, Storefront } from '@mui/icons-material'
import Image from 'next/image'
import { useState } from 'react'
import { useAppDispatch, useAppSelector } from '@/store/hooks.tsx'
import { selectModal, selectStore } from '@/store/selectors.tsx'
import { toggleOrderModal, toggleStoreModal } from '@/store/slices.tsx'
//Todo: use in future
const Order = () => {
    const dispatch = useAppDispatch()
    const modals = useAppSelector(selectModal)
    const store = useAppSelector(selectStore).store
    const [orderTime, setOrderTime] = useState('asap')

    const handleOrderTime = (val: string) => {
        setOrderTime(val)
    }

    const handleModal = () => {
        dispatch(toggleOrderModal())
    }

    return (
        <Modal
            title="New Order"
            open={modals.orderModal}
            handleClose={handleModal}
            fullscreen="sm"
        >
            <Grid2 container direction="column" spacing={2}>
                <Grid2>
                    <Stack
                        direction="row"
                        spacing={{ xs: 0, sm: 2 }}
                        justifyContent={{ xs: 'initial', sm: 'space-around' }}
                        flexWrap={{ xs: 'wrap', sm: 'nowrap' }}
                    >
                        <Button fullWidth>
                            <Stack direction="row" alignItems="center">
                                <DeliveryDining style={{ fontSize: '64px' }} />
                                <Stack alignItems="start">
                                    <Font>Delivery</Font>
                                    <Font>12 Minutes</Font>
                                </Stack>
                            </Stack>
                        </Button>
                        <Button fullWidth>
                            <Stack direction="row" alignItems="center">
                                <FoodBank style={{ fontSize: '64px' }} />
                                <Stack alignItems="start">
                                    <Font>Carry Out</Font>
                                    <Font>12 Minutes</Font>
                                </Stack>
                            </Stack>
                        </Button>
                    </Stack>
                </Grid2>
                <Grid2>
                    <Font variant="h5">Selected Store</Font>
                    <Button
                        fullWidth
                        onClick={() => dispatch(toggleStoreModal())}
                    >
                        <Grid2
                            direction="row"
                            spacing={2}
                            alignItems="center"
                            container
                            width="100%"
                            textAlign="left"
                        >
                            <Grid2>
                                {store ? (
                                    <Image
                                        src={{
                                            src: store.image,
                                            height: 100,
                                            width: 100,
                                        }}
                                        alt="Parlor Pizza"
                                        style={{ borderRadius: '10px' }}
                                    />
                                ) : (
                                    <Storefront style={{ fontSize: '100px' }} />
                                )}
                            </Grid2>
                            <Grid2>
                                <Stack>
                                    {store ? (
                                        <>
                                            <Font>{store.city}</Font>
                                            <Font>{store.streetAddress}</Font>
                                            <Font>
                                                {store.state} {store.zipcode}
                                            </Font>
                                        </>
                                    ) : (
                                        <Font>Select a Store</Font>
                                    )}
                                </Stack>
                            </Grid2>
                        </Grid2>
                    </Button>
                </Grid2>
                <Grid2>
                    <Font variant="h5">Order Time</Font>
                    <RadioGroup
                        value={orderTime}
                        onChange={(_, val) => handleOrderTime(val)}
                    >
                        <FormControlLabel
                            control={<Radio />}
                            label="ASAP"
                            value="asap"
                        />
                        <FormControlLabel
                            control={<Radio />}
                            label="Later"
                            value="later"
                        />
                    </RadioGroup>
                </Grid2>
                {orderTime === 'later' && <Grid2></Grid2>}
                <Grid2 alignSelf="flex-end">
                    <Button variant="contained">Continue</Button>
                </Grid2>
            </Grid2>
        </Modal>
    )
}

export default Order
