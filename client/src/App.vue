<template>
  <v-app>
    <router-view></router-view>
    <v-dialog v-model="loading" persistent width="300">
      <v-card color="primary" dark>
        <v-card-text>
          Please stand by
          <v-progress-linear
            indeterminate
            color="white"
            class="mb-0"
          ></v-progress-linear>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-app>
</template>

<script>
import axios from "axios";
import { mapActions, mapGetters } from "vuex";
export default {
  name: "App",
  methods: mapActions(["setLoading", "setUser"]),
  computed: mapGetters({ loading: "getLoading", user: "getUser" }),
  created() {
    console.log(this.user);
    this.setLoading(false);
  },
  mounted() {
    axios.interceptors.request.use(
      (config) => {
        this.setLoading(true);
        return config;
      },
      (error) => {
        this.setLoading(false);
        return Promise.reject(error);
      }
    );
    axios.interceptors.response.use(
      (response) => {
        this.setLoading(false);
        return response;
      },
      (error) => {
        this.setLoading(false);
        return Promise.reject(error);
      }
    );
  },
};
</script>
<style>
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@100;300;400;500;600&display=swap");
:root {
  --header-height: 3rem;
  /* Colors */
  --hue-color: 235;
  /* HSL Color mode */
  --first-color: hsl(var(--hue-color), 69%, 61%);
  --first-color-second: hsl(var(--hue-color), 69%, 61%);
  --first-color-alt: hsl(var(--hue-color), 57%, 53%);
  --first-color-lighter: hsl(var(--hue-color), 92%, 85%);
  --title-color: hsl(var(--hue-color), 8%, 15%);
  --text-color: hsl(var(--hue-color), 8%, 45%);
  --text-color-light: hsl(var(--hue-color), 8%, 65%);
  --input-color: hsl(var(--hue-color), 69%, 61%);
  --body-color: hsl(var(--hue-color), 60%, 99%);
  --container-color: #fff;
  /* Typography */
  --body-font: "Poppins", sans-serif;
  --big-font-size: 2rem;
  --h1-font-size: 1.5rem;
  --h2-font-size: 1.25rem;
  --h3-font-size: 1.125rem;
  --normal-font-size: 0.938rem;
  --small-font-size: 0.813rem;
  --smaller-font-size: 0.75rem;
  --font-medium: 500;
  --font-semi-bold: 600;
  --mb-0-25: 0.25rem;
  --mb-0-5: 0.5rem;
  --mb-0-75: 0.75rem;
  --mb-1: 1rem;
  --mb-1-5: 1.5rem;
  --mb-2: 2rem;
  --mb-2-5: 2.5rem;
  --mb-3: 3rem;
  /* z index */
  --z-tooltip: 10;
  --z-fixed: 100;
  --z-modal: 200;
}
.v-application {
  font-family: var(--body-font) !important;
}
/* Font size for large devices */
@media screen and (max-width: 968px) {
  :root {
    --big-font-size: 3rem;
    --h1-font-size: 2.25rem;
    --h2-font-size: 1.5rem;
    --h3-font-size: 1.25rem;
    --normal-font-size: 1rem;
    --small-font-size: 0.875rem;
    --smaller-font-size: 0.813rem;
  }
}
/* ===================================== BASE ==================================== */
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
html {
  scroll-behavior: smooth;
}
body {
  font-family: var(--body-font) !important;
  font-size: var(--normal-font-size);
  background-color: var(--body-color);
  color: var(--text-color);
}
h1,
h2,
h3,
h4 {
  color: var(--title-color);
  font-weight: var(--font-semi-bold);
}
ul {
  list-style-type: none;
}
a {
  text-decoration: none;
}
img {
  max-width: 100%;
  height: auto;
}
/* ===================================== REUSABLE CSS CLASSES ==================================== */
.__section {
  padding: 2rem 0 4rem;
}
.__section__title {
  font-size: var(--h1-font-size);
}
.__section__subtitle {
  display: block;
  font-size: var(--small-font-size);
  margin-bottom: var(--mb-3);
}
.__section__title,
.__section__subtitle {
  text-align: center;
}
/* ===================================== LAYOUT ==================================== */
.__container {
  max-width: 768px;
  margin: 0 var(--mb-1-5);
}
.__grid {
  display: grid;
  gap: 1.5rem;
}
.__header {
  width: 100%;
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: var(--z-fixed);
  background-color: var(--body-color);
}
/* ===================================== BUTTONS ==================================== */
.__button {
  display: inline-block;
  background-color: var(--first-color);
  color: #fff;
  padding: 1rem;
  border-radius: 0.5rem;
  font-weight: var(--font-medium);
}
.__button:hover {
  background-color: var(--first-color-alt);
}
.__button__icon {
  font-size: 1.25rem;
  margin-left: var(--mb-0-5);
  transition: 0.3s;
}
.__button--flex {
  display: inline-flex;
  align-items: center;
}
.__nav__logo {
  color: var(--title-color);
  font-weight: var(--font-semi-bold);
}
</style>