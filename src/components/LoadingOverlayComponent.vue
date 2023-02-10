<script>
export default {
  name: "LoadingOverlayComponent",
  props: ["loading"],
};
</script>

<template>
  <div :class="loading ? 'loading-overlay active' : 'loading-overlay'">
    <img src="../assets/pokemon.svg" alt="Loading Pokemons..." />
  </div>
</template>

<style scoped lang="scss">
@import "../styles/globalStyles.scss";

@keyframes rotateImage {
  100% {
    transform: rotate(360deg);
  }
}

.loading-overlay {
  @include flexUtil(row, center, center);
  @include sizeUtil(100vw, 100vh);
  background: $white_opacity;
  position: fixed;
  inset: 0;
  transition: 0.2s;
  opacity: 0;
  z-index: -1;

  img {
    @include sizeUtil(80px, 80px);
    animation: rotateImage 1.2s ease 0s infinite;
  }

  &.active {
    opacity: 1;
    z-index: 9999;
  }
}
</style>
