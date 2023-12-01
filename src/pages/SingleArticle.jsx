/* eslint-disable id-length */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { Box, Chip, Paper, Typography } from '@mui/material';

import { getSingleArticle } from '../store/articles';

import ArticlePreview from '../components/ArticlePreview';
import Preloader from '../components/Preloader';
import ErrorMessage from '../components/ErrorMessage';

const SingleArticle = () => {
  const dispatch = useDispatch();
  const { slug } = useParams();
  const navigate = useNavigate();

  const requestStatus = useSelector((state) => state.articles.requestStatus);
  const apiError = useSelector((state) => state.articles.apiError);

  useEffect(() => {
    dispatch(getSingleArticle(slug));
  }, [dispatch, slug]);

  const article = useSelector((state) => state.articles.singleArticle);
  const goBack = () => navigate(-1);

  return (
    <>
      {requestStatus === 'rejected' && <ErrorMessage serverError={apiError} />}
      {requestStatus === 'pending' && <Preloader />}
      {requestStatus === 'fulfilled' && article && (
        <>
          <Paper sx={{ p: '15px', mb: 2 }}>
            <ArticlePreview article={article} singlePage />
            <Box sx={{ p: 2 }}>
              <Typography component="span">
                <ReactMarkdown>{article.body}</ReactMarkdown>
              </Typography>
            </Box>
          </Paper>
          <Chip label="Go back" variant="outlined" onClick={goBack} sx={{ background: 'white', borderRadius: '4px' }} />
        </>
      )}
    </>
  );
};

export default SingleArticle;
