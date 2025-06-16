import { Container, Divider, Grid2, Typography as Font } from '@mui/material'

const PriceSummary = (props: PriceSummaryProps) => {
    return (
        <Container disableGutters style={{ maxHeight: '300px', overflowY: 'scroll' }}>
            <Grid2 container spacing={2} direction="column">
                {props.charges.map((charge) => (
                    <Grid2>
                        <Container>
                            <Font align="left">
                                {charge.name}
                            </Font>
                        </Container>
                    </Grid2>
                ))
                }
                <Grid2>
                    <Divider />
                </Grid2>
                <Grid2>
                    <Container>
                        <Font align={'right'}>Total: ${props.charges.reduce(
                            (x, y) => x + y.amount, 0).toFixed(2)
                        }
                        </Font>
                    </Container>
                </Grid2>
            </Grid2>
        </Container>)
}
type PriceSummaryProps = {
    charges: Charge[]
}

export type Charge = {
    name: string,
    amount: number,
}

export default PriceSummary