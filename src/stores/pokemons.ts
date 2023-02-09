import { ref } from "vue";
import { defineStore } from "pinia";

import router from "../router";
import { api } from "../services/api/api";

export const usePokemonsStore = defineStore("pokemons", () => {
  const data = ref(null);
  const loading = ref(false);
  const error = ref(null);

  function getApiData(text: string) {
    api
      .get(`pokemon/${text}`)
      .then((res) => console.log(res.data))
      .then(() => router.push("/listing"))
      .catch((err) => (error.value = err.response.data))
      .finally(() => (loading.value = false));
  }

  return { data, error, loading, getApiData };
});
