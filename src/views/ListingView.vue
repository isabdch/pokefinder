<script setup>
import { storeToRefs } from "pinia";
import { ref, onMounted } from "vue";

import { usePokemonsStore } from "../stores/pokemons";
import router from "../router";

import InputComponent from "../components/InputComponent.vue";
import LoadingOverlayComponent from "../components/LoadingOverlayComponent.vue";
import CardComponent from "../components/CardComponent.vue";

const text = ref("");
const pokemonsStore = usePokemonsStore();

const { data, loading, error } = storeToRefs(pokemonsStore);
const { getApiData } = pokemonsStore;

function fetchPokemons() {
  if (text.value.trim()) {
    getApiData(text.value);
    text.value = "";
  } else {
    error.value = "You have to enter a valid value";
  }
}

function orderedItems(items) {
  return items.sort((a, b) => a.order - b.order);
}

onMounted(() => {
  if (data.value.length < 1) {
    router.push({
      name: "home",
    });
  }
});
</script>

<template>
  <main>
    <section class="search-section">
      <InputComponent v-model:text="text" @fetchPokemons="fetchPokemons" />

      <p :class="error != '' ? 'shown' : ''">
        {{ error != "" ? error : "&nbsp;" }}
      </p>
    </section>

    <section class="cards-section container">
      <CardComponent
        v-for="item in orderedItems(data)"
        v-if="!loading && data.length"
        :data="item"
      />
    </section>
  </main>

  <LoadingOverlayComponent :loading="loading" />
</template>

<style scoped lang="scss">
@import "../styles/globalStyles.scss";

.search-section {
  @include flexUtil(column, center, center);
  margin-top: 40px;

  .search-box__input-wrapper {
    box-shadow: 1px 1px 10px $black-opacity;
  }

  p {
    background: $white-opacity;
    color: red;
    backdrop-filter: blur(2px);
    padding: 5px;
    border-radius: 5px;
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

.cards-section {
  @include flexUtil(row wrap, center, center);
  gap: 20px;
  margin-top: 60px;
}
</style>
