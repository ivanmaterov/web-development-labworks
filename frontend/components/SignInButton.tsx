import { Button } from "@mui/material";
import { memo, VFC } from "react";
import { useAppDispatch } from "../redux/store";

const SignInButtonComponent: VFC = () => {
  const dispatch = useAppDispatch();

  const onClick = () => {
    // dispatch();
  }

  return (
    <Button variant='contained' color='secondary' onClick={onClick}>Sign In</Button>
  )
}

export const SignInButton = memo(SignInButtonComponent);