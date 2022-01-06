<template>
  <div>
    <employee-assistance v-if="getUser.role === 'employee-role'"/>
    <manager-assistance v-if="getUser.role === 'manager-role'"/>
  </div>
</template>

<script>
import {mapGetters} from "vuex";
import EmployeeAssistance from "@/views/employee/EmployeeAssistance";
import ManagerAssistance from "@/views/manager/ManagerAssistance";

export default {
  name: "Assistance",
  components: {ManagerAssistance, EmployeeAssistance},
  computed: mapGetters(['getUser'])

}
</script>

<style scoped>

</style>