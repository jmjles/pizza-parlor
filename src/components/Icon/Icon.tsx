import {
    Cancel,
    Cookie,
    Grass,
    LocalDrink,
    LocalPizza,
    LunchDining,
    Restaurant,
    SetMeal,
    Water,
} from '@mui/icons-material'

const Icon = ({
    name,
    size,
}: {
    name: string
    size: 'small' | 'medium' | 'large'
}) => {
    switch (name) {
        case 'pizza':
            return <LocalPizza fontSize={size} />
        case 'desert':
            return <Cookie fontSize={size} />
        case 'drink':
            return <LocalDrink fontSize={size} />
        case 'meat':
            return <Restaurant fontSize={size} />
        case 'cancel':
            return <Cancel fontSize={size} />
        case 'sauce':
            return <Water fontSize={size} />
        case 'grass':
            return <Grass fontSize={size} />
        case 'lunch_dining':
            return <LunchDining fontSize={size} />
        case 'set_meal':
            return <SetMeal fontSize={size} />
        default:
            return null
    }
}
export default Icon
export const iconNameList: IconNameType[] = [
    'pizza',
    'desert',
    'drink',
    'sauce',
    'meat',
    'grass',
    'lunch_dining',
    'set_meal',
]
export type IconNameType =
    | 'pizza'
    | 'desert'
    | 'drink'
    | 'cancel'
    | 'sauce'
    | 'meat'
    | 'grass'
    | 'lunch_dining'
    | 'set_meal'
