<template>
  <employee-issue v-if="user.role === 'employee-role'"></employee-issue>
  <manager-issue v-else-if="user.role === 'manager-role'"/>
  <technician-issue v-else-if="user.role === 'technician-role'"/>
</template>

<script>
import EmployeeIssue from "@/views/employee/EmployeeIssue";
import {mapGetters} from "vuex";
import ManagerIssue from "@/views/manager/ManagerIssue";
import TechnicianIssue from "@/views/technician/TechnicianIssue";
export default {
  name: "Issue",
  components: {TechnicianIssue, ManagerIssue, EmployeeIssue},
  computed: mapGetters({ user: "getUser" }),
}
</script>

<style scoped>

</style>