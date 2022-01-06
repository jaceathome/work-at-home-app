<template>
  <manager-base>
    <template>
      <v-row class="fill-height">
        <v-col>
          <v-sheet height="64">
            <v-toolbar flat>
              <v-btn
                outlined
                class="mr-4"
                color="grey darken-2"
                @click="setToday"
              >
                Today
              </v-btn>
              <v-btn fab text small color="grey darken-2" @click="prev">
                <v-icon small> mdi-chevron-left</v-icon>
              </v-btn>
              <v-btn fab text small color="grey darken-2" @click="next">
                <v-icon small> mdi-chevron-right</v-icon>
              </v-btn>
              <v-toolbar-title v-if="$refs.calendar">
                {{ $refs.calendar.title }}
              </v-toolbar-title>
              <v-spacer></v-spacer>
              <v-menu bottom right>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    outlined
                    color="grey darken-2"
                    v-bind="attrs"
                    v-on="on"
                  >
                    <span>{{ typeToLabel[type] }}</span>
                    <v-icon right> mdi-menu-down</v-icon>
                  </v-btn>
                </template>
                <v-list>
                  <v-list-item @click="type = 'day'">
                    <v-list-item-title>Day</v-list-item-title>
                  </v-list-item>
                  <v-list-item @click="type = 'week'">
                    <v-list-item-title>Week</v-list-item-title>
                  </v-list-item>
                  <v-list-item @click="type = 'month'">
                    <v-list-item-title>Month</v-list-item-title>
                  </v-list-item>
                  <v-list-item @click="type = '4day'">
                    <v-list-item-title>4 days</v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu>
            </v-toolbar>
          </v-sheet>
          <v-sheet height="600">
            <v-calendar
              ref="calendar"
              v-model="focus"
              color="primary"
              :events="events"
              :event-color="getEventColor"
              :type="type"
              @click:event="showEvent"
              @click:day="viewDay"
              @click:more="dateClicked"
              @change="updateRange"
              @click:date="dateClicked"
            >
            </v-calendar>
            <v-menu
              v-model="selectedOpen"
              :close-on-content-click="false"
              :activator="selectedElement"
              offset-x
            >
              <v-card
                color="grey lighten-4"
                min-width="350px"
                flat
                v-if="selectedEvent.task"
              >
                <v-toolbar :color="selectedEvent.color" dark>
                  <v-btn icon @click="editMode = true">
                    <v-icon>mdi-pencil</v-icon>
                  </v-btn>
                  <v-toolbar-title
                    v-html="selectedEvent.name"
                  ></v-toolbar-title>
                  <v-spacer></v-spacer>
                  <v-btn icon @click="deleteTask">
                    <v-icon color="error">uil-trash</v-icon>
                  </v-btn>
                </v-toolbar>
                <v-card-text>
                  <v-card-text
                    >{{
                      selectedEvent.task.description ||
                      "You did not specify any description"
                    }}
                  </v-card-text>
                  <v-divider></v-divider>
                  <div v-if="selectedEvent.task.files.length > 0">
                    <v-card-subtitle>Attached files</v-card-subtitle>
                    <v-card-text>
                      <v-chip
                        style="cursor: pointer"
                        ripple
                        dark
                        :color="selectedEvent.color"
                        class="ma-1"
                        v-for="file in selectedEvent.task.files"
                      >
                        <span @click="viewFile(selectedEvent.task.id, file)">
                          <v-icon left>uil-file</v-icon>
                          {{ file }}
                        </span>
                        <v-icon right @click="downloadFile(file)"
                          >uil-cloud-download</v-icon
                        >
                      </v-chip>
                    </v-card-text>
                  </div>
                </v-card-text>
                <v-card-actions>
                  <v-btn text color="secondary" @click="selectedOpen = false">
                    Cancel
                  </v-btn>
                  <v-btn text color="secondary" @click="openTask"> Open </v-btn>
                </v-card-actions>
              </v-card>
            </v-menu>
          </v-sheet>
        </v-col>
      </v-row>
    </template>
    <!--    Add Task-->
    <v-dialog
      v-model="taskCreateDialog"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
    >
      <v-form :disabled="loading" ref="taskForm">
        <v-card tile>
          <v-toolbar flat dark color="primary">
            <v-btn :loading="loading" icon dark @click="closeCreateTask">
              <v-icon>mdi-close</v-icon>
            </v-btn>
            <v-toolbar-title>Create Task</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-items>
              <v-btn :loading="loading" dark text @click="saveTask">
                Save
              </v-btn>
            </v-toolbar-items>
          </v-toolbar>
          <v-card-text>
            <v-card flat class="my-5">
              <v-container fluid>
                <v-row>
                  <v-col cols="12">
                    <v-divider class="my-2"></v-divider>
                    <div class="mb-3 grey--text">
                      Initial start on
                      {{
                        moment(`${this.editedItem.from}`, "YYYY-MM-DD").format(
                          "LLLL"
                        )
                      }}
                    </div>
                    <v-text-field
                      :min="today"
                      label="Start on"
                      type="date"
                      v-model="editedItem.from"
                      :loading="loading"
                      :rules="requiredRules"
                    />
                    <v-divider class="my-2"></v-divider>
                    <div class="mb-3 grey--text">
                      Due on
                      {{
                        moment(
                          `${focus} ${editedItem.end}`,
                          "YYYY-MM-DD HH:mm"
                        ).format("LLLL")
                      }}
                    </div>
                    <div class="d-flex">
                      <div class="mr-2">
                        <v-text-field
                          v-model="editedItem.end"
                          label="Up to"
                          type="time"
                          :loading="loading"
                          :rules="requiredRules"
                        />
                      </div>
                      <div class="flex-grow-1">
                        <v-text-field
                          :min="today"
                          label="Deadline"
                          type="date"
                          v-model="editedItem.to"
                          :loading="loading"
                          :rules="requiredRules"
                        />
                      </div>
                    </div>
                    <v-text-field
                      v-model="editedItem.title"
                      :rules="requiredRules"
                      :loading="loading"
                      label="Short Title"
                    />
                    <v-textarea
                      v-model="editedItem.description"
                      :loading="loading"
                      label="Task Description"
                      value="The Woodman set to work at once, and so sharp was his axe that the tree was soon chopped nearly through."
                    ></v-textarea>
                    <template>
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
                          <v-chip
                            color="primary"
                            v-if="index < 2"
                            dark
                            label
                            small
                          >
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
                    </template>
                    <v-divider></v-divider>
                  </v-col>
                  <v-col cols="12">
                    <v-data-table
                      :loading="loading"
                      v-model="editedItem.users"
                      :show-select="!loading"
                      :headers="headers"
                      :items="users"
                      sort-by="calories"
                      class="elevation-1"
                      :search="search"
                      height="400px"
                    >
                      <template v-slot:top>
                        <v-toolbar flat>
                          <v-toolbar-title>Employees</v-toolbar-title>
                          <v-divider class="mx-4" inset vertical></v-divider>
                          <v-toolbar-title
                            >Assign task to users</v-toolbar-title
                          >
                          <v-spacer></v-spacer>
                        </v-toolbar>
                      </template>
                      <template v-slot:item.status="{ item }">
                        <v-chip v-if="item.status" small color="success"
                          >active</v-chip
                        >
                        <v-chip v-else color="error" small>suspended</v-chip>
                      </template>
                      <template v-slot:item.avatar="{ item }">
                        <v-avatar size="35">
                          <!--            Default avatar change later-->
                          <img
                            :src="
                              item.avatar ||
                              'https://avatars0.githubusercontent.com/u/9064066?v=4&s=460'
                            "
                            alt="avatar"
                          />
                        </v-avatar>
                      </template>
                    </v-data-table>
                  </v-col>
                </v-row>
              </v-container>
            </v-card>
          </v-card-text>

          <div style="flex: 1 1 auto"></div>
        </v-card>
      </v-form>
    </v-dialog>

    <!--    Edit Task-->
    <v-dialog
      v-model="editMode"
      fullscreen
      hide-overlay
      persistent
      transition="dialog-bottom-transition"
    >
      <v-form :disabled="loading" ref="editTaskForm">
        <v-card tile>
          <v-toolbar flat dark color="primary">
            <v-btn :loading="loading" icon dark @click="closeEditModeTask">
              <v-icon>mdi-close</v-icon>
            </v-btn>
            <v-toolbar-title>Update Task</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-items>
              <v-btn :loading="loading" dark text @click="saveEditTask">
                Save
              </v-btn>
            </v-toolbar-items>
          </v-toolbar>
          <v-card-text>
            <v-card flat class="my-5">
              <v-container fluid>
                <v-row>
                  <v-col cols="12">
                    <v-divider class="my-2"></v-divider>
                    <div class="mb-3 grey--text">
                      Initial start on
                      {{
                        moment(`${editModeItem.from}`, "YYYY-MM-DD").format(
                          "LLLL"
                        )
                      }}
                    </div>
                    <v-text-field
                      :min="today"
                      label="Start on"
                      type="date"
                      v-model="editModeItem.from"
                      :loading="loading"
                      :rules="requiredRules"
                    />
                    <v-divider class="my-2"></v-divider>
                    <div class="mb-3 grey--text">
                      Due on
                      {{
                        moment(
                          `${focus} ${editModeItem.end}`,
                          "YYYY-MM-DD HH:mm"
                        ).format("LLLL")
                      }}
                    </div>
                    <div class="d-flex">
                      <div class="mr-2">
                        <v-text-field
                          v-model="editModeItem.end"
                          label="Up to"
                          type="time"
                          :loading="loading"
                          :rules="requiredRules"
                        />
                      </div>
                      <div class="flex-grow-1">
                        <v-text-field
                          :min="today"
                          label="Deadline"
                          type="date"
                          v-model="editModeItem.to"
                          :loading="loading"
                          :rules="requiredRules"
                        />
                      </div>
                    </div>
                    <v-text-field
                      v-model="editModeItem.title"
                      :rules="requiredRules"
                      :loading="loading"
                      label="Short Title"
                    />
                    <v-textarea
                      v-model="editModeItem.description"
                      :loading="loading"
                      label="Task Description"
                      value="The Woodman set to work at once, and so sharp was his axe that the tree was soon chopped nearly through."
                    ></v-textarea>
                    <template>
                      <div v-if="this.editModeItem.oldFiles.length > 0">
                        Attached Files
                        <v-flex class="my-2">
                          <v-chip
                            class="my-2 mr-2"
                            v-for="file in this.editModeItem.oldFiles"
                            color="primary"
                            close-icon="uil-cloud-times"
                            close
                            @click:close="removeFile(file, editModeItem.id)"
                          >
                            {{ file }}
                          </v-chip>
                        </v-flex>
                      </div>
                      <v-file-input
                        :loading="loading"
                        v-model="editModeItem.files"
                        color="primary"
                        counter
                        label="Share new documents"
                        multiple
                        placeholder="Select your files"
                        prepend-icon="mdi-paperclip"
                        :show-size="1000"
                        class="mb-3"
                      >
                        <template v-slot:selection="{ index, text }">
                          <v-chip
                            color="primary"
                            v-if="index < 2"
                            dark
                            label
                            small
                          >
                            {{ text }}
                          </v-chip>
                          <span
                            v-else-if="index === 2"
                            class="text-overline grey--text text--darken-3 mx-2"
                          >
                            +{{ editModeItem.files.length - 2 }} File(s)
                          </span>
                        </template>
                      </v-file-input>
                    </template>
                    <v-divider></v-divider>
                  </v-col>
                  <v-col cols="12">
                    <v-data-table
                      value="id"
                      item-key="id"
                      :loading="loading"
                      v-model="editModeItem.users"
                      :show-select="!loading"
                      :headers="headers"
                      :items="users"
                      class="elevation-1"
                      :search="search"
                    >
                      <template v-slot:top>
                        <v-toolbar flat>
                          <v-toolbar-title>Employees</v-toolbar-title>
                          <v-divider class="mx-4" inset vertical></v-divider>
                          <v-toolbar-title
                            >Assign or Remove users</v-toolbar-title
                          >
                          <v-spacer></v-spacer>
                        </v-toolbar>
                      </template>
                      <template v-slot:item.status="{ item }">
                        <v-chip v-if="item.status" small color="success"
                          >active</v-chip
                        >
                        <v-chip v-else color="error" small>suspended</v-chip>
                      </template>
                      <template v-slot:item.avatar="{ item }">
                        <v-avatar size="35">
                          <!--            Default avatar change later-->
                          <img
                            :src="
                              item.avatar ||
                              'https://avatars0.githubusercontent.com/u/9064066?v=4&s=460'
                            "
                            alt="avatar"
                          />
                        </v-avatar>
                      </template>

                      <template v-slot:expanded-item="{ headers, item }">
                        <td :colspan="headers.length" class="white">
                          <v-card flat>
                            <v-card-text>
                              <v-card-subtitle>
                                <h4>Submissions</h4>
                                <div class="my-2">
                                  <v-chip label class="ma-1" color="primary"
                                    >Test file</v-chip
                                  >
                                  <v-chip label class="ma-1" color="primary"
                                    >Test file</v-chip
                                  >
                                  <v-chip label class="ma-1" color="primary"
                                    >Test file</v-chip
                                  >
                                </div>
                              </v-card-subtitle>
                            </v-card-text>
                          </v-card>
                        </td>
                      </template>
                    </v-data-table>
                  </v-col>
                </v-row>
              </v-container>
            </v-card>
          </v-card-text>
          <div style="flex: 1 1 auto"></div>
        </v-card>
      </v-form>
    </v-dialog>
  </manager-base>
</template>

<script>
import ManagerBase from "@/components/ManagerBase";
import moment from "moment";
import { mapActions, mapGetters } from "vuex";
import { requiredRules } from "@/tools/rules";
import firestore__ from "@/database/firestore";
import {
  alertConfirmWarning,
  alertError,
  alertSuccessWithAuto,
  alertWarning,
} from "@/tools/swal";
import db from "../../database";

export default {
  name: "ManagerTasks",
  components: { ManagerBase },
  computed: mapGetters({
    usersAll: "getUsers",
    loading: "getLoading",
    user: "getUser",
    getTasks: "getTasks",
    task_users: "getTasksUsers",
    messages: "messages",
  }),
  data: () => ({
    editMode: false,
    requiredRules,
    today: "",
    saveRange: {
      start: null,
      end: null,
    },
    tasks: [],
    moment,
    taskCreateDialog: false,
    editedItem: {
      title: "",
      description: "",
      files: [],
      users: [],
      end: "00:01",
      from: "",
      to: "",
    },
    defaultItem: {
      title: "",
      description: "",
      files: [],
      users: [],
      from: "",
      end: "00:01",
      to: "",
    },
    headers: [
      { text: "", value: "avatar", filterable: false, sortable: false },
      { text: "Name", value: "name" },
      { text: "ID", value: "employee_id", width: "9rem" },
      { text: "Email", value: "email" },
      { text: "Role", value: "role" },
      { text: "Work", value: "work_position" },
      { text: "Department", value: "department" },
      { text: "Contact #", value: "contact_number" },
      { text: "Status", value: "status", filterable: false, sortable: false },
      { text: "", value: "data-table-expand" },
    ],
    focus: "",
    search: "",
    type: "month",
    typeToLabel: {
      month: "Month",
      week: "Week",
      day: "Day",
      "4day": "4 Days",
    },
    users: [],
    selectedEvent: {},
    selectedElement: null,
    selectedOpen: false,
    events: [],
    colors: [
      "blue",
      "indigo",
      "deep-purple",
      "cyan",
      "green",
      "orange",
      "grey darken-1",
    ],
    editModeItem: {
      title: "",
      description: "",
      files: [],
      users: [],
      oldFiles: [],
      oldUsers: [],
      end: "00:01",
      from: "",
      to: "",
      id: "",
    },
  }),
  watch: {
    editMode(val) {
      if (val) {
        const task = { ...this.selectedEvent.task };
        const taskUsers = this.task_users.filter(
          (_task) => _task.task_id === task.id
        );
        task.oldFiles = task.files;
        task.files = [];
        task.users = task.oldUsers = this.users.filter((user) =>
          taskUsers.some((taskUser) => taskUser.assign_to === user.id)
        );
        Object.assign(this.editModeItem, task);
      }
    },
    usersAll(users) {
      this.users = users.filter((e) => e.managerId === this.user.id);
    },
    focus(val) {
      this.editedItem.to = val;
    },
    getTasks(val) {
      this.tasks = val;
      this.updateRange(this.saveRange);
      this.$forceUpdate();
    },
    users(val) {},
  },
  async created() {
    this.today = moment().format("YYYY-MM-DD");
    this.setTasks();
    this.editedItem.from = moment().format("YYYY-MM-DD");
    this.setUsers();
    this.setTasksUsers();
    this.setMessages();
  },
  methods: {
    ...mapActions([
      "setUsers",
      "setLoading",
      "setTasks",
      "setTasksUsers",
      "setMessages",
    ]),
    openTask() {
      let routeData = this.$router.resolve({
        name: "task-view",
        params: { id: this.selectedEvent.task.id },
      });
      window.open(routeData.href, "_blank");
    },
    dateClicked({ date }) {
      this.focus = date;
      this.type = "day";
    },
    downloadFile(fileName) {
      const folderName = this.selectedEvent.task.id;
      this.setLoading();
      const storageRef = db.storage().ref();
      storageRef
        .child(`tasks/${folderName}/${fileName}`)
        .getDownloadURL()
        .then((url) => {
          this.setLoading();
          window.open(url, "_blank");
        });
    },
    async deleteTask() {
      // if(this.task_users.some(t => t.task_id === ))
      alertConfirmWarning("Confirm it first!", "Are you sure?", async () => {
        this.setLoading();
        const { id, files } = this.selectedEvent.task;
        for (let i = 0; i < files.length; i++) {
          const file = files[i];
          await db
            .storage()
            .ref()
            .child(`tasks/${id}/${file}`)
            .delete()
            .catch((err) => alertError("Something went wrong", err.message));
        }

        await firestore__
          .collection("tasks")
          .doc(id)
          .delete()
          .catch((err) => alertError("Something went wrong", err.message));

        const taskUsers = this.task_users.filter(
          (taskU) => taskU.task_id === id
        );
        for (let i = 0; i < taskUsers.length; i++) {
          const taskU = taskUsers[i];
          await firestore__
            .collection("tasks_users")
            .doc(taskU.id)
            .delete()
            .catch((err) => alertError("Something went wrong", err.message));
        }

        const messages = this.messages.filter((e) => e.taskId === id);
        for (let i = 0; i < messages.length; i++) {
          const message = messages[i];
          await firestore__
            .collection("messages")
            .doc(message.id)
            .delete()
            .catch((err) => alertError("Something went wrong", err.message));
        }

        alertSuccessWithAuto("Task has been deleted!");
        this.setLoading();
        this.setTasks();
      });
    },
    async removeFile(name, folderName) {
      alertConfirmWarning("Confirm it first!", "Are you sure?", async () => {
        this.setLoading();
        const path = `tasks/${folderName}/${name}`;
        await db
          .storage()
          .ref()
          .child(path)
          .delete()
          .then(async () => {
            const newOldFiles = this.editModeItem.oldFiles.filter(
              (item) => item !== name
            );
            await firestore__
              .collection("tasks")
              .doc(this.editModeItem.id)
              .update({ files: newOldFiles })
              .then(() => {
                alertSuccessWithAuto("File has been deleted!");
                this.editModeItem.oldFiles = newOldFiles;
                this.setTasks();
              })
              .catch((err) => alertError("Something went wrong", err.message));
          })
          .catch((err) => alertError("Something went wrong", err.message));
        this.setLoading();
      });
    },
    viewFile(folderName, fileName) {
      this.setLoading();
      const storageRef = db.storage().ref();
      storageRef
        .child(`tasks/${folderName}/${fileName}`)
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
    async saveEditTask() {
      if (!this.$refs.editTaskForm.validate()) return;
      this.setLoading();
      let {
        title,
        description,
        files,
        users,
        end,
        from,
        to,
        id,
        oldFiles,
        oldUsers,
      } = this.editModeItem;
      const namedFiles = files.map((file) => file.name);
      namedFiles.push(...oldFiles);
      const docRef = {
        title,
        description,
        files: namedFiles,
        end,
        from,
        to,
        created_by: this.user.id,
      };
      await firestore__
        .collection("tasks")
        .doc(id)
        .update(docRef)
        .then(async () => {
          for (let i = 0; i < files.length; i++) {
            const file = files[i];
            await db
              .storage()
              .ref()
              .child(`tasks/${id}/${file.name}`)
              .put(file)
              .catch((err) => alertError("Something went wrong!", err.message));
          }

          //delete users first
          const usersToDelete = oldUsers.filter(
            (oldUser) => !users.some((newUser) => newUser.id === oldUser.id)
          );
          for (let i = 0; i < usersToDelete.length; i++) {
            const userToDel = usersToDelete[i];
            const TasksUsersID = this.task_users.find(
              (taskUser) =>
                taskUser.assign_by === this.user.id &&
                taskUser.assign_to === userToDel.id
            ).id;
            await firestore__
              .collection("tasks_users")
              .doc(TasksUsersID)
              .delete()
              .catch((err) => alertError("Something went wrong!", err.message));
          }

          const usersToStore = users.filter(
            (newUser) => !oldUsers.some((oldUser) => newUser.id === oldUser.id)
          );
          for (let i = 0; i < usersToStore.length; i++) {
            const user = usersToStore[i];
            const taskUserDocRef = {
              assign_to: user.id,
              assign_by: this.user.id,
              task_id: id,
            };
            await firestore__
              .collection("tasks_users")
              .add(taskUserDocRef)
              .catch((err) => alertError("Something went wrong!", err.message));
          }
          alertSuccessWithAuto("Tasks has been updated successfully!");
          this.setTasks();
          this.closeEditModeTask();
        });
      this.setLoading();
    },
    async saveTask() {
      if (!this.$refs.taskForm.validate()) return;
      this.setLoading();
      let { title, description, files, users, end, from, to } = this.editedItem;
      const namedFiles = files.map((file) => file.name);
      const docRef = {
        title,
        description,
        files: namedFiles,
        end,
        from,
        to,
        created_by: this.user.id,
        isDone: true,
      };
      await firestore__
        .collection("tasks")
        .add(docRef)
        .then(async (newTask) => {
          for (let i = 0; i < files.length; i++) {
            const file = files[i];

            await db
              .storage()
              .ref()
              .child(`tasks/${newTask.id}/${file.name}`)
              .put(file)
              .catch((err) => alertError("Something went wrong!", err.message));
          }

          for (let i = 0; i < users.length; i++) {
            const user = users[i];
            const taskUserDocRef = {
              assign_to: user.id,
              assign_by: this.user.id,
              task_id: newTask.id,
              uploaded_files: [],
            };
            await firestore__
              .collection("tasks_users")
              .add(taskUserDocRef)
              .catch((err) => alertError("Something went wrong!", err.message));
          }
          alertSuccessWithAuto("Tasks has been assigned successfully!");
          this.closeCreateTask();
        })
        .catch((err) => alertError("Something went wrong!", err.message));
      this.setLoading();
    },
    viewDay({ date }) {
      if (moment(`${date} 23:59`, "YYYY-MM-DD HH:mm").isBefore(moment())) {
        alertWarning(
          "Oopss...",
          "You're not allowed to make schedule behind the current date."
        );
        return;
      }
      this.editedItem.from = date;
      this.focus = date;
      this.taskCreateDialog = true;
    },
    getEventColor(event) {
      return event.color;
    },
    setToday() {
      this.focus = "";
    },
    prev() {
      this.$refs.calendar.prev();
    },
    next() {
      this.$refs.calendar.next();
    },
    closeCreateTask() {
      Object.assign(this.editedItem, this.defaultItem);
      this.editedItem.from = moment().format("YYYY-MM-DD");
      this.$refs.taskForm.resetValidation();
      this.taskCreateDialog = false;
    },
    closeEditModeTask() {
      Object.assign(this.editModeItem, this.defaultItem);
      this.$refs.editTaskForm.resetValidation();
      this.editMode = false;
    },
    showEvent({ nativeEvent, event }) {
      const open = () => {
        this.selectedEvent = event;
        this.selectedElement = nativeEvent.target;
        requestAnimationFrame(() =>
          requestAnimationFrame(() => (this.selectedOpen = true))
        );
      };

      if (this.selectedOpen) {
        this.selectedOpen = false;
        requestAnimationFrame(() => requestAnimationFrame(() => open()));
      } else {
        open();
      }

      nativeEvent.stopPropagation();
    },
    updateRange({ start, end }) {
      Object.assign(this.saveRange, { start, end });
      const events = [];
      const min = new Date(`${start.date}T00:00:00`);
      const max = new Date(`${end.date}T23:59:59`);
      const eventCount = this.tasks.length; //length of tasks;

      for (let i = 0; i < eventCount; i++) {
        const task = this.tasks[i];

        events.push({
          name: task.title,
          start: `${task.from} 00:00`,
          end: `${task.to} ${task.end}`,
          color: this.colors[this.rnd(0, this.colors.length - 1)],
          task,
          // timed: true,
        });
      }

      this.events = events;
    },
    rnd(a, b) {
      return Math.floor((b - a + 1) * Math.random()) + a;
    },
  },
};
</script>

<style scoped>
</style>