import { ComponentType } from "react";

import { Product } from "../../api";

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import { useAppDispatch } from "../../redux/store";
import { removeProductFromCart } from "../../redux/cart/slice";

interface CardItemProps {
  readonly product: Product;
}

const CardItem: ComponentType<CardItemProps> = ({product}: CardItemProps) => {
  const dispatch = useAppDispatch();

  const removeFromCart = () => {
    dispatch(removeProductFromCart(product.id));
  }

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          { product.name }
        </Typography>
        <Typography variant='h6' component='div'>
            {`Price: ${product.price}`}
          </Typography>
      </CardContent>
      <CardActions sx={{padding: 0}}>
        <Button size="small" onClick={removeFromCart}>Remove</Button>
      </CardActions>
    </Card>
  );
};

export default CardItem;
