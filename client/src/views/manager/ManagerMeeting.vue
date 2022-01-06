<template>
  <manager-base id="call" class="mainBody">
    <div class="pa-5">
      <meeting-component />
    </div>
  </manager-base>
</template>

<script>
import ManagerBase from "@/components/ManagerBase";
import { mapActions, mapGetters } from "vuex";
import MeetingComponent from "@/components/MeetingComponent.vue";
export default {
  name: "ManagerMeeting",
  components: { ManagerBase, MeetingComponent },
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

<style scoped>
.mainBody {
  background-color: black;
  min-height: 100vh;
  color: #fff;
}
</style>

<style>
#call #video-grid {
  display: flex;
  flex-wrap: wrap;
}

#call video {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border: 4px solid #fff;
  border-radius: 10px;
  max-width: 430px;
}

video {
  margin: 1rem;
}
</style>