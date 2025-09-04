import { Stack, Typography as Font } from '@mui/material'
import { StoreType } from '@/lib/db/model/store.ts'

const Store = (props: StoreType) => {
    return (
        <Stack direction="row" spacing={1} justifyContent="flex-start">
            <img
                src={props.image}
                style={{ height: 100 }}
                alt={`${props.city}, ${props.state} store`}
                loading="eager"
            />
            <Stack direction="column">
                <Font
                    noWrap
                    variant="h5"
                    overflow="hidden"
                    textOverflow="ellipsis"
                >
                    {props.city}
                </Font>
                <Font noWrap>{props.streetAddress}</Font>
                <Font noWrap>
                    {props.city}, {props.state} {props.zipcode}
                </Font>
                <Font noWrap>Wait Time: {props.waitTime}</Font>
            </Stack>
        </Stack>
    )
}
export default Store
