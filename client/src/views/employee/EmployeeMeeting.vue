<template>
  <employee-base id="call" class="mainBody">
    <div class="pa-5">
      <meeting-component />
    </div>
  </employee-base>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import EmployeeBase from "@/components/EmployeeBase";
import VideoHome from "@/views/VideoHome";
import MeetingComponent from "@/components/MeetingComponent.vue";

export default {
  name: "EmployeeMeeting",
  components: { EmployeeBase, VideoHome, MeetingComponent },
  data() {
    return {
      peers: {},
      peer: null,
      socket: null,
      started: false,
      myId: "",
      room: "",
    };
  },
  computed: mapGetters(["getUser"]),
};
</script>
