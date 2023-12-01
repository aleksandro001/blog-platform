/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getCookie } from '../utils/cookies';

export const getArticles = createAsyncThunk('articles/getAll', async ({ limit, offset }, { rejectWithValue }) =>
  fetch(`https://blog.kata.academy/api/articles?${new URLSearchParams({ limit, offset })}`)
    .then(async (response) =>
      response.ok
        ? response.json()
        : rejectWithValue({
            status: response.status,
            errors: await response.json(),
          })
    )
    .catch((error) => rejectWithValue({ status: error.status, statusText: error.message }))
);

export const getSingleArticle = createAsyncThunk('articles/getSingle', async (slug, { rejectWithValue }) =>
  fetch(`https://blog.kata.academy/api/articles/${slug}`)
    .then(async (response) =>
      response.ok
        ? response.json()
        : rejectWithValue({
            status: response.status,
            errors: await response.json(),
          })
    )
    .catch((error) => rejectWithValue({ status: error.status, statusText: error.message }))
);

export const createArticle = createAsyncThunk(
  'articles/create',
  async ({ title, description, body, tagList }, { rejectWithValue }) =>
    fetch(`https://blog.kata.academy/api/articles`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${getCookie('token')}`,
      },
      body: JSON.stringify({ article: { title, description, body, tagList } }),
    })
      .then(async (response) =>
        response.ok
          ? response.json()
          : rejectWithValue({
              status: response.status,
              errors: await response.json(),
            })
      )
      .catch((error) => rejectWithValue({ status: error.status, statusText: error.message }))
);

export const updateArticle = createAsyncThunk(
  'articles/update',
  async ({ slug, title, description, body, tagList }, { rejectWithValue }) =>
    fetch(`https://blog.kata.academy/api/articles/${slug}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${getCookie('token')}`,
      },
      body: JSON.stringify({ article: { title, description, body, tagList } }),
    })
      .then(async (response) =>
        response.ok
          ? response.json()
          : rejectWithValue({
              status: response.status,
              errors: await response.json(),
            })
      )
      .catch((error) => rejectWithValue({ status: error.status, statusText: error.message }))
);

export const deleteArticle = createAsyncThunk('articles/delete', async (slug, { rejectWithValue }) =>
  fetch(`https://blog.kata.academy/api/articles/${slug}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Token ${getCookie('token')}`,
    },
  })
    .then(async (response) =>
      response.ok
        ? response.json()
        : rejectWithValue({
            status: response.status,
            errors: await response.json(),
          })
    )
    .catch((error) => rejectWithValue({ status: error.status, statusText: error.message }))
);

export const setAsFavorite = createAsyncThunk('articles/setAsFavorite', async (slug, { rejectWithValue }) =>
  fetch(`https://blog.kata.academy/api/articles/${slug}/favorite`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Token ${getCookie('token')}`,
    },
  })
    .then(async (response) =>
      response.ok
        ? response.json()
        : rejectWithValue({
            status: response.status,
            errors: await response.json(),
          })
    )
    .catch((error) => rejectWithValue({ status: error.status, statusText: error.message }))
);

export const removeAsFavorite = createAsyncThunk('articles/removeAsFavorite', async (slug, { rejectWithValue }) =>
  fetch(`https://blog.kata.academy/api/articles/${slug}/favorite`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Token ${getCookie('token')}`,
    },
  })
    .then(async (response) =>
      response.ok
        ? response.json()
        : rejectWithValue({
            status: response.status,
            errors: await response.json(),
          })
    )
    .catch((error) => rejectWithValue({ status: error.status, statusText: error.message }))
);

const articles = createSlice({
  name: 'articles',
  initialState: {
    articles: [],
    singleArticle: null,
    articlesCount: null,
    requestStatus: '',
    apiError: null,
    created: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getArticles.pending, (state) => {
      state.requestStatus = 'pending';
      state.apiError = null;
      state.created = false;
    });

    builder.addCase(getSingleArticle.pending, (state) => {
      state.requestStatus = 'pending';
      state.apiError = null;
      state.created = false;
    });

    builder.addCase(createArticle.pending, (state) => {
      state.requestStatus = 'pending';
      state.apiError = null;
      state.created = false;
    });

    builder.addCase(updateArticle.pending, (state) => {
      state.requestStatus = 'pending';
      state.apiError = null;
      state.created = false;
    });

    builder.addCase(deleteArticle.pending, (state) => {
      state.requestStatus = 'pending';
      state.apiError = null;
    });

    builder.addCase(getArticles.fulfilled, (state, action) => {
      state.articles = [...action.payload.articles];
      state.articlesCount = action.payload.articlesCount;
      state.requestStatus = 'fulfilled';
    });

    builder.addCase(getSingleArticle.fulfilled, (state, action) => {
      state.singleArticle = { ...action.payload.article };
      state.requestStatus = 'fulfilled';
    });

    builder.addCase(createArticle.fulfilled, (state) => {
      state.requestStatus = 'fulfilled';
      state.created = true;
    });

    builder.addCase(updateArticle.fulfilled, (state) => {
      state.requestStatus = 'fulfilled';
      state.created = true;
    });

    builder.addCase(deleteArticle.fulfilled, (state) => {
      state.requestStatus = 'fulfilled';
    });

    builder.addCase(setAsFavorite.fulfilled, (state) => {
      state.requestStatus = 'fulfilled';
    });

    builder.addCase(removeAsFavorite.fulfilled, (state) => {
      state.requestStatus = 'fulfilled';
    });

    builder.addCase(getArticles.rejected, (state, action) => {
      state.requestStatus = 'rejected';
      state.apiError = action.payload;
    });

    builder.addCase(getSingleArticle.rejected, (state, action) => {
      state.requestStatus = 'rejected';
      state.apiError = action.payload;
    });

    builder.addCase(createArticle.rejected, (state, action) => {
      state.requestStatus = 'rejected';
      state.apiError = action.payload;
    });

    builder.addCase(updateArticle.rejected, (state, action) => {
      state.requestStatus = 'rejected';
      state.apiError = action.payload;
    });

    builder.addCase(deleteArticle.rejected, (state, action) => {
      state.requestStatus = 'rejected';
      state.apiError = action.payload;
    });

    builder.addCase(setAsFavorite.rejected, (state, action) => {
      state.requestStatus = 'rejected';
      state.apiError = action.payload;
    });

    builder.addCase(removeAsFavorite.rejected, (state, action) => {
      state.requestStatus = 'rejected';
      state.apiError = action.payload;
    });
  },
});

export default articles.reducer;
