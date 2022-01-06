<template>
  <div>
    <ManagerTasks v-if="user.role === 'manager-role'"></ManagerTasks>
    <employee-task v-else-if="user.role === 'employee-role'"/>
    <div v-else>Not Found</div>
  </div>
</template>

<script>
import {mapGetters} from "vuex";
import ManagerTasks from "@/views/manager/ManagerTasks";
import EmployeeTask from "@/views/employee/EmployeeTask";

export default  {
  name: "Tasks",
  components: {EmployeeTask, ManagerTasks},
  computed: mapGetters({user: "getUser"}),
}
</script>