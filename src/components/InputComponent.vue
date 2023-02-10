<script>
export default {
  name: "InputComponent",
  props: ["text"],
  setup() {
    function submit(e) {
      e.preventDefault();
    }

    return {
      submit,
    };
  },
};
</script>

<template>
  <form @submit="submit" class="search-box__input-wrapper">
    <input
      :value="text"
      @input="$emit('update:text', $event.target.value)"
      type="text"
      placeholder="Search..."
    />
    <button type="submit" @click="$emit('fetchPokemons')">
      <v-icon name="hi-search" />
    </button>
  </form>
</template>

<style scoped lang="scss">
@import "../styles/globalStyles.scss";

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
</style>
