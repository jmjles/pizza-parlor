import Panel from '@/components/Panel/Panel.tsx'
import { Chip, Divider, Grid2, Stack, Typography as Font } from '@mui/material'
import { Edit } from '@mui/icons-material'
import { ScreenProps } from '@/components/vendor/MenuBuilder/MenuBuilder.tsx'
import { MenuItemTypes } from '@/store/initialState.ts'

const Item = (props: ItemProps) => {
    const {
        item,
        screen: [screen, setScreen],
    } = props

    const showIngredients = () =>
        item.ingredients && item.ingredients.length > 0

    const handleBack = () => {
        setScreen('items')
    }
    const handleEdit = () => {
        setScreen('editItem')
    }
    const EditBtn = () => (
        <Grid2 container spacing={1} alignItems="center">
            <Font>Edit</Font>
            <Edit />
        </Grid2>
    )
    return (
        <Panel
            title={item.title}
            handleBack={handleBack}
            handleAction={handleEdit}
            actionBtn={<EditBtn />}
        >
            <Grid2 container spacing={2} paddingBottom={3}>
                <Grid2>
                    <img src={item.image} alt={item.title} height={200} />
                </Grid2>
                <Grid2>
                    <Stack>
                        <Font variant="h4">Description</Font>
                        <Divider />
                        <Font variant="subtitle1">{item.description}</Font>
                        {showIngredients() && (
                            <>
                                <Font variant="h4">Ingredients</Font>
                                <Divider />
                                <Grid2
                                    direction="row"
                                    marginTop={2}
                                    spacing={1}
                                >
                                    {item.ingredients?.map((m) => (
                                        <Chip
                                            key={m._id}
                                            clickable
                                            title={m.name}
                                            label={m.name}
                                        />
                                    ))}
                                </Grid2>
                            </>
                        )}
                    </Stack>
                </Grid2>
            </Grid2>
        </Panel>
    )
}
interface ItemProps extends ScreenProps {
    item: MenuItemTypes
}
export default Item
