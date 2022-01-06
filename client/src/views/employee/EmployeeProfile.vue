<template>
  <employee-base>
    <component-profile/>
  </employee-base>
</template>

<script>
import AdminBase from "@/components/AdminBase";
import ComponentProfile from "@/components/ComponentProfile";
import EmployeeBase from "@/components/EmployeeBase";
export default {
  name: "EmployeeProfile",
  components: {EmployeeBase, ComponentProfile, AdminBase}
}
</script>

<style scoped>

</style>