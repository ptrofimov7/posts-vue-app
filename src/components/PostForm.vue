<template>
  <form class="form" @submit.prevent>
    <my-input
      v-model="post.title"
      type="text"
      placeholder="Name"
      v-focus
    />
    <my-input
      v-model="post.body"
      type="text"
      placeholder="Description"
      style="align-self: flex-start; margin: 10px 0px;"
    />
    <my-button
      @click="createPost"
      style="align-self: flex-end; margin-top: 20px"
    >
      Create
    </my-button>
  </form>
</template>

<script>
export default {
  data() {
    return {
      post: {
        title: "",
        body: "",
      },
    };
  },

  methods: {
    createPost() {
      this.post.id = Date.now();
      this.$emit("create", this.post);
      this.post = { title: "", body: "" };
    },
  },
};
</script>

<style scoped>
.form {
  display: flex;
  flex-direction: column;
}
</style>
