import { configureStore } from '@reduxjs/toolkit';
import articlesReducer from './articles';
import userReducer from './user';

export default configureStore({
  reducer: {
    articles: articlesReducer,
    user: userReducer,
  },
});
