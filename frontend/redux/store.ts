import { configureStore } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { cartSlice } from './cart/slice';
import { productsSlice } from './product/slice';
import { authSlice } from './auth/slice';


export const store = configureStore({
	reducer: {
		cart: cartSlice.reducer,
		products: productsSlice.reducer,
		auth: authSlice.reducer,
	},
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

// just override default useDispatch and useSelector for comfortable
export const useAppDispatch = (): AppDispatch => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
