import { FormControlLabel, Radio } from '@mui/material'

const LabeledRadio = (props: LabeledCheckBoxProps) => {
    const { label, value } = props
    return <FormControlLabel label={label} value={value} control={<Radio />} />
}

type LabeledCheckBoxProps = {
    label: string
    value: string
}
export default LabeledRadio
