<template>
  <div class="navbar">
    <h3 @click="$router.push('/')">Vue 3</h3>

    <div class="navbar__btns">
      <my-button @click="$router.push('/posts')">Posts</my-button>
      <my-button @click="$router.push('/store')">Store</my-button>
      <my-button style="margin-left: 20px" @click="$router.push('/about')">About</my-button>
      <my-button style="margin-left: 20px" @click="$router.push('/composition')">Composition</my-button>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style>
.navbar {
     height: 65px;
    background: grey;
    display: flex;
    align-items: center;
}
.navbar__btns {
   display: flex;
   align-items: center;
   margin-left: auto;
   padding: 10px;
}
</style>
