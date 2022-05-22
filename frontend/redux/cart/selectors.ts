import { RootState } from './../store';
import { createSelector } from '@reduxjs/toolkit';

export const selectCart = createSelector(
  (state: RootState) => state.cart,
  cart => cart,
)