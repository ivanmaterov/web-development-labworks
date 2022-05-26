import { Button, Drawer } from "@mui/material";
import { memo, VFC, useState } from "react";
import { useAppDispatch, useAppSelector } from "../redux/store";
import { signIn } from "../redux/auth/dispatchers";
import { selectAuth } from "../redux/auth/selectors";
import { Login } from "../api";
import { SignInForm } from "./forms/SignInForm";

const SignInComponent: VFC = () => {
  const dispatch = useAppDispatch();
  const login = useAppSelector(selectAuth)
  const [isOpen, setIsOpen] = useState(false);

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  const onSubmit = (login: Login) => {
    dispatch(signIn(login));
  }

  return (
    <>
      <Button
        variant='contained'
        color='secondary'
        onClick={toggleDrawer}
      >
        Sign In
      </Button>
      <Drawer anchor="right" open={isOpen} onClose={toggleDrawer}>
        <SignInForm onSubmit={onSubmit}/>
      </Drawer>
    </>
  )
}

export const SignIn = memo(SignInComponent);