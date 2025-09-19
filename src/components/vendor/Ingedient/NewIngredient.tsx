import CreatePanel, {
    CreatePanelFieldsType,
} from '@/components/Panel/CreatePanel.tsx'
import React, { FormEvent, useEffect, useState } from 'react'
import { iconNameList } from '@/components/Icon/Icon.tsx'
import ingredientApi from '@/lib/api/ingredientApi.ts'
import { useAppDispatch, useAppSelector } from '@/store/hooks.tsx'
import { selectIngredient } from '@/store/selectors.tsx'
import {
    FormControl,
    InputLabel,
    MenuItem,
    OutlinedInput,
    Select,
} from '@mui/material'
import { IngredientType } from '@/lib/classes/Ingredient.ts'
import { ingredientInitialState } from '@/store/initialState.ts'
import { refreshIngredients } from '@/store/slices.tsx'

const NewIngredient = (props: NewIngredientProps) => {
    const {
        screen: [screen, setScreen],
    } = props
    const dispatch = useAppDispatch()
    const { ingredients } = useAppSelector(selectIngredient)
    const [categories, setCategories] = useState<string[]>([])
    const [fieldData, setFieldData] = useState<IngredientType>(
        ingredientInitialState.ingredient
    )
    const [loading,setLoading] = useState(false)

    useEffect(() => {
        const categoriesSet = new Set(
            ingredients.map((i) => i.category)
        ).values()
        const categories: string[] = []
        for (const category of categoriesSet) {
            categories.push(category)
        }
        setCategories(categories)
    }, [])

    const handleChange = (e: any) => {
        const { name, value } = e.target
        setFieldData((f: any) => {
            return { ...f, [name]: value }
        })
    }

    const handleBack = () => {
        setScreen('ingredients')
    }

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const { _id, ...data } = fieldData
        const res = await ingredientApi.createIngredient(data)
        setLoading(true)
        if (res._id) {
            dispatch(refreshIngredients())
            handleBack()
            alert(`Ingredient created successfully`)
            return
        }
        alert(`Ingredient created unsuccessfully`)
        setLoading(false)
    }

    const fields: CreatePanelFieldsType[] = [
        {
            name: 'name',
            label: 'Ingredient Name',
            onChange: handleChange,
            value: fieldData.name,
            required: true,
            fullWidth: true,
        },
        () => (
            <FormControl fullWidth required>
                <InputLabel id="demo-multiple-chip-label">
                    Ingredient Category
                </InputLabel>
                <Select
                    fullWidth
                    required
                    value={fieldData.category}
                    name="category"
                    onChange={handleChange}
                    input={
                        <OutlinedInput
                            id="select-multiple-chip"
                            label="Ingredient Category"
                            required
                        />
                    }
                >
                    {categories.map((m) => {
                        return (
                            <MenuItem key={m} value={m}>
                                {m}
                            </MenuItem>
                        )
                    })}
                </Select>
            </FormControl>
        ),
        {
            name: 'icon',
            label: 'Ingredient Icon',
            onChange: handleChange,
            value: fieldData.icon,
            required: true,
            fullWidth: true,
            list: iconNameList,
        },
    ]

    return (
        <CreatePanel
            title="New Ingredient"
            handleBack={handleBack}
            loading={loading}
            fields={fields}
            handleSubmit={handleSubmit}
        />
    )
}
type NewIngredientProps = {
    screen: [string, any]
}
export default NewIngredient
