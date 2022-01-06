<template>
  <admin-base>
    <component-profile-view/>
  </admin-base>
</template>

<script>
import AdminBase from "@/components/AdminBase";
import ComponentProfileView from "@/components/ComponentProfileView";
export default {
name: "AdminProfileView",
  components: {ComponentProfileView, AdminBase}
}
</script>

<style scoped>

</style>