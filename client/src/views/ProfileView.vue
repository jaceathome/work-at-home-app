<template>
  <div>
    <manager-profile-view v-if="user.role === 'manager-role'" />
    <admin-profile-view v-else-if="user.role === 'admin-role'" />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import ManagerProfile from "./manager/ManagerProfile.vue";
import AdminProfile from "@/views/admin/AdminProfile";
import EmployeeProfile from "@/views/employee/EmployeeProfile";
import ManagerProfileView from "@/views/manager/ManagerProfileView";
import AdminProfileView from "@/views/admin/AdminProfileView";
export default {
  components: {AdminProfileView, ManagerProfileView,  },
  computed: mapGetters({ user: "getUser" }),
};
</script>

<style>
</style>