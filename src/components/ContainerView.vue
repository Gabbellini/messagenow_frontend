<template>
  <div class="container-view">
    <slot/>
  </div>
</template>

<script>
export default {
  name: "ContainerView"
}
</script>

<style scoped>
.container-view {
  padding: 0.5rem;
  max-width: 1360px;
  width: 100%;
  box-sizing: border-box;
  border-radius: 10px;
  overflow: hidden;
}
</style>