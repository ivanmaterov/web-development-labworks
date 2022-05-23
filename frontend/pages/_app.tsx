import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { store } from '../redux/store'
import NavBar from '../components/NavBar';
import { Box } from '@mui/material';
import style from './app.module.css'

import { LocalStorageUpdater } from '../components/LocalStorageUpdater';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <LocalStorageUpdater>
        <NavBar />
        <Box className={style.box}>
          <Component {...pageProps} />
        </Box>
      </LocalStorageUpdater>
    </Provider>
  )
};

export default MyApp;
