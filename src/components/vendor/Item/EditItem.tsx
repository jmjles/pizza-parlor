import CreatePanel, {
    CreatePanelFieldsType,
} from '@/components/Panel/CreatePanel.tsx'
import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '@/store/hooks.tsx'
import { selectIngredient, selectItem } from '@/store/selectors.tsx'
import { MenuItemType, MenuSizeButtonType } from '@/lib/classes/MenuItem.ts'
import menuItemApi from '@/lib/api/menuItemApi.ts'
import {
    Button,
    Divider,
    Grid2,
    RadioGroup,
    Stack,
    TextField,
    Typography,
    Typography as Font,
} from '@mui/material'
import { Add, Delete } from '@mui/icons-material'
import SubmitBtn from '@/components/form/CreateBtn.tsx'
import LabeledRadio from '@/components/form/LabeledRadio.tsx'
import SizeFields from '@/components/form/SizeFields.tsx'
import { isFixedMenuItem, isNumber, toNumber } from '@/utils/Form.tsx'
import { refreshIngredients, refreshMenuItems } from '@/store/slices.tsx'
import ingredientApi from '@/lib/api/ingredientApi.ts'
import {
    FixedMenuItem,
    FixedMenuItemType,
    MenuUnitType,
} from '@/lib/classes/FixedMenuItem.ts'
import { menuItemInitialState, MenuItemTypes } from '@/store/initialState.ts'
import SelectItems from '@/components/form/SelectItems.tsx'

const EditItem = (props: EditItemProps) => {
    const {
        screen: [screen, setScreen],
    } = props
    const { menuItem } = useAppSelector(selectItem)
    const { ingredients } = useAppSelector(selectIngredient)
    const dispatch = useAppDispatch()
    const [fieldData, setFieldData] = useState<
        Omit<MenuItemTypes, 'amountLimit' | 'ingredients' | 'sauce'> & {
            amountLimit: string
            ingredients: any
            sauce: string
        }
    >({
        ...menuItem,
        amountLimit: `${menuItem.amountLimit}`,
        ingredients: menuItem.ingredients.map((i) => i._id),
        sauce: 'sauce' in menuItem ? menuItem.sauce._id : '',
    })
    const [loading, setLoading] = useState(false)
    const [sizes, setSizes] = useState<MenuSizeButtonType[]>(
        menuItem.sizes || []
    )
    const [unit, setUnit] = useState<MenuUnitType>(
        isFixedMenuItem(menuItem)
            ? menuItem.unit
            : (menuItemInitialState.menuItem as FixedMenuItem).unit
    )
    const [step, setStep] = useState<number>(0)
    const [itemType, setItemType] = useState(
        isFixedMenuItem(menuItem) ? 'unit' : 'sizes'
    )

    const initialSize: MenuSizeButtonType = {
        title: '',
        iconSize: 'medium',
        icon: 'pizza',
        price: '$',
        usd: NaN,
    }

    useEffect(() => {
        if (itemType !== 'sizes') return setSizes([])
        setSizes(menuItem.sizes || [initialSize])
    }, [itemType])

    useEffect(() => {
        if (!isNumber(unit.price)) return
        if (unit.price[0] !== '$') {
            setUnit((u) => {
                return { ...u, price: `$${unit.price}` }
            })
            return
        }
        setUnit((p) => {
            if (!p) return p
            return { ...p, usd: toNumber(unit.price || '') }
        })
    }, [unit.price])

    useEffect(() => {
        if (!isNumber(fieldData.amountLimit)) return
        setUnit((p) => {
            if (!p) return p
            return { ...p, usd: toNumber(unit.price || '') }
        })
    }, [unit.price])

    const handleNewSize = () => {
        setSizes((s) => [...s, initialSize])
    }

    const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setFieldData((f: any) => {
            return { ...f, [name]: value }
        })
    }

    const handleChangeSize = (
        e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
        i: number
    ) => {
        const { name, value } = e.target
        setSizes((s: any) => {
            return s.map((x: any, index: number) => {
                if (i !== index) return x
                if (name === 'price') {
                    if (value[0] !== '$') {
                        return { ...x, [name]: `$${value}` }
                    }
                    return { ...x, [name]: value, usd: toNumber(value) }
                }

                return { ...x, [name]: value }
            })
        })
    }

    const handleChangeUnit = (
        e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
    ) => {
        const { name, value } = e.target
        setUnit((u: any) => {
            return { ...u, [name]: value }
        })
    }
    const handleItemType = (_: any, value: string) => {
        setItemType(value)
    }

    const handleBack = () => {
        if (step === 0) {
            setScreen('items')
            return
        }
        setStep((p) => (p -= 1))
    }

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (step !== fields.length - 1) {
            setStep((p) => (p += 1))
            return
        }
        setLoading(true)
        const { sauce, ...data } = fieldData
        const res = await menuItemApi.updateMenuItem({
            ...data,
            //@ts-ignore
            sauce: sauce ? sauce : undefined,
            amountLimit: Number(fieldData.amountLimit),
            sizes: itemType === 'sizes' ? sizes : [],
            //@ts-ignore
            unit: itemType === 'unit' ? fieldData.unit : undefined,
            image:
                menuItem.image ||
                'https://img.freepik.com/free-photo/pizza-pizza-filled-with-tomatoes-salami-olives_140725-1200.jpg',
        })
        if (res._id) {
            dispatch(refreshMenuItems())
            setScreen('items')
            alert(`Menu Item updated successfully`)
            setLoading(false)
            return
        }
        setLoading(false)
        alert(`Menu Item updated unsuccessfully`)
    }

    const handleDelete = async () => {
        const res = await menuItemApi.removeMenuItem(menuItem._id)
        setLoading(true)
        if (res._id) {
            dispatch(refreshMenuItems())
            setScreen('items')
            alert(`Menu item deleted successfully`)
            setLoading(false)
            return
        }
        setLoading(false)
        alert(`Menu item deleted unsuccessfully`)
    }

    const handleDeleteSize = (id: number) => {
        setSizes((p) => p.filter((s, i) => i !== id))
    }

    const showUnit = () => itemType === 'unit'
    const showSize = () => itemType === 'sizes'

    const fields: CreatePanelFieldsType[][] = [
        [
            {
                name: 'title',
                label: 'Menu Item Name',
                onChange: handleChange,
                value: fieldData.title,
                required: true,
                fullWidth: true,
            },
            {
                name: 'image',
                label: 'Image disabled',
                onChange: handleChange,
                value: '',
                fullWidth: true,
                disabled: true,
            },
            {
                name: 'description',
                label: 'Menu Item Description',
                onChange: handleChange,
                value: fieldData.description,
                required: true,
                fullWidth: true,
            },
            {
                name: 'ingredients',
                label: 'Select Ingredients',
                onChange: handleChange,
                value: fieldData.ingredients || [],
                fullWidth: true,
                multiple: true,
                list: ingredients.filter((i) => i.category !== 'Sauce'),
            },
        ],
        [
            () => (
                <Stack
                    spacing={2}
                    maxHeight={'60vh'}
                    overflow="auto"
                    padding={2}
                >
                    <Font variant="h6">Menu Item Type</Font>
                    <Divider />
                    <RadioGroup value={itemType} onChange={handleItemType}>
                        <Grid2 container>
                            <LabeledRadio label="Misc Item" value="unit" />
                            <LabeledRadio label="Pizza Item" value="sizes" />
                        </Grid2>
                    </RadioGroup>
                    {showSize() && (
                        <Stack spacing={2}>
                            <SelectItems
                                field={{
                                    name: 'sauce',
                                    label: 'Select Sauce',
                                    onChange: handleChange,
                                    value: fieldData.sauce || '',
                                    fullWidth: true,
                                    list: ingredients.filter(
                                        (i) => i.category === 'Sauce'
                                    ),
                                }}
                            />
                            <Button
                                variant="contained"
                                disabled={sizes.length === 3}
                                onClick={handleNewSize}
                            >
                                <Grid2 container spacing={1}>
                                    <Font>Add Size</Font>
                                    <Add />
                                </Grid2>
                            </Button>
                            <Stack spacing={2}>
                                {sizes.map((s, i) => (
                                    <SizeFields
                                        id={i}
                                        handleChange={handleChangeSize}
                                        handleDelete={handleDeleteSize}
                                        icon={s.icon}
                                        iconSize={s.iconSize}
                                        sizes={sizes}
                                    />
                                ))}
                            </Stack>
                        </Stack>
                    )}
                    {showUnit() && (
                        <Stack spacing={2}>
                            <TextField
                                name="label"
                                label="Unit Name"
                                value={unit?.label || ''}
                                required
                                onChange={handleChangeUnit}
                            />
                            <TextField
                                name="price"
                                label="Price per unit"
                                value={unit?.price || ''}
                                required
                                onChange={handleChangeUnit}
                            />
                        </Stack>
                    )}
                    <TextField
                        name="amountLimit"
                        value={fieldData.amountLimit || ''}
                        onChange={handleChange}
                        label="Maximum amount per order"
                        required
                        fullWidth
                    />
                </Stack>
            ),
        ],
    ]
    const DeleteBtn = () => (
        <Grid2 container spacing={1}>
            <Typography>Delete Menu Item</Typography>
            <Delete />
        </Grid2>
    )
    return (
        <CreatePanel
            title="Edit Menu Item"
            handleBack={handleBack}
            handleAction={handleDelete}
            actionProps={{ color: 'error' }}
            loading={loading}
            actionBtn={<DeleteBtn />}
            fields={fields[step]}
            submitBtn={
                <SubmitBtn
                    submitText="Update Menu Item"
                    steps={{ maxStep: fields.length - 1, currentStep: step }}
                />
            }
            handleSubmit={handleSubmit}
        />
    )
}
type EditItemProps = {
    screen: [string, any]
}
export default EditItem
