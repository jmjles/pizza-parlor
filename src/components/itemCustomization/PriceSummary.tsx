import {
    Button,
    Container,
    Divider,
    Grid2,
    Stack,
    Typography as Font,
} from '@mui/material'
import { ShoppingCart } from '@mui/icons-material'
import { OrderItemsType } from '@/lib/db/model/order.ts'
import { setCart, toggleItemModal } from '@/store/slices.tsx'
import { useAppDispatch, useAppSelector } from '@/store/hooks.tsx'
import { selectCart, selectItem } from '@/store/selectors.tsx'
import { IngredientType } from '@/lib/classes/Ingredient.ts'

const PriceSummary = (props: PriceSummaryProps) => {
    const { cart } = useAppSelector(selectCart)
    const { menuItem } = useAppSelector(selectItem)
    const dispatch = useAppDispatch()

    const handleAddToCart = () => {
        if (!menuItem.sizes) return
        const [pizza, ...mods] = props.charges
        const newItem: OrderItemsType = {
            menuItem,
            price: `$${Number(props.charges.reduce((x, y) => x + y.amount, 0)).toFixed(2)}`,
            modifications: mods.map((m) => {
                const desc = m.name.includes('No')
                    ? m.name
                    : 'Add ' + m.name.split(' ').slice(-1)[0]
                return {
                    ingredientId: m.ingredient?._id || '',
                    price: m.inRecipe ? '$0.00' : `$${m.amount}`,
                    description: desc,
                }
            }),
            quantity: Number(props.quantity),
        }
        dispatch(setCart([...cart, newItem]))
        dispatch(toggleItemModal())
    }
    return (
        <Container
            disableGutters
            style={{ maxHeight: '300px', overflowY: 'scroll' }}
        >
            <Stack spacing={2}>
                <Stack spacing={1}>
                    {props.charges.map((charge) => (
                        <Container>
                            <Font align="left">{charge.name}</Font>
                        </Container>
                    ))}
                </Stack>
                <Divider />
                <Container>
                    <Font align={'right'}>
                        Total: $
                        {props.charges
                            .reduce((x, y) => x + y.amount, 0)
                            .toFixed(2)}
                    </Font>
                </Container>
                <Button
                    variant="contained"
                    fullWidth
                    onClick={handleAddToCart}
                    id="add-to-cart-button"
                >
                    <Grid2 container spacing={1} alignItems="center">
                        <ShoppingCart />
                        <Font variant="button">Add to Cart</Font>
                    </Grid2>
                </Button>
            </Stack>
        </Container>
    )
}
type PriceSummaryProps = {
    charges: Charge[]
    quantity: number
}

export type Charge = {
    name: string
    amount: number
    ingredient?: IngredientType
    inRecipe: boolean
}

export default PriceSummary
