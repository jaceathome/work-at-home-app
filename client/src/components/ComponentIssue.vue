<template>
  <div>
    <div v-if="user.role === 'employee-role'" class="d-flex justify-end">
      <v-btn @click="dialog = true" outlined color="error">
        <v-icon left>uil-exclamation-octagon</v-icon>
        New Issue
      </v-btn>
    </div>
    <v-alert
      v-if="issues.length === 0"
      dense
      outlined
      type="error"
      class="my-4"
    >
      There were no issues reported yet.
    </v-alert>
    <div class="my-4">
      <v-alert
        v-for="issue in issues"
        prominent
        :type="issue.solved ? 'success' : 'error'"
      >
        <v-row align="center">
          <v-col class="grow">
            <div v-if="['manager-role', 'technician-role'].includes(user.role)">
              From: <strong>{{ issue.name }}</strong>
            </div>
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
                @click="viewFile(issue.id, file)"
                class="text-decoration-underline"
                >{{ file }}</span
              >
              <v-icon @click="downloadFile(issue.id, file)" small right
                >uil-import</v-icon
              ></v-chip
            >
          </v-col>
          <v-col class="shrink">
            <div class="d-flex">
              <v-btn :to="{ name: 'issue_view', params: { id: issue.id } }"
                >View Issue</v-btn
              >
              <v-btn
                v-if="user.role === 'employee-role'"
                @click="updateIssue(issue)"
                class="ml-2"
                :color="issue.solved ? '' : 'success'"
              >
                {{ issue.solved ? "open" : "Solved" }}
              </v-btn>
              <v-btn
                v-if="user.role === 'employee-role'"
                @click="deleteIssue(issue)"
                icon
                color="white"
              >
                <v-icon>uil-trash</v-icon>
              </v-btn>
            </div>
          </v-col>
        </v-row>
      </v-alert>
    </div>
    <v-dialog v-model="dialog" max-width="600px" persistent="">
      <v-card>
        <v-card-title>
          <span class="text-h5">New Issue</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  v-model="editedItem.title"
                  label="Issue Title"
                  hint="required"
                  persistent-hint
                />
                <v-textarea
                  v-model="editedItem.description"
                  label="Issue Description"
                  hint="required"
                  persistent-hint
                />
                <v-file-input
                  :loading="loading"
                  v-model="editedItem.files"
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
                      +{{ editedItem.files.length - 2 }} File(s)
                    </span>
                  </template>
                </v-file-input>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialog = false">
            Close
          </v-btn>
          <v-btn
            color="blue darken-1"
            text
            @click="saveIssue"
            :loading="loading"
          >
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import db from "@/database";
import firestore__ from "@/database/firestore";
import { mapActions, mapGetters } from "vuex";
import {
  alertConfirmWarning,
  alertError,
  alertSuccess,
  alertWarning,
} from "@/tools/swal";

export default {
  name: "ComponentIssue",
  data() {
    return {
      dialog: false,
      editedItem: {
        title: "",
        description: "",
        user_id: "",
        solved: false,
        files: [],
      },
      defaultItem: {
        title: "",
        description: "",
        solved: false,
        files: [],
      },
      issues: [],
    };
  },
  watch: {
    allUsers: {
      handler: function (val) {
        if (this.user.role === "manager-role") {
          firestore__
            .collection("issues")
            .orderBy("solved")
            .onSnapshot((snapshot) => {
              const myEmployees = val
                .filter((e) => e.managerId === this.user.id)
                .map((e) => e.id);
              this.issues = snapshot.docs
                .filter((e) => myEmployees.includes(e.get("user_id")))
                .map((e) => ({
                  id: e.id,
                  ...e.data(),
                  name: this.allUsers.find((u) => u.id === e.get("user_id"))
                    ?.name,
                }));
              console.log(this.issues);
            });
        } else {
          firestore__
            .collection("issues")
            .orderBy("solved")
            .onSnapshot((snapshot) => {
              this.issues = snapshot.docs.map((e) => ({
                id: e.id,
                ...e.data(),
                name: this.allUsers.find((u) => u.id === e.get("user_id"))
                  ?.name,
              }));
            });
        }
      },
    },
  },
  created() {
    if (this.user.role === "employee-role") {
      firestore__
        .collection("issues")
        .where("user_id", "==", this.user.id)
        .orderBy("solved")
        .onSnapshot((snapshot) => {
          this.issues = snapshot.docs.map((e) => ({ id: e.id, ...e.data() }));
        });
    } else {
      this.setAllUsers();
    }
  },
  computed: mapGetters({
    user: "getUser",
    loading: "getLoading",
    allUsers: "allUsers",
  }),
  methods: {
    ...mapActions(["setLoading", "setAllUsers"]),
    viewIssue(item) {},
    updateIssue(item) {
      firestore__
        .collection("issues")
        .doc(item.id)
        .update({ solved: !item.solved });
    },
    viewFile(folderName, fileName) {
      //check if file name is image
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
    downloadFile(folderName, fileName) {
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
    deleteIssue(item) {
      alertConfirmWarning("Delete", "Are you sure?", () => {
        firestore__
          .collection("issues")
          .doc(item.id)
          .delete()
          .then(() => alertSuccess("Deleted"));
        firestore__
          .collection("issue_comments")
          .where("issue_id", "==", item.id)
          .get()
          .then((res) => {
            res.docs.forEach((doc) => {
              firestore__.collection("issue_comments").doc(doc.id).delete();
            });
          });
      });
    },
    saveIssue() {
      if (!this.editedItem.description || !this.editedItem.title) {
        alertWarning("Invalid Data", "Please fill out the required fields.");
        return;
      }

      this.setLoading(true);
      this.editedItem.user_id = this.user.id;

      const files = this.editedItem.files;
      const namedFiles = files.map((file) => file.name);
      const docRef = { ...this.editedItem, files: namedFiles };

      firestore__
        .collection("issues")
        .add(docRef)
        .then(async (res) => {
          for (let i = 0; i < files.length; i++) {
            const file = files[i];
            await db
              .storage()
              .ref()
              .child(`issues/${res.id}/${file.name}`)
              .put(file)
              .catch((err) => alertError("Something went wrong!", err.message));
          }

          Object.assign(this.editedItem, this.defaultItem);
          this.dialog = false;
          this.setLoading(false);

          alertSuccess("Success!", "New Issue has been created.");
        })
        .catch((err) => {
          alertError("Error!", err.message);
          this.dialog = false;
          this.setLoading(false);
        });
    },
  },
};
</script>

<style scoped>
</style>