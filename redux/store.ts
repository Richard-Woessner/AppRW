import { configureStore } from '@reduxjs/toolkit';
import homeReducer from './slices/homeSlice';
import generalReducer from './slices/generalSlice';

export const store = configureStore({
    reducer: {
        home: homeReducer,
        general: generalReducer,
    },
  })

  // Infer the `RootState` and `AppDispatch` types from the store itself
  export type RootState = ReturnType<typeof store.getState>
  // Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
  export type AppDispatch = typeof store.dispatch