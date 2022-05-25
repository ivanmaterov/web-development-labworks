import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { useRouter } from "next/router";
import { memo, useEffect, VFC } from "react";
import { useAppDispatch, useAppSelector } from "../redux/store";

import { selectAllProducts } from "../redux/product/selectors";
import { removeProductFromCart } from "../redux/cart/slice";
import { removeProductById, fetchProducts } from "../redux/product/dispatchers";


const ManagementTableComponent: VFC = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch])

  const products = useAppSelector(selectAllProducts);

  const removeProduct = (productId: number) => {
    dispatch(removeProductById(productId));
    dispatch(removeProductFromCart(productId));
  }

  const navigateTo = (url: string) => {
    router.push(url);
  }

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Type</TableCell>
            <TableCell align="left">Name</TableCell>
            <TableCell align="left">Price</TableCell>
            <TableCell align="left"></TableCell>
            <TableCell align="left"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products.map((product) => (
            <TableRow
              key={product.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {product.category.title}
              </TableCell>
              <TableCell align="left">{product.name}</TableCell>
              <TableCell align="left">{product.price}</TableCell>
              <TableCell align="left"><Button onClick={() => removeProduct(product.id)}>Remove</Button></TableCell>
              <TableCell align="left"><Button onClick={() => navigateTo(`/products/${product.id}`)}>Update</Button></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export const ManagementTable = memo(ManagementTableComponent);