<template>
  <employee-base>
    <component-issue-view />
  </employee-base>
</template>

<script>
import EmployeeBase from "@/components/EmployeeBase";
import ComponentIssueView from "@/components/ComponentIssueView";
export default {
name: "EmployeeIssueView",
  components: {ComponentIssueView, EmployeeBase}
}
</script>

<style scoped>

</style>