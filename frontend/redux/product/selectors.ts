import { createSelector } from '@reduxjs/toolkit';
import { RootState } from './../store';
import { productAdapter } from './slice';

export const {
  selectAll: selectAllProducts,
} = productAdapter.getSelectors<RootState>(state => state.products);