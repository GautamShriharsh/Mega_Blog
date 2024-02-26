// postsSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  posts: [],
  error: null,
};

const postSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    clearPosts(state) {
      state.posts = [];
      state.error = null;
    },
    // Other posts-related reducers...
  },
});

export const { clearPosts } = postSlice.actions;

export default postSlice.reducer;
