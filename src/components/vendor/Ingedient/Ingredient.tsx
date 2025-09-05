import Panel from '@/components/Panel/Panel.tsx'
import { Grid2, Typography as Font } from '@mui/material'
import { Edit } from '@mui/icons-material'
import { IngredientType } from '@/lib/classes/Ingredient.ts'
import Icon from '@/components/Icon/Icon.tsx'

const Ingredient = (props: IngredientProps) => {
    const {
        ingredient,
        screen: [screen, setScreen],
    } = props

    const handleBack = () => {
        setScreen('ingredients')
    }
    const handleEdit = () => {
        setScreen('editIngredient')
    }
    const EditBtn = () => (
        <Grid2 container spacing={1}>
            <Font>Edit Ingredient</Font>
            <Edit />
        </Grid2>
    )
    return (
        <Panel
            title={ingredient.name}
            handleBack={handleBack}
            handleAction={handleEdit}
            actionBtn={<EditBtn />}
        >
            <Grid2
                container
                spacing={1}
                paddingBottom={3}
                alignItems="center"
                justifyContent="center"
            >
                <Icon name={ingredient.icon} size={'large'} />
                <Font>{ingredient.category}</Font>
            </Grid2>
        </Panel>
    )
}
type IngredientProps = {
    screen: [string, any]
    ingredient: IngredientType
}
export default Ingredient
