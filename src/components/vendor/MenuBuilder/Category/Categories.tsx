import ListPanel from '@/components/Panel/ListPanel.tsx'
import { MenuCategoryType } from '@/lib/db/model/menuCategory.ts'
import { Stack, Typography as Font } from '@mui/material'
import { Add } from '@mui/icons-material'
import { useAppDispatch, useAppSelector } from '@/store/hooks.tsx'
import { setCategory } from '@/store/slices.tsx'
import { selectStore } from '@/store/selectors.tsx'
import { ScreenProps } from '@/components/vendor/MenuBuilder/MenuBuilder.tsx'

const Categories = (props: ScreenProps) => {
    const {
        screen: [screen, setScreen],
    } = props
    const dispatch = useAppDispatch()
    const { store } = useAppSelector(selectStore)
    const handleBack = () => {
        setScreen('stores')
    }
    const handleNewCategory = () => {
        setScreen('newCategory')
    }
    const Btn = () => (
        <Stack direction="row" alignItems="center">
            <Font>New Category</Font>
            <Add />
        </Stack>
    )
    const handleCategory = (category: MenuCategoryType) => {
        dispatch(setCategory(category))
        setScreen('category')
    }

    return (
        <ListPanel
            title="Store Menu"
            list={store.menu}
            onClick={handleCategory}
            itemWidth="100%"
            handleBack={handleBack}
            handleAction={handleNewCategory}
            emptyList="Menu is empty!"
            actionBtn={<Btn />}
        />
    )
}
export default Categories
