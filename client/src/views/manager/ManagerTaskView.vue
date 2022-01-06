<template>
  <manager-base>
    <v-switch
      v-model="task.isDone"
      inset
      :label="
        'Tick to ' +
        (task.isDone ? 'Close' : 'Open') +
        ' project for submission of files.'
      "
    ></v-switch>
    <p v-if="!task.isDone">
      This task is marked as <b class="primary--text">done</b>!
    </p>
    <p v-else>
      This task is marked as <b class="error--text">open</b> for submission.
    </p>
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
      </v-card-text>
    </v-card>
    <p class="grey--text">
      *Members are <b class="success--text">green</b> colored, when they're
      done.
    </p>
    <v-card>
      <v-card-text>
        <div class="d-flex align-start">
          <v-card
            v-show="selectedMember.id !== ''"
            flat
            height="500px"
            width="30%"
            min-width="240px"
          >
            <v-card-title class="text-center">Submitted Files</v-card-title>
            <v-card
              flat
              v-for="file in userTask.uploaded_files"
              class="my-2 d-flex align-center"
            >
              <v-card
                color="primary"
                dark
                width="160px"
                @click="viewMyFile(file)"
              >
                <v-list-item dense>
                  <v-list-item-content>
                    <v-list-item-subtitle>
                      <v-icon left>mdi-file</v-icon>
                      {{ file }}
                    </v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </v-card>
              <v-btn small icon class="ml-2">
                <v-icon @click="downloadMyFile(file)">mdi-download</v-icon>
              </v-btn>
              <v-btn small icon class="ml-2">
                <v-icon @click="openFeedback(file)">uil-feedback</v-icon>
              </v-btn>
            </v-card>
          </v-card>
          <v-card flat height="500px" class="mr-4" width="100%">
            <v-card-text>
              <div class="d-flex flex-column justify-space-between">
                <div
                  style="height: 320px; overflow-y: scroll"
                  class="pa-4"
                  id="messagePanel"
                >
                  <v-alert
                    v-show="this.messages.length === 0"
                    outlined
                    type="info"
                    prominent
                    dense
                    class="ma-5"
                    border="left"
                  >
                    No messages has been made yet!
                  </v-alert>
                  <div
                    v-for="msg in messages"
                    class="d-flex my-4"
                    :class="
                      user.id === msg.from ? 'justify-end' : 'justify-start'
                    "
                  >
                    <v-card
                      color="grey lighten-4"
                      elevation="0"
                      min-width="300px"
                      width="40%"
                      max-width="600px"
                    >
                      <v-list-item>
                        <v-list-item-avatar v-if="user.id === msg.from">
                          <v-img
                            :src="users.find((u) => u.id === msg.from).avatar"
                          ></v-img>
                        </v-list-item-avatar>
                        <v-list-item-avatar v-else>
                          <v-img
                            :src="
                              users.find((u) => u.id === selectedMember.id)
                                .avatar
                            "
                          ></v-img>
                        </v-list-item-avatar>

                        <v-list-item-content v-if="user.id === msg.from">
                          <v-list-item-title v-text="'You'"></v-list-item-title>
                          <p
                            class="grey--text my-0 py-0"
                            v-html="msg.content"
                          ></p>
                        </v-list-item-content>
                        <v-list-item-content v-else>
                          <v-list-item-title
                            v-text="selectedMember.name"
                          ></v-list-item-title>
                          <p
                            class="grey--text my-0 py-0"
                            v-html="msg.content"
                          ></p>
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
                    :disabled="selectedMember.id === ''"
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
          <v-spacer></v-spacer>
          <v-card
            flat
            width="30%"
            min-width="180px"
            class="d-flex flex-column pr-8"
            style="height: 500px; overflow-y: scroll"
          >
            <v-card-title class="text-center">Members of Task</v-card-title>
            <v-card
              @click="selectedMember = member"
              :color="member.isDone ? 'success' : 'primary'"
              dark
              class="my-2"
              v-for="member in taskMembers"
              max-width="470px"
            >
              <v-list-item dense>
                <v-list-item-avatar size="30">
                  <v-img :src="member.avatar"></v-img>
                </v-list-item-avatar>

                <v-list-item-content>
                  <v-list-item-title v-text="member.name"></v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-card>
          </v-card>
        </div>
      </v-card-text>
    </v-card>
    <v-dialog
      v-model="feedBackDialog"
      fullscreen
      scrollable
      persistent
      transition="dialog-bottom-transition"
    >
      <v-card>
        <v-toolbar dark color="primary">
          <v-btn icon dark @click="feedBackDialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>FEEDBACK AND RATING</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn dark @click="sendFeedback" icon>
            <v-icon>uil-message</v-icon>
          </v-btn>
        </v-toolbar>
        <v-card-text class="pa-5">
          <div class="d-flex justify-center my-4">
            <v-rating
              v-model="rating"
              color="yellow darken-3"
              background-color="grey darken-1"
              half-increments
              x-large
            ></v-rating>
          </div>
          <v-textarea
            outlined
            v-model="feedbackMessage"
            placeholder="WRITE REMARKS"
            persistent-placeholder
          />

          <v-divider></v-divider>
          <div class="d-flex justify-center">
            <v-card-title>FEEDBACK FROM YOU</v-card-title>
          </div>
          <v-alert
            v-for="feedback in myFeedBacks"
            border="top"
            colored-border
            type="info"
            elevation="2"
          >
            <div>
              <v-rating
                color="yellow darken-3"
                background-color="grey darken-1"
                half-increments
                readonly
                :value="feedback.rating"
              ></v-rating>
            </div>
            {{ feedback.message }}
          </v-alert>
        </v-card-text>
      </v-card>
    </v-dialog>
  </manager-base>
</template>

<script>
import EmployeeBase from "@/components/EmployeeBase";
import firestore__ from "@/database/firestore";
import moment from "moment";
import db from "@/database";
import { mapActions, mapGetters } from "vuex";
import ManagerBase from "@/components/ManagerBase";
import { alertSuccessWithAuto, alertWarning } from "@/tools/swal";

export default {
  name: "ManagerTaskView",
  components: { ManagerBase, EmployeeBase },
  data: () => ({
    editedItem: {
      files: [],
    },
    feedBackDialog: false,
    isDone: false,
    rating: 1,
    message: {
      from: "",
      content: "",
      taskId: "",
      createdAt: "",
    },
    selectedMember: { id: "" },
    task: { isDone: false },
    userTask: {},
    messages: [],
    taskMembers: [],
    feedBacks: [],
    myFeedBacks: [],
    feedbackMessage: "",
    selectedFileName: "",
  }),

  computed: mapGetters({
    user: "getUser",
    loading: "getLoading",
    users: "allUsers",
    task_users: "getTasksUsers",
  }),
  methods: {
    ...mapActions(["setLoading", "setAllUsers", "setTasksUsers"]),
    sendFeedback() {
      if (this.feedbackMessage.trim() === "")
        return alertWarning("Invalid", "Feedback message is required!");
      const data = {
        message: this.feedbackMessage,
        to: this.selectedMember.id,
        from: this.user.id,
        taskId: this.message.taskId,
        createdAt: db.firestore.FieldValue.serverTimestamp(),
        file: this.selectedFileName,
        rating: this.rating,
      };
      firestore__
        .collection("feedback")
        .add(data)
        .then(() => {
          alertSuccessWithAuto("Feedback has been sent!");
          this.feedbackMessage = "";
          this.rating = 1;
          this.feedBackDialog = false;
        });
    },
    sendMessage() {
      this.message.to = this.selectedMember.id;
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
    fetchMessages(user) {
      firestore__
        .collection("messages")
        .where("taskId", "==", this.message.taskId)
        .orderBy("createdAt")
        .onSnapshot((snapshot) => {
          const messages = snapshot.docs.map((snap) => snap.data());
          this.messages = messages.filter(
            (e) =>
              (e.from === user.id && e.to === this.user.id) ||
              (e.from === this.user.id && e.to === user.id)
          );
          const objDiv = document.getElementById("messagePanel");
          objDiv.scrollTop = objDiv.scrollHeight;
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
        .child(`tasks/${taskID}/${this.selectedMember.id}/${fileName}`)
        .getDownloadURL()
        .then((url) => {
          this.setLoading();
          window.open(url, "_blank");
        });
    },
    async reloadUserTask() {
      console.log(this.selectedMember, "Heyeyeye");
      const taskID = this.$route.params.id;
      await firestore__
        .collection("tasks_users")
        .where("task_id", "==", taskID)
        .where("assign_to", "==", this.selectedMember.id)
        .onSnapshot((snapshot) => {
          this.userTask = {
            ...snapshot.docs[0].data(),
            id: snapshot.docs[0].id,
          };
          console.log(this.userTask);
        });
    },
    openFeedback(fileName) {
      this.selectedFileName = fileName;
      this.feedBackDialog = true;
      this.myFeedBacks = this.feedBacks.filter((e) => e.file === fileName);
    },
    viewMyFile(fileName) {
      const taskID = this.$route.params.id;
      this.setLoading();
      const storageRef = db.storage().ref();
      storageRef
        .child(`tasks/${taskID}/${this.selectedMember.id}/${fileName}`)
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
    findUser(id) {
      return this.users.find((e) => e.id === id);
    },
    setFeedBack() {
      firestore__
        .collection("feedback")
        .orderBy("createdAt", "desc")
        .onSnapshot((snapshot) => {
          this.feedBacks = snapshot.docs.map((e) => e.data());
        });
    },
  },
  watch: {
    task_users(val) {
      const tasksUsers = val.filter((e) => e.task_id === this.$route.params.id);
      this.taskMembers = tasksUsers.map((e) => ({
        name: this.findUser(e.assign_to).name,
        avatar: this.findUser(e.assign_to).avatar,
        id: this.findUser(e.assign_to).id,
        isDone: e.isDone,
      }));
    },
    selectedMember(val) {
      this.reloadUserTask();
      this.fetchMessages(val);
    },
    users(val) {
      console.log(val, "Okat na");
      this.setTasksUsers();
    },
    "task.isDone": function (val) {
      const taskID = this.$route.params.id;
      firestore__.collection("tasks").doc(taskID).update({ isDone: val });
    },
  },
  async created() {
    const taskID = this.$route.params.id;
    this.message.from = this.user.id;
    this.message.taskId = taskID;
    //fetch task
    await firestore__
      .collection("tasks")
      .doc(taskID)
      .onSnapshot((snapshot) => {
        this.task = snapshot.data();
        console.log(this.task, "hahahah");
        this.setAllUsers();
        this.setFeedBack();
      });
    // await this.reloadUserTask()
  },
};
</script>

<style>
body {
  scroll-behavior: smooth;
}

#messagePanel {
  scroll-behavior: smooth;
}
</style>

