import {
    Button,
    Divider,
    FormControlLabel,
    Grid2,
    Radio,
    RadioGroup,
    Typography as Font,
} from '@mui/material'
import { Remove } from '@mui/icons-material'
import SelectItems from '@/components/form/SelectItems.tsx'
import { CreatePanelFieldsType } from '@/components/Panel/CreatePanel.tsx'
import { iconNameList, IconNameType } from '@/components/Icon/Icon.tsx'
import { MenuSizeButtonType } from '@/lib/classes/MenuItem.ts'

const SizeFields = (props: SizesFieldProps) => {
    const { id, handleChange, handleDelete, sizes, iconSize, icon } = props

    const fields: CreatePanelFieldsType[] = [
        () => (
            <Button
                variant="contained"
                size="small"
                style={{ width: '150px', marginLeft: 'auto' }}
                color="error"
                onClick={() => handleDelete(id)}
            >
                <Grid2 container spacing={1}>
                    <Font variant="subtitle2">Remove Size</Font>
                    <Remove />
                </Grid2>
            </Button>
        ),
        {
            name: 'title',
            label: 'Size Name',
            onChange: (e: any) => handleChange(e, id),
            value: sizes[id].title,
            required: true,
            fullWidth: true,
        },
        {
            name: 'price',
            label: 'Price',
            onChange: (e: any) => handleChange(e, id),
            value: sizes[id].price,
            required: true,
            fullWidth: true,
        },
        {
            name: 'icon',
            label: 'Ingredient Icon',
            onChange: (e: any) => handleChange(e, id),
            value: icon,
            required: true,
            fullWidth: true,
            list: iconNameList,
        },
        () => (
            <RadioGroup
                value={iconSize}
                name="iconSize"
                onChange={(e: any) => handleChange(e, id)}
            >
                <Font variant="h6">Icon Size</Font>
                <Divider />
                <Grid2 container>
                    {['small', 'medium', 'large'].map((i) => (
                        <FormControlLabel
                            value={i}
                            control={<Radio />}
                            label={
                                <Font style={{ textTransform: 'capitalize' }}>
                                    {i}
                                </Font>
                            }
                            labelPlacement="top"
                        />
                    ))}
                </Grid2>
            </RadioGroup>
        ),
    ]

    return (
        <>
            {fields.map((f) => (
                <SelectItems field={f} />
            ))}
        </>
    )
}

type SizesFieldProps = {
    id: number
    handleChange: (e: React.ChangeEvent<HTMLInputElement>, id: number) => void
    handleDelete: (id: number) => void
    sizes: MenuSizeButtonType[]
    iconSize: 'small' | 'medium' | 'large'
    icon: IconNameType
}
export default SizeFields
