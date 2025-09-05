import {
    Button,
    Divider,
    Grid2,
    Stack,
    Typography as Font,
} from '@mui/material'
import { ListTypes } from '@/components/Panel/ListPanel.tsx'
import Store from '@/components/stores/Store.tsx'
import Icon from '@/components/Icon/Icon.tsx'
import { Ingredient, IngredientType } from '@/lib/classes/Ingredient.ts'
import { isIngredient } from '@/utils/Form.tsx'

const ListItem = (props: ListItemPropsType) => {
    const { item, onClick } = props

    //Ingredient Type
    if (isIngredient(item)) {
        return (
            <Button onClick={() => onClick(item)} fullWidth variant="outlined">
                <Stack spacing={1} width="100%">
                    <Grid2
                        container
                        justifyContent="space-between"
                        spacing={5}
                        alignItems="center"
                    >
                        <Icon name={item.icon} size="large" />
                        <Font>{item.category}</Font>
                    </Grid2>
                    <Font
                        variant={'h6'}
                        textOverflow={'ellipsis'}
                        whiteSpace="nowrap"
                        overflow="hidden"
                    >
                        {item.name}
                    </Font>
                </Stack>
            </Button>
        )
    }

    //MenuCategory Type
    if ('variant' in item)
        return (
            <Button onClick={() => onClick(item)} fullWidth>
                <Stack spacing={1} width="100%">
                    <Grid2
                        container
                        justifyContent="space-between"
                        alignItems="center"
                        spacing={5}
                    >
                        <Font>{item.name}</Font>
                        <Font>{item.variant}</Font>
                    </Grid2>
                    <Divider />
                    <Font align="left">
                        Number of products: {item.items.length}
                    </Font>
                </Stack>
            </Button>
        )

    //Store Type
    if ('city' in item)
        return (
            <Button onClick={() => onClick(item)} fullWidth>
                <Store {...item} />
            </Button>
        )

    //Ingredients Type
    if ('category' in item && 'items' in item) {
        return (
            <Stack spacing={1} width="100%">
                <Font variant="h4">{item.category}</Font>
                <Divider />
                <Grid2 container spacing={1}>
                    {item.items.map((i: IngredientType) => (
                        <Grid2 key={i._id} width="210px">
                            <Button
                                onClick={() => onClick(i)}
                                variant="outlined"
                                fullWidth
                            >
                                <Stack spacing={1} width="100%">
                                    <Grid2
                                        container
                                        justifyContent="space-between"
                                        spacing={5}
                                        width="100%"
                                        alignItems="center"
                                    >
                                        <Icon name={i.icon} size="large" />
                                        <Font>{i.category}</Font>
                                    </Grid2>
                                    <Font
                                        variant={'h6'}
                                        textOverflow={'ellipsis'}
                                        whiteSpace="nowrap"
                                        overflow="hidden"
                                    >
                                        {i.name}
                                    </Font>
                                </Stack>
                            </Button>
                        </Grid2>
                    ))}
                </Grid2>
            </Stack>
        )
    }

    return (
        <Button onClick={() => onClick(item)} fullWidth>
            <Stack direction="row" alignItems="center" spacing={1}>
                <div style={{ width: '150px', flexShrink: 0 }}>
                    <img
                        src={item.image}
                        alt={`Picture of the ${item.title}`}
                        height={100}
                        style={{ width: '100%' }}
                        loading="eager"
                    />
                </div>

                <Stack direction="column" flexGrow={1}>
                    <Font variant={'h6'}>{item.title}</Font>
                    <Font variant="subtitle2">{item.description}</Font>
                </Stack>
            </Stack>
        </Button>
    )
}
type ListItemPropsType = {
    item: ListTypes
    onClick: any
}
export type IngredientProps = { category: string; items: IngredientType[] }
export default ListItem
