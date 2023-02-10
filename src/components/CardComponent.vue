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
          params: { id: data?.id },
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
  @include sizeUtil(100%, 200px);
  max-width: 170px;
  background: $white_opacity;
  backdrop-filter: blur(2px);
  padding: 15px;
  border-radius: 10px;
  text-decoration: none;
  box-shadow: 1px 1px 10px $black-opacity;
  cursor: pointer;

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
    color: red;
    position: relative;
    text-transform: capitalize;
    text-align: center;
    font-weight: 500;
  }
}
</style>
