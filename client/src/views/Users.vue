
<template>
  <div>
    <admin-users v-if="user.role === 'admin-role'"></admin-users>
    <manager-users v-else-if="user.role === 'manager-role'"></manager-users>
    <div v-else>Not Found!</div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import AdminUsers from "./admin/AdminUsers.vue";
import ManagerUsers from "./manager/ManagerUsers.vue";
export default {
  components: { AdminUsers, ManagerUsers },
  name: "Users",
  computed: mapGetters({ user: "getUser" }),
};
</script>

<style>
</style>