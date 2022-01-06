<template>
  <manager-base>
   <component-issue />
  </manager-base>
</template>

<script>
import EmployeeBase from "@/components/EmployeeBase";
import ComponentIssue from "@/components/ComponentIssue";
import ManagerBase from "@/components/ManagerBase";
export default {
  name: "ManagerIssue",
  components: {ManagerBase, ComponentIssue, EmployeeBase}
}
</script>

<style scoped>

</style>