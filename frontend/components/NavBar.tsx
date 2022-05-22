import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material';
import { VFC } from 'react';

import style from '../styles/NavBar.module.css'
import { useRouter } from 'next/router';
import { useAppDispatch, useAppSelector } from '../redux/store';
import { SignInButton } from './SignInButton';
import { SignOutButton } from './SignOutButton';


const NavBar: VFC = () => {
  const router = useRouter();

  // const isSignedIn = useAppSelector(selectIsSignedIn);
  // const email = useAppSelector(selectEmail);

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
            <>
              <Button variant='contained' color='secondary' onClick={() => navigateTo('/shop/goods')}>Goods</Button>
            </>
          </Box>
          <Box sx={{
            display: 'flex',
            flexDirection: 'row',
          }}>
            {/* {email ? <Typography sx={{marginRight: '5px'}} variant='h6'>{email}</Typography>: <></>}
            {isSignedIn ? <SignOutButton /> : <SignInButton />} */}
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default NavBar;