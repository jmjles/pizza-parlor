import { Divider, Grid2, Stack, Typography as Font } from '@mui/material'
import { ScreenProps } from '@/components/vendor/MenuBuilder/MenuBuilder.tsx'
import { useAppSelector } from '@/store/hooks.tsx'
import { selectItem } from '@/store/selectors.tsx'
import Panel from '@/components/Panel/Panel.tsx'
import ListItem from '@/components/Panel/ListItem.tsx'
import { Edit } from '@mui/icons-material'

const Category = (props: ScreenProps) => {
    const {
        screen: [screen, setScreen],
    } = props
    const { category, menuItems } = useAppSelector(selectItem)
    const handleBack = () => {
        setScreen('categories')
    }
    const handleEdit = () => {
        setScreen('editCategory')
    }
    const Btn = () => (
        <Grid2 container spacing={2} alignItems="center">
            <Font>Edit Category</Font>
            <Edit />
        </Grid2>
    )

    return (
        <Panel
            title={category.name}
            handleBack={handleBack}
            handleAction={handleEdit}
            actionBtn={<Btn />}
        >
            <Stack spacing={2}>
                <Font variant={'h6'} textTransform={'capitalize'}>
                    {category.variant}
                </Font>
                <Divider />
                <Font>Number of products: {category.items.length}</Font>
                <Grid2 container spacing={2} paddingBottom={2}>
                    {category.items.map((item) => (
                        <Grid2 key={item._id} maxWidth={400}>
                            <ListItem item={item} onClick={() => {}} />
                        </Grid2>
                    ))}
                </Grid2>
            </Stack>
        </Panel>
    )
}
export default Category
