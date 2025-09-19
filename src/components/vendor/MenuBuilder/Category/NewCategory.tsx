import { ChangeEvent, FormEvent, useState } from 'react'
import { useAppDispatch, useAppSelector } from '@/store/hooks.tsx'
import { selectItem, selectStore } from '@/store/selectors.tsx'
import CreatePanel, {
    CreatePanelFieldsType,
} from '@/components/Panel/CreatePanel.tsx'
import { ScreenProps } from '@/components/vendor/MenuBuilder/MenuBuilder.tsx'
import { MenuCategoryType } from '@/lib/db/model/menuCategory.ts'
import menuCategoryApi from '@/lib/api/menuCategoryApi.ts'
import { storeApi } from '@/lib/api/storeApi.ts'
import { menuItemInitialState } from '@/store/initialState.ts'
import { refreshStores } from '@/store/slices.tsx'

const NewCategory = (props: ScreenProps) => {
    const {
        screen: [screen, setScreen],
    } = props
    const dispatch = useAppDispatch()
    const [fieldData, setFieldData] = useState<MenuCategoryType>(
        menuItemInitialState['category']
    )
    const [loading, setLoading] = useState(false)
    const { store } = useAppSelector(selectStore)
    const item = useAppSelector(selectItem)

    const handleBack = () => {
        setScreen('categories')
    }

    const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setFieldData((f: any) => {
            return { ...f, [name]: value }
        })
    }

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setLoading(true)
        const { _id, ...data } = fieldData
        const res = await menuCategoryApi.createMenuCategory(data)
        if (res._id) {
            const resStore = await storeApi.editStore({
                ...store,
                menu: [...store.menu, res._id],
            })
            if (resStore._id) {
                handleBack()
                dispatch(refreshStores())
                alert(`Menu category created successfully`)
                setLoading(false)
                return
            }
            alert(`Menu category created unsuccessfully`)
            setLoading(false)
            return
        }
        setLoading(false)
        alert(`Menu category created unsuccessfully`)
    }

    const fields: CreatePanelFieldsType[] = [
        {
            name: 'name',
            label: 'Category Name',
            onChange: handleChange,
            value: fieldData.name,
            required: true,
            fullWidth: true,
        },
        {
            name: 'variant',
            label: 'Category Variant Name',
            onChange: handleChange,
            value: fieldData.variant,
            required: true,
            fullWidth: true,
        },
        {
            name: 'items',
            label: 'Select Menu Items',
            onChange: handleChange,
            value: fieldData.items,
            multiple: true,
            fullWidth: true,
            list: item.menuItems,
        },
    ]

    return (
        <CreatePanel
            title="New Menu Category"
            handleBack={handleBack}
            handleSubmit={handleSubmit}
            fields={fields}
            loading={loading}
        />
    )
}
export default NewCategory
