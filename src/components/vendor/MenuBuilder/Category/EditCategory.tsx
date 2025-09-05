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
import SubmitBtn from '@/components/form/CreateBtn.tsx'
import { refreshStores } from '@/store/slices.tsx'
import { Grid2, Typography } from '@mui/material'
import { Delete } from '@mui/icons-material'

const NewCategory = (props: ScreenProps) => {
    const {
        screen: [screen, setScreen],
    } = props
    const { store } = useAppSelector(selectStore)
    const { category, menuItems } = useAppSelector(selectItem)
    const dispatch = useAppDispatch()
    const [fieldData, setFieldData] = useState<
        Omit<MenuCategoryType, 'items'> & { items: string[] }
    >({
        ...category,
        items: category.items.map((i) => i._id),
    })
    const item = useAppSelector(selectItem)

    const handleBack = () => {
        setScreen('category')
    }

    const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setFieldData((f: any) => {
            return { ...f, [name]: value }
        })
    }

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const res = await menuCategoryApi.updateMenuCategory(fieldData)
        if (res._id) {
            handleBack()
            alert(`Menu category updated successfully`)
            return
        }
        alert(`Failed to update menu category`)
        return
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

    const handleDelete = async () => {
        const res = await menuCategoryApi.removeMenuCategory(fieldData._id)
        if (res.id) {
            const resStore = await storeApi.editStore({
                ...store,
                menu: store.menu.filter((m: any) => m !== category._id),
            })
            if (resStore.id) {
                dispatch(refreshStores())
                setScreen('categories')
                alert(`Menu Category deleted successfully`)
                return
            }
        }
        alert(`Menu Category deleted unsuccessfully`)
    }
    const Btn = () => (
        <Grid2 container spacing={1}>
            <Typography>Delete Category</Typography>
            <Delete />
        </Grid2>
    )
    return (
        <CreatePanel
            title="Edit Menu Category"
            handleAction={handleDelete}
            actionProps={{ color: 'error' }}
            handleBack={handleBack}
            actionBtn={<Btn />}
            handleSubmit={handleSubmit}
            fields={fields}
            submitBtn={<SubmitBtn submitText="Update Menu Category" />}
        />
    )
}
export default NewCategory
