<template>
  <div id="app">
    <v-row class="d-flex">
      <v-col style="height: 105vh" class="deep-purple" cols="4" lg="3">
        <router-link
          to="/"
          style="font-weight: 600; font-size: 1.2rem"
          class="white--text pa-5 d-block"
          >WorkApp
        </router-link>
        <div class="d-flex flex- align-center pb-10" style="height: 100%">
          <div
            class="
              white--text
              text-center
              d-flex
              flex-column
              justify-center
              align-center
            "
            style="width: 100%"
          >
            <div class="numberTitle" style="font-size: 3rem; font-weight: 600">
              99%
            </div>
            <p class="px-2">
              time saved and guaranteed better <br />
              experience while working.
            </p>
          </div>
        </div>
      </v-col>
      <v-col class="d-flex align-center justify-start" cols="8" lg="9">
        <v-container class="mb-15">
          <v-card flat max-width="660px">
            <v-form @submit.prevent="signin">
              <div class="font-weight-bold mb-" style="font-size: 1.8rem">
                Login to your <br />
                WFH account.
              </div>
              <v-text-field
                v-model="email"
                label="Email"
                :rules="emailRules"
                class="mb-4"
              ></v-text-field>
              <v-text-field
                v-model="password"
                label="Password"
                type="password"
                :rules="requiredRules"
              ></v-text-field>
              <v-btn
                :loading="loading"
                :disabled="this.email.trim() === '' || this.password === ''"
                class="mt-4"
                color="deep-purple"
                type="submit"
                dark
                >Continue
              </v-btn>
              <v-divider class="ma-5"></v-divider>
              <p>
                Issues logging in?
                <a href="#" @click="reset()" class="deep-purple--text"
                  >reset password <i class="uil uil-unlock"></i
                ></a>
              </p>
            </v-form>
          </v-card>
        </v-container>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import auth__ from "@/database/auth";
import { alertError, alertSuccessWithAuto, alertWarning } from "@/tools/swal";
import { emailRules, requiredRules } from "@/tools/rules";
import { mapActions, mapGetters } from "vuex";
import firestore__ from "@/database/firestore";
import db from "@/database";

export default {
  data: () => ({
    email: "",
    password: "",
    emailRules,
    requiredRules,
    disabled: false,
  }),
  computed: mapGetters({
    user: "getUser",
    mailed: "getMailed",
    loading: "getLoading",
  }),
  created() {
    this.setRoles();
    this.setWorkPositions();
    this.setDepartments();
  },
  methods: {
    ...mapActions([
      "setUser",
      "setMailVerified",
      "setRoles",
      "setDepartments",
      "setWorkPositions",
      "setLoading",
    ]),
    async reset() {
      const { value: email } = await Swal.fire({
        title: "Input email address",
        input: "email",
        inputLabel: "Your email address",
        inputPlaceholder: "Enter your email address",
      });

      if (email) {
        auth__
          .sendPasswordResetEmail(email)
          .then(() => {
            alertSuccessWithAuto(
              "Email sent",
              `Check your email : ${email}`,
              "success"
            );
          })
          .catch((err) => {
            Swal.fire("Error", err.message, "error");
          });
      }
    },
    async signin() {
      this.setLoading();
      try {
        const user = await auth__.signInWithEmailAndPassword(
          this.email.trim(),
          this.password
        );
        const userData = await firestore__
          .collection("users")
          .doc(user.user.uid)
          .get()
          .then((snap) => {
            const avatar =
              snap.get("avatar") ||
              "https://joeschmoe.io/api/v1/" + snap.get("name");
            return {
              ...snap.data(),
              email: user.user.email,
              id: user.user.uid,
              avatar,
            };
          });
        if (!user.user.emailVerified) {
          if (!this.mailed) {
            await user.user
              .sendEmailVerification()
              .then(() => this.setMailVerified());
          }
          alertWarning("Please check your email for verification.");
          this.setLoading();
        } else {
          const log = {
            timestamp: db.firestore.FieldValue.serverTimestamp(),
            userId: user.user.uid,
            type: "in",
          };
          firestore__
            .collection("logs")
            .add(log)
            .then(async () => {
              this.setUser(userData);
              alertSuccessWithAuto("Login successful!");
              this.setLoading();
              await this.$router.push({ name: "home" });
            });
        }
      } catch (err) {
        console.log(err);
        this.setLoading();
        // alertError(err.message)
        alertError("User credentials not found!");
      }
    },
  },
};
</script>

<style scoped>
#app {
  height: 100vh;
  overflow: hidden;
}
</style>
