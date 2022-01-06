<template>
  <manager-base id="call" class="mainBody">
    <div class="pa-5">
      <video-home />
    </div>
  </manager-base>
</template>

<script>
import ManagerBase from "@/components/ManagerBase";
import { mapActions, mapGetters } from "vuex";
import MeetingComponent from "@/components/MeetingComponent.vue";
import VideoHome from "@/views/VideoHome";

export default {
  name: "ManagerMeetingHome",
  components: { ManagerBase, MeetingComponent, VideoHome },
  data() {
    return {
      peers: {},
      peer: null,
      socket: null,
      started: false,
      ROOM_ID: "",
      myId: "",
      room: "",
    };
  },
  computed: mapGetters(["getUser"]),
};
</script>
