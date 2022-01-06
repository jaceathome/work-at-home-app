<template>
  <div>
    <manager-meeting-home v-if="getUser.role === 'manager-role'" />
    <employee-meeting-home v-if="getUser.role === 'employee-role'" />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import ManagerMeetingHome from "@/views/manager/ManagerMeetingHome";
import EmployeeMeetingHome from "@/views/employee/EmployeeMeetingHome";

export default {
  name: "VideoCall",
  components: { EmployeeMeetingHome, ManagerMeetingHome },
  computed: mapGetters(["getUser"]),
};
</script>

<style scoped>
</style>