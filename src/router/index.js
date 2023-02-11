import { createRouter, createWebHistory } from "vue-router";

import HomeView from "../views/HomeView.vue";
import ListingView from "../views/ListingView.vue";
import DetailsView from "../views/DetailsView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/listing",
      name: "listing",
      component: ListingView,
    },
    {
      path: "/pokemon/:id",
      name: "details",
      component: DetailsView,
    },
  ],
});

export default router;
