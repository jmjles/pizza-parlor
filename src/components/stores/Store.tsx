import { Grid2, Stack, Typography as Font } from '@mui/material'
import { StoreType } from '@/lib/db/model/store.ts'

const Store = (props: StoreType) => {
    return (
        <Grid2
            container
            spacing={1}
            justifyContent="space-between"
            width="100%"
            wrap="nowrap"
            maxWidth={400}
        >
            <img
                src={props.image}
                style={{ height: 100 }}
                alt={`${props.city}, ${props.state} store`}
                loading="eager"
            />
            <Stack>
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
        </Grid2>
    )
}
export default Store
