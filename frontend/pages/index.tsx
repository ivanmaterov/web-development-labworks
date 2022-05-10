import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

import { Container } from 'react-bootstrap'

import ProductList from './components/products/productList'

const Home: NextPage = () => {
  return (
    <Container>
      <ProductList />
    </Container>
  );
};

export default Home
