import { StoreType } from '@/components/stores/Store'
import { MenuType } from '@/components/menu/Menu'
import Pizza from '@/assets/images/pizza.jpg'
import Store from "@/assets/images/pizzaria-store-front.jpg"
import {
    LocalPizza,
    EmojiFoodBeverage,
    Restaurant,
    Grass,
    LunchDining,
    SetMeal
} from "@mui/icons-material";

import { IngredientType } from '@/components/itemCustomization/Ingredient'
import { OverridableComponent } from '@mui/types'
import { SvgIconTypeMap } from '@mui/material'
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
                    { iconSize:"small", title: 'small', price: '$8.99',icon:LocalPizza },
                    { iconSize:"medium", title: 'medium', price: '$12.99',icon:LocalPizza  },
                    { iconSize:"large", title: 'large', price: '$15.99',icon:LocalPizza  },
                ],
                sauce:{
                    name:"Tomato Sauce",
                    amount:"normal",
                    price:0
                }
            },
            {
                title: 'Pepperoni',
                description: 'A delicious pizza topped with tomato sauce, mozzarella, and pepperoni slices.',
                image: Pizza.src,
                buttons: [
                    { iconSize:"small", title: 'small', price: '$8.99',icon:LocalPizza },
                    { iconSize:"medium", title: 'medium', price: '$12.99',icon:LocalPizza  },
                    { iconSize:"large", title: 'large', price: '$15.99',icon:LocalPizza  },
                ],
                sauce:{
                    name:"Tomato Sauce",
                    amount:"normal",
                    price:0
                }
            },
            {
                title: 'Cheese Pizza',
                description: 'A simple yet tasty pizza with extra mozzarella cheese and tomato sauce.',
                image: Pizza.src,
                buttons: [
                    { iconSize:"small", title: 'small', price: '$8.99',icon:LocalPizza },
                    { iconSize:"medium", title: 'medium', price: '$12.99',icon:LocalPizza  },
                    { iconSize:"large", title: 'large', price: '$15.99',icon:LocalPizza  },
                ],
                sauce:{
                    name:"Tomato Sauce",
                    amount:"normal",
                    price:0
                }
            },
            {
                title: 'Hawaiian',
                description: 'Tomato sauce, mozzarella, ham, and pineapple for a sweet and savory taste.',
                image: Pizza.src,
                buttons: [
                    { iconSize:"small", title: 'small', price: '$8.99',icon:LocalPizza },
                    { iconSize:"medium", title: 'medium', price: '$12.99',icon:LocalPizza  },
                    { iconSize:"large", title: 'large', price: '$15.99',icon:LocalPizza  },
                ],
                sauce:{
                    name:"Tomato Sauce",
                    amount:"normal",
                    price:0
                }
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
                    { iconSize:"small", title: 'small', price: '$8.99',icon:LocalPizza },
                    { iconSize:"medium", title: 'medium', price: '$12.99',icon:LocalPizza  },
                    { iconSize:"large", title: 'large', price: '$15.99',icon:LocalPizza  },
                ],
                sauce:{
                    name:"Tomato Sauce",
                    amount:"normal",
                    price:0
                }
            },
            {
                title: 'Veggie Supreme',
                description: 'Tomato sauce, mozzarella, bell peppers, olives, onions, and mushrooms.',
                image: Pizza.src,
                buttons: [
                    { iconSize:"small", title: 'small', price: '$8.99',icon:LocalPizza },
                    { iconSize:"medium", title: 'medium', price: '$12.99',icon:LocalPizza  },
                    { iconSize:"large", title: 'large', price: '$15.99',icon:LocalPizza  },
                ],
                sauce:{
                    name:"Tomato Sauce",
                    amount:"normal",
                    price:0
                }
            },
            {
                title: 'Buffalo Chicken',
                description: 'Spicy buffalo sauce, grilled chicken, mozzarella, and ranch drizzle.',
                image: Pizza.src,
                buttons: [
                    { iconSize:"small", title: 'small', price: '$8.99',icon:LocalPizza },
                    { iconSize:"medium", title: 'medium', price: '$12.99',icon:LocalPizza  },
                    { iconSize:"large", title: 'large', price: '$15.99',icon:LocalPizza  },
                ],
                sauce:{
                    name:"Tomato Sauce",
                    amount:"normal",
                    price:0
                }
            },
            {
                title: 'Meat Lovers',
                description: 'Loaded with pepperoni, sausage, ham, bacon, and mozzarella cheese.',
                image: Pizza.src,
                buttons: [
                    { iconSize:"small", title: 'small', price: '$8.99',icon:LocalPizza },
                    { iconSize:"medium", title: 'medium', price: '$12.99',icon:LocalPizza  },
                    { iconSize:"large", title: 'large', price: '$15.99',icon:LocalPizza  },
                ],
                sauce:{
                    name:"Tomato Sauce",
                    amount:"normal",
                    price:0
                }
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
                    { iconSize:"small", title: 'small', price: '$8.99',icon:LocalPizza },
                    { iconSize:"medium", title: 'medium', price: '$12.99',icon:LocalPizza  },
                    { iconSize:"large", title: 'large', price: '$15.99',icon:LocalPizza  },
                ],
                sauce:{
                    name:"Tomato Sauce",
                    amount:"normal",
                    price:0
                }
            },
            {
                title: 'Prosciutto & Arugula',
                description: 'Thinly sliced prosciutto, fresh arugula, and shaved parmesan.',
                image: Pizza.src,
                buttons: [
                    { iconSize:"small", title: 'small', price: '$8.99',icon:LocalPizza },
                    { iconSize:"medium", title: 'medium', price: '$12.99',icon:LocalPizza  },
                    { iconSize:"large", title: 'large', price: '$15.99',icon:LocalPizza  },
                ],
                sauce:{
                    name:"Tomato Sauce",
                    amount:"normal",
                    price:0
                }
            },
            {
                title: 'Four Cheese',
                description: 'Mozzarella, parmesan, gorgonzola, and ricotta on a rich garlic cream sauce.',
                image: Pizza.src,
                buttons: [
                    { iconSize:"small", title: 'small', price: '$8.99',icon:LocalPizza },
                    { iconSize:"medium", title: 'medium', price: '$12.99',icon:LocalPizza  },
                    { iconSize:"large", title: 'large', price: '$15.99',icon:LocalPizza  },
                ],
                sauce:{
                    name:"Tomato Sauce",
                    amount:"normal",
                    price:0
                }
            },
            {
                title: 'Pesto Chicken',
                description: 'Grilled chicken, basil pesto, roasted tomatoes, and mozzarella.',
                image: Pizza.src,
                buttons: [
                    { iconSize:"small", title: 'small', price: '$8.99',icon:LocalPizza },
                    { iconSize:"medium", title: 'medium', price: '$12.99',icon:LocalPizza  },
                    { iconSize:"large", title: 'large', price: '$15.99',icon:LocalPizza  },
                ],
                sauce:{
                    name:"Tomato Sauce",
                    amount:"normal",
                    price:0
                }
            },
        ],
    },
]
const defaultQuantities = (basePrice: number): IngredientType["IngredientOptions"] =>  [
    { quantity: "none", price: 0 },
    { quantity: "light", price: 0 },
    { quantity: "normal", price: 0 },
    { quantity: "extra", price: basePrice },
    { quantity: "double", price: basePrice * 1.5 }
];

export const Ingredients: IngredientCategory[] = [
    {
        name: "Cheese",
        icon: LocalPizza,
        ingredients: [
            { name: "Mozzarella", icon: LocalPizza, IngredientOptions: defaultQuantities(1.0) },
            { name: "Cheddar", icon: LocalPizza, IngredientOptions: defaultQuantities(1.2) },
            { name: "Parmesan", icon: LocalPizza, IngredientOptions: defaultQuantities(1.2) },
            { name: "Provolone", icon: LocalPizza, IngredientOptions: defaultQuantities(1.2) },
            { name: "Vegan Cheese", icon: LocalPizza, IngredientOptions: defaultQuantities(1.2) }
        ]
    },
    {
        name: "Meats",
        icon: Restaurant,
        ingredients: [
            { name: "Pepperoni", icon: Restaurant, IngredientOptions: defaultQuantities(1.5) },
            { name: "Sausage", icon: Restaurant, IngredientOptions: defaultQuantities(1.5) },
            { name: "Bacon", icon: Restaurant, IngredientOptions: defaultQuantities(1.5) },
            { name: "Ham", icon: Restaurant, IngredientOptions: defaultQuantities(1.5) },
            { name: "Grilled Chicken", icon: Restaurant, IngredientOptions: defaultQuantities(2.0) }
        ]
    },
    {
        name: "Veggies",
        icon: Grass,
        ingredients: [
            { name: "Bell Peppers", icon: Grass, IngredientOptions: defaultQuantities(1.0) },
            { name: "Mushrooms", icon: Grass, IngredientOptions: defaultQuantities(1.0) },
            { name: "Onions", icon: Grass, IngredientOptions: defaultQuantities(0.8) },
            { name: "Olives", icon: Grass, IngredientOptions: defaultQuantities(1.0) },
            { name: "Spinach", icon: Grass, IngredientOptions: defaultQuantities(1.0) }
        ]
    },
    {
        name: "Crust",
        icon: LunchDining,
        ingredients: [
            { name: "Thin Crust", icon: LunchDining, IngredientOptions: null, isExclusive: true },
            { name: "Thick Crust", icon: LunchDining, IngredientOptions: null, isExclusive: true },
            { name: "Stuffed Crust", icon: LunchDining, IngredientOptions: null, isExclusive: true },
            { name: "Gluten-Free", icon: LunchDining, IngredientOptions: null, isExclusive: true },
            { name: "Cauliflower Crust", icon: LunchDining, IngredientOptions: null, isExclusive: true }
        ]
    },
    {
        name: "Sauce",
        icon: EmojiFoodBeverage,
        ingredients: [
            { name: "Tomato Sauce", icon: EmojiFoodBeverage, IngredientOptions: null, isExclusive: true },
            { name: "BBQ Sauce", icon: EmojiFoodBeverage, IngredientOptions: null, isExclusive: true },
            { name: "Alfredo Sauce", icon: EmojiFoodBeverage, IngredientOptions: null, isExclusive: true },
            { name: "Pesto Sauce", icon: EmojiFoodBeverage, IngredientOptions: null, isExclusive: true },
            { name: "Spicy Marinara", icon: EmojiFoodBeverage, IngredientOptions: null, isExclusive: true }
        ]
    },
    {
        name: "Extras",
        icon: SetMeal,
        ingredients: [
            { name: "Garlic", icon: SetMeal, IngredientOptions: defaultQuantities(0.5) },
            { name: "Chili Flakes", icon: SetMeal, IngredientOptions: defaultQuantities(0.5) },
            { name: "Oregano", icon: SetMeal, IngredientOptions: defaultQuantities(0.3) },
            { name: "Basil", icon: SetMeal, IngredientOptions: defaultQuantities(0.5) },
            { name: "Ranch Drizzle", icon: SetMeal, IngredientOptions: defaultQuantities(1.0) }
        ]
    }
];

export type IngredientCategory = {
    name: string;
    icon: OverridableComponent<SvgIconTypeMap> | string;
    ingredients: IngredientType[]
}