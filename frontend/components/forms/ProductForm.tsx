import { Button, FormHelperText, Typography } from '@mui/material';
import { Form, Formik } from 'formik';
import { memo, VFC } from 'react';
import * as Yup from 'yup';
import { PatchedProduct, Product } from '../../api';
import { FormikTextField } from '../FormikTextField';


const ProductFormValidationSchema = Yup.object().shape({
  name: Yup.string().required(),
  price: Yup.number().required(),
  description: Yup.string().required()
});

interface ProductFormComponent {
  readonly onSubmit: (values: PatchedProduct) => void;
  readonly product?: Product | null;
}


const ProductFormComponent: VFC<ProductFormComponent> = ({
  onSubmit,
  product,
}: ProductFormComponent) => {
  const initialValues: PatchedProduct = product
    ? {
        id: product.id,
        name: product.name,
        category: product.category,
        price: product.price,
        description: product.description
      }
    : {
        name: '',
        price: '',
        category: undefined,
        description: '',
      };

  return (
    <>
      <Typography variant='h2' component='h2'>
        Product
      </Typography>
      <Formik
        initialValues={initialValues}
        onSubmit={(values, { resetForm }) => {
          onSubmit(values);
          resetForm();
        }}
        validationSchema={ProductFormValidationSchema}
      >
        <Form>
          <FormikTextField name='name' label='Name' />
          <FormikTextField name='description' label='description' />
          <FormikTextField name='price' type='number' label='Price' />
          <Button color='primary' variant='contained' fullWidth type='submit'>
            Submit
          </Button>
        </Form>
      </Formik>
    </>
  );
};

export const ProductForm = memo(ProductFormComponent);
