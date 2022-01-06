<template>
  <technician-base>
   <component-issue />
  </technician-base>
</template>

<script>
import EmployeeBase from "@/components/EmployeeBase";
import ComponentIssue from "@/components/ComponentIssue";
import ManagerBase from "@/components/ManagerBase";
import TechnicianBase from "@/components/TechnicianBase";
export default {
  name: "TechnicianIssue",
  components: {TechnicianBase, ManagerBase, ComponentIssue, EmployeeBase}
}
</script>

<style scoped>

</style>