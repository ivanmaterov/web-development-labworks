export interface AuthState {
  readonly username: string;
  readonly token: string | null;
  readonly isSignedIn: boolean;
}
