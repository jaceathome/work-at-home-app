<template>
  <manager-base>
    <v-divider class="mt-8 mb-5"></v-divider>
    <div class="d-flex justify-center">
      <v-card-title>EMPLOYEES TIME TRACKING</v-card-title>
    </div>
    <v-data-table
      dense
      :headers="headers"
      :items="myLogs"
      item-key="id"
      class="elevation-1"
      height="500px"
      :search="search"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>Logs</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-text-field label="SEARCH" v-model="search" />
        </v-toolbar>
      </template>
      <template v-slot:item.avatar="{ item }">
        <v-avatar size="20">
          <!--            Default avatar change later-->
          <img
            :src="
              item.avatar ||
              'https://avatars0.githubusercontent.com/u/9064066?v=4&s=460'
            "
            alt="avatar"
          />
        </v-avatar>
      </template>
    </v-data-table>
  </manager-base>
</template>

<script>
import ManagerBase from "../../components/ManagerBase.vue";
import { mapActions, mapGetters } from "vuex";
import moment from "moment";

export default {
  name: "AdminHome",
  components: { ManagerBase },
  methods: {
    ...mapActions(["setAllUsers", "setLogs"]),
    findUser(id) {
      return this.allUsers.find((e) => e.id === id);
    },
  },
  data() {
    return {
      search: "",
      headers: [
        { text: "", value: "avatar", filterable: false, sortable: false },
        { text: "TIMESTAMP", value: "timestamp" },
        { text: "STATUS", value: "type" },
        { text: "Name", value: "name" },
        { text: "ID", value: "count", width: "9rem" },
        { text: "Email", value: "email" },
        { text: "Role", value: "role" },
        { text: "Department", value: "department" },
      ],
      myLogs: [],
      myUsers: [],
    };
  },
  computed: mapGetters(["logs", "allUsers", "logs", "getUser"]),
  created() {
    this.setAllUsers();
  },
  watch: {
    allUsers(val) {
      this.myUsers = val.filter((e) => e.managerId === this.getUser.id);
      this.setLogs();
    },
    logs(val) {
      const filter = val.filter((e) =>
        this.myUsers.some((myUser) => myUser.id === e.userId)
      );
      this.myLogs = filter.map((e) => ({
        ...e,
        ...this.findUser(e.userId),
        id: e.id,
        timestamp: moment(e.timestamp.toDate()).format("YYYY-MM-DD hh:mm A"),
      }));
      console.log(this.myLogs);
    },
  },
};
</script>

<style scoped>
</style>