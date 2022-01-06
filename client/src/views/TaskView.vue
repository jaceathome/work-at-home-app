<template>
  <div>
    <employee-task-view v-if="user.role === 'employee-role'" />
    <manager-task-view v-else-if="user.role === 'manager-role'"/>
  </div>
</template>

<script>
import EmployeeTaskView from "@/views/employee/EmployeeTaskView";
import {mapGetters} from "vuex";
import ManagerTaskView from "@/views/manager/ManagerTaskView";
export default {
  name: "TaskView",
  components: {ManagerTaskView, EmployeeTaskView},
  computed: mapGetters({user: 'getUser'})
}
</script>

<style scoped>

</style>