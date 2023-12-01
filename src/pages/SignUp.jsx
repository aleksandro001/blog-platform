/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { createByApi, setUserEditable } from '../store/user';
import UserForm from '../components/UserForm';
import ErrorMessage from '../components/ErrorMessage';

const SignUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const requestStatus = useSelector((state) => state.user.requestStatus);
  const apiError = useSelector((state) => state.user.apiError);
  const userEditable = useSelector((state) => state.user.editable);

  const fromPage = location.state?.from?.pathname || '/';

  useEffect(() => {
    if (requestStatus === 'fulfilled' && userEditable) {
      navigate(fromPage, { replace: true });
      dispatch(setUserEditable());
    }
  }, [dispatch, navigate, fromPage, requestStatus, userEditable]);

  const handlerFormSubmit = (data) => {
    dispatch(createByApi(data));
  };

  return (
    <>
      {apiError && <ErrorMessage serverError={apiError} />}
      <UserForm signUp handlerFormSubmit={handlerFormSubmit} />;
    </>
  );
};

export default SignUp;
