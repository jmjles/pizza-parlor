import CreatePanel, {
    CreatePanelFieldsType,
} from '@/components/Panel/CreatePanel.tsx'
import { iconNameList } from '@/components/Icon/Icon.tsx'
import React, { FormEvent, useEffect, useState } from 'react'
import ingredientApi from '@/lib/api/ingredientApi.ts'
import { ScreenProps } from '@/components/vendor/MenuBuilder/MenuBuilder.tsx'
import { useAppDispatch, useAppSelector } from '@/store/hooks.tsx'
import { selectIngredient } from '@/store/selectors.tsx'
import {
    ButtonProps,
    FormControl,
    Grid2,
    InputLabel,
    MenuItem,
    OutlinedInput,
    Select,
    Typography,
} from '@mui/material'
import { Delete, Save } from '@mui/icons-material'
import { IngredientType } from '@/lib/classes/Ingredient.ts'
import { refreshIngredients } from '@/store/slices.tsx'

const EditIngredient = (props: EditIngredientProps) => {
    const {
        screen: [screen, setScreen],
    } = props
    const dispatch = useAppDispatch()
    const { ingredient, ingredients } = useAppSelector(selectIngredient)
    const [fieldData, setFieldData] = useState<IngredientType>(ingredient)
    const [categories, setCategories] = useState<string[]>([])
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
    }, [ingredients])

    const handleChange = (e: any) => {
        const { name, value } = e.target
        setFieldData((f: any) => {
            return { ...f, [name]: value }
        })
    }

    const handleBack = () => {
        setScreen('ingredient')
    }

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const res = await ingredientApi.updateIngredient(fieldData)
        setLoading(true)
        if (res._id) {
            dispatch(refreshIngredients())
            handleBack()
            alert(`Ingredient updated successfully`)
            setLoading(false)
            return
        }
        alert(`Ingredient updated unsuccessfully`)
        setLoading(false)
    }

    const handleDelete = async () => {
        const res = await ingredientApi.removeIngredient(ingredient._id)
        setLoading(true)
        if (res._id) {
            dispatch(refreshIngredients())
            setScreen('ingredients')
            alert(`Ingredient deleted successfully`)
            setLoading(false)
            return
        }
        setLoading(false)
        alert(`Ingredient deleted unsuccessfully`)
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
            <FormControl fullWidth>
                <InputLabel id="demo-multiple-chip-label">
                    Ingredient Category
                </InputLabel>
                <Select
                    fullWidth
                    value={fieldData.category}
                    name="category"
                    onChange={handleChange}
                    input={
                        <OutlinedInput
                            id="select-multiple-chip"
                            label="Ingredient Category"
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
    const DeleteBtn = () => (
        <Grid2 container spacing={1}>
            <Typography>Delete Ingredient</Typography>
            <Delete />
        </Grid2>
    )

    const DeleteBtnProps: ButtonProps = {
        color: 'error',
    }
    const SubmitBtn = () => (
        <Grid2 container spacing={1}>
            <Typography>Update Ingredient</Typography>
            <Save />
        </Grid2>
    )
    return (
        <CreatePanel
            title={'Edit Ingredient'}
            handleBack={handleBack}
            handleSubmit={handleSubmit}
            handleAction={handleDelete}
            actionProps={DeleteBtnProps}
            loading={loading}
            actionBtn={<DeleteBtn />}
            fields={fields}
            submitBtn={<SubmitBtn />}
        />
    )
}

interface EditIngredientProps extends ScreenProps {}

export default EditIngredient
