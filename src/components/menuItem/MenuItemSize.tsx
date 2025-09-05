import { Button, Grid2, Stack, Typography as Font } from '@mui/material'
import Icon from '@/components/Icon/Icon.tsx'
import { MenuSizeButtonType } from '@/lib/classes/MenuItem.ts'

const MenuItemSize = ({
    onSelect,
    value = -1,
    sizes,
    disableToggle = false,
}: MenuItemSizeProps) => {
    return (
        <>
            <Grid2
                container
                justifyContent="space-between"
                width="100%"
                alignItems="center"
                position="relative"
            >
                {sizes.map((b, i) => (
                    <Grid2 key={b.title}>
                        <Button
                            style={{ height: '83px' }}
                            onClick={() => onSelect(i)}
                            variant={
                                !disableToggle
                                    ? 'contained'
                                    : value === -1
                                      ? 'contained'
                                      : value === i
                                        ? 'contained'
                                        : 'outlined'
                            }
                        >
                            <Stack direction="column" alignItems="center">
                                <Icon name={b.icon} size={b.iconSize} />
                                <Font autoCapitalize="sentences">
                                    {b.title}
                                </Font>
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
    onSelect: (size: number) => void

    constructor(params: MenuItemSizeProps) {
        Object.assign(this, params)
        this.onSelect = params.onSelect
    }
}

export default MenuItemSize
