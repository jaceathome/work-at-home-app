<template>
  <div>
    <manager-base v-if="getUser.role === 'manager-role'">
      <iframe
          :src="`https://drive.google.com/viewerng/viewer?embedded=true&url=${this.$route.params.path}`"
          width="100%"
          height="100%"
          style="height: 90vh; border: 0"
          frameborder="0"
      ></iframe>
    </manager-base>
    <employee-base v-if="getUser.role === 'employee-role'">
      <iframe
          :src="`https://drive.google.com/viewerng/viewer?embedded=true&url=${this.$route.params.path}`"
          width="100%"
          height="100%"
          style="height: 90vh; border: 0"
          frameborder="0"
      ></iframe>
    </employee-base>
<!--    <admin-base v-else-if="getUser.role === 'admin-role'"></admin-base>-->
  </div>
</template>

<script>
import ManagerBase from "@/components/ManagerBase";
import AdminBase from "@/components/AdminBase";
import {mapGetters} from "vuex";
import EmployeeBase from "@/components/EmployeeBase";
export default {
name: "DocViewer",
  components: {EmployeeBase, AdminBase, ManagerBase},
  computed: mapGetters(['getUser']),
}
</script>

<style scoped>

</style>