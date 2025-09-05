import { Divider, Grid2, Stack, Typography } from '@mui/material'
import Modal from '@/components/modal/Modal.tsx'
import Ingredient from '@/components/itemCustomization/Ingredient.tsx'
import { useState } from 'react'
import { MenuSizeButtonType } from '@/components/menuItem/MenuItem.tsx'
import { useAppSelector } from '@/store/hooks.tsx'
import { selectItem } from '@/store/selectors.tsx'
import { IngredientType } from '@/lib/classes/Ingredient.ts'

const Ingredients = (props: IngredientsProps) => {
    const { items, onClick, selectedIngredients } = props
    const [selected, setSelected] = useState<IngredientType>()
    const [open, setOpen] = useState(false)
    const [amount, setAmount] = useState(-1)
    const { menuItem } = useAppSelector(selectItem)

    // const handleIngredient = (i: IngredientType) => {
    //     setSelected(i)
    //     setOpen(true)
    //      const defaultIngredient = menuItem.ingredients?.filter(i=>i.id === selected?.id)[0]
    //      if(defaultIngredient) {
    //          setAmount(defaultIngredient.amount)
    //      }
    // }

    const handleClose = () => {
        setOpen(false)
    }
    const handleSize = (amount: number) => {
        setAmount(amount)
    }

    const defaultAmounts: MenuSizeButtonType[] = [
        {
            iconSize: 'medium',
            title: 'None',
            icon: 'cancel',
            price: '$0.00',
        },
        {
            iconSize: 'medium',
            title: 'Light',
            icon: 'pizza',
            price: '$0.00',
        },
        {
            iconSize: 'medium',
            title: 'Normal',
            icon: 'pizza',
            price: '$0.50',
        },
        {
            iconSize: 'medium',
            title: 'Extra',
            icon: 'pizza',
            price: '$0.80',
        },
    ]
    //
    // const isIngredientSelected = (i: IngredientType) => {
    //     const ingredientInRecipe = menuItem?.ingredients?.find(
    //         (x) => x.id === i.id
    //     )
    //
    //
    //     const isSelected = selectedIngredients.find((x) => x === i.id)
    //     if (i.name === 'Mozzarella') {
    //         console.log(selectedIngredients)
    //         console.log(isSelected)
    //     }
    //     if (ingredientInRecipe && !isSelected) return true
    //
    //     if (ingredientInRecipe && isSelected) return false
    //     return !!isSelected
    // }

    return (
        <>
            {/*<Modal*/}
            {/*    title={selected?.name || ''}*/}
            {/*    open={open}*/}
            {/*    handleClose={handleClose}*/}
            {/*>*/}
            {/*    <MenuItemSize*/}
            {/*        sizes={defaultAmounts}*/}
            {/*        value={amount}*/}
            {/*        onSelect={handleSize}*/}
            {/*    />*/}
            {/*</Modal>*/}
            <Stack spacing={1}>
                {items.map((item) => (
                    <Stack spacing={1}>
                        <Typography variant="h4">{item.name}</Typography>
                        <Divider />
                        <Grid2
                            container
                            justifyContent="space-between"
                            spacing={1}
                        >
                            {item.ingredients.map((ingredient) => {
                                return (
                                    <Ingredient
                                        ingredient={ingredient}
                                        onSelect={onClick}
                                        selected={amount}
                                        isSelected={
                                            !!selectedIngredients.find(
                                                (x) => x === ingredient._id
                                            )
                                        }
                                    />
                                )
                            })}
                        </Grid2>
                    </Stack>
                ))}
            </Stack>
        </>
    )
}
export default Ingredients
type IngredientsProps = {
    items: { name: string; ingredients: IngredientType[] }[]
    onClick: any
    selectedIngredients: string[]
}
