<template>
  <div v-if="user">
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
            <v-list-item-subtitle
              ><!-- {{
                work_positions.find((e) => e.id === user.work_position_id).title
              }} -->
            </v-list-item-subtitle>
            <v-list-item-title class="text-h6">
              <!-- {{ user.name }} -->
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
        <v-list-item-group color="primary">
          <v-list-item exact v-for="(item, i) in items" :key="i" :to="item.to">
            <v-list-item-icon>
              <v-icon v-text="item.icon"></v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title v-text="item.text"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-group :value="isUnderSetup()" prepend-icon="uil-setting">
            <template v-slot:activator>
              <v-list-item-title>Setup</v-list-item-title>
            </template>

            <v-list-item
              v-for="([title, icon, to], i) in setups"
              :key="i"
              link
              :to="to"
            >
              <v-list-item-icon>
                <v-icon v-text="icon"></v-icon>
              </v-list-item-icon>
              <v-list-item-title v-text="title"></v-list-item-title>
            </v-list-item>
          </v-list-group>

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

      <v-toolbar-title>
        <slot name="head">Administrator Access</slot>
      </v-toolbar-title>
    </v-app-bar>

    <v-main>
      <div class="pa-4">
        <slot>There is nothing to see here!</slot>
      </div>
    </v-main>
  </div>
</template>


<script>
import auth from "@/database/auth";
import { mapActions, mapGetters } from "vuex";
import db from "@/database";
import firestore__ from "@/database/firestore";

export default {
  name: "AdminBase",
  data: () => ({
    drawer: null,
    items: [
      { text: "Home", icon: "uil-estate", to: { name: "home" } },
      { text: "Users", icon: "uil-users-alt", to: { name: "users" } },
      { text: "Profile", icon: "uil-user", to: { name: "profile" } },
    ],
    setups: [
      ["Roles", "uil-house-user", "roles"],
      // ["Departments", "uil-building", "departments"],
      ["Work Positions", "uil-briefcase-alt", "work-positions"],
      ["Departments", "uil-channel", "departments"],
    ],
  }),
  methods: {
    ...mapActions([
      "setUser",
      "setMailVerified",
      "setWorkPositions",
      "setUsers",
      "setRoles",
      "setDepartments",
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
    isUnderSetup() {
      const route = this.$route.name;
      return ["work-positions", "departments", "roles"].includes(route);
    },
  },
  computed: mapGetters({ user: "getUser", work_positions: "getWorkPositions" }),
  created() {
    this.setRoles();
    this.setDepartments();
    this.setWorkPositions();
    this.setUsers();
  },
};
</script>
