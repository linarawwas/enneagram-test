// src/app/store.js
import { configureStore } from '@reduxjs/toolkit';
import usersReducer from '../features/users/usersSlice';
import questionsReducer from '../features/questions/questionsSlice';
import answersReducer from '../features/answers/answersSlice';
import authReducer from '../features/auth/authSlice'
const store = configureStore({
  reducer: {
    users: usersReducer,
    questions: questionsReducer,
    answers: answersReducer,
    me: authReducer
  },
});

export default store;
