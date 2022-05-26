import { RootState } from './../store';
import { createSelector } from '@reduxjs/toolkit';

export const selectToken = createSelector(
  (state: RootState) => state.auth.token,
  token => token,
)

export const selectIsSignedIn = createSelector(
  (state: RootState) => state.auth.isSignedIn,
  isSignedIn => isSignedIn,
)

export const selectAuth = createSelector(
  (state: RootState) => state.auth,
  auth => auth,
)
