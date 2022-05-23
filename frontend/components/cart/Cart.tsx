import { Button, Drawer, Stack, Typography } from "@mui/material";
import { memo, useEffect, useState, VFC } from "react";
import { useSelector } from "react-redux";
import { selectCartProducts } from "../../redux/product/selectors";
import CardItem from "./CartItem";
import { Product } from "../../api";
import { useAppDispatch } from "../../redux/store";
import { CartState } from "../../redux/cart/state";
import { setCart } from "../../redux/cart/slice";
import { fetchProducts, fetchProductsByIds } from "../../redux/product/dispatchers";

// Swagger generates field with a wrong params
const reduceFunction = (prev: number, current: Product) => prev + Number(current.price)

const CartContent: VFC = () => {
  const cart = useSelector(selectCartProducts)
  const priceSum = cart.reduce(reduceFunction, 0)

  return (
    <Stack spacing={2} sx={{width: '320px'}}>
      <Typography variant="h4">
        {`Total price: ${priceSum}`}
      </Typography>
      { cart.map((product) => <CardItem product={product}/>) }
    </Stack>
  )
}


const CartComponent: VFC = () => {
  const dispatch = useAppDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [isAlreadyLoadedFromStorage, setIsAlreadyLoadedFromStorage] = useState(false);

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    if (!isAlreadyLoadedFromStorage) {
      try {
        const cartItemsString = localStorage.getItem('cart')
        if (cartItemsString !== null) {
          const cart: CartState = JSON.parse(cartItemsString);
          dispatch(setCart(cart));
          dispatch(fetchProductsByIds(cart.productIds));
        }
      } finally {
        setIsAlreadyLoadedFromStorage(true);
      }
    }
  }, [isAlreadyLoadedFromStorage, setIsAlreadyLoadedFromStorage, dispatch])

  return (
    <>
      <Button 
        color="secondary"
        variant="contained"
        onClick={toggleDrawer}
      >
        Cart
      </Button>
      <Drawer anchor='right' open={isOpen} onClose={toggleDrawer}>
        <CartContent />
      </Drawer>
    </>
  )
}

export const Cart = memo(CartComponent);
