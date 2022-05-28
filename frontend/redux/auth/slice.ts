import { AuthState } from './state';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { signIn, signOut } from './dispatchers';

const initialState: AuthState = {
  username: '',
  token: null,
  isSignedIn: false,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setIsSignedIn: (state, action: PayloadAction<boolean>) => {
      state.isSignedIn = action.payload;
    },
    setEmail: (state, action: PayloadAction<string>) => {
      state.username = action.payload;
    },
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
  },
  extraReducers: builder => builder
    .addCase(signIn.fulfilled, (state, action) => {
      if (action.payload !== null) {
        state.token = action.payload.key;
        state.isSignedIn = true;
      }
    })
    .addCase(signOut.fulfilled, (state) => {
      state.token = null;
      state.isSignedIn = false;
    })
})


export const {
  setIsSignedIn,
  setEmail,
} = authSlice.actions;
