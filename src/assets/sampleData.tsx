import { StoreType } from '@/components/stores/Store'
import { MenuType } from '@/components/menu/Menu'
import Pizza from '@/assets/images/pizza.jpg'
import Store from "@/assets/images/pizzaria-store-front.jpg"
export const storeSampleData: StoreType[] = [
    {
        city: 'Los Angeles',
        state: 'CA',
        streetAddress: '1234 Sunset Blvd',
        zipcode: '90026',
        waitTime: '15 mins',
        image: Store.src,
    },
    {
        city: 'Austin',
        state: 'TX',
        streetAddress: '5678 Congress Ave',
        zipcode: '73301',
        waitTime: '10 mins',
        image: Store.src,
    },
    {
        city: 'Seattle',
        state: 'WA',
        streetAddress: '9101 Pine St',
        zipcode: '98101',
        waitTime: '20 mins',
        image: Store.src,
    },
    {
        city: 'Chicago',
        state: 'IL',
        streetAddress: '1122 Michigan Ave',
        zipcode: '60611',
        waitTime: '5 mins',
        image: Store.src,
    },
    {
        city: 'Miami',
        state: 'FL',
        streetAddress: '3344 Ocean Dr',
        zipcode: '33139',
        waitTime: '30 mins',
        image: Store.src,
    },
    {
        city: 'New York',
        state: 'NY',
        streetAddress: '5566 Broadway',
        zipcode: '10001',
        waitTime: '12 mins',
        image: Store.src,
    },
    {
        city: 'Denver',
        state: 'CO',
        streetAddress: '7788 Colfax Ave',
        zipcode: '80202',
        waitTime: '8 mins',
        image: Store.src,
    },
    {
        city: 'San Francisco',
        state: 'CA',
        streetAddress: '9910 Market St',
        zipcode: '94103',
        waitTime: '18 mins',
        image: Store.src,
    },
]

export const pizzas: MenuType[] = [
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