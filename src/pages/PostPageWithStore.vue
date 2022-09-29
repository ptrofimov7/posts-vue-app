<template>
  <div>
    <h1>Страница с постами</h1>
    <div class="app__btn">
      <my-button @click="fetchPosts">Получить посты</my-button>
      <my-select :model-value="selectedSort" @update:model-value="setSelectedSort" :options="sortOptions" />
    </div>
    <my-input type="text" :model-value="searchPost" @update:model-value="setSearchPost" placeholder="Поиск ..." />
    <my-button @click="showDialog" style="align-self: center"
      >Создать пост</my-button
    >
    <my-dialog v-model:show="dialogVisible">
      <post-form
      @create="createPost"
      />
    </my-dialog>

    <post-list
      :posts="sortedAndFilteredPosts"
      @remove="removePost"
      v-if="!isPostsLoading"
    />
    <div v-else>Идет загрузка ...</div>
    <div class="observer" v-intersection="loadMorePosts"></div>
  </div>
</template>

<script>
import PostList from "@/components/PostList";
import PostForm from "@/components/PostForm";
import { mapState, mapMutations, mapGetters, mapActions } from "vuex";

export default {
  components: {
    PostForm,
    PostList,
  },
  data() {
    return {
      dialogVisible: false,
    };
  },

  methods: {
    ...mapActions({
      loadMorePosts: "post/loadMorePosts",
      fetchPosts: "post/fetchPosts",
    }),
    ...mapMutations({
      setPage: 'post/setPage',
      setSearchPost: 'post/setSearchPost',
      setSelectedSort: 'post/setSelectedSort',
    }),
    showDialog() {
      this.dialogVisible = true;
    },
    createPost(post) {
      this.posts.push(post);
      this.dialogVisible = false;
    },
    removePost({ id }) {
      this.posts = this.posts.filter((post) => post.id !== id);
    },
  },
  mounted() {
    this.fetchPosts();
  },
  computed: {
    ...mapState({
      posts: state => state.post.posts,
      isPostsLoading: state => state.post.isPostsLoading,
      selectedSort: state => state.post.selectedSort,
      searchPost: state => state.post.searchPost,
      page: state => state.post.page,
      limit: state => state.post.limit,
      totalPages: state => state.post.totalPages,
      sortOptions: state => state.post.sortOptions,
    }),
    ...mapGetters({
      sortedPosts: 'post/sortedPosts',
      sortedAndFilteredPosts: 'post/sortedAndFilteredPosts',
    }),

  },
};
</script>

<style>
.app__btn {
  display: flex;
  justify-content: space-between;
  margin: 15px 0;
}

.page__wrapper {
  display: flex;
  margin-top: 10px;
}

.page {
  padding: 10px;
  border: 1px solid #000;
}

.current-page {
  border: 2px solid teal;
}

.observer {
  background-color: green;
  height: 60px;
}
</style>
