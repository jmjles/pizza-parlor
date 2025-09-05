import { Container, Grid2, Stack, Typography as Font } from '@mui/material'
import MenuItem from '@/components/menuItem/MenuItem'
import { MenuCategoryType } from '@/lib/db/model/menuCategory.ts'
import { useAppSelector } from '@/store/hooks.tsx'
import { selectItem } from '@/store/selectors.tsx'

const Menu = (props: MenuPropsType) => {
    const { menuItems } = useAppSelector(selectItem)
    const items = (category: MenuCategoryType) =>
        category.items.map((i) =>
            menuItems.find((m) => {
                return m._id === i._id
            })
        )
    return (
        <Container>
            <Stack spacing={2} padding={{ xs: 0, sm: 1 }} height={'100%'}>
                {props.items.map((i, n) => (
                    <Stack key={i._id} id={i._id}>
                        <Font
                            align="center"
                            variant="h4"
                            marginBottom={1}
                            color="#FFF"
                            fontWeight="bold"
                        >
                            {i.name}
                        </Font>
                        <Grid2
                            container
                            justifyContent="space-between"
                            spacing={2}
                            width="100%"
                        >
                            {items(i).map((m, x) => {
                                if (!m) return null
                                return (
                                    <Grid2
                                        key={m._id}
                                        size={{ xs: 12, sm: 6, md: 3.8 }}
                                    >
                                        <MenuItem
                                            {...m}
                                            elementId={`menu-item-row-${n}-item-${x}`}
                                        />
                                    </Grid2>
                                )
                            })}
                        </Grid2>
                    </Stack>
                ))}
            </Stack>
        </Container>
    )
}

type MenuPropsType = {
    items: MenuCategoryType[]
}
export default Menu
