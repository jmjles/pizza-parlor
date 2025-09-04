import Modal from '@/components/modal/Modal'
import {
    Button,
    Container,
    FormControl,
    Grid2,
    Input,
    Stack,
    Typography as Font,
} from '@mui/material'
import PriceSummary, {
    Charge,
} from '@/components/itemCustomization/PriceSummary'
import MenuItemSize from '@/components/menuItem/MenuItemSize'
import { ChangeEvent, useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '@/store/hooks.tsx'
import {
    selectIngredient,
    selectItem,
    selectModal,
} from '@/store/selectors.tsx'
import { toggleItemModal } from '@/store/slices.tsx'
import { IngredientType } from '@/lib/classes/Ingredient.ts'
import Ingredients from '@/components/itemCustomization/Ingredients.tsx'
import PizzaMenuItem from '@/lib/classes/PizzaMenuItem.ts'

const ItemCustomization = () => {
    const dispatch = useAppDispatch()
    const { menuItem, size: initSize } = useAppSelector(selectItem)
    const { ingredients } = useAppSelector(selectIngredient)
    const modals = useAppSelector(selectModal)

    const [quantity, setQuantity] = useState<string | number>(1)
    const [size, setSize] = useState(initSize)
    const [sauce, setSauce] = useState<IngredientType | undefined>(
        ingredients.find((i) => i._id === (menuItem as PizzaMenuItem).sauce._id)
    )
    const [sauceDialog, setSauceDialog] = useState(false)
    const [sauceAmount, setSauceAmount] = useState(2)
    const [charges, setCharges] = useState<Charge[]>([])
    const [selectedIngredients, setSelectedIngredients] = useState<string[]>(
        menuItem.ingredients.map((i) => i._id) || []
    )
    const [sauceCharge, setSauceCharge] = useState<Charge>()
    const [pizzaEntry, setPizzaEntry] = useState<Charge>({
        name:
            size === -1
                ? ''
                : `${menuItem.sizes?.[size].price} X ${quantity || 1} - ${menuItem.title}`,
        amount: Number.parseFloat(''),
        inRecipe: false,
    })

    const sauces = () =>
        ingredients.filter((ing) => ing.category.toLowerCase() === 'sauce')

    const ingredientCategories = () => {
        let list: { name: string; ingredients: IngredientType[] }[] = []
        let categories: any = {}
        ingredients.forEach((i) =>
            !categories[i.category]
                ? (categories = { ...categories, [i.category]: [i] })
                : (categories[i.category] = [...categories[i.category], i])
        )
        for (const c in categories) {
            if (c !== 'Sauce' && c !== 'Crust')
                list.push({ name: c, ingredients: categories[c] })
        }
        return list
    }

    const handleIngredient = (i: IngredientType) => {
        const charge = charges.find((c) =>
            c.name.toLowerCase().includes(i.name.toLowerCase())
        )
        const recipeIngredient = menuItem.ingredients?.find(
            (x) => x._id === i._id
        )

        if (recipeIngredient) {
            setSelectedIngredients((p) => {
                const isSelected = p.find((x) => x === i._id)
                if (isSelected) {
                    return p.filter((x) => x !== i._id)
                }
                return [...p, i._id]
            })
            setCharges((p) => {
                if (charge) {
                    return p.filter((c) => c.name !== charge.name)
                }
                return [
                    {
                        name: `No ${i.name}`,
                        amount: 0,
                        inRecipe: true,
                        ingredient: recipeIngredient,
                    },
                    ...p,
                ]
            })
            return
        }

        if (charge) {
            setCharges((p) => p.filter((c) => c.name !== charge.name))
            setSelectedIngredients((p) => p.filter((x) => x !== i._id))
            return
        }

        setSelectedIngredients((p) => [...p, i._id])
        setCharges((p) => [
            ...p,
            {
                name: `$${parseFloat(`${i.IngredientOptions?.[1].price}`).toFixed(2)} - ${i.name}`,
                amount: i.IngredientOptions?.[1].price * Number(quantity),
                inRecipe: false,
                ingredient: i,
            },
        ])
    }

    useEffect(() => {
        setPizzaEntry({
            name:
                size === -1
                    ? ''
                    : `${menuItem.sizes?.[size].price} X ${quantity || 1} - ${menuItem.title}`,
            amount:
                Number.parseFloat(
                    menuItem.sizes?.[size].price.substring(1) || ''
                ) * (typeof quantity === 'string' ? 1 : quantity),
            inRecipe: false,
        })
    }, [menuItem, size, quantity])

    useEffect(() => {
        if (sauce?._id === (menuItem as PizzaMenuItem).sauce._id)
            setSauceCharge(undefined)
        else {
            const selectedSauceAmount = sauce?.IngredientOptions[sauceAmount]
            const isNoSauce = selectedSauceAmount?.quantity === 'None'
            setSauceCharge({
                name: `${isNoSauce ? '' : `$${selectedSauceAmount?.price}`} ${isNoSauce ? 'No' : ' - '} ${sauce?.name}`,
                amount: selectedSauceAmount?.price || 0.0,
                inRecipe: false,
                ingredient: sauce,
            })
        }
    }, [sauce, sauceAmount])

    const handleChange = ({
        target: { name, value },
    }: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        if (value.length > 2) return
        setQuantity(Number.parseInt(value) || '')
    }

    const handleSize = (s: number) => {
        setSize(s)
    }

    const handleSauceDialog = () => {
        setSauceDialog((p) => !p)
    }

    // const handleSauceAmount = (sauce: number) => {
    //     setSauceAmount(sauce)
    // }

    const handleSauce = (sauce: number) => {
        handleSauceDialog()
        setSauce(sauces()[sauce])
    }

    return (
        <Modal
            open={modals.itemModal}
            handleClose={() => dispatch(toggleItemModal())}
            title={menuItem.title}
        >
            <>
                <Grid2
                    container
                    spacing={2}
                    justifyContent={{ xs: 'center', md: 'left' }}
                >
                    <Grid2>
                        <img
                            src={menuItem.image}
                            style={{ width: 300, height: 300 }}
                            alt={`${menuItem.title}`}
                        />
                    </Grid2>
                    <Grid2 container spacing={2} direction="column">
                        <Font>{menuItem.description}</Font>
                        <FormControl fullWidth>
                            <Font variant={'h4'}>Sizes</Font>
                            {menuItem.sizes && (
                                <MenuItemSize
                                    sizes={menuItem.sizes}
                                    onSelect={handleSize}
                                    disableToggle
                                    value={size}
                                />
                            )}
                            <Font variant={'h4'}>Quantity</Font>
                            <Input
                                name="Quantity"
                                value={quantity}
                                onChange={(e) => handleChange(e)}
                            />
                        </FormControl>

                        <Button
                            onClick={handleSauceDialog}
                            variant={'contained'}
                        >
                            <Font variant="h4" textTransform="capitalize">
                                {sauce?.name}
                            </Font>
                        </Button>
                        {/*<MenuItemSize*/}
                        {/*    sizes={sauce?.IngredientOptions||[]}*/}
                        {/*    onSelect={handleSauceAmount}*/}
                        {/*    value={sauceAmount}*/}
                        {/*/>*/}
                        <Modal
                            open={sauceDialog}
                            handleClose={handleSauceDialog}
                            title="Sauces"
                        >
                            <Stack>
                                {sauces().map((s, i) => (
                                    <Button
                                        key={s.name}
                                        disabled={s.name === sauce?.name}
                                        onClick={() => handleSauce(i)}
                                    >
                                        <Font
                                            variant="h5"
                                            textTransform="capitalize"
                                        >
                                            {s.name}
                                        </Font>
                                    </Button>
                                ))}
                            </Stack>
                        </Modal>
                    </Grid2>
                    <Grid2>
                        <PriceSummary
                            charges={
                                sauceCharge
                                    ? [pizzaEntry, sauceCharge, ...charges]
                                    : [pizzaEntry, ...charges]
                            }
                            quantity={Number(quantity)}
                        />
                    </Grid2>
                </Grid2>
                <Container>
                    <Ingredients
                        items={ingredientCategories()}
                        onClick={handleIngredient}
                        selectedIngredients={selectedIngredients}
                    />
                </Container>
            </>
        </Modal>
    )
}

type ItemCustomizationType = {
    size?: number
}

export default ItemCustomization
