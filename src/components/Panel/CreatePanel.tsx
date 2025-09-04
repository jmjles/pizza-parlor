import Panel, { PanelProps } from '@/components/Panel/Panel.tsx'
import {
    Button,
    ButtonProps,
    Grid2,
    SelectProps,
    TextFieldProps,
} from '@mui/material'
import { IngredientType } from '@/lib/classes/Ingredient.ts'
import { MenuItemType } from '@/lib/classes/MenuItem.ts'
import React, { FormEvent, JSX } from 'react'
import { IconNameType } from '@/components/Icon/Icon.tsx'
import SelectItems from '@/components/form/SelectItems.tsx'
import { MenuItemTypes } from '@/store/initialState.ts'

const CreatePanel = (props: CreatePanelProps) => {
    const { handleSubmit, fields, submitBtn, submitProps, ...panelProps } =
        props

    return (
        <Panel {...panelProps}>
            <Grid2
                container
                component="form"
                direction="column"
                alignItems="center"
                marginLeft="auto"
                marginRight="auto"
                onSubmit={handleSubmit}
                spacing={2}
                size={{ xs: 12, sm: 8, md: 4 }}
                marginBottom={3}
            >
                {fields.map((f) => (
                    <SelectItems field={f} />
                ))}
                <Grid2 alignSelf="end">
                    <Button variant="contained" {...submitProps} type="submit">
                        {submitBtn || 'Create'}
                    </Button>
                </Grid2>
            </Grid2>
        </Panel>
    )
}
export default CreatePanel

interface CreatePanelProps extends Omit<PanelProps, 'children'> {
    handleSubmit: (e: FormEvent<HTMLFormElement>) => void
    handleBack: () => void
    submitProps?: ButtonProps
    submitBtn?: React.ReactNode
    fields: CreatePanelFieldsType[]
}

export type CreatePanelFieldsType =
    | TextFieldProps
    | SelectType
    | (() => JSX.Element)

type SelectType = SelectProps & {
    list: (IngredientType | MenuItemTypes | IconNameType)[]
}
