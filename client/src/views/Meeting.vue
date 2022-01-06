<template>
  <div>
    <manager-meeting v-if="getUser.role === 'manager-role'" />
    <employee-meeting v-if="getUser.role === 'employee-role'" />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import ManagerMeeting from "@/views/manager/ManagerMeeting";
import EmployeeMeeting from "@/views/employee/EmployeeMeeting";

export default {
  name: "VideoCall",
  components: { EmployeeMeeting, ManagerMeeting },
  computed: mapGetters(["getUser"]),
};
</script>
