import {
    FormControl,
    InputLabel,
    MenuItem,
    OutlinedInput,
    Select,
    TextField,
} from '@mui/material'
import Icon from '@/components/Icon/Icon.tsx'
import React from 'react'
import { CreatePanelFieldsType } from '@/components/Panel/CreatePanel.tsx'
import SelectItemChip from '@/components/form/SelectItemChip.tsx'

const SelectItems = (props: SelectItemsProps) => {
    const { field } = props
    if (typeof field === 'function') return field()

    if (!('list' in field)) return <TextField {...field} />

    return (
        <FormControl fullWidth>
            <InputLabel id="chip-label">{field.label}</InputLabel>
            <Select
                {...field}
                fullWidth
                input={
                    <OutlinedInput
                        id="select-multiple-chip"
                        label={field.label}
                    />
                }
                renderValue={(selected: any) => (
                    <SelectItemChip selected={selected} list={field.list} />
                )}
            >
                {field.list.map((m) => {
                    if (typeof m === 'string')
                        return (
                            <MenuItem key={m} value={m}>
                                <Icon name={m} size={'large'} />
                            </MenuItem>
                        )
                    if ('title' in m)
                        return (
                            <MenuItem key={m._id} value={m._id}>
                                {m.title}
                            </MenuItem>
                        )
                    return (
                        <MenuItem key={m._id} value={m._id}>
                            {m.name}
                        </MenuItem>
                    )
                })}
            </Select>
        </FormControl>
    )
}
type SelectItemsProps = {
    field: CreatePanelFieldsType
}
export default SelectItems
