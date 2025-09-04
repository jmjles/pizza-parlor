import { IngredientType } from '@/lib/classes/Ingredient.ts'
import { Box, Chip } from '@mui/material'
import Icon, { IconNameType } from '@/components/Icon/Icon.tsx'
import React from 'react'
import { MenuItemTypes } from '@/store/initialState.ts'

const SelectItemChip = (props: SelectItemChipProps) => {
    const { selected, list } = props

    const matched = (list as (MenuItemTypes | IngredientType)[]).find(
        (i) => i._id === selected
    )
    if (matched) {
        if ('name' in matched)
            return (
                <Box
                    sx={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: 0.5,
                    }}
                >
                    <Chip key={matched._id} label={matched.name} />
                </Box>
            )
    }
    if (typeof selected === 'string')
        return <Icon name={selected} size={'large'} />

    return (
        <Box
            sx={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: 0.5,
            }}
        >
            {selected.map((value) => {
                const matched = (
                    list as (IngredientType | MenuItemTypes)[]
                ).find((i) => i._id === value)
                if (!matched) return null

                return (
                    <Chip
                        key={matched._id}
                        label={
                            'title' in matched ? matched.title : matched.name
                        }
                    />
                )
            })}
        </Box>
    )
}

type SelectItemChipProps = {
    selected: string[] | string
    list: (IngredientType | MenuItemTypes | IconNameType)[]
}
export default SelectItemChip
