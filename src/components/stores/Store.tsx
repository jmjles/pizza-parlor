import { Stack, Typography as Font } from '@mui/material'
import Image from 'next/image'

const Store = (props: StoreType) => {
    return (
        <Stack direction="row" spacing={1} justifyContent="flex-start">
            <Image src={{ src: props.image, width: 100, height: 100 }} alt={`${props.city}, ${props.state} store`}
            />
            <Stack direction="column">
                <Font noWrap variant="h5" overflow="hidden" textOverflow="ellipsis">
                    {props.city}
                </Font>
                <Font noWrap>{props.streetAddress}</Font>
                <Font noWrap>
                    {props.city}, {props.state} {props.zipcode}
                </Font>
                <Font noWrap>
                    Wait Time: {props.waitTime}
                </Font>
            </Stack>
        </Stack>
    )
}

export type StoreType = {
    city: string,
    state: string,
    streetAddress: string,
    zipcode: string,
    waitTime: string;
    image: string;
}
export default Store