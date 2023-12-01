import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { updateByApi, setUserEditable } from '../store/user';
import UserForm from '../components/UserForm';
import ErrorMessage from '../components/ErrorMessage';

const EditProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const user = useSelector((state) => state.user);
  const requestStatus = useSelector((state) => state.user.requestStatus);
  const apiError = useSelector((state) => state.user.apiError);
  const userEditable = useSelector((state) => state.user.editable);

  const fromPage = location.state?.from?.pathname || '/';

  useEffect(() => {
    if (requestStatus === 'fulfilled' && userEditable) {
      dispatch(setUserEditable());
      navigate(fromPage, { replace: true });
    }
  }, [navigate, fromPage, requestStatus, userEditable, dispatch]);

  const handlerFormSubmit = (data) => {
    dispatch(updateByApi(data));
  };

  return (
    <>
      {apiError && <ErrorMessage serverError={apiError} />}
      <UserForm user={user} handlerFormSubmit={handlerFormSubmit} />
    </>
  );
};

export default EditProfile;
