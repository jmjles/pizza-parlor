import { Button, Stack, Typography as Font } from '@mui/material'
import Icon from '@/components/Icon/Icon.tsx'
import { IngredientType } from '@/lib/classes/Ingredient.ts'

const Ingredient = (props: IngredientProps) => {
    const { ingredient, onSelect, selected, isSelected } = props
    const show = selected !== -1 && ingredient.IngredientOptions
    return (
        <Button
            onClick={() => onSelect(ingredient)}
            sx={{ width: 150 }}
            variant={isSelected ? 'contained' : 'outlined'}
        >
            <Stack alignItems="center">
                <Icon name={ingredient.icon} size="medium" />
                <Font variant="button">{ingredient.name}</Font>
                <Font visibility={show ? 'visible' : 'hidden'}>
                    {ingredient.IngredientOptions?.[selected]?.quantity}
                </Font>
                <Font visibility={show ? 'visible' : 'hidden'}>
                    + $ {ingredient.IngredientOptions?.[selected]?.price}
                </Font>
            </Stack>
        </Button>
    )
}
type IngredientProps = {
    ingredient: IngredientType
    onSelect: (x: IngredientType) => void
    selected: number
    isSelected: boolean
}

// type IngredientQuantityLevel = "none" | "light" | "normal" | "extra" | "double";
//
// type IngredientOption = {
//     quantity: IngredientQuantityLevel;
//     price: number;
// };
//
// export type IngredientType = {
//     name: string;
//     icon: IconNameType;
//     IngredientOptions: IngredientOption[] | null; // null if exclusive
//     isExclusive?: boolean; // mark true for crust/sauce
//     id:number
// };

export default Ingredient
