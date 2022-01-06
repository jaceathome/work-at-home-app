<template>
  <div>
    <manager-department v-if="getUser.role === 'manager-role'" />
    <admin-department v-else-if="getUser.role === 'admin-role'" />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import ManagerDepartment from "@/views/manager/ManagerDepartment";
import AdminDepartment from "@/views/admin/AdminDepartment";

export default {
  name: "Department",
  components: { AdminDepartment, ManagerDepartment },
  computed: mapGetters(["getUser"]),
};
</script>

<style scoped>
</style>