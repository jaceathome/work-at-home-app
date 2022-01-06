<template>
  <employee-base id="call" class="mainBody">
    <div class="pa-5">
      <video-home />
    </div>
  </employee-base>
</template>

<script>
import "bulma/css/bulma.css";

import { mapActions, mapGetters } from "vuex";
import EmployeeBase from "@/components/EmployeeBase";
import VideoHome from "@/views/VideoHome";

export default {
  name: "EmployeeMeetingHome",
  components: { EmployeeBase, VideoHome },
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
