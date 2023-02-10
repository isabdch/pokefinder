import { ref } from "vue";
import { defineStore } from "pinia";
import axios from "axios";

import router from "../router";
import { api } from "../services/api/api";

export const usePokemonsStore = defineStore("pokemons", () => {
  const data = ref([]);
  const loading = ref(false);
  const error = ref("");

  const chainUrls = ref([]);

  const iterate = (obj) => {
    Object.keys(obj).forEach((key) => {
      if (key == "url" && obj[key].includes("pokemon-species")) {
        chainUrls.value.push(obj[key]);
      }

      if (typeof obj[key] === "object" && obj[key] !== null) {
        iterate(obj[key]);
      }
    });
  };

  function getApiData(text) {
    loading.value = true;
    chainUrls.value = [];
    data.value = [];
    const txt = text.toLowerCase();

    api
      .get(`pokemon/${txt}`)
      .then((res) => {
        return axios.get(res.data.species.url);
      })
      .then((res) => {
        return axios.get(res.data.evolution_chain.url);
      })
      .then((res) => {
        iterate(res.data.chain);

        chainUrls.value.forEach((url) => {
          axios
            .get(url)
            .then((res) => {
              return api.get(`pokemon/${res.data.id}`);
            })
            .then((res) => {
              data.value.push(res.data);
              error.value = "";
            })
            .then(() => router.push("/listing"))
            .catch((err) => (error.value = err.response?.data))
            .finally(() => (loading.value = false));
        });
      })
      .catch((err) => (error.value = err.response?.data))
      .finally(() => (loading.value = false));
  }

  return { data, loading, error, getApiData };
});
