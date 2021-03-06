import {
  createAsyncThunk,
  isPending,
  isFulfilled,
  createReducer,
  createAction,
  isRejected,
} from "@reduxjs/toolkit";

import { Post, PostService } from "alex-holanda-sdk";

interface PostStoreState {
  paginated?: Post.Paginated;
  fetching: boolean;
  counter: number;
}

const initialState: PostStoreState = {
  paginated: {
    page: 0,
    size: 0,
    totalElements: 0,
    totalPages: 1,
    content: [],
  },
  counter: 0,
  fetching: false,
};

export const fetchPosts = createAsyncThunk(
  "post/fetchPosts",
  async function (query: Post.Query) {
    const posts = await PostService.getAllPosts(query);
    return posts;
  }
);

export const increment = createAction("post/increment");

export const postReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(increment, (state) => {
      state.counter++;
    })
    .addCase(fetchPosts.fulfilled, (state, action) => {
      state.paginated = action.payload;
    })
    .addMatcher(isPending(fetchPosts), (state) => {
      state.fetching = true;
    })
    .addMatcher(isFulfilled(fetchPosts), (state) => {
      state.fetching = false;
    })
    .addMatcher(isRejected(fetchPosts), (state) => {
      state.fetching = false;
    });
});
