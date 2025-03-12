import { defineStore } from "pinia";
import axios from "axios";

export const useMainStore = defineStore("main", {
  state: () => ({
    urlBase: "https://env-7663913.th1.proen.cloud",
    accessToken: null, // Initialized as null to avoid SSR issues
    expired: null,
    permissions: [],
    profile: null,
    urgentAmount: 0,
    urgentOrderIds: [],
    favoriteMenus: [],
  }),

  actions: {
    initializeStore() {
      if (typeof window !== "undefined") {
        this.accessToken = localStorage.getItem("c-link-accessToken") || null;
        this.expired = localStorage.getItem("c-link-expired") || null;
        this.profile =
          JSON.parse(localStorage.getItem("c-link-profile")) || null;
        this.favoriteMenus =
          JSON.parse(localStorage.getItem("c-link-favorite-menus")) || [];
      }
    },

    setProfile(value) {
      this.profile = value;
      localStorage.setItem("c-link-profile", JSON.stringify(value));
    },

    setPermissions(value) {
      this.permissions = value;
    },

    setAccessToken(value) {
      this.accessToken = value;
      localStorage.setItem("c-link-accessToken", value);
    },

    setExpired(value) {
      this.expired = value;
      localStorage.setItem("c-link-expired", value);
    },

    setUrgentAmount(value) {
      this.urgentAmount = value;
    },

    setUrgentOrderIds(value) {
      this.urgentOrderIds = value;
    },

    removeAccessToken() {
      this.accessToken = null;
      localStorage.removeItem("c-link-accessToken");
    },

    removeExpired() {
      this.expired = null;
      localStorage.removeItem("c-link-expired");
    },

    async getUrgentAmount() {
      const url = `${this.urlBase}/api/order/total-very-urgent`;
      try {
        const response = await axios.get(url);
        this.urgentAmount = response.data?.amount_new_order ?? 0;
        this.urgentOrderIds = response.data?.very_urgent_order_id ?? [];
      } catch (error) {
        console.error("Failed to fetch urgent amount:", error);
      }
    },

    getFavoritesMenus() {
      if (typeof window !== "undefined") {
        this.favoriteMenus =
          JSON.parse(localStorage.getItem("c-link-favorite-menus")) || [];
      }
    },

    setFavoritesMenus(value) {
      this.favoriteMenus = value;
      localStorage.setItem("c-link-favorite-menus", JSON.stringify(value));
    },
  },

  getters: {
    isAuthenticated: (state) => !!state.accessToken,
  },
});
