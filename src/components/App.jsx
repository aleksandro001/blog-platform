import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Routes, Navigate } from 'react-router-dom';

import { loadFromLocalStorage } from '../store/user';

import Articles from '../pages/Articles';
import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import EditProfile from '../pages/EditProfile';
import RequireAuth from './RequireAuth';
import NotFound from '../pages/NotFound';
import Layout from './Layout';
import SingleArticle from '../pages/SingleArticle';
import CreateArticle from '../pages/CreateArticle';
import EditArticle from '../pages/EditArticle';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadFromLocalStorage());
  }, [dispatch]);

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Navigate to="articles" replace />} />
        <Route path="articles" element={<Articles />} />
        <Route path="articles/:slug" element={<SingleArticle />} />
        <Route path="sign-in" element={<SignIn />} />
        <Route path="sign-up" element={<SignUp />} />
        <Route
          path="profile"
          element={
            <RequireAuth>
              <EditProfile />
            </RequireAuth>
          }
        />
        <Route
          path="new-article"
          element={
            <RequireAuth>
              <CreateArticle />
            </RequireAuth>
          }
        />
        <Route
          path="articles/:slug/edit"
          element={
            <RequireAuth>
              <EditArticle />
            </RequireAuth>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};

export default App;
