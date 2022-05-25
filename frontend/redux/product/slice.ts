import { createEntityAdapter, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "../../api/models/Product";
import { fetchProducts, removeProductById, updateProduct } from "./dispatchers";


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
    .addCase(removeProductById.fulfilled, (state, action) => {
      productAdapter.removeOne(state, action.payload);
    })
    .addCase(updateProduct.fulfilled, (state, action) => {
      productAdapter.setOne(state, action.payload);
    })
});

export const {
  addProducts,
} = productsSlice.actions;
