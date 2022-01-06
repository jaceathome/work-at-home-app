<template>
  <div v-if="issue.id">
    <div class="my-4">
      <v-alert prominent :type="issue.solved ? 'success' : 'error'">
        <v-row align="center">
          <v-col class="grow">
            <div>{{ issue.title }}</div>
            <div>
              {{ issue.description }}
            </div>
            <v-divider class="mb-2" />
            <v-chip
              v-for="(file, i) in issue.files"
              :key="i"
              small
              class="mr-1"
              color="primary"
              text-color="white"
              ><span
                @click="viewFileIssue(issue.id, file)"
                class="text-decoration-underline"
                >{{ file }}</span
              >
              <v-icon @click="downloadFileIssue(issue.id, file)" small right
                >uil-import</v-icon
              ></v-chip
            >
          </v-col>
          <v-col class="shrink">
            <div class="d-flex">
              <v-btn
                v-if="user.role === 'employee-role'"
                @click="updateIssue(issue)"
                class="ml-2"
                :color="issue.solved ? '' : 'success'"
                >{{ issue.solved ? "open" : "Solved" }}</v-btn
              >
            </div>
          </v-col>
        </v-row>
      </v-alert>
    </div>
    <v-divider></v-divider>
    <div class="my-3">Replies</div>

    <div>
      <v-alert
        v-for="comment in comments"
        text
        dense
        color="primary"
        border="left"
      >
        <div class="d-flex align-center">
          <v-avatar class="mr-5">
            <img :src="comment.avatar" alt="img" />
          </v-avatar>
          <div style="width: 100%">
            <div class="font-weight-bold">{{ comment.name }}</div>
            <div style="font-size: 0.89rem">
              {{ comment.comment }}
            </div>
            <v-divider class="mb-2" />
            <v-chip
              v-for="(file, i) in comment.files"
              :key="i"
              small
              class="mr-1"
              color="primary"
              text-color="white"
              ><span
                @click="viewFile(comment.id, file)"
                class="text-decoration-underline"
                >{{ file }}</span
              >
              <v-icon @click="downloadFile(comment.id, file)" small right
                >uil-import</v-icon
              ></v-chip
            >
          </div>
        </div>
      </v-alert>
      <v-divider></v-divider>
      <div class="mt-2">
        <v-file-input
          :loading="loading"
          v-model="files"
          color="primary"
          counter
          label="Share Documents"
          multiple
          placeholder="Select your files"
          prepend-icon="mdi-paperclip"
          :show-size="1000"
          class="mb-3"
        >
          <template v-slot:selection="{ index, text }">
            <v-chip color="primary" v-if="index < 2" dark label small>
              {{ text }}
            </v-chip>
            <span
              v-else-if="index === 2"
              class="text-overline grey--text text--darken-3 mx-2"
            >
              +{{ files.length - 2 }} File(s)
            </span>
          </template>
        </v-file-input>
        <v-textarea
          :disabled="issue.solved"
          v-model="comment"
          rows="2"
          label="Add comment..."
          :loading="loading"
        />
        <v-btn
          :disabled="issue.solved"
          @click="addComment"
          :loading="loading"
          color="success"
          >send</v-btn
        >
      </div>
    </div>
  </div>
</template>

<script>
import firestore__ from "@/database/firestore";
import { mapActions, mapGetters } from "vuex";
import db from "@/database";
import { alertError } from "@/tools/swal";

export default {
  name: "ComponentIssueView",
  data: () => ({
    issue: {},
    comment: "",
    files: [],
    comments: [],
  }),
  created() {
    this.setAllUsers();
  },
  computed: mapGetters({
    loading: "getLoading",
    user: "getUser",
    users: "allUsers",
  }),
  watch: {
    users: {
      handler: function (val) {
        console.log(val);
        firestore__
          .collection("issues")
          .doc(this.$route.params.id)
          .onSnapshot((snapshot) => {
            this.issue = { id: snapshot.id, ...snapshot.data() };
            this.fetchComments();
          });
      },
      immediate: true,
    },
  },
  methods: {
    ...mapActions(["setLoading", "setAllUsers"]),
    //Files posted by user
    viewFile(folderName, fileName) {
      const ext = fileName.split(".").pop().toLowerCase();
      console.log(ext);
      if (ext === "jpg" || ext === "png" || ext === "jpeg") {
        this.downloadFile(folderName, fileName);
      } else {
        this.setLoading();
        const storageRef = db.storage().ref();
        storageRef
          .child(`issues/${folderName}/${fileName}`)
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
      }
    },
    //Files posted by user
    downloadFile(folderName, fileName) {
      this.setLoading();
      const storageRef = db.storage().ref();
      storageRef
        .child(`comments/${folderName}/${fileName}`)
        .getDownloadURL()
        .then((url) => {
          this.setLoading();
          window.open(url, "_blank");
        });
    },
    //File under comment section
    viewFileIssue(folderName, fileName) {
      const ext = fileName.split(".").pop().toLowerCase();
      console.log(ext);
      if (ext === "jpg" || ext === "png" || ext === "jpeg") {
        this.downloadFileIssue(folderName, fileName);
      } else {
        this.setLoading();
        const storageRef = db.storage().ref();
        storageRef
          .child(`issues/${folderName}/${fileName}`)
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
      }
    },
    //File under comment section
    downloadFileIssue(folderName, fileName) {
      this.setLoading();
      const storageRef = db.storage().ref();
      storageRef
        .child(`issues/${folderName}/${fileName}`)
        .getDownloadURL()
        .then((url) => {
          this.setLoading();
          window.open(url, "_blank");
        });
    },
    fetchComments() {
      firestore__
        .collection("issue_comments")
        .where("issue_id", "==", this.$route.params.id)
        .orderBy("createdAt")
        .onSnapshot((snapshot) => {
          const users = [...this.users, this.user];
          this.comments = snapshot.docs.map((e) => ({
            id: e.id,
            ...e.data(),
            name: users.find((u) => u.id === e.get("from")).name,
            avatar: users.find((u) => u.id === e.get("from")).avatar,
          }));
        });
    },
    updateIssue(item) {
      firestore__
        .collection("issues")
        .doc(item.id)
        .update({ solved: !item.solved });
    },
    addComment() {
      if (!this.comment) return;

      this.setLoading(true);

      const files = this.files;
      const namedFiles = files.map((file) => file.name);
      firestore__
        .collection("issue_comments")
        .add({
          issue_id: this.$route.params.id,
          from: this.user.id,
          comment: this.comment,
          createdAt: db.firestore.FieldValue.serverTimestamp(),
          files: namedFiles,
        })
        .then(async (res) => {
          for (let i = 0; i < files.length; i++) {
            const file = files[i];
            await db
              .storage()
              .ref()
              .child(`comments/${res.id}/${file.name}`)
              .put(file)
              .catch((err) => alertError("Something went wrong!", err.message));
          }

          this.comment = "";
          this.files = [];
          this.setLoading(false);
        })
        .catch((err) => {
          this.setLoading(false);
          alertError("Error", err.message);
        });
    },
  },
};
</script>

<style scoped>
</style>