import {
    Button,
    Grid2,
    Stack,
    Typography as Font,
} from '@mui/material'
import { MenuSizeButtonType } from '@/components/menuItem/MenuItem'

const MenuItemSize = (props: MenuItemSizeProps) => {
    return (
        <>
            <Grid2
                container
                justifyContent="space-between"
                width="100%"
                alignItems="center"
                position="relative"
            >
                {props.sizes.map((b, i) => (
                    <Grid2 key={b.title}>
                        <Button style={{ height: '83px' }} onClick={() => props.onSelect(i)}
                                variant={props.value === i && !props.disableToggle ? 'contained' : 'text'}>
                            <Stack direction="column" alignItems="center">
                                <b.icon fontSize={b.iconSize} />
                                <Font autoCapitalize="sentences">{b.title}</Font>
                                <Font whiteSpace="nowrap">{b.price}</Font>
                            </Stack>
                        </Button>
                    </Grid2>
                ))}
            </Grid2>
        </>

    )
}

class MenuItemSizeProps {
    sizes: MenuSizeButtonType[] = []
    disableToggle?: boolean = false
    value?: number = -1
    onSelect: any

    constructor(params: MenuItemSizeProps) {
        Object.assign(this, params)
    }
}

export default MenuItemSize