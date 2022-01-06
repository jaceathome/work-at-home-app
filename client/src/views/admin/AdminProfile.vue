<template>
  <admin-base>
    <component-profile/>
  </admin-base>
</template>

<script>
import AdminBase from "@/components/AdminBase";
import ComponentProfile from "@/components/ComponentProfile";
export default {
  name: "AdminProfile",
  components: {ComponentProfile, AdminBase}
}
</script>

<style scoped>

</style>