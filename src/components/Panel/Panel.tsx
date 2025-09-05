import {
    Breakpoint,
    Button,
    ButtonProps,
    Container,
    Grid2,
    Paper,
    Stack,
    Tooltip,
    Typography as Font,
} from '@mui/material'
import { Add, ArrowBack } from '@mui/icons-material'
import ListItem from '@/components/Panel/ListItem.tsx'

const Panel = ({ maxWidth = 'md', ...props }: PanelProps) => {
    const {
        title,
        children,
        handleBack,
        handleAction,
        actionBtn,
        actionProps,
    } = props
    return (
        <Container sx={{ marginTop: '20px' }}>
            <Paper>
                <Container maxWidth={maxWidth}>
                    <Font
                        variant="h3"
                        align="center"
                        marginBottom={2}
                        paddingTop={2}
                    >
                        {title}
                    </Font>
                    <Grid2 container direction={'column'} spacing={2}>
                        {(handleBack || handleAction) && (
                            <Grid2 container justifyContent="space-between">
                                <Button
                                    variant="contained"
                                    onClick={handleBack}
                                    sx={{
                                        visibility: handleBack
                                            ? null
                                            : 'hidden',
                                    }}
                                >
                                    <Stack
                                        direction="row"
                                        alignItems="center"
                                        spacing={1}
                                    >
                                        <ArrowBack /> <Font>Back</Font>
                                    </Stack>
                                </Button>
                                <Button
                                    variant="contained"
                                    onClick={handleAction}
                                    {...actionProps}
                                    sx={{
                                        visibility: handleAction
                                            ? null
                                            : 'hidden',
                                    }}
                                >
                                    {actionBtn}
                                </Button>
                            </Grid2>
                        )}

                        {children}
                    </Grid2>
                </Container>
            </Paper>
        </Container>
    )
}
export default Panel

export type PanelProps = {
    title: string
    children: React.ReactNode
    handleBack?: () => void
    handleAction?: () => void
    actionBtn?: React.ReactNode
    actionProps?: ButtonProps
    maxWidth?: Breakpoint
}
