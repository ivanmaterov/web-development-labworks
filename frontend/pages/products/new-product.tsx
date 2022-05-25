import { Box } from "@mui/material";
import { useRouter } from "next/router";
import { VFC } from "react";

import { ProductForm } from '../../components/forms/ProductForm';
import { Product } from "../../api";
import { addProduct } from '../../redux/product/dispatchers';
import { useAppDispatch } from '../../redux/store';

const NewProduct: VFC = () => {
  const dispatch = useAppDispatch();

  const onSubmit = (values: Product) => {
    dispatch(addProduct(values));
  }

  return (
    <Box sx={{
      padding: '2% 25%'
    }}>
      <ProductForm onSubmit={onSubmit}/>
    </Box>
  )
}

export default NewProduct;
