<script setup>
import { storeToRefs } from "pinia";
import { ref } from "vue";

import { usePokemonsStore } from "../stores/pokemons";

import InputComponent from "../components/InputComponent.vue";
import LoadingOverlayComponent from "../components/LoadingOverlayComponent.vue";

const text = ref("");
const pokemonsStore = usePokemonsStore();

const { error, loading } = storeToRefs(pokemonsStore);
const { getApiData } = pokemonsStore;

function fetchPokemons() {
  if (text.value.trim()) {
    getApiData(text.value);
    text.value = "";
  } else {
    error.value = "You have to enter a valid value"
  }
}
</script>

<template>
  <main>
    <div class="search-box">
      <h2>Search for Pokemons!</h2>

      <InputComponent v-model:text="text" @fetchPokemons="fetchPokemons" />

      <p :class="error != '' ? 'shown' : ''">{{ error != '' ? error : "&nbsp;" }}</p>
    </div>
  </main>

  <LoadingOverlayComponent :loading="loading" />
</template>

<style scoped lang="scss">
@import "../styles/globalStyles.scss";

main {
  @include flexUtil(row, center, center);

  .search-box {
    @include flexUtil(column, center, center);
    @include sizeUtil(100%, 100%);
    @include maxSizeUtil(650px, 350px);
    min-height: 226px;
    background: $white_opacity;
    backdrop-filter: blur(2px);
    box-shadow: 1px 1px 10px $black-opacity;
    padding: 20px;
    border: 4px solid $white;
    border-radius: 10px;

    h2 {
      color: $yellow;
      margin-bottom: 20px;
      font-size: 34px;
      text-transform: uppercase;
      text-shadow: 2px 2px 1px $darker_orange;
      text-align: center;

      @media screen and (max-width: 675px) {
        font-size: 32px;
      }
    }

    p {
      color: red;
      font-size: 14px;
      transform: translateY(-100%);
      opacity: 0;
      transition: 0.2s;

      &.shown {
        transform: translateY(0);
        opacity: 1;
      }
    }
  }
}
</style>
