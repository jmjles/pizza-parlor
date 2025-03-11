import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid2,
  Stack,
  Typography as Font,
  Select,
  MenuItem as MuiMenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";
import { LocalPizza } from "@mui/icons-material";
import Pizza from "@/assets/images/pizza.jpg";

const MenuItem = (props: MenuItemType) => {
  return (
    <Card style={{ height: 675, position: "relative" }}>
      <CardMedia component="img" image={Pizza.src} height="250" />
      <CardContent>
        <Font variant="h4">{props.title}</Font>
        <Font maxHeight={120} overflow="auto">
          {props.description}
        </Font>
        <Grid2 container spacing={2} direction="column">
          {props.unit && (
            <Grid2>
              <Font align="right">
                {props.unit.label}:
                <Font fontWeight="bold" color="orange" component="span">
                  {props.unit.price}
                </Font>
              </Font>
            </Grid2>
          )}
          {props.size && (
            <Grid2>
              <FormControl fullWidth>
                <InputLabel id="Size">Size</InputLabel>
                <Select labelId="Size" id="Size" label="Size" fullWidth>
                  {props.sizeOptions?.map((s) => (
                    <MuiMenuItem value={s} key={s}>{s}</MuiMenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid2>
          )}
          {props.amount && (
            <Grid2>
              <FormControl fullWidth>
                <InputLabel id="Amount">Amount</InputLabel>
                <Select labelId="Amount" id="Amount" label="Amount" fullWidth>
                  {[...Array(props.amountLimit)].map((_x, i) => (
                    <MuiMenuItem value={i + 1} key={i}>
                      {i + 1}
                    </MuiMenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid2>
          )}
        </Grid2>
      </CardContent>
      <CardActions style={{ position: "absolute", bottom: 0, width: "100%" }}>
        {!props.buttons?.length && (
          <Button fullWidth variant={"contained"}>
            Checkout
          </Button>
        )}
        {props.buttons?.length && (
          <Grid2
            container
            justifyContent="space-between"
            width="100%"
            alignItems="center"
            position="relative"
          >
            {props.buttons?.map((b) => (
              <Grid2 key={b.title}>
                <Button style={{ height: "83px" }}>
                  <Stack direction="column" alignItems="center">
                    <LocalPizza fontSize={b.title} />
                    <Font autoCapitalize="sentences">{b.title}</Font>
                    <Font>{b.price}</Font>
                  </Stack>
                </Button>
              </Grid2>
            ))}
          </Grid2>
        )}
      </CardActions>
    </Card>
  );
};
export type MenuItemType = {
  title: string;
  description: string;
  image: string;
  unit?: MenuUnitType;
  buttons?: MenuSizeButtonType[];
  amount?: boolean;
  amountLimit?: number;
  size?: boolean;
  sizeOptions?: string[];
};

type MenuSizeButtonType = {
  title: "small" | "medium" | "large";
  price: string;
};

type MenuUnitType = {
  label: string;
  price: string;
};

export default MenuItem;
