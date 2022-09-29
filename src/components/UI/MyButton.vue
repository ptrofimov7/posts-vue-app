<template>
  <button class="btn">
     <slot>

     </slot>
  </button>
</template>

<script>

export default {
   name: "my-button"
}

</script>

<style scoped>
.btn {
  background: transparent;
  border: 1px solid green;
  color: green;
  font-size: 20px;
  padding: 10px;
  cursor: pointer;
}
</style>
