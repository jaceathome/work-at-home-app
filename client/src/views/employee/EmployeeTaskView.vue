<template>
  <employee-base>
    <v-switch
      v-model="userTask.isDone"
      inset
      :label="userTask.isDone ? 'Done' : 'Not Done'"
    ></v-switch>
    <p v-if="userTask.isDone">I am <b class="primary--text">done</b>!</p>
    <p v-else>I am <b class="error--text">not yet done</b>.</p>
    <v-card>
      <v-card-text>
        <h2 class="mt-4">{{ task.title }}</h2>
        <div class="grey--text">
          From {{ readableDate(task.from) }} To
          {{ readableDatetime(task.to, task.end) }}
        </div>
        <p class="blue-grey--text my-4" v-text="task.description"></p>
      </v-card-text>
    </v-card>
    <v-card class="my-5">
      <v-card-text>
        <div>
          <h4>Attached Files</h4>
          <div class="my-2">
            <v-chip
              v-for="file in task.files"
              color="primary"
              @click="viewFile(file)"
              class="ma-1"
            >
              {{ file }}
              <v-icon right small @click="downloadFile(file)"
                >uil-file-download</v-icon
              >
            </v-chip>
          </div>
        </div>
        <v-divider></v-divider>
        <div class="mt-5">
          <h4>Submitted Files</h4>
          <div class="my-2">
            <v-chip
              @click="viewMyFile(file)"
              v-for="file in userTask.uploaded_files"
              color="success"
              ripple
              class="ma-1"
            >
              {{ file }}
              <v-icon right small @click="downloadMyFile(file)"
                >uil-file-download</v-icon
              >
            </v-chip>
          </div>
        </div>
        <v-container v-if="task.isDone && !userTask.isDone" fluid>
          <v-row class="d-flex align-center">
            <v-col cols="12" sm="8">
              <v-file-input
                v-model="editedItem.files"
                color="success"
                counter
                label="SUBMIT NEW FILES"
                multiple
                placeholder="Select your files"
                prepend-icon="mdi-paperclip"
                :show-size="1000"
              >
                <template v-slot:selection="{ index, text }">
                  <v-chip color="primary" v-if="index < 2" dark label small>
                    {{ text }}
                  </v-chip>
                  <span
                    v-else-if="index === 2"
                    class="text-overline grey--text text--darken-3 mx-2"
                  >
                    +{{ editedItem.files.length - 2 }} File(s)
                  </span>
                </template>
              </v-file-input>
            </v-col>
            <v-col cols="12" sm="4">
              <v-btn
                color="success"
                @click="uploadFiles"
                :disabled="editedItem.files.length === 0"
              >
                <v-icon left>uil-file-upload</v-icon>
                Upload files
              </v-btn>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
    </v-card>

    <v-card>
      <v-card-text>
        <div class="d-flex flex-column justify-space-between">
          <div
            style="height: 500px; overflow-y: scroll"
            class="pa-4"
            id="messagePanel"
          >
            <v-alert
              v-show="messages.length === 0"
              outlined
              type="info"
              prominent
              class="ma-5"
              border="left"
            >
              No messages has been made yet!
            </v-alert>
            <div
              v-for="msg in messages"
              class="d-flex my-4"
              :class="user.id === msg.from ? 'justify-end' : 'justify-start'"
            >
              <v-card color="grey lighten-4" elevation="0" width="40%">
                <v-list-item>
                  <v-list-item-avatar v-if="user.id === msg.from">
                    <v-img
                      :src="users.find((u) => u.id === msg.from).avatar"
                    ></v-img>
                  </v-list-item-avatar>
                  <v-list-item-avatar v-else>
                    <v-img
                      :src="users.find((u) => u.id === task.created_by).avatar"
                    ></v-img>
                  </v-list-item-avatar>

                  <v-list-item-content v-if="user.id === msg.from">
                    <v-list-item-title v-text="'You'"></v-list-item-title>
                    <v-list-item-subtitle
                      v-html="msg.content"
                    ></v-list-item-subtitle>
                  </v-list-item-content>
                  <v-list-item-content v-else>
                    <v-list-item-title
                      v-text="users.find((u) => u.id === task.created_by).name"
                    ></v-list-item-title>
                    <v-list-item-subtitle
                      v-html="msg.content"
                    ></v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </v-card>
            </div>
          </div>
          <v-form ref="msgForm" class="mt-4">
            <v-textarea
              :loading="loading"
              rows="2"
              v-model="message.content"
              dense
              filled
              placeholder="WRITE MESSAGE"
            />
            <v-btn
              :disabled="message.content.trim() === ''"
              :loading="loading"
              color="success"
              @click="sendMessage"
              >send message
              <v-icon right>uil-message</v-icon>
            </v-btn>
          </v-form>
        </div>
      </v-card-text>
    </v-card>

    <v-divider class="mt-10 mb-5"></v-divider>

    <div class="d-flex justify-center">
      <v-card-title>FEEDBACK FROM MANAGER</v-card-title>
    </div>

    <v-alert
      color="dark"
      dark
      dense
      icon="uil-feedback"
      prominent
      v-for="feed in feedBacks"
    >
      <div class="d-flex justify-center">
        <v-rating
          color="yellow darken-3"
          background-color="white"
          half-increments
          readonly
          large
          :value="feed.rating"
        ></v-rating>
      </div>
      ({{ feed.file }})
      {{ feed.message }}
    </v-alert>
  </employee-base>
</template>

<script>
import EmployeeBase from "@/components/EmployeeBase";
import firestore__ from "@/database/firestore";
import moment from "moment";
import db from "@/database";
import { mapActions, mapGetters } from "vuex";
import { alertError, alertSuccessWithAuto } from "@/tools/swal";

export default {
  name: "EmployeeTaskView",
  components: { EmployeeBase },
  data: () => ({
    editedItem: {
      files: [],
    },
    message: {
      from: "",
      content: "",
      taskId: "",
      createdAt: "",
      to: "",
    },
    task: {},
    userTask: {},
    messages: [],
    feedBacks: [],
    myFeedBacks: [],
  }),
  computed: mapGetters({
    user: "getUser",
    loading: "getLoading",
    users: "allUsers",
  }),
  watch: {
    task(val) {
      this.fetchMessages(val);
    },
    "userTask.isDone": function (val) {
      firestore__
        .collection("tasks_users")
        .doc(this.userTask.id)
        .update({ isDone: val });
    },
  },
  methods: {
    ...mapActions(["setLoading", "setAllUsers"]),
    sendMessage() {
      this.message.to = this.task.created_by;
      this.message.createdAt = db.firestore.FieldValue.serverTimestamp();
      if (this.message.content.trim() !== "") {
        this.setLoading();
        firestore__
          .collection("messages")
          .add(this.message)
          .then(() => {
            this.message.content = "";
            this.setLoading();
            const objDiv = document.getElementById("messagePanel");
            objDiv.scrollTop = objDiv.scrollHeight;
          });
      }
    },
    setFeedBack() {
      firestore__
        .collection("feedback")
        .orderBy("createdAt", "desc")
        .onSnapshot((snapshot) => {
          const feedBacks = snapshot.docs.map((e) => e.data());
          this.feedBacks = feedBacks.filter((e) => e.to === this.user.id);
        });
    },
    fetchMessages(task) {
      const user = task.created_by;
      firestore__
        .collection("messages")
        .where("taskId", "==", this.message.taskId)
        .orderBy("createdAt")
        .onSnapshot((snapshot) => {
          const messages = snapshot.docs.map((snap) => snap.data());
          this.messages = messages.filter(
            (e) =>
              (e.from === user && e.to === this.user.id) ||
              (e.from === this.user.id && e.to === user)
          );
        });
    },
    readableDate(date) {
      return moment(date, "YYYY-MM-DD").format("LLLL");
    },
    readableDatetime(date, time) {
      return moment(`${date} ${time}`, "YYYY-MM-DD HH:mm").format("LLLL");
    },
    viewFile(fileName) {
      this.setLoading();
      const storageRef = db.storage().ref();
      storageRef
        .child(`tasks/${this.$route.params.id}/${fileName}`)
        .getDownloadURL()
        .then((url) => {
          this.setLoading();
          const path = encodeURIComponent(url);
          const routeData = this.$router.resolve({
            name: "viewer",
            params: { path: path },
          });
          window.open(routeData.href, "_blank");
        });
    },
    downloadFile(fileName) {
      this.setLoading();
      const storageRef = db.storage().ref();
      storageRef
        .child(`tasks/${this.$route.params.id}/${fileName}`)
        .getDownloadURL()
        .then((url) => {
          this.setLoading();
          window.open(url, "_blank");
        });
    },
    downloadMyFile(fileName) {
      const taskID = this.$route.params.id;
      this.setLoading();
      const storageRef = db.storage().ref();
      storageRef
        .child(`tasks/${taskID}/${this.user.id}/${fileName}`)
        .getDownloadURL()
        .then((url) => {
          this.setLoading();
          window.open(url, "_blank");
        });
    },
    async reloadUserTask() {
      const taskID = this.$route.params.id;
      await firestore__
        .collection("tasks_users")
        .where("task_id", "==", taskID)
        .where("assign_to", "==", this.user.id)
        .onSnapshot((snapshot) => {
          this.userTask = {
            ...snapshot.docs[0].data(),
            id: snapshot.docs[0].id,
          };
          console.log(this.userTask);
        });
    },
    viewMyFile(fileName) {
      const taskID = this.$route.params.id;
      this.setLoading();
      const storageRef = db.storage().ref();
      storageRef
        .child(`tasks/${taskID}/${this.user.id}/${fileName}`)
        .getDownloadURL()
        .then((url) => {
          this.setLoading();
          const path = encodeURIComponent(url);
          const routeData = this.$router.resolve({
            name: "viewer",
            params: { path: path },
          });
          window.open(routeData.href, "_blank");
        });
    },
    async uploadFiles() {
      const files = this.editedItem.files;
      const taskID = this.$route.params.id;
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        await db
          .storage()
          .ref()
          .child(`tasks/${taskID}/${this.user.id}/${file.name}`)
          .put(file)
          .catch((err) => alertError("Something went wrong!", err.message));
      }
      const fileNames = files.map((file) => file.name);
      const userFiles = this.userTask.uploaded_files
        ? this.userTask.uploaded_files
        : [];
      const myFiles = [...userFiles, ...fileNames];
      await firestore__
        .collection("tasks_users")
        .doc(this.userTask.id)
        .update({ uploaded_files: myFiles })
        .then((res) => console.log(res))
        .catch((err) => alertError("Something went wrong!", err.message));

      this.editedItem.files = [];
      await this.reloadUserTask();
      alertSuccessWithAuto("File uploaded successfully!");
    },
  },
  async created() {
    this.setFeedBack();
    this.setAllUsers();
    const taskID = this.$route.params.id;
    this.message.from = this.user.id;
    this.message.taskId = taskID;
    //fetch task
    await firestore__
      .collection("tasks")
      .doc(taskID)
      .onSnapshot((snapshot) => {
        this.task = snapshot.data();
      });
    await this.reloadUserTask();
  },
};
</script>

<style scoped>
</style>