<template>
  <div>
    <manager-profile v-if="user.role === 'manager-role'" />
    <admin-profile v-else-if="user.role === 'admin-role'" />
    <employee-profile v-else-if="user.role === 'employee-role'" />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import ManagerProfile from "./manager/ManagerProfile.vue";
import AdminProfile from "@/views/admin/AdminProfile";
import EmployeeProfile from "@/views/employee/EmployeeProfile";
export default {
  components: {EmployeeProfile, AdminProfile, ManagerProfile },
  computed: mapGetters({ user: "getUser" }),
};
</script>

<style>
</style>