import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { authorizeByApi, setUserEditable } from '../store/user';
import SignInForm from '../components/SignInForm';
import ErrorMessage from '../components/ErrorMessage';

const SignIn = () => {
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

  const handleFormSubmit = (data) => {
    dispatch(authorizeByApi({ email: data.email, password: data.password }));
  };
  return (
    <>
      {apiError && <ErrorMessage serverError={apiError} />}
      <SignInForm handleFormSubmit={handleFormSubmit} />;
    </>
  );
};

export default SignIn;
