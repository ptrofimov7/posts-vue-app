<template>
  <div>
    <h1>Страница с постами</h1>
    <div class="app__btn">
      <my-button @click="fetchPosts">Получить посты</my-button>
      <my-select v-model="selectedSort" :options="sortOptions" />
    </div>
    <my-input type="text" v-model="searchPost" placeholder="Поиск ..." />
    <my-button @click="showDialog" style="align-self: center"
      >Создать пост</my-button
    >
    <my-dialog v-model:show="dialogVisible">
      <post-form @create="createPost" />
    </my-dialog>

    <post-list
      :posts="sortedAndFilteredPosts"
      @remove="removePost"
      v-if="!isPostsLoading"
    />
    <div v-else>Идет загрузка ...</div>
    <!-- <div class="page__wrapper">
      <div
        v-for="pageNumber in totalPages"
        :key="pageNumber"
        class="page"
        :class="{ 'current-page': page === pageNumber }"
        @click="changePage(pageNumber)"
      >
        {{ pageNumber }}
      </div>
    </div> -->
    <div class="observer" v-intersection="loadMorePosts"></div>
  </div>
</template>

<script>
import PostList from "@/components/PostList";
import PostForm from "@/components/PostForm";
import axios from "axios";

export default {
  components: {
    PostForm,
    PostList,
  },
  data() {
    return {
      posts: [],
      dialogVisible: false,
      modificatorValue: "",
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
    };
  },

  methods: {
    createPost(post) {
      this.posts.push(post);
      this.dialogVisible = false;
    },
    removePost({ id }) {
      this.posts = this.posts.filter((post) => post.id !== id);
    },
    showDialog() {
      this.dialogVisible = true;
    },
    async fetchPosts() {
      this.isPostsLoading = true;
      try {
        const response = await axios.get(
          "http://jsonplaceholder.typicode.com/posts",
          {
            params: {
              _page: this.page,
              _limit: this.limit,
            },
          }
        );
        this.posts = response.data;
        this.totalPages = Math.ceil(
          response.headers["x-total-count"] / this.limit
        );
      } catch (error) {
        alert("Ошибка");
      } finally {
        this.isPostsLoading = false;
      }
    },
    async loadMorePosts() {
      this.page += 1;
      try {
        const response = await axios.get(
          "http://jsonplaceholder.typicode.com/posts",
          {
            params: {
              _page: this.page,
              _limit: this.limit,
            },
          }
        );
        this.posts = [...this.posts, ...response.data];
        this.totalPages = Math.ceil(
          response.headers["x-total-count"] / this.limit
        );
      } catch (error) {
        alert("Ошибка");
      } finally {
      }
    },
    // changePage(page) {
    //   this.page = page;
    //   this.fetchPosts();
    // },
  },
  mounted() {
    this.fetchPosts();

   //  const options = {
   //    rootMargin: "0px",
   //    threshold: 1.0,
   //  };
   //  const callback = (entries, observer) => {
   //   if (entries[0].isIntersecting && this.page < this.totalPages) {
   //       this.loadMorePosts()
   //   }
   //  };
   //  const observer = new IntersectionObserver(callback, options);
   //  observer.observe(this.$refs.observer);
  },
  computed: {
    sortedPosts() {
      return this.posts.sort((post1, post2) =>
        post1[this.selectedSort].localeCompare(post2[this.selectedSort])
      );
    },
    sortedAndFilteredPosts() {
      return this.sortedPosts.filter((post) =>
        post.title.toLowerCase().includes(this.searchPost.toLowerCase())
      );
    },
  },
  watch: {
    selectedSort(newValue) {
      // console.log(newValue);
      // this.posts.sort((post1, post2) => post1[newValue].localeCompare(post2[newValue]))
    },
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
