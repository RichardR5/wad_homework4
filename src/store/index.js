import { createStore } from 'vuex';

export default createStore({
  state: {
    posts: [],
    userId: null // Added userId to store the authenticated user's ID
  },
  mutations: {
    setPosts(state, posts) {
      state.posts = posts;
    },
    addPost(state, post) {
      state.posts.unshift(post); // Adds the new post to the beginning of the array
    },
    deleteAllPosts(state) {
      state.posts = [];
    },
    setUserId(state, userId) {
      state.userId = userId;
    },
    clearUserId(state) {
      state.userId = null;
    }
  },
  actions: {
    async fetchPosts({ commit }) {
      try {
        const response = await fetch('http://localhost:3000/api/posts', {
          method: "GET",
          credentials: 'include', // Include credentials to send cookies
        });
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        commit('setPosts', data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    },
    async addPost({ commit }, post) {
      try {
        const response = await fetch('http://localhost:3000/api/posts', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          credentials: 'include', // Include credentials to send cookies
          body: JSON.stringify(post)
        });
        if (!response.ok) {
          throw new Error('Failed to add post');
        }
        const newPost = await response.json();
        commit('addPost', newPost); // Commit the actual post object
      } catch (error) {
        console.error('Error adding post:', error);
        throw error; // Propagate error to component
      }
    },
    async deleteAllPosts({ commit }) {
      try {
        const response = await fetch('http://localhost:3000/api/posts', {
          method: 'DELETE',
          credentials: 'include', // Include credentials to send cookies
        });
        if (!response.ok) {
          throw new Error('Failed to delete all posts');
        }
        commit('deleteAllPosts');
      } catch (error) {
        console.error('Error deleting all posts:', error);
        throw error; // Propagate error to component
      }
    },
    setUserId({ commit }, userId) {
      commit('setUserId', userId);
    },
    clearUserId({ commit }) {
      commit('clearUserId');
    }
    // ... other actions like likePost, resetLikes if needed
  },
  getters: {
    allPosts: state => state.posts,
    getUserId: state => state.userId
  }
});