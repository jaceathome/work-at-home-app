<template>
    <manager-base>
      <component-profile/>
    </manager-base>
</template>

<script>
import ManagerBase from "../../components/ManagerBase.vue";
import ComponentProfile from "@/components/ComponentProfile";

export default {
  components: {ComponentProfile, ManagerBase},
  name: "ManagerProfile",

};
</script>