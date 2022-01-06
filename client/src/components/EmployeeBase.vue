<template>
  <div>
    <v-navigation-drawer v-model="drawer" app>
      <v-system-bar></v-system-bar>
      <v-list>
        <v-list-item>
          <v-list-item-avatar>
            <v-img :src="user.avatar" v-if="user.avatar"></v-img>
            <v-img
              :src="'https://joeschmoe.io/api/v1/' + user.name"
              v-else
            ></v-img>
          </v-list-item-avatar>
        </v-list-item>

        <v-list-item link>
          <v-list-item-content>
            <v-list-item-subtitle>{{
              work_positions.find((e) => e.id === user.work_position_id).title
            }}</v-list-item-subtitle>
            <v-list-item-title class="text-h6">
              {{ user.name }}
            </v-list-item-title>

            <v-list-item-subtitle>{{ user.email }}</v-list-item-subtitle>
            <span class="mt-1">
              {{ user.role_title }}
            </span>
          </v-list-item-content>
          <!--                    <v-list-item-action>
                                      <v-icon>mdi-menu-down</v-icon>
                                  </v-list-item-action>-->
        </v-list-item>
      </v-list>
      <v-divider></v-divider>
      <v-list nav dense>
        <v-list-item-group v-model="selectedItem" color="primary">
          <v-list-item v-for="(item, i) in items" :key="i" link :to="item.to">
            <v-list-item-icon>
              <v-icon v-text="item.icon"></v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title v-text="item.text"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-item @click="signout">
            <v-list-item-icon>
              <v-icon>mdi-logout</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>Sign out</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title>Employee Base</v-toolbar-title>
    </v-app-bar>

    <v-main>
      <div class="pa-4">
        <slot>There is nothing to see here!</slot>
      </div>
    </v-main>
  </div>
</template>


<script>
import authMiddleware from "@/database/auth";
import { mapActions, mapGetters } from "vuex";
import auth from "@/database/auth";
import db from "@/database";
import firestore__ from "@/database/firestore";
export default {
  name: "EmployeeBase",
  data: () => ({
    drawer: null,
    selectedItem: 0,
    items: [
      {
        text: "Issues",
        icon: "uil-exclamation-octagon",
        to: { name: "issue" },
      },
      { text: "Tasks", icon: "uil-clipboard-notes", to: { name: "tasks" } },
      { text: "Meeting", icon: "uil-video", to: { name: "call" } },
      /*   {
        text: "Assistance",
        icon: "uil-assistive-listening-systems",
        to: { name: "assistance" },
      }, */
      { text: "Profile", icon: "uil-user", to: { name: "profile" } },
    ],
  }),
  created() {
    this.setWorkPositions();
  },
  computed: mapGetters({ user: "getUser", work_positions: "getWorkPositions" }),
  methods: {
    ...mapActions([
      "setUser",
      "setMailVerified",
      "setWorkPositions",
      "setLoading",
    ]),
    signout() {
      this.setLoading();
      const log = {
        timestamp: db.firestore.FieldValue.serverTimestamp(),
        userId: this.user.id,
        type: "out",
      };
      firestore__
        .collection("logs")
        .add(log)
        .then(async () => {
          this.setLoading();
          await auth.signOut();
          this.setUser(null);
          await this.$router.replace({ name: "login" });
        });
    },
  },
};
</script>
