import React, { useCallback, useMemo } from 'react';
import './LoginForm.css';
import { Button, TextField } from '@mui/material';
import { Formik } from 'formik';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';

import { useApi } from '../api/ApiProvider';

function LoginForm() {
  const navigate = useNavigate();
  const apiClient = useApi();

  const onSubmit = useCallback(
    (values: { userName: string; password: string }, formik: any) => {
      apiClient.login(values).then((response) => {
        console.log(response);
        if (response.success) {
          navigate('/home');
        } else {
          formik.setFieldError('username', 'Invalid username or password');
        }
      });
    },
    [apiClient, navigate],
  );

  const validationSchema = useMemo(
    () =>
      yup.object().shape({
        userName: yup.string().required('Username is required'),
        password: yup
          .string()
          .required('Password is required')
          .min(5, 'Password must be longer than 5 signs'),
      }),
    [],
  );
  return (
    <>
      <h1 id="title">Library</h1>
      <Formik
        initialValues={{ userName: '', password: '' }}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
        validateOnChange
        validateOnBlur
      >
        {(formik: any) => (
          <form
            className="Login-form"
            id="signForm"
            noValidate
            onSubmit={formik.handleSubmit}
          >
            <TextField
              id="userName"
              name="userName"
              label="User name"
              variant="standard"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.userName && !!formik.errors.userName}
              helperText={formik.touched.userName && formik.errors.userName}
            />
            <TextField
              id="password"
              name="password"
              label="Password"
              variant="standard"
              type="password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.password && !!formik.errors.password}
              helperText={formik.touched.password && formik.errors.password}
            />
            <Button
              variant="contained"
              type="submit"
              id="signForm"
              disabled={!(formik.isValid && formik.dirty)}
            >
              Sign in
            </Button>
          </form>
        )}
      </Formik>
    </>
  );
}

export default LoginForm;
