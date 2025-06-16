import { Card, Stack, SvgIconTypeMap,Typography as Font } from '@mui/material'
import { OverridableComponent } from '@mui/types'

const Ingredient = (props:IngredientProps)=> {
    const {ingredient,onSelect,selected} = props;
    return(
        <Card onClick={()=> onSelect(ingredient)}>
            <Stack>
                {
                    typeof ingredient.icon === "string" ?
                        <>
                        </>
                        :
                        <ingredient.icon fontSize="large" />
                }
                <Font variant="h5">{ingredient.name}</Font>
                {(selected !== -1 && ingredient.IngredientOptions) &&
                    <>
                        <Font>{ingredient.IngredientOptions[selected].quantity}</Font>
                        <Font>+ $ {ingredient.IngredientOptions[selected].price}</Font>
                    </>
                }
            </Stack>
        </Card>
    )
}
type IngredientProps = {
    ingredient:IngredientType;
    onSelect: (x:IngredientType) => void;
    selected:number;
}

type IngredientQuantityLevel = "none" | "light" | "normal" | "extra" | "double";

type IngredientOption = {
    quantity: IngredientQuantityLevel;
    price: number;
};

export type IngredientType = {
    name: string;
    icon: OverridableComponent<SvgIconTypeMap> | string;
    IngredientOptions: IngredientOption[] | null; // null if exclusive
    isExclusive?: boolean; // mark true for crust/sauce
};

export default Ingredient;