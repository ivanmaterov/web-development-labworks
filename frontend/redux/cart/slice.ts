import { CartState } from "./state";
import { createSlice, PayloadAction, } from '@reduxjs/toolkit';

/** Initial state for cart. */
const initialState: CartState = {
	productIds: []
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addProductCart: (state, action: PayloadAction<number>) => {
      state.productIds.push(action.payload);
    },
    removeProductFromCart: (state, action: PayloadAction<number>) => {
      state.productIds.splice(state.productIds.indexOf(action.payload), 1);
    },
		setCart: (state, action: PayloadAction<CartState>) => {
      state.productIds = action.payload.productIds;
    },
  },
});

export const {
  addProductCart,
	removeProductFromCart,
  setCart,
} = cartSlice.actions;
