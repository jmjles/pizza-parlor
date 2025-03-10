import { Container, Grid2, Typography as Font } from '@mui/material'
import MenuItem, { MenuItemType } from '@/components/menuItem/MenuItem'
import wood from '@/assets/images/background.jpg'

const Menu = (props: MenuPropsType) => {
    return (
        <Grid2 container spacing={2} padding={{xs:0,sm:1}} height={"100%"}>
            {props.items.map((i, id) => (
                <Grid2 key={id} id={i.category}>
                    <Font align="center" variant="h4" marginBottom={1} color="#FFF" fontWeight="bold">
                        {i.category}
                    </Font>
                    <Grid2 container justifyContent="space-between" spacing={2}>
                        {i.menuItems.map((m, id) => (
                            <Grid2 key={id} size={{xs:12,sm:6,md:3.8}}>
                                <MenuItem {...m} />
                            </Grid2>
                        ))}
                    </Grid2>
                </Grid2>
            ))}
        </Grid2>
    )
}
export type MenuType = {
    category: string;
    menuItems: MenuItemType[];
};
type MenuPropsType = {
    items: MenuType[];
};
export default Menu
