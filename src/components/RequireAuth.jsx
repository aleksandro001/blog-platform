import { useLocation, Navigate } from 'react-router-dom';

import React from 'react';
import { useSelector } from 'react-redux';

// eslint-disable-next-line react/prop-types
const RequireAuth = ({ children }) => {
  const location = useLocation();

  const user = useSelector((state) => state.user.email);

  // eslint-disable-next-line consistent-return
  setTimeout(() => {
    if (!user) {
      return <Navigate to="/sign-in" state={{ from: location }} />;
    }
  }, 1000);

  return children;
};

export default RequireAuth;
