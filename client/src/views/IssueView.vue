<template>
  <employee-issue-view v-if="user.role === 'employee-role'"/>
  <manager-issue-view v-else-if="user.role === 'manager-role'"/>
  <technician-issue-view v-else-if="user.role === 'technician-role'"/>
</template>

<script>
import EmployeeIssueView from "@/views/employee/EmployeeIssueView";
import {mapGetters} from "vuex";
import ManagerIssueView from "@/views/manager/ManagerIssueView";
import TechnicianIssueView from "@/views/technician/TechnicianIssueView";
export default {
  name: "IssueView",
  components: {TechnicianIssueView, ManagerIssueView, EmployeeIssueView},
  computed: mapGetters({ user: "getUser" }),

}
</script>

<style scoped>

</style>