<template>
  <div v-if="posts.length > 0">
    <h4>Список постов</h4>
    <transition-group name="list">
      <post-item
        v-for="post in posts"
        :post="post"
        :key="post.id"
        @remove="$emit('remove', post)"
      />
    </transition-group>
  </div>

  <h4 style="color: red" v-else>Список постов пуст!</h4>
</template>

<script>
import PostItem from "@/components/PostItem";

export default {
  components: {
    PostItem,
  },
  props: {
    posts: {
      type: Array,
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
}
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
.list {
  
}
</style>
