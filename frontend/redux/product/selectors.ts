import { createSelector } from '@reduxjs/toolkit';
import { Product } from '../../api';
import { RootState } from './../store';
import { productAdapter } from './slice';


export const selectCartProducts = createSelector(
  (state: RootState) => state.products.entities,
  (state: RootState) => state.cart.productIds,
  (products, productIds) => {
    const cartProducts: Product[] = [];
    productIds.forEach(
      id => {
        const product = products[id];
        if (product != null) {
          cartProducts.push(product);
        }
      }
    );
    return cartProducts;
  }
);

export const {
  selectAll: selectAllProducts,
} = productAdapter.getSelectors<RootState>(state => state.products);