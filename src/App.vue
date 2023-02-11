<script setup>
import { RouterView } from "vue-router";
</script>

<template>
  <RouterView />

  <a href="https://github.com/isabdch">isabdch</a>
</template>

<style scoped lang="scss">
@import "./styles/globalStyles.scss";

a {
  position: fixed;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  color: $white_opacity;
  text-decoration: none;
}
</style>
