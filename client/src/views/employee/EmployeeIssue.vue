<template>
  <employee-base>
   <component-issue />
  </employee-base>
</template>

<script>
import EmployeeBase from "@/components/EmployeeBase";
import ComponentIssue from "@/components/ComponentIssue";
export default {
  name: "EmployeeIssue",
  components: {ComponentIssue, EmployeeBase}
}
</script>

<style scoped>

</style>