import Pizza from '@/assets/images/pizza.jpg'
import { Container, Grid2 } from '@mui/material'
import Menu, { MenuType } from '@/components/menu/Menu'
import Bar from '@/components/bar/Bar'
import Cart from '@/components/cart/Cart'
import brickWall from '@/assets/images/bricks.jpg'

export default function Home() {
    const pizzas: MenuType[] = [
        {
            category: 'Classic Pizzas',
            menuItems: [
                {
                    title: 'Margherita',
                    description: 'Classic pizza with tomato sauce, mozzarella, and fresh basil.',
                    image: Pizza.src,
                    buttons: [
                        { title: 'small', price: '$8.99' },
                        { title: 'medium', price: '$12.99' },
                        { title: 'large', price: '$15.99' },
                    ],
                },
                {
                    title: 'Pepperoni',
                    description: 'A delicious pizza topped with tomato sauce, mozzarella, and pepperoni slices.',
                    image: Pizza.src,
                    buttons: [
                        { title: 'small', price: '$9.99' },
                        { title: 'medium', price: '$13.99' },
                        { title: 'large', price: '$16.99' },
                    ],
                },
                {
                    title: 'Cheese Pizza',
                    description: 'A simple yet tasty pizza with extra mozzarella cheese and tomato sauce.',
                    image: Pizza.src,
                    buttons: [
                        { title: 'small', price: '$7.99' },
                        { title: 'medium', price: '$11.99' },
                        { title: 'large', price: '$14.99' },
                    ],
                },
                {
                    title: 'Hawaiian',
                    description: 'Tomato sauce, mozzarella, ham, and pineapple for a sweet and savory taste.',
                    image: Pizza.src,
                    buttons: [
                        { title: 'small', price: '$10.99' },
                        { title: 'medium', price: '$14.99' },
                        { title: 'large', price: '$17.99' },
                    ],
                },
            ],
        },
        {
            category: 'Specialty Pizzas',
            menuItems: [
                {
                    title: 'BBQ Chicken',
                    description: 'Grilled chicken, BBQ sauce, red onions, and mozzarella on a crispy crust.',
                    image: Pizza.src,
                    buttons: [
                        { title: 'small', price: '$10.99' },
                        { title: 'medium', price: '$14.99' },
                        { title: 'large', price: '$17.99' },
                    ],
                },
                {
                    title: 'Veggie Supreme',
                    description: 'Tomato sauce, mozzarella, bell peppers, olives, onions, and mushrooms.',
                    image: Pizza.src,
                    buttons: [
                        { title: 'small', price: '$9.99' },
                        { title: 'medium', price: '$13.99' },
                        { title: 'large', price: '$16.99' },
                    ],
                },
                {
                    title: 'Buffalo Chicken',
                    description: 'Spicy buffalo sauce, grilled chicken, mozzarella, and ranch drizzle.',
                    image: Pizza.src,
                    buttons: [
                        { title: 'small', price: '$11.49' },
                        { title: 'medium', price: '$15.49' },
                        { title: 'large', price: '$18.49' },
                    ],
                },
                {
                    title: 'Meat Lovers',
                    description: 'Loaded with pepperoni, sausage, ham, bacon, and mozzarella cheese.',
                    image: Pizza.src,
                    buttons: [
                        { title: 'small', price: '$12.99' },
                        { title: 'medium', price: '$16.99' },
                        { title: 'large', price: '$19.99' },
                    ],
                },
            ],
        },
        {
            category: 'Gourmet Pizzas',
            menuItems: [
                {
                    title: 'Truffle Mushroom',
                    description: 'Creamy truffle sauce, mozzarella, mushrooms, and arugula.',
                    image: Pizza.src,
                    buttons: [
                        { title: 'small', price: '$12.99' },
                        { title: 'medium', price: '$16.99' },
                        { title: 'large', price: '$19.99' },
                    ],
                },
                {
                    title: 'Prosciutto & Arugula',
                    description: 'Thinly sliced prosciutto, fresh arugula, and shaved parmesan.',
                    image: Pizza.src,
                    buttons: [
                        { title: 'small', price: '$11.99' },
                        { title: 'medium', price: '$15.99' },
                        { title: 'large', price: '$18.99' },
                    ],
                },
                {
                    title: 'Four Cheese',
                    description: 'Mozzarella, parmesan, gorgonzola, and ricotta on a rich garlic cream sauce.',
                    image: Pizza.src,
                    buttons: [
                        { title: 'small', price: '$10.99' },
                        { title: 'medium', price: '$14.99' },
                        { title: 'large', price: '$17.99' },
                    ],
                },
                {
                    title: 'Pesto Chicken',
                    description: 'Grilled chicken, basil pesto, roasted tomatoes, and mozzarella.',
                    image: Pizza.src,
                    buttons: [
                        { title: 'small', price: '$11.49' },
                        { title: 'medium', price: '$15.49' },
                        { title: 'large', price: '$18.49' },
                    ],
                },
            ],
        },
    ]
    return (
        <div>
            <Grid2 container flexDirection="column" wrap="nowrap">
                <Grid2>
                    <Bar city="Camarillo" location="123 Main St." />
                </Grid2>
                <Grid2>
                    <Grid2 container justifyContent="space-around" direction="row" wrap="nowrap" marginTop={2}>
                        <Grid2 size={{ xs: 12, lg: 10, xl: 9 }} height="calc(100vh - 87.9833px - 32px)" overflow="auto">
                            <Menu items={pizzas} />
                        </Grid2>
                        <Grid2 size={{ xl: 2 }} display={{ xs: 'none', xl: 'initial' }}>
                            <Cart />
                        </Grid2>
                    </Grid2>
                </Grid2>
            </Grid2>
        </div>
    )
}
