import { Box, Grid } from '@mui/material';
import { useEffect, VFC } from 'react';
import { useDispatch } from 'react-redux';
import { Product, ProductsService } from '../../api/index';
import { addProducts } from '../../redux/product/slice';
import ProductCard from '../../components/products/ProductCard';
import { ServerSideProps } from '../../interfaces/ServerSideProps';

interface ProductsProps {
  readonly products: readonly Product[];
}

const ProductPage: VFC<ProductsProps> = ({ products }: ProductsProps) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(addProducts(products))
  }, [dispatch, products])

  return (
    <Box sx={{ padding: '2% 15%', height: '100%', width: '100%' }}>
      <Grid container spacing={4} direction="column" justifyContent="space-evenly" alignItems="center">
        {products.map(product => <ProductCard product={product} />)}
      </Grid>
    </Box>
  );
};

export async function getServerSideProps(): Promise<ServerSideProps<ProductsProps>> {
  const products = await ProductsService.productsList();

  return {
    props: {
      products,
    },
  };
}

export default ProductPage;
