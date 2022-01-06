<template>
  <employee-base> Hello </employee-base>
</template>

<script>
import EmployeeBase from "@/components/EmployeeBase";
export default {
  name: "EmployeeHome",
  components: { EmployeeBase },
  created() {
    this.$router.push({ name: "tasks" });
  },
};
</script>

<style scoped>
</style>