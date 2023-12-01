/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Alert, Snackbar } from '@mui/material';
import { resetApiErrors } from '../store/user';

const ErrorMessage = ({ serverError }) => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (serverError.status === 404) {
      dispatch(resetApiErrors());
      navigate('/notFound', { replace: true });
    }
  }, [navigate, serverError, dispatch]);
  const handleClose = () => {
    setOpen(false);
    dispatch(resetApiErrors());
  };

  return (
    <div>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert severity="error" sx={{ width: '100%' }}>
          Ошибка: &quot;{JSON.stringify(serverError.errors?.errors) ?? JSON.stringify(serverError)}&quot;
        </Alert>
      </Snackbar>
    </div>
  );
};

export default ErrorMessage;
