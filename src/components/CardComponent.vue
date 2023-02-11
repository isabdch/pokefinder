<script>
export default {
  name: "CardComponent",
  props: ["data"],
};
</script>

<template>
  <div
    @click="
      () =>
        $router.push({
          name: 'details',
          params: { id: data?.name },
        })
    "
    class="card"
  >
    <img :src="data?.sprites.front_default" :alt="data?.name" />
    <p>{{ data?.name }}</p>
  </div>
</template>

<style scoped lang="scss">
@import "../styles/globalStyles.scss";

.card {
  @include flexUtil(column, flex-end, center);
  @include sizeUtil(100%, 300px);
  max-width: 220px;
  background: $white_opacity;
  backdrop-filter: blur(2px);
  padding: 15px;
  border: 2px solid red;
  border-radius: 10px;
  position: relative;
  text-decoration: none;
  box-shadow: 1px 1px 10px $black-opacity;
  cursor: pointer;

  &::after {
    content: "";
    @include sizeUtil(100%, 100%);
    position: absolute;
    bottom: 0;
    background: linear-gradient(0deg, red 8%, #00000000 25%, #00000000 100%);
  }

  &:hover {
    img {
      transform: scale(1.1);
    }
  }

  img {
    @include sizeUtil(100%, 100%);
    object-fit: cover;
    image-rendering: pixelated;
    transition: 0.2s;
  }

  p {
    color: $white;
    position: relative;
    text-transform: capitalize;
    text-align: center;
    font-size: 18px;
    font-weight: 500;
    z-index: 1;
  }
}
</style>
