import { Box } from "@mui/material";

import { useRouter } from 'next/router';
import { useAppDispatch } from '../../redux/store';
import { useEffect, VFC } from 'react';

import { Product, PatchedProduct, ProductsService } from '../../api';
import { updateProduct } from '../../redux/product/dispatchers';
import { ProductForm } from '../../components/forms/ProductForm';

import { ServerSideProps } from '../../interfaces/ServerSideProps';

interface EditProductProps {
  readonly product: Product | null;
}

const EditProductComponent: VFC<EditProductProps> = ({ product }: EditProductProps) => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (product === null) {
      router.push('/');
    }
  }, [router, product]);

  let onSubmit: (values: PatchedProduct) => void;

  if (product !== null) {
    onSubmit = (values: PatchedProduct) => {
      dispatch(updateProduct(values));
      router.push('/shop/management');
    }
  } else {
    onSubmit = (values: PatchedProduct) => {}
  }
  
  
  return (
    <Box sx={{
      padding: '2% 25%'
    }}>
      <ProductForm onSubmit={onSubmit} product={product}/>
    </Box>
  )
}

export async function getServerSideProps(context: { query: { id: any; }; }): Promise<ServerSideProps<EditProductProps>> {
  const { id } = context.query;
  const numId = Number(id);

  if (isNaN(numId)) {
    return {
      props: {
        product: null,
      }
    }
  }

  const product = await ProductsService.productsRetrieve(numId);

  return {
    props: {
      product,
    },
  };
}

export default EditProductComponent;
