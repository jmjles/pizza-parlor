import Modal, { ModalPropType } from '@/components/modal/Modal'
import { MenuItemType, MenuSizeButtonType, SauceType } from '@/components/menuItem/MenuItem'
import {
    Button, Container,
    FormControl,
    Grid2, Input,
    Stack,
    Typography as Font,
} from '@mui/material'
import Image from 'next/image'
import PriceSummary, { Charge } from '@/components/itemCustomization/PriceSummary'
import MenuItemSize from '@/components/menuItem/MenuItemSize'
import { ChangeEvent, useEffect, useState } from 'react'
import { CancelRounded, Water } from '@mui/icons-material'
import { IngredientType } from '@/components/itemCustomization/Ingredient'
import { Ingredients } from "@/assets/sampleData"

const ItemCustomization = (props: ItemCustomizationType) => {
    const { modal, item } = props
    const [quantity, setQuantity] = useState<string | number>(1)
    const [size, setSize] = useState(props.size || 0)
    const [sauce, setSauce] = useState<SauceType>(props.item.sauce)
    const [sauceDialog, setSauceDialog] = useState(false)
    const [sauceAmount, setSauceAmount] = useState(2)
    const [charges, setCharges] = useState<Charge[]>([])
    const [pizzaPrice, setPizzaPrice] = useState('')
    const [pizzaEntry, setPizzaEntry] = useState<Charge>({
        name: pizzaPrice,
        amount: Number.parseFloat(props.item.buttons?.[size].price.substring(1) || ''),
    })
    const [sauceCharge, setSauceCharge] = useState<Charge>()
    useEffect(() => {
        setPizzaPrice(size === -1 ? '' : `${props.item.buttons?.[size].price} X ${quantity||1} - ${props.item.title}`)
        setPizzaEntry({
            name: pizzaPrice,
            amount: Number.parseFloat(props.item.buttons?.[size].price.substring(1) || '') * (typeof quantity === "string" ? 1 : quantity),
        })
    })

    useEffect(() => {
        if (sauce.name === props.item.sauce.name && sauceAmount === 2) setSauceCharge(undefined)
        else {
            const selectedSauceAmount = sauceAmounts[sauceAmount]
            const isNoSauce = selectedSauceAmount.title === 'None'
            setSauceCharge({
                name: `${isNoSauce ? "": selectedSauceAmount.price} ${isNoSauce ? 'No' : " - "+selectedSauceAmount.title} ${sauce.name}`,
                amount: Number.parseFloat(selectedSauceAmount.price.substring(1)||"0.00"),
            })
        }
    }, [sauce, sauceAmount])

    const sauceAmounts: MenuSizeButtonType[] = [
        { title: 'None', price: ' ', iconSize: 'medium', icon: CancelRounded },
        { title: 'Light', price: '$0.89', iconSize: 'medium', icon: Water },
        { title: 'Normal', price: '$0.89', iconSize: 'medium', icon: Water },
        { title: 'Extra', price: '$0.89', iconSize: 'medium', icon: Water },
    ]

    const sauces: SauceType[] = [
        { name: 'Tomato Sauce', price: 0, amount: '' },
        { name: 'Spicy Sauce', price: 0, amount: '' },
        { name: 'Alfredo Sauce', price: 0, amount: '' },
        { name: 'BBQ Sauce', price: 0, amount: '' },
    ]
    const ingredients: IngredientType[] = [

    ]
    const handleChange = ({ target: { name, value } }: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        if (value.length > 2) return
        setQuantity(Number.parseInt(value) || '')
    }

    const handleSize = (s: number) => {
        setSize(s)
    }

    const handleSauceDialog = () => {
        setSauceDialog(p => !p)
    }
    const handleSauceAmount = (sauce: number) => {
        setSauceAmount(sauce)
    }
    const handleSauce = (sauce: number) => {
        handleSauceDialog()
        setSauce(sauces[sauce])
    }


    return (
        <Modal open={modal.open} handleClose={modal.handleClose} title={item.title}>
            <>
            <Grid2 container spacing={2} wrap={"nowrap"}>
                <Grid2>
                    <Image src={{ src: item.image, width: 300, height: 300 }} alt={`${item.title}`} />
                </Grid2>
                <Grid2>
                    <Font>{item.description}</Font>
                    <FormControl fullWidth>
                        <Font variant={'h4'}>Sizes</Font>
                        {props.item.buttons &&
                            <MenuItemSize sizes={props.item.buttons} onSelect={handleSize} value={size} />}
                        <Font variant={'h4'}>Quantity</Font>
                        <Input name="Quantity" value={quantity} onChange={(e) => handleChange(e)} />
                    </FormControl>

                    <Button onClick={handleSauceDialog}>
                        <Font variant="h4" textTransform="capitalize">{sauce.name}</Font>
                    </Button>

                    <MenuItemSize sizes={sauceAmounts} onSelect={handleSauceAmount} value={sauceAmount} />

                    <Modal open={sauceDialog} handleClose={handleSauceDialog} title="Sauces">
                        <Stack>
                            {
                                sauces.map((s, i) =>
                                    <Button key={s.name} disabled={s.name === sauce.name}
                                            onClick={() => handleSauce(i)}>
                                        <Font variant="h5" textTransform="capitalize">{s.name}</Font>
                                    </Button>)
                            }
                        </Stack>
                    </Modal>
                </Grid2>
                <Grid2>
                    <PriceSummary
                        charges={sauceCharge ? [pizzaEntry, sauceCharge, ...charges] : [pizzaEntry, ...charges]} />
                </Grid2>
            </Grid2>
                <Container>

                </Container>
            </>
        </Modal>
    )
}

type ItemCustomizationType = {
    item: MenuItemType
    modal: ModalPropType
    size?: number
}
export default ItemCustomization