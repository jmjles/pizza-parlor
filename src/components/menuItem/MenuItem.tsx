import {
    Button,
    Card,
    CardActions,
    CardContent,
    CardMedia,
    Grid2,
    Typography as Font,
    Select,
    MenuItem as MuiMenuItem,
    InputLabel,
    FormControl,
    SelectChangeEvent,
} from '@mui/material'
import MenuItemSize from '@/components/menuItem/MenuItemSize'
import { useAppDispatch, useAppSelector } from '@/store/hooks.tsx'
import { setCart, setSelectedItem, toggleItemModal } from '@/store/slices.tsx'
import { FormEvent, useState } from 'react'
import { selectCart } from '@/store/selectors.tsx'
import { OrderItemsType } from '@/lib/db/model/order.ts'
import { MenuItemTypes } from '@/store/initialState.ts'
import { FixedMenuItem } from '@/lib/classes/FixedMenuItem.ts'
import { isFixedMenuItem } from '@/utils/Form.tsx'

const MenuItem = (props: MenuItemTypes & { elementId: string }) => {
    const dispatch = useAppDispatch()
    const { cart } = useAppSelector(selectCart)
    const [amount, setAmount] = useState('')

    const handleSelect = (size: number) => {
        dispatch(setSelectedItem({ item: props, size: size }))
        dispatch(toggleItemModal())
    }

    const handleAmount = (x: SelectChangeEvent) => {
        setAmount(x.target.value)
    }
    const hasSizes = () => {
        if (!props.sizes) {
            return false
        }
        return props.sizes.length > 1
    }
    const handleAddToCart = (e: FormEvent) => {
        e.preventDefault()
        if (!('unit' in props)) return
        setAmount('')
        const newItem: OrderItemsType = {
            menuItem: props,
            price: `$${Number(props.unit.usd * Number(amount)).toFixed(2)}`,
            modifications: [],
            quantity: Number(amount),
        }
        dispatch(setCart([...cart, newItem]))
    }

    return (
        <Card
            style={{ height: 675, position: 'relative' }}
            component="form"
            onSubmit={handleAddToCart}
            id={props.elementId}
        >
            <CardMedia component="img" src={props.image} height="250" />
            <CardContent>
                <Font variant="h4">{props.title}</Font>
                <Font maxHeight={120} overflow="auto">
                    {props.description}
                </Font>
                <Grid2 container spacing={2} direction="column">
                    {props instanceof FixedMenuItem && (
                        <Grid2>
                            <Font align="right">
                                {props.unit.label}:
                                <Font
                                    fontWeight="bold"
                                    color="orange"
                                    component="span"
                                >
                                    {props.unit.price}
                                </Font>
                            </Font>
                        </Grid2>
                    )}
                    {/*{props.sizes?.length > 0 && (*/}
                    {/*    <Grid2>*/}
                    {/*        <FormControl fullWidth>*/}
                    {/*            <InputLabel id="Size">Size</InputLabel>*/}
                    {/*            <Select*/}
                    {/*                labelId="Size"*/}
                    {/*                id="Size"*/}
                    {/*                label="Size"*/}
                    {/*                fullWidth*/}
                    {/*            >*/}
                    {/*                {props.sizes?.map((s) => (*/}
                    {/*                    <MuiMenuItem value={s} key={s}>*/}
                    {/*                        {s}*/}
                    {/*                    </MuiMenuItem>*/}
                    {/*                ))}*/}
                    {/*            </Select>*/}
                    {/*        </FormControl>*/}
                    {/*    </Grid2>*/}
                    {/*)}*/}
                    {props.amount && (
                        <Grid2>
                            <FormControl fullWidth>
                                <InputLabel id="Amount">Amount</InputLabel>
                                <Select
                                    labelId="Amount"
                                    id="Amount"
                                    label="Amount"
                                    fullWidth
                                    required
                                    value={amount}
                                    onChange={handleAmount}
                                >
                                    {[...Array(props.amountLimit)].map(
                                        (_x, i) => (
                                            <MuiMenuItem value={i + 1} key={i}>
                                                {i + 1}
                                            </MuiMenuItem>
                                        )
                                    )}
                                </Select>
                            </FormControl>
                        </Grid2>
                    )}
                </Grid2>
            </CardContent>
            <CardActions
                style={{ position: 'absolute', bottom: 0, width: '100%' }}
            >
                {'unit' in props && (
                    <Button
                        fullWidth
                        variant={'contained'}
                        type="submit"
                        disabled={amount.length === 0}
                    >
                        Add to Cart
                    </Button>
                )}
                {hasSizes() && (
                    <Grid2
                        container
                        justifyContent="space-between"
                        width="100%"
                        alignItems="center"
                        position="relative"
                    >
                        {props.sizes && (
                            <MenuItemSize
                                sizes={props.sizes}
                                disableToggle
                                onSelect={handleSelect}
                            />
                        )}
                    </Grid2>
                )}
            </CardActions>
        </Card>
    )
}

export type IngredientType = {
    id: number
    amount: number
}
export type SauceType = {
    name: string
    amount: string
    price: number
}

export type MenuSizeButtonType = {
    title: string
    iconSize: 'small' | 'medium' | 'large'
    icon: string
    price: string
}

type MenuUnitType = {
    label: string
    price: string
}

export default MenuItem
