<script setup>
import { onMounted } from "vue";
import { storeToRefs } from "pinia";

import router from "../router";
import { usePokemonDetailsStore } from "../stores/pokemonDetails";

import LoadingOverlayComponent from "../components/LoadingOverlayComponent.vue";

const pokemonDetailsStore = usePokemonDetailsStore();

const { error, loading, data, dataLocations, dataAbilities } =
  storeToRefs(pokemonDetailsStore);
const { getApiData } = pokemonDetailsStore;

onMounted(() => {
  getApiData();
});
</script>

<template>
  <main>
    <section class="details-wrapper">
      <div v-if="data && dataLocations && dataAbilities" class="container">
        <section class="pokemon-content">
          <nav>
            <span
              @click="
                () => {
                  router.push({
                    name: 'home',
                  });
                }
              "
            >
              Home
            </span>
            <span @click="$router.go(-1)">
              <v-icon name="bi-arrow-return-right" /> Go back
            </span>
          </nav>

          <img
            class="pokemon-img"
            :src="data?.sprites.front_default"
            :alt="data?.name"
          />

          <h1>{{ data?.name }}</h1>

          <div class="content-wrapper">
            <div class="size-wrapper">
              <p>Height: {{ data?.height * 10 }}cm</p>
              <p>Weight: {{ data?.weight / 10 }}kg</p>
            </div>

            <div class="species-wrapper">
              <h2>Species</h2>
              <p>{{ data?.species.name }}</p>
            </div>

            <div class="stats-wrapper">
              <h2>Stats</h2>

              <div class="stats">
                <div v-for="stat in data.stats">
                  <p>
                    {{ stat?.stat.name.replaceAll("-", " ") }}:
                    {{ stat?.base_stat }}
                  </p>
                </div>
              </div>
            </div>

            <div class="types-wrapper">
              <h2>Types</h2>

              <div>
                <p v-for="type in data.types">{{ type?.type.name }}</p>
              </div>
            </div>

            <div class="sprites-wrapper">
              <img
                v-if="data?.sprites.front_default"
                :src="data?.sprites.front_default"
                :alt="data?.name"
              />
              <img
                v-if="data?.sprites.back_default"
                :src="data?.sprites.back_default"
                :alt="data?.name + ' back'"
              />
              <img
                v-if="data?.sprites.front_shiny"
                :src="data?.sprites.front_shiny"
                :alt="data?.name + ' shiny'"
              />
              <img
                v-if="data?.sprites.back_shiny"
                :src="data?.sprites.back_shiny"
                :alt="data?.name + ' back shiny'"
              />
              <img
                v-if="data?.sprites.front_female"
                :src="data?.sprites.front_female"
                :alt="data?.name + ' female'"
              />
              <img
                v-if="data?.sprites.back_female"
                :src="data?.sprites.back_female"
                :alt="data?.name + ' back female'"
              />
              <img
                v-if="data?.sprites.front_shiny_female"
                :src="data?.sprites.front_shiny_female"
                :alt="data?.name + ' shiny female'"
              />
              <img
                v-if="data?.sprites.back_shiny_female"
                :src="data?.sprites.back_shiny_female"
                :alt="data?.name + ' back shiny female'"
              />
            </div>
          </div>
        </section>

        <section class="pokemon-content">
          <div class="content-wrapper">
            <h2>Abilities</h2>

            <div class="abilities-wrapper">
              <div v-for="ability in dataAbilities">
                <h3>{{ ability?.name }}:</h3>
                <p>{{ ability?.effect }}</p>
              </div>
            </div>
          </div>

          <div class="content-wrapper">
            <h2>Location areas</h2>

            <div class="locations-wrapper">
              <p v-for="location in dataLocations">
                {{ location?.location_area.name.replaceAll("-", " ") }}
              </p>
            </div>
          </div>

          <div class="content-wrapper">
            <h2>Moves</h2>

            <div class="moves-wrapper">
              <p v-for="move in data.moves">
                {{ move?.move.name.replaceAll("-", " ") }}
              </p>
            </div>
          </div>
        </section>
      </div>
    </section>
  </main>

  <LoadingOverlayComponent :loading="loading" />
</template>

<style scoped lang="scss">
@import "../styles/globalStyles.scss";

main {
  @include flexUtil(row, center, center);

  .details-wrapper {
    @include sizeUtil(100%, 100%);
    background: $white_opacity;
    backdrop-filter: blur(2px);
    border-radius: 10px;
    padding: 20px;
    overflow-x: hidden;
    overflow-y: auto;

    .container {
      @include flexUtil(row wrap, space-evenly);
      gap: 30px;

      nav {
        @include flexUtil(row, "", center);
        gap: 5px;
        position: relative;
        font-weight: 500;
        z-index: 1;
        font-size: 14px;

        span {
          @include flexUtil(row, center, center);
          height: 28px;
          color: red;
          gap: 5px;
          border: 2px solid red;
          border-radius: 5px;
          padding: 2px 20px;
          cursor: pointer;
          transition: 0.2s;

          &:hover {
            background: red;
            color: $white;
          }
        }

        svg {
          transform: rotate(180deg);
        }
      }

      h1 {
        color: $yellow;
        font-size: 34px;
        text-transform: uppercase;
        text-shadow: 2px 2px 1px $darker_orange;
      }

      img {
        image-rendering: pixelated;
      }

      .content-wrapper {
        h2 {
          color: $blue_green;
          margin-bottom: 5px;
          text-shadow: 1px 1px 1px $dark_blue;
        }
      }

      .pokemon-content {
        @include flexUtil(column);
        height: 100%;
        flex: 1;
        gap: 20px;
        min-width: 237.5px;

        &:first-of-type {
          margin-bottom: 60px;

          .content-wrapper {
            @include flexUtil(column);
            gap: 20px;

            p {
              text-transform: capitalize;
            }

            .size-wrapper,
            .stats-wrapper .stats,
            .types-wrapper div {
              @include flexUtil(column);
              gap: 5px;
            }

            .sprites-wrapper {
              @include flexUtil(row wrap, space-evenly);
              gap: 10px;

              img {
                @include sizeUtil(100px, 100px);
                transform: scale(1.3);
              }
            }
          }

          @media screen and (max-width: 584px) {
            margin: 0;
          }
        }

        &:last-of-type {
          margin: 60px 0;

          @media screen and (max-width: 584px) {
            margin: 0;
          }
        }

        .pokemon-img {
          width: 100%;
        }

        .content-wrapper {
          .abilities-wrapper {
            @include flexUtil(column);
            gap: 10px;

            h3 {
              color: $dark_blue;
              text-transform: capitalize;
              margin-bottom: 5px;
            }
          }

          .locations-wrapper {
            @include flexUtil(column);
            gap: 5px;

            p {
              text-transform: capitalize;
            }
          }

          .moves-wrapper {
            @include flexUtil(row wrap);
            gap: 10px;

            p {
              background: $orange;
              color: $white;
              box-shadow: 1px 1px 5px $gray_opacity;
              padding: 5px;
              border-radius: 5px;
              text-transform: capitalize;
            }
          }
        }
      }
    }
  }
}
</style>
