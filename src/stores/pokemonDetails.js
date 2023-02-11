import { ref } from "vue";
import { defineStore } from "pinia";
import { useRouter } from "vue-router";
import axios from "axios";

import { api } from "../services/api/api";

export const usePokemonDetailsStore = defineStore("pokemonDetails", () => {
  const data = ref(null);
  const dataLocations = ref(null);
  const dataEvolvesTo = ref("");
  const dataAbilities = ref([]);
  const loading = ref(false);
  const error = ref("");

  const router = useRouter();

  function getApiData() {
    loading.value = true;
    data.value = null;
    dataLocations.value = null;
    dataAbilities.value = [];
    dataEvolvesTo.value = ref("");
    error.value = "";

    api
      .get(`pokemon/${router.currentRoute.value.params.id}`)
      .then((res) => {
        data.value = res.data;

        res.data.abilities.forEach((ability) => {
          axios
            .get(ability.ability.url)
            .then((res) => {
              const obj = Object.entries(res.data.effect_entries);

              obj.forEach((effect) => {
                if (effect[1].language.name == "en") {
                  dataAbilities.value.push({
                    name: res.data.name,
                    effect: effect[1].effect,
                  });
                }
              });
            })
            .catch((err) => (error.value = err.response?.data));
        });

        axios
          .get(res.data.location_area_encounters)
          .then((res) => {
            dataLocations.value = res.data;
          })
          .catch((err) => (error.value = err.response?.data));
      })
      .catch((err) => (error.value = err.response?.data))
      .finally(() => {
        loading.value = false;
      });
  }

  return {
    data,
    dataLocations,
    dataAbilities,
    loading,
    error,
    getApiData,
  };
});
