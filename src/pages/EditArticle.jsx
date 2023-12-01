import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { updateArticle, getSingleArticle } from '../store/articles';
import ArticleForm from '../components/ArticleForm';
import ConfirmDeleteArticle from '../components/ConfirmDeleteArticle';
import ErrorMessage from '../components/ErrorMessage';
import Preloader from '../components/Preloader';

const EditArticle = () => {
  const dispatch = useDispatch();
  const { slug } = useParams();
  const article = useSelector((state) => state.articles.singleArticle);

  const navigate = useNavigate();
  const location = useLocation();
  const fromPage = location.state?.from?.pathname || '/';
  const requestStatus = useSelector((state) => state.articles.requestStatus);
  const apiError = useSelector((state) => state.articles.apiError);
  const articleIsCreated = useSelector((state) => state.articles.created);

  useEffect(() => {
    dispatch(getSingleArticle(slug));
  }, [dispatch, slug]);

  useEffect(() => {
    if (articleIsCreated === true) {
      navigate(fromPage, { replace: true });
    }
  }, [navigate, fromPage, articleIsCreated]);

  const handlerFormSubmit = ({ title, description, text: body }, tagList) => {
    dispatch(updateArticle({ slug, title, description, body, tagList }));
    navigate(fromPage, { replace: true });
  };

  return (
    <>
      {requestStatus === 'rejected' && <ErrorMessage serverError={apiError} />}
      {requestStatus === 'pending' && <Preloader />}
      {requestStatus === 'fulfilled' && article && (
        <>
          <ArticleForm article={article} handlerFormSubmit={handlerFormSubmit} />
          <ConfirmDeleteArticle />
        </>
      )}
    </>
  );
};

export default EditArticle;
