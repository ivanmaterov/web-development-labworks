import { createAsyncThunk } from "@reduxjs/toolkit";
import { ProductsService } from "../../api";

export const fetchProducts = createAsyncThunk(
  'products/products',
  async () => {
    return await ProductsService.productsList();
  }
);

export const fetchProductsByIds = createAsyncThunk(
  'products/productByIds',
  async (ids: readonly number[]) => {
    return await ProductsService.productsList(idIn=ids);
  }
)
