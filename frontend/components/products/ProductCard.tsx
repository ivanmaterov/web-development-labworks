import { ComponentType } from "react";

import { Product } from "../../api";
import { useAppDispatch } from "../../redux/store";
import { addProductCart } from "../../redux/cart/slice";

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';


interface ProductCard {
  readonly product: Product;
}

const ProductCard: ComponentType<ProductCard> = ({product}: ProductCard) => {
  const dispatch = useAppDispatch();

  const addToCart = () => {
    dispatch(addProductCart(product.id));
  }

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        alt="Product"
        height="140"
        image={product.image ? product.image : undefined}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          { product.name }
        </Typography>
        <Typography variant="body2" color="text.secondary">
          { product.description }
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Price: { product.price }
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={addToCart}>add</Button>
      </CardActions>
    </Card>
  );
};

export default ProductCard;
