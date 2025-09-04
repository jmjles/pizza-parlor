import ListPanel from '@/components/Panel/ListPanel.tsx'
import { useState } from 'react'
import { useAppDispatch, useAppSelector } from '@/store/hooks.tsx'
import { selectIngredient } from '@/store/selectors.tsx'
import { setIngredient } from '@/store/slices.tsx'
import { Stack, Typography as Font } from '@mui/material'
import { Add } from '@mui/icons-material'
import Ingredient from '@/components/vendor/Ingedient/Ingredient.tsx'
import NewIngredient from '@/components/vendor/Ingedient/NewIngredient.tsx'
import EditIngredient from '@/components/vendor/Ingedient/EditIngredient.tsx'
import { Ingredient as IngredientClass } from '@/lib/classes/Ingredient.ts'

const Ingredients = () => {
    const { ingredients, ingredient } = useAppSelector(selectIngredient)
    const dispatch = useAppDispatch()
    const [screen, setScreen] = useState('ingredients')

    const handleCategory = () => {
        setScreen('newIngredient')
    }

    const handleIngredient = (i: IngredientClass) => {
        dispatch(setIngredient(i.data()))
        setScreen('ingredient')
    }

    const Btn = () => (
        <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            spacing={1}
        >
            <Font>Create Ingredient</Font>
            <Add />
        </Stack>
    )
    const organizedIngredients = (): OrganizedIngredientsType[] => {
        const categories: string[] = []
        const categoriesSet = new Set(
            ingredients.map((i) => i.category)
        ).values()
        categoriesSet.forEach((category) => {
            categories.push(category)
        })
        return categories.map((c) => {
            return {
                category: c,
                items: ingredients.filter((l) => l.category === c),
            }
        })
    }

    const showIngredients = () => screen === 'ingredients'
    const showIngredient = () => screen === 'ingredient'
    const showNewIngredient = () => screen === 'newIngredient'
    const showEditIngredient = () => screen === 'editIngredient'

    return (
        <>
            {showIngredients() && (
                <ListPanel
                    title="Ingredients"
                    list={organizedIngredients()}
                    emptyList="No ingredients available!"
                    handleAction={handleCategory}
                    onClick={handleIngredient}
                    actionBtn={<Btn />}
                    spacing={1}
                    itemWidth={'100%'}
                />
            )}
            {showIngredient() && (
                <Ingredient
                    ingredient={ingredient}
                    screen={[screen, setScreen]}
                />
            )}
            {showNewIngredient() && (
                <NewIngredient screen={[screen, setScreen]} />
            )}
            {showEditIngredient() && (
                <EditIngredient screen={[screen, setScreen]} />
            )}
        </>
    )
}

export type OrganizedIngredientsType = {
    category: string
    items: IngredientClass[]
}
export default Ingredients
