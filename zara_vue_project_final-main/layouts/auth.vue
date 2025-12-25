<template>
  <div class="layout-auth">
    <slot />
  </div>
</template>

<style scoped lang="scss">
.layout-auth {
  width: 100%;
  min-height: 100vh;
  background-color: white;
  margin: 0;
  padding: 0;
  display: block; // Ensure it's not flex/center
}
</style>
