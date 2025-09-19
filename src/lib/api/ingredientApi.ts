import { callApi, createHeader } from '@/lib/api/utils.ts'
import { IngredientType } from '@/lib/classes/Ingredient.ts'

const ingredientURL = '/api/ingredients'

export default {
    createIngredient: async (ingredient: Omit<IngredientType, '_id'>) => {
        const token = localStorage.getItem('token') || ''
        return await callApi(
            ingredientURL,
            createHeader({
                token,
                method: 'POST',
                body: { fields: ingredient },
            })
        )
    },
    updateIngredient: async (ingredient: IngredientType) => {
        const token = localStorage.getItem('token') || ''
        return await callApi(
            ingredientURL,
            createHeader({ token, method: 'PUT', body: { fields: ingredient } })
        )
    },
    removeIngredient: async (_id: string) => {
        const token = localStorage.getItem('token') || ''
        return await callApi(
            ingredientURL,
            createHeader({ token, method: 'DELETE', body: { fields: { _id } } })
        )
    },
    getIngredients: async () => {
        const token = localStorage.getItem('token') || ''
        return await callApi(
            ingredientURL,
            createHeader({ token, method: 'GET' })
        )
    },
}
