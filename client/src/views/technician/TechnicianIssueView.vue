<template>
  <technician-base>
    <component-issue-view />
  </technician-base>
</template>

<script>
import EmployeeBase from "@/components/EmployeeBase";
import ComponentIssueView from "@/components/ComponentIssueView";
import ManagerBase from "@/components/ManagerBase";
import TechnicianBase from "@/components/TechnicianBase";
export default {
name: "TechnicianIssueView",
  components: {TechnicianBase, ManagerBase, ComponentIssueView, EmployeeBase}
}
</script>

<style scoped>

</style>