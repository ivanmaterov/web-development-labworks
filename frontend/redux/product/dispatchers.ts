import { createAsyncThunk } from "@reduxjs/toolkit";
import { ProductsService, Product, PatchedProduct } from "../../api";

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

export const removeProductById = createAsyncThunk(
  'product/remove',
  async (id: number) => {
    await ProductsService.productsDestroy(id=id);
    return id;
  }
)

export const updateProduct = createAsyncThunk(
  'product/update',
  async (product: Product) => {
    if (product.id != null) {
      return await ProductsService.productsPartialUpdate(product.id, product);
    }
  }
)

export const addProduct = createAsyncThunk(
  'product/add',
  async (product: Product) => {
    return await ProductsService.productsCreate(requestBody=product);
  }
)
