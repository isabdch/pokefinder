<script setup lang="ts">
import { storeToRefs } from "pinia";
import { ref } from "vue";
import { usePokemonsStore } from "../stores/pokemons";

const pokemonsStore = usePokemonsStore();
const text = ref("");

const { error } = storeToRefs(pokemonsStore);
const { getApiData } = pokemonsStore;

function fetchPokemons() {
  getApiData(text.value);
  text.value = "";
}
</script>

<template>
  <main>
    <div class="search-box">
      <h2>Search for Pokemons!</h2>

      <div class="search-box__input-wrapper">
        <input v-model="text" type="text" placeholder="Search..." />
        <button @click="fetchPokemons">
          <v-icon name="hi-search" />
        </button>
      </div>

      <p :class="error ? 'shown' : ''">{{ error ? error : "PokeFinder" }}</p>
    </div>
  </main>
</template>

<style scoped lang="scss">
@import "../styles/globalStyles.scss";

main {
  @include sizeUtil(100%, 100vh);
  @include flexUtil(row, center, center);
  background: $orange url("../assets/pokemon-background.png") no-repeat center;
  background-size: cover;
  padding: 20px;

  .search-box {
    @include sizeUtil(100%, 100%);
    @include maxSizeUtil(650px, 350px);
    @include flexUtil(column, center, center);
    background: #ffffffbb;
    backdrop-filter: blur(2px);
    box-shadow: 1px 1px 10px #0000008c;
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

    .search-box__input-wrapper {
      @include flexUtil(row);
      width: 100%;
      max-width: 450px;
      border-radius: 5px;
      margin-bottom: 10px;

      &:focus-within {
        outline: 2px solid $blue_green;
      }

      input {
        flex: 1;
        border-radius: 5px 0 0 5px;
        padding: 12px;
        border: 0;
        outline: 0;

        &::placeholder {
          color: $light_gray;
          font-style: italic;
          font-weight: 500;
        }
      }

      button {
        background: $blue_green;
        width: 50px;
        border-radius: 0 5px 5px 0;
        outline: 0;
        transition: 0.2s;

        svg {
          color: $white;
        }

        &:hover {
          background: $white;

          svg {
            color: $blue_green;
          }
        }
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
