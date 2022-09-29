<template>
  <div>
    <h1>Страница с постами</h1>
    <div class="app__btn">
       <my-select v-model="selectedSort" :options="sortOptions" />
    </div>
    <my-input type="text" v-model="searchQuery" placeholder="Поиск ..." />
    <my-button style="align-self: center"
      >Создать пост</my-button
    >
    <my-dialog v-model:show="dialogVisible">
      <post-form />
    </my-dialog>

    <post-list
      :posts="sortedAndFilteredPosts"
      v-if="!isPostsLoading"
    />
    <div v-else>Идет загрузка ...</div>
    <div
    class="observer"
    >
    </div>
  </div>
</template>

<script>
import PostList from "@/components/PostList";
import PostForm from "@/components/PostForm";
import usePosts from "@/hooks/usePosts";
import useSortedPosts from "@/hooks/useSortedPosts";
import useSortedAndFilteredPosts from "@/hooks/useSortedAndFilteredPosts";

export default {
  components: {
    PostForm,
    PostList,
  },
  data() {
    return {
      dialogVisible: false,
      sortOptions: [
        { value: "title", name: "По наименованию" },
        { value: "body", name: "По описанию" },
      ],
    };
  },

  setup(props) {
    const { posts, totalPages, isPostsLoading } = usePosts(10);
    const { sortedPosts, selectedSort } = useSortedPosts(posts);
    const { sortedAndFilteredPosts, searchQuery } =
      useSortedAndFilteredPosts(sortedPosts);

    return {
      posts,
      totalPages,
      isPostsLoading,
      sortedPosts,
      selectedSort,
      sortedAndFilteredPosts,
      searchQuery,
    };
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
