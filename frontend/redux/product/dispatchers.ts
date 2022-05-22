import { createAsyncThunk } from "@reduxjs/toolkit";
import { ProductsService } from "../../api/services/ProductsService";

export const fetchProducts = createAsyncThunk(
  'products/products',
  async () => {
    return await ProductsService.productsList()
  }
);
