'use client'
import { Menu, LocalPizza, Settings, ShoppingCart } from '@mui/icons-material'
import {
    AppBar, Button,
    Container,
    Grid2,
    IconButton, Stack,
    Typography as Font,
} from '@mui/material'
import blackBoard from '@/assets/images/blackboard.jpg'
import woodBorder from '@/assets/images/wood-border.jpg'

const Bar = (props: BarType) => {
    return (
        <AppBar position="sticky" style={{
            backgroundImage: `url(${blackBoard.src})`,
            borderImage: `url(${woodBorder.src}) 20`,
            borderImageRepeat: 'repeat',
            borderWidth: '10px',
            borderBottomStyle: 'solid',
        }}>
            <Container>
                <Grid2 container justifyContent="space-between" wrap="nowrap">
                    <Button color="inherit" onClick={props.openLocations}>
                        <Grid2
                            container
                            alignItems="center"
                            spacing={2}
                            justifyContent="space-around"
                            wrap="nowrap"
                        >
                            <Grid2>
                                <LocalPizza fontSize="large" />
                            </Grid2>
                            <Grid2>
                                <Stack alignItems="start">
                                    <Font variant="h4" textOverflow="ellipsis" maxWidth="100%" overflow="hidden"
                                          whiteSpace="nowrap">{props.city}</Font>
                                    <Font textOverflow="ellipsis" maxWidth="100%" overflow="hidden"
                                          whiteSpace="nowrap">{props.location}</Font>
                                </Stack>
                            </Grid2>
                        </Grid2>
                    </Button>
                    <Grid2 container spacing={2} wrap="nowrap" alignItems="center">
                        <Grid2 display={{ xs: 'none', sm: 'initial', xl: 'none' }}>
                            <IconButton color="inherit">
                                <ShoppingCart fontSize="medium" />
                            </IconButton>
                        </Grid2>
                        <Grid2 display={{ xs: 'initial', xl: 'none' }}>
                            <IconButton color="inherit">
                                <Menu fontSize="medium" />
                            </IconButton>
                        </Grid2>
                        <Grid2 display={{ xs: 'none', xl: 'initial' }}>
                            <IconButton color="inherit">
                                <Settings fontSize="medium" />
                            </IconButton>
                        </Grid2>
                    </Grid2>
                </Grid2>
            </Container>
        </AppBar>
    )
}
export type BarType = {
    city: string;
    location: string
    openLocations: any
};
export default Bar
