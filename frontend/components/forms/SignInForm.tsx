import { Button, FormHelperText, Typography } from '@mui/material';
import { Form, Formik } from 'formik';
import { memo, VFC } from 'react';
import * as Yup from 'yup';
import { Login } from '../../api';
import { FormikTextField } from '../FormikTextField';

const SignInFormValidationSchema = Yup.object().shape({
  username: Yup.string().required(),
  password: Yup.string().required(),
});


interface SignInFormComponent {
  readonly onSubmit: (values: Login) => void;
}

const SignInFormComponent: VFC<SignInFormComponent> = ({
  onSubmit
}) => {
  const initialValues: Login = {
    username: '',
    password: ''
  }

  return (
    <>
      <Typography variant='h2' component='h2'>
        Sign in
      </Typography>
      <Formik
        initialValues={initialValues}
        onSubmit={(values, { resetForm }) => {
          onSubmit(values);
          resetForm();
        }}
        validationSchema={SignInFormValidationSchema}
      >
        <Form>
          <FormikTextField name='username' label='username' />
          <FormikTextField name='password' label="password" type="password" />
          <Button color='primary' variant='contained' fullWidth type='submit'>
            Submit
          </Button>
        </Form>
      </Formik>
    </>
  )
}

export const SignInForm = memo(SignInFormComponent);
