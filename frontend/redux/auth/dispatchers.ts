import { createAsyncThunk } from '@reduxjs/toolkit';
import { AuthService, Login } from '../../api';

export const signIn = createAsyncThunk(
  'auth/login',
  (login: Login) => AuthService.authLoginCreate(login),
)

export const signOut = createAsyncThunk(
  'auth/logout',
  () => AuthService.authLogoutCreate(),
)

// export const getUserFromCache = createAsyncThunk(
//   'auth/',
//   async () => AuthService.getUser(),
// );
