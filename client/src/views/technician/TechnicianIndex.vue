<template>
  <technician-base>
    <v-divider class="my-5" />
    <h2 class="text-center mb-5">EMPLOYEE'S ASKING FOR ASSISTANCE</h2>

    <div class="d-flex">
      <v-card width="28%" class="mr-2 rounded-t-xl">
        <v-card-text style="height: 80vh; overflow-y: scroll">
          <v-card
            class="my-2"
            @click="fetch(user.from)"
            v-for="user in recent"
            color="indigo lighten-4"
          >
            <v-card-text class="mb-0 pb-0">
              <h4>{{ allUsers.find((u) => user.from === u.id).name }}</h4>
            </v-card-text>
            <v-card-subtitle>
              {{
                user.last_message.length > 25
                  ? user.last_message.substr(0, 25 - 1) + "&hellip;"
                  : user.last_message
              }}
            </v-card-subtitle>
          </v-card>
        </v-card-text>
      </v-card>
      <v-card
        width="70%"
        style="height: 80vh"
        class="rounded-t-xl d-flex align-center"
        color="indigo lighten-5"
      >
        <v-card-text>
          <v-card
            flat
            color="transparent"
            class="rounded-lg mx-5"
            style="height: 70vh"
          >
            <v-card-text
              style="height: 100%; overflow-y: scroll"
              id="messagePanel"
            >
              <v-alert
                type="info"
                prominent
                dense
                outlined
                v-if="messages.length === 0"
              >
                No message yet
              </v-alert>
              <div
                class="d-flex my-4"
                v-for="message in messages"
                :class="message.from === 'assistance' ? 'justify-end' : ''"
              >
                <v-card class="rounded-lg" min-width="300px" width="50%" flat>
                  <v-card-text v-if="message.from === 'assistance'">
                    <h5>Assistance Team</h5>
                    <p class="mb-0 pb-0 text-wrap" v-text="message.message"></p>
                  </v-card-text>
                  <v-card-text v-else>
                    <h5>
                      {{ allUsers.find((e) => e.id === message.from).name }}
                    </h5>
                    <p class="mb-0 pb-0 text-wrap" v-text="message.message"></p>
                  </v-card-text>
                </v-card>
              </div>
            </v-card-text>
          </v-card>
        </v-card-text>
      </v-card>
    </div>
    <v-card class="my-5 d-flex align-center" color="indigo lighten-5">
      <v-card-text class="d-flex flex-column align-stretch justify-start">
        <v-textarea
          :loading="getLoading"
          v-model="content"
          persistent-placeholder
          label="WRITE MESSAGE"
          rows="3"
          placeholder="Hello, please I need help on this matter..."
          flat
        />
        <v-btn
          :disabled="userId === ''"
          @click="send"
          :loading="getLoading"
          style="max-width: 300px"
          color="success"
          >send
          <v-icon right>uil-message</v-icon>
        </v-btn>
      </v-card-text>
    </v-card>
  </technician-base>
</template>

<script>
import EmployeeBase from "@/components/EmployeeBase";
import firestore__ from "@/database/firestore";
import { mapActions, mapGetters } from "vuex";
import db from "@/database";
import TechnicianBase from "@/components/TechnicianBase";

export default {
  name: "TechnicianIndex",
  components: { TechnicianBase },
  computed: mapGetters(["getUser", "getLoading", "allUsers"]),
  data() {
    return {
      content: "",
      messages: [],
      recent: [],
      userId: "",
    };
  },
  methods: {
    ...mapActions(["setLoading", "setAllUsers"]),
    send() {
      if (this.content.trim() === "") return;
      this.setLoading();
      const doc = {
        message: this.content,
        from: "assistance",
        to: this.userId,
        createdAt: db.firestore.FieldValue.serverTimestamp(),
      };
      firestore__
        .collection("assistance")
        .add(doc)
        .then(() => {
          firestore__
            .collection("assistance_user")
            .doc(this.getUser.id)
            .set({ last_message: this.content })
            .then(() => {
              this.setLoading();
              this.content = "";
              const objDiv = document.getElementById("messagePanel");
              objDiv.scrollTop = objDiv.scrollHeight;
            });
        });
    },
    fetch(id) {
      this.userId = id;
      firestore__
        .collection("assistance")
        .orderBy("createdAt")
        .onSnapshot((snapshot) => {
          const messages = snapshot.docs.map((e) => e.data());
          this.messages = messages.filter((e) => e.from === id || e.to === id);
        });
    },
    getRecents() {
      firestore__
        .collection("assistance_user")
        .orderBy("createdAt", "desc")
        .onSnapshot((snapshot) => {
          this.recent = snapshot.docs.map((e) => e.data());
          console.log(this.recent);
        });
    },
  },
  watch: {
    allUsers() {
      this.getRecents();
    },
  },
  created() {
    // this.fetch()
    this.setAllUsers();
    this.$router.push({ name: "issue" });
  },
};
</script>

<style scoped>
</style>