<template>
  <manager-base>
    <component-issue-view />
  </manager-base>
</template>

<script>
import EmployeeBase from "@/components/EmployeeBase";
import ComponentIssueView from "@/components/ComponentIssueView";
import ManagerBase from "@/components/ManagerBase";
export default {
name: "ManagerIssueView",
  components: {ManagerBase, ComponentIssueView, EmployeeBase}
}
</script>

<style scoped>

</style>