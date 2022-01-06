<template>
  <manager-base>
    <v-divider class="my-5"/>
    <h2 class="text-center mb-5">ASK FOR ASSISTANCE</h2>

    <v-card style="height: 80vh" class="rounded-t-xl d-flex align-center" color="indigo lighten-5">
      <v-card-text>
        <v-card flat color="transparent" class="rounded-lg mx-5" style="height: 70vh">
          <v-card-text style="height: 100%; overflow-y: scroll" id="messagePanel">

            <v-alert
                v-if="messages.length === 0"
                type="info"
                prominent
                dense
                outlined
            >
              No message yet!
            </v-alert>
            <div class="d-flex my-4" v-for="message in messages"
                 :class="message.from === getUser.id ? 'justify-end' : ''">
              <v-card class="rounded-lg" min-width="300px" width="50%" flat>
                <v-card-text v-if="message.from !== getUser.id">
                  <h5>Assistance Team</h5>
                  <p class="mb-0 pb-0 text-wrap" v-text="message.message"></p>
                </v-card-text>
                <v-card-text v-else>
                  <h5>You</h5>
                  <p class="mb-0 pb-0 text-wrap" v-text="message.message"></p>
                </v-card-text>
              </v-card>
            </div>
          </v-card-text>
        </v-card>
      </v-card-text>
    </v-card>
    <v-card class=" my-5 d-flex align-center" color="indigo lighten-5">
      <v-card-text class="d-flex flex-column align-stretch justify-start">
        <v-textarea
            :loading="getLoading"
            v-model="content"
            persistent-placeholder
            label="WRITE MESSAGE"
            rows="3"
            placeholder="Hello, please I need help on this matter..."
            flat/>
        <v-btn @click="send" :loading="getLoading" style="max-width: 300px" color="success">send
          <v-icon right>uil-message</v-icon>
        </v-btn>
      </v-card-text>
    </v-card>
  </manager-base>
</template>

<script>
import firestore__ from "@/database/firestore";
import {mapActions, mapGetters} from "vuex";
import db from "@/database";
import ManagerBase from "@/components/ManagerBase";

export default {
  name: "ManagerAssistance",
  components: {ManagerBase},
  computed: mapGetters(['getUser', 'getLoading']),
  data() {
    return {
      content: '',
      messages: []
    }
  },
  methods: {
    ...mapActions(['setLoading']),
    send() {
      if (this.content.trim() === '') return;
      this.setLoading()
      const doc = {
        message: this.content,
        from: this.getUser.id,
        to: 'assistance',
        createdAt: db.firestore.FieldValue.serverTimestamp()
      }
      firestore__.collection('assistance')
          .add(doc)
          .then(() => {
            firestore__.collection('assistance_user')
                .doc(this.getUser.id)
                .set({
                  last_message: this.content,
                  createdAt: db.firestore.FieldValue.serverTimestamp(),
                  from: this.getUser.id
                })
                .then(() => {
                  this.setLoading()
                  this.content = ''
                  const objDiv = document.getElementById("messagePanel");
                  objDiv.scrollTop = objDiv.scrollHeight;
                })
          })
    },
    fetch() {
      firestore__.collection('assistance')
          .orderBy('createdAt')
          .onSnapshot(snapshot => {
            const messages = snapshot.docs.map(e => e.data())
            this.messages = messages.filter(e => e.from === this.getUser.id || e.to === this.getUser.id)
          })
    }
  },
  created() {
    this.fetch()
  }
}
</script>

<style scoped>

</style>