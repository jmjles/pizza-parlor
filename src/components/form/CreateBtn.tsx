import { Grid2, Typography as Font } from '@mui/material'
import { ArrowForward, Save } from '@mui/icons-material'

const SubmitBtn = (props: SubmitBtnProps) => {
    const { steps, submitText } = props
    if (!steps)
        return (
            <Grid2 container spacing={1}>
                <Font>{submitText}</Font> <Save />
            </Grid2>
        )

    const { maxStep, currentStep } = steps
    if (maxStep === currentStep) {
        return (
            <Grid2 container spacing={1}>
                <Font>{submitText}</Font> <Save />
            </Grid2>
        )
    }
    return (
        <Grid2 container spacing={1}>
            <Font>Next</Font> <ArrowForward />
        </Grid2>
    )
}

type SubmitBtnProps = {
    steps?: {
        maxStep: number
        currentStep: number
    }
    submitText: string
}
export default SubmitBtn
