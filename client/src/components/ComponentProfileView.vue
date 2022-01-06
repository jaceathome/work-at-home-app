<template>
  <v-row v-if="user.id">
    <v-col cols="12" md="4">
      <div class="d-flex flex-column pl-md-4 align-center align-md-start">
        <v-avatar color="success" size="228">
          <img v-if="user.avatar" :src="user.avatar" alt="Profile"/>
          <img v-else :src="'https://joeschmoe.io/api/v1/'+user.name" alt="Profile"/>
        </v-avatar>
        <div  v-if="!user.avatar" class="d-flex flex-column mt-5 align-center align-md-start">No Avatar Yet</div>
        <div class="d-flex flex-column mt-8">
          <div style="font-size: 1.5rem">{{ user.name }}</div>
          <div style="font-size: 0.89rem">{{ user.email }}</div>
        </div>
        <div class="mt-5 success--text" style="font-size: 1.1rem">
          <strong>ROLE</strong>
        </div>
        <div style="font-size: 0.8rem">{{ user.role.toUpperCase() }}</div>
        <div class="mt-5 success--text" style="font-size: 1.1rem">
          <strong>EMPLOYEE ID</strong>
          <v-icon color="success" small right>uil-postcard</v-icon>
        </div>
        <div style="font-size: 0.8rem">{{ user.employee_id }}</div>
        <div class="mt-5 success--text" style="font-size: 1.1rem">
          <strong>DEPARTMENT</strong>
        </div>
        <div style="font-size: 0.8rem">{{ user.department }}</div>
        <div class="mt-5 success--text" style="font-size: 1.1rem">
          <strong>WORK POSITION</strong>
          <v-icon color="success" small right>uil-briefcase</v-icon>
        </div>
        <div style="font-size: 0.8rem">{{ user.work }}</div>
        <div class="mt-5 success--text" style="font-size: 1.1rem">
          <strong>LOCATION</strong>
          <v-icon color="success" small>uil-map-marker-info</v-icon>
        </div>
        <div style="font-size: 0.8rem">{{ user.address }}</div>
        <div class="mt-5 success--text" style="font-size: 1.1rem">
          <strong>CONTACT #</strong>
        </div>
        <div style="font-size: 0.8rem">{{ user.contact_number }}</div>
      </div>
      <v-divider class="my-6"></v-divider>
    </v-col>
    <!-- <v-divider vertical></v-divider> -->
    <v-col cols="12" md="8" class="">
      <div class="pl-md-4">
        <div class="success--text" style="font-size: 1.1rem">
          <strong>ABOUT ME</strong>
        </div>
        <div class="mt-2" style="font-size: 0.8rem">
          {{ user.description || "No description yet." }}
        </div>
      </div>
    </v-col>
  </v-row>
</template>

<script>
import firestore__ from "@/database/firestore";
import {mapGetters} from "vuex";

export default {
  name: "ComponentProfileView",
  data: () => ({
    user: {},
  }),
  computed: mapGetters({roles: 'getRoles', work_positions:'getWorkPositions', departments: 'getDepartments'}),
  created() {
    console.log("oaky")
    firestore__.collection('users')
    .doc(this.$route.params.id)
    .get()
    .then(doc => {
      const res = doc.data();
      res.role = this.roles.find(role => role.id === res.role_id).title
      res.department = this.departments.find(department => department.id === res.department_id).title
      res.work_position = this.work_positions.find(work_position => work_position.id === res.work_position_id).title
      this.user = {id: doc.id, ...res}
      console.log(res)
    })
  }
}
</script>

<style scoped>

</style>