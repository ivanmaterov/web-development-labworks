import { Button } from "@mui/material";
import { memo, VFC } from "react";
import { useAppDispatch } from "../redux/store";

const SignOutButtonComponent: VFC = () => {
  const dispatch = useAppDispatch();

  const onClick = () => {
    // dispatch();
  }

  return (
    <Button variant='contained' color='secondary' onClick={onClick}>Sign out</Button>
  )
}

export const SignOutButton = memo(SignOutButtonComponent);