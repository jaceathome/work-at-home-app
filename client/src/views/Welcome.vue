<template>
  <div id="app">
    <header class="__container_custom">
      <nav class="align-center">
        <div class="nav-item">
          <a href="#" class="__nav__logo">WorkApp</a>
        </div>
        <div class="nav-item">
          <v-btn color="deep-purple" to="/login" dark> Login </v-btn>
        </div>
      </nav>
    </header>
    <img class="shape1" src="../assets/shape1.svg" alt="sally" />
    <main class="__container_custom" style="z-index: 100">
      <img class="workerIcon" src="../assets/Saly-10.png" alt="sally" />
      <v-row class="rowMain">
        <v-col cols="12" class="title__container d-flex align-end">
          <div class="bigTitle">
            Work from <br />
            home made easy <br />
            by our team.
          </div>
        </v-col>
        <v-col cols="12">
          <div class="description my-4">
            Lorem, ipsum dolor sit amet consectetur <br />
            adipisicing elit. Sed harum quibusdam soluta velit.
          </div>
        </v-col>
        <v-col cols="12">
          <div class="socials d-flex align-end">
            <div>
              <div class="__section__title socialTitle">
                Visit our social media
              </div>
              <div class="d-flex align-end">
                <a href="#"><v-icon>mdi-google</v-icon></a>
                <a href="#" class="mx-5"><v-icon>mdi-google</v-icon></a>
                <a href="#"><v-icon>mdi-google</v-icon></a>
              </div>
            </div>
          </div>
        </v-col>
      </v-row>
    </main>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
#app {
  position: relative;
}
main {
  height: 100%;
  position: relative;
}
.workerIcon,
.shape1 {
  position: absolute;
  background-repeat: no-repeat;
}
.workerIcon {
  right: 8rem;
  top: 0;
  width: 30rem;
  z-index: 2;
}
.shape1 {
  width: 80rem;
  left: -30%;
  z-index: 1;
  opacity: 0.5;
  top: -4rem;
}
@media screen and (min-width: 1308px) {
  .workerIcon {
    width: 35%;
    top: -5rem;
    left: 35rem;
    transition: 0.4s;
  }
}
nav {
  display: flex;
  justify-content: space-between;
}
.__container_custom {
  padding: 1rem 2rem;
}

.bigTitle {
  font-weight: var(--font-semi-bold);
  font-size: 3rem;
  z-index: 100;
}
.description {
  color: var(--text-color);
  z-index: 100;
}
.title__container {
  height: 25rem;
}
.socials {
  height: 20rem;
}
.socialTitle {
  font-weight: var(--font-medium);
}

</style>