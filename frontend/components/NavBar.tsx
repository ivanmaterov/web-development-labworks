import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material';
import { VFC } from 'react';

import style from '../styles/NavBar.module.css'
import { useRouter } from 'next/router';
import { useAppDispatch, useAppSelector } from '../redux/store';
import { SignIn } from './SignInComponent';
import { SignOutButton } from './SignOutButton';
import { Cart } from './cart/Cart';
import { selectIsSignedIn } from '../redux/auth/selectors';


const NavBar: VFC = () => {
  const router = useRouter();

  const isSignedIn = useAppSelector(selectIsSignedIn);

  const navigateTo = (url: string) => {
    router.push(url);
  }

  return (
    <Box sx={{ flexGrow: 1 }} className={style.navbar}>
      <AppBar position="fixed" color="primary">
        <Toolbar sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
          <Box>
            <Button variant='contained' color='secondary' onClick={() => navigateTo('/shop/goods')}>Goods</Button>
            <Button variant='contained' color='secondary' onClick={() => navigateTo('/shop/management')}>Management</Button>
            <Cart />
          </Box>
          <Box sx={{
            display: 'flex',
            flexDirection: 'row',
          }}>
            {isSignedIn ? <SignOutButton /> : <SignIn />}
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default NavBar;