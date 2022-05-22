import { createEntityAdapter, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "../../api/models/Product";
import { fetchProducts } from "./dispatchers";


export const productAdapter = createEntityAdapter<Product>({
  selectId: product => product.id,
});

export const productsSlice = createSlice({
  name: 'products',
  initialState: productAdapter.getInitialState(),
  reducers: {
    addProducts: (state, action: PayloadAction<readonly Product[]>) => {
      productAdapter.setMany(state, action.payload)
    },
  },
  extraReducers: builder => builder
    .addCase(fetchProducts.fulfilled, (state, action) => {
      productAdapter.setMany(state, action.payload);
    })
});
