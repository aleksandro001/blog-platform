import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Pagination, Paper, Stack } from '@mui/material';
import { getArticles } from '../store/articles';
import Preloader from '../components/Preloader';
import ErrorMessage from '../components/ErrorMessage';
import ArticlePreview from '../components/ArticlePreview';

const Articles = () => {
  const dispatch = useDispatch();
  const [offset, setOffset] = useState(0);

  const articles = useSelector((state) => state.articles.articles);
  const articlesCount = useSelector((state) => state.articles.articlesCount);
  const requestStatus = useSelector((state) => state.articles.requestStatus);
  const apiError = useSelector((state) => state.articles.apiError);

  useEffect(() => {
    dispatch(getArticles({ limit: 5, offset }));
  }, [dispatch, offset]);

  return (
    <>
      {requestStatus === 'rejected' && <ErrorMessage serverError={apiError} />}
      {requestStatus === 'pending' && <Preloader />}
      {requestStatus === 'fulfilled' && (
        <Stack spacing={2}>
          {articles.map((article) => (
            // eslint-disable-next-line id-length
            <Paper key={article.slug} sx={{ p: 1 }}>
              <ArticlePreview article={article} />
            </Paper>
          ))}
        </Stack>
      )}
      {requestStatus === 'fulfilled' && (
        <Stack alignItems="center" sx={{ mt: 2 }}>
          <Pagination
            count={Math.ceil(articlesCount / 5)}
            page={offset / 5 + 1}
            shape="rounded"
            onChange={(arg, num) => {
              setOffset((num - 1) * 5);
            }}
          />
        </Stack>
      )}
    </>
  );
};

export default Articles;
