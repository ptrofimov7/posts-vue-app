<template>
  <div class="post">
    <div>
      <p>{{post.id}}</p>
      <h3><strong>Name: </strong> {{ post.title }}</h3>
      <p><strong>Description: </strong> {{ post.body }}</p>
    </div>
    <div class="post__btn">
      <my-button @click="$router.push(`/posts/${post.id}`)">Открыть</my-button>
      <my-button @click="$emit('remove', post)">Удалить</my-button>
    </div>
  </div>
</template>

<script>

export default {

  props: {
    post: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style scoped>
.post {
  padding: 2px;
  border: red solid 1px;
  margin-top: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.post__btn {
  display: flex;
}
</style>
