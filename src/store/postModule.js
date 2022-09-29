import axios from 'axios';
import { createStore } from 'vuex'

export const postModule = ({
   state: () => ({
      posts: [],
      isPostsLoading: false,
      selectedSort: "title",
      searchPost: "",
      page: 1,
      limit: 10,
      totalPages: 0,
      sortOptions: [
         { value: "title", name: "По наименованию" },
         { value: "body", name: "По описанию" },
      ],
   }),
   getters: {
      sortedPosts(state) {
         return [...state.posts].sort((post1, post2) =>
            post1[state.selectedSort].localeCompare(post2[state.selectedSort])
         );
      },
      sortedAndFilteredPosts(state, getters) {
         return getters.sortedPosts.filter((post) =>
            post.title.toLowerCase().includes(state.searchPost.toLowerCase())
         );
      },


   },
   mutations: {
      setPosts(state, posts) {
         state.posts = posts
      },
      setLoading(state, isPostsLoading) {
         state.isPostsLoading = isPostsLoading
      },
      setSelectedSort(state, selectedSort) {
         state.selectedSort = selectedSort
      },
      setSearchPost(state, searchPost) {
         state.searchPost = searchPost
      },
      setPage(state, page) {
         state.page = page
      },
      setTotalPages(state, totalPages) {
         state.totalPages = totalPages
      },
   },
   actions: {
      async fetchPosts({ state, commit }) {
         commit('setLoading', true);
         try {
            const response = await axios.get(
               "http://jsonplaceholder.typicode.com/posts",
               {
                  params: {
                     _page: state.page,
                     _limit: state.limit,
                  },
               }
            );

            commit('setPosts', response.data);
            commit('setTotalPages', Math.ceil(
               response.headers["x-total-count"] / state.limit
            ));

         } catch (error) {
            console.log(error);
         } finally {
            commit('setLoading', false);
         }
      },
      async loadMorePosts({ state, commit }) {
         state.page += 1;
         try {
            const response = await axios.get(
               "http://jsonplaceholder.typicode.com/posts",
               {
                  params: {
                     _page: state.page,
                     _limit: state.limit,
                  },
               }
            );
            commit('setPosts', [...state.posts, ...response.data]);
            commit('setTotalPages',  Math.ceil(
               response.headers["x-total-count"] / state.limit
            ));
         } catch (error) {
            console.log(error);
         } finally {
         }
      },
   },
   namespaced: true
})