/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { deleteCookie, getCookie } from '../utils/cookies';

export const authorizeByApi = createAsyncThunk('user/login', async ({ email, password }, { rejectWithValue }) =>
  fetch('https://blog.kata.academy/api/users/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ user: { email, password } }),
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

export const createByApi = createAsyncThunk(
  'user/create',
  async ({ userName: username, email, password }, { rejectWithValue }) =>
    fetch('https://blog.kata.academy/api/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user: { username, email, password } }),
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

export const updateByApi = createAsyncThunk(
  'user/update',
  async ({ userName: username, email, password, avatarUrl: image }, { rejectWithValue }) =>
    fetch('https://blog.kata.academy/api/user', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${getCookie('token')}`,
      },
      body: JSON.stringify({ user: { username, email, password, image } }),
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

const user = createSlice({
  name: 'user',
  initialState: {
    username: '',
    email: '',
    bio: '',
    image: '',
    requestStatus: null,
    apiError: null,
    editable: false,
  },
  reducers: {
    logOut(state) {
      deleteCookie('token');
      localStorage.removeItem('user');
      state.username = '';
      state.email = '';
      state.bio = '';
      state.image = '';
      state.userRequestStatus = '';
    },
    loadFromLocalStorage(state) {
      const userData = JSON.parse(localStorage.getItem('user'));
      state.username = userData?.username;
      state.email = userData?.email;
      state.image = userData?.image;
    },
    setUserEditable(state) {
      state.editable = false;
      localStorage.setItem(
        'user',
        JSON.stringify({
          username: state.username,
          email: state.email,
          image: state.image,
        })
      );
    },
    resetApiErrors(state) {
      state.apiError = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(authorizeByApi.pending, (state) => {
      state.requestStatus = 'pending';
      state.apiError = null;
      state.editable = false;
    });

    builder.addCase(createByApi.pending, (state) => {
      state.requestStatus = 'pending';
      state.apiError = null;
      state.editable = false;
    });

    builder.addCase(updateByApi.pending, (state) => {
      state.requestStatus = 'pending';
      state.apiError = null;
      state.editable = false;
    });

    builder.addCase(authorizeByApi.fulfilled, (state, action) => {
      state.requestStatus = 'fulfilled';
      state.username = action.payload.user.username;
      state.email = action.payload.user.email;
      state.bio = action.payload.user.bio;
      state.image = action.payload.user.image;
      document.cookie = `token = ${action.payload.user.token}`;
      state.editable = true;
    });

    builder.addCase(createByApi.fulfilled, (state) => {
      state.requestStatus = 'fulfilled';
      state.editable = true;
    });

    builder.addCase(updateByApi.fulfilled, (state, action) => {
      state.requestStatus = 'fulfilled';
      state.username = action.payload.user.username;
      state.email = action.payload.user.email;
      state.image = action.payload.user.image;
      state.editable = false;
    });

    builder.addCase(authorizeByApi.rejected, (state, action) => {
      state.requestStatus = 'rejected';
      state.apiError = action.payload;
    });

    builder.addCase(createByApi.rejected, (state, action) => {
      state.requestStatus = 'rejected';
      state.apiError = action.payload;
      state.editable = false;
    });

    builder.addCase(updateByApi.rejected, (state, action) => {
      state.requestStatus = 'rejected';
      state.apiError = action.payload;
      state.editable = false;
    });
  },
});

export const { logOut, setUserEditable, resetApiErrors, loadFromLocalStorage } = user.actions;

export default user.reducer;
