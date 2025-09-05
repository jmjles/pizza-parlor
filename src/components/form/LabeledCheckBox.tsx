import { Checkbox, FormControlLabel } from '@mui/material'

const LabeledCheckBox = (props: LabeledCheckBoxProps) => {
    const { label, checked, onClick } = props
    return (
        <FormControlLabel
            label={label}
            value={checked}
            control={<Checkbox onClick={onClick} />}
        />
    )
}

type LabeledCheckBoxProps = {
    label: string
    checked: boolean
    onClick: () => void
}
export default LabeledCheckBox
