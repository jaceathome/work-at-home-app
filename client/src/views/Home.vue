<template>
  <div>
    <admin-home v-if="user.role === 'admin-role'"></admin-home>
    <manager-index v-else-if="user.role === 'manager-role'"></manager-index>
    <employee-home v-else-if="user.role === 'employee-role'"></employee-home>
    <technician-index v-else-if="user.role === 'technician-role'" />
    <div v-else>Not Found!</div>
  </div>
</template>

<script>
import AdminBase from "@/components/AdminBase";
import EmployeeBase from "@/components/EmployeeBase";
import AdminHome from "@/views/admin/AdminHome";
import EmployeeHome from "@/views/employee/EmployeeHome";
import { mapActions, mapGetters } from "vuex";
import ManagerIndex from "./manager/ManagerIndex.vue";
import TechnicianIndex from "@/views/technician/TechnicianIndex";

export default {
  name: "Home",
  components: {
    TechnicianIndex,
    EmployeeHome,
    AdminHome,
    EmployeeBase,
    AdminBase,
    ManagerIndex,
  },
  computed: mapGetters({ user: "getUser" }),
  created() {
    console.log(this.getUser);
  },
};
</script>
