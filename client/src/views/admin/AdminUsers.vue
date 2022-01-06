<template>
  <admin-base>
    <span slot="head">Manage Users</span>
    <template>
      <v-card-title>
        Database Records
        <v-spacer></v-spacer>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
        ></v-text-field>
      </v-card-title>
      <v-card-text
        ><a href="./employee-sheets.csv">Sample Document</a></v-card-text
      >
      <v-data-table
        :loading="loading"
        :headers="headers"
        :items="users"
        class="elevation-1"
        :search="search"
        height="500px"
      >
        <template v-slot:top>
          <v-toolbar flat>
            <v-toolbar-title>Users</v-toolbar-title>
            <v-divider class="mx-4" inset vertical></v-divider>
            <v-spacer></v-spacer>
            <v-dialog v-model="dialog" max-width="800px">
              <template v-slot:activator="{ on, attrs }">
                <template>
                  <v-file-input
                    v-model="fileInput"
                    accept=".csv"
                    prepend-inner-icon="uil-import"
                    label="Import users"
                    prepend-icon=""
                    class="mx-4 mt-2"
                  ></v-file-input>
                </template>
                <v-btn
                  color="primary"
                  dark
                  class="mb-2"
                  v-bind="attrs"
                  v-on="on"
                >
                  New user
                  <v-icon right>uil-user-plus</v-icon>
                </v-btn>
              </template>
              <v-form @submit.prevent="save" ref="form" :disabled="loading">
                <v-card>
                  <v-card-title>
                    <span class="text-h5">Add user</span>
                  </v-card-title>
                  <v-card-text>
                    <v-container>
                      <v-row>
                        <v-col cols="12">
                          <!-- <v-text-field
                            v-model="editedItem.employee_id"
                            label="Employee ID*"
                            required
                            :rules="requiredRules"
                          ></v-text-field> -->
                          <v-text-field
                            v-model="editedItem.name"
                            label="Full name*"
                            required
                            :rules="requiredRules"
                          ></v-text-field>
                          <v-text-field
                            v-if="editedIndex < 0"
                            v-model="editedItem.email"
                            label="Email*"
                            required
                          ></v-text-field>
                          <v-text-field
                            v-model="editedItem.contact_number"
                            label="Contact number"
                            required
                            :rules="requiredRules"
                          ></v-text-field>
                          <v-text-field
                            v-model="editedItem.address"
                            label="Address*"
                            required
                            :rules="requiredRules"
                          ></v-text-field>
                          <v-autocomplete
                            :items="roles"
                            v-model="editedItem.role_id"
                            label="Role*"
                            required
                            item-text="title"
                            item-value="id"
                            :rules="requiredRules"
                          ></v-autocomplete>
                          <v-autocomplete
                            :items="work_positions"
                            v-model="editedItem.work_position_id"
                            label="Work Position*"
                            required
                            item-text="title"
                            item-value="id"
                            :rules="requiredRules"
                          ></v-autocomplete>
                          <v-autocomplete
                            disabled
                            :items="departments"
                            v-model="editedItem.department_id"
                            label="Department"
                            required
                            item-text="title"
                            item-value="id"
                          ></v-autocomplete>
                          <v-switch
                            v-model="editedItem.status"
                            inset
                            :label="`Status: ${
                              editedItem.status ? 'active' : 'suspended'
                            }`"
                          ></v-switch>
                        </v-col>
                      </v-row>
                    </v-container>
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                      :disabled="loading"
                      color="blue darken-1"
                      text
                      @click="close"
                    >
                      Cancel
                    </v-btn>
                    <v-btn
                      :disabled="loading"
                      color="blue darken-1"
                      text
                      type="submit"
                    >
                      Save
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-form>
            </v-dialog>
            <v-dialog v-model="dialogDelete" max-width="500px">
              <v-card>
                <v-card-title class="text-h5"
                  >Are you sure you want to delete this item?
                </v-card-title>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="closeDelete"
                    >Cancel
                  </v-btn>
                  <v-btn color="blue darken-1" text @click="deleteItemConfirm"
                    >OK
                  </v-btn>
                  <v-spacer></v-spacer>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-toolbar>
        </template>
        <template v-slot:item.isDepartmentHead="{ item }">
          <v-chip x-small v-if="item.isDepartmentHead" color="success">
            <v-icon left>uil-hard-hat</v-icon>
            Head
          </v-chip>
          <v-chip x-small v-else color="error">
            <v-icon left>uil-times-circle</v-icon>
            Not
          </v-chip>
        </template>
        <template v-slot:item.actions="{ item }">
          <v-icon small class="mr-2" @click="editItem(item)">
            mdi-pencil
          </v-icon>
          <!-- :disabled="handleDisabled(item.id)" -->
          <v-icon color="error" small @click="deleteItem(item)">
            mdi-delete
          </v-icon>
        </template>
        <template v-slot:item.status="{ item }">
          <v-chip v-if="item.status" small color="success">active</v-chip>
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
    </template>

    <!--    Import csv-->
    <v-bottom-sheet persistent v-model="sheet">
      <v-sheet height="650px">
        <v-row>
          <v-col cols="12" class="text-center">
            <v-btn
              :disabled="loading"
              class="mt-6"
              text
              color="red"
              @click="closeSheet"
            >
              close
            </v-btn>
            <v-btn
              :disabled="loading"
              class="mt-6"
              text
              color="green"
              @click="saveImport"
            >
              Save
            </v-btn>
          </v-col>
          <v-col cols="12" class="text-right px-8">
            <span>
              <v-chip x-small color="deep-orange darken-1"></v-chip>
              Invalid Records - Will not be saved in database.
            </span>
          </v-col>
        </v-row>
        <div class="py-1">
          <v-data-table
            height="400px"
            :headers="
              headers.filter(
                (e) => e.value !== 'actions' && e.value !== 'status'
              )
            "
            :items="importsTable"
            class="elevation-1 ma-4"
            dense
            :search="search"
            :item-class="rowFilter"
          >
          </v-data-table>
        </div>
      </v-sheet>
    </v-bottom-sheet>

    <v-dialog
      v-model="logsDialog"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
    >
      <v-card tile>
        <v-toolbar flat dark color="error">
          <v-btn icon dark @click="logsDialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>Error Logs</v-toolbar-title>
        </v-toolbar>
        <v-card-text>
          <v-card flat>
            <v-card-title>
              <v-text-field
                v-model="searchLogs"
                append-icon="mdi-magnify"
                label="Search"
                single-line
                hide-details
              ></v-text-field>
            </v-card-title>
            <v-data-table
              height="480px"
              :headers="headerLogs"
              :items="errLogs"
              :search="searchLogs"
            ></v-data-table>
          </v-card>
        </v-card-text>
        <div style="flex: 1 1 auto"></div>
      </v-card>
    </v-dialog>
    <!--    Import csv-->
  </admin-base>
</template>


<script>
import AdminBase from "@/components/AdminBase";
import { mapActions, mapGetters } from "vuex";
import firestore__ from "@/database/firestore";
import { requiredRules } from "@/tools/rules";
import { globals } from "@/config";
import axios from "axios";
import { alertSuccessWithAuto, alertError } from "@/tools/swal";
import auth__ from "@/database/auth";

export default {
  name: "AdminUsers",
  components: { AdminBase },
  data: () => ({
    dialog: false,
    logsDialog: false,
    dialogDelete: false,
    errLogs: [],
    searchLogs: "",
    headerLogs: [
      { text: "Email", value: "email" },
      { text: "Log", value: "message" },
    ],
    search: "",
    requiredRules: requiredRules,
    headers: [
      { text: "", value: "avatar", filterable: false, sortable: false },
      { text: "Name", value: "name" },
      { text: "ID", value: "count", width: "9rem" },
      { text: "Email", value: "email" },
      { text: "Role", value: "role" },
      { text: "Work", value: "work_position" },
      { text: "Department", value: "department" },
      {
        text: "Dpt. Head",
        value: "isDepartmentHead",
        filterable: false,
        sortable: false,
      },
      { text: "Contact #", value: "contact_number" },
      { text: "Address", value: "address" },
      { text: "Status", value: "status", filterable: false, sortable: false },
      { text: "Actions", value: "actions", filterable: false, sortable: false },
    ],
    editedIndex: -1,
    editedItem: {
      work_position_id: "",
      department_id: "",
      role_id: "",
      name: "",
      // employee_id: "",
      email: "",
      contact_number: "",
      address: "",
      status: true,
      password: globals.USER_DEFAULT_PASSWORD,
      isDepartmentHead: false,
    },
    defaultItem: {
      work_position_id: "",
      department_id: "",
      role_id: "",
      name: "",
      // employee_id: "",
      email: "",
      contact_number: "",
      address: "",
      status: true,
      password: globals.USER_DEFAULT_PASSWORD,
      avatar: null,
      isDepartmentHead: false,
    },
    /*Import csv*/
    importsTable: [],
    sheet: false,
    fileInput: null,
    /*Import csv*/
  }),

  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
    /*Import csv*/
    fileInput(val) {
      if (val) {
        this.handleImport();
      }
    },
    /*Import csv*/
  },
  async created() {
    await this.initialize();
  },
  computed: mapGetters({
    departments: "getDepartments",
    users: "getUsers",
    roles: "getRoles",
    work_positions: "getWorkPositions",
    loading: "getLoading",
    tasks_users: "getTasksUsers",
    tasks: "getTasks",
    messages: "messages",
    logs: "logs",
    assistance: "assistance",
  }),
  methods: {
    ...mapActions([
      "setDepartments",
      "setUsers",
      "setRoles",
      "setWorkPositions",
      "setTasksUsers",
      "setTasks",
      "setMessages",
      "setLogs",
      "setAssistance",
    ]),
    /*Import csv*/
    closeSheet() {
      this.sheet = false;
      this.fileInput = null;
    },
    handleDisabled(id) {
      return (
        this.tasks_users.some((t) => [t.assign_by, t.assign_to].includes(id)) ||
        this.tasks.some((t) => t.created_by === id) ||
        this.messages.some((m) => [m.from, m.to].includes(id)) ||
        this.logs.some((l) => l.userId === id) ||
        this.assistance.some((a) => [a.from, a.to].includes(id))
      );
    },
    validEmail: function (email) {
      const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/;
      return re.test(email.trim()) ? email.trim() : "INVALID";
    },
    async saveImport() {
      const filterTable = this.importsTable.filter((s) => !this.hasInvalid(s));
      // this.closeSheet();
      // alertSuccessWithAuto("Users imported successfully!");
      // const test = await axios.post("/api/users/add", filterTable);
      axios
        .post("/api/users", filterTable)
        .then(() => {
          alertSuccessWithAuto("Users imported successfully!");
          this.closeSheet();
        })
        .catch((err) => {
          this.closeSheet();
          this.errLogs = err.response.data;
          this.logsDialog = true;
        });
    },
    trim(v) {
      const val = v.trim();
      return !!!val ? null : val;
    },
    registerEach(result) {
      const rows = result.trim().split("\n");
      const table = [];
      rows.shift(); //Remove header
      rows.forEach((row) => {
        const column = row.split(",");
        table.push({
          // employee_id: this.trim(column[0]),
          name: this.trim(column[0]),
          email: this.validEmail(this.trim(column[1])),
          role_id: this.getIDByTitle(this.roles, column[2]),
          role: this.withIDValidator(this.roles, column[2]),
          department: this.withIDValidator(this.departments, column[6], true),
          department_id: this.getIDByTitle(this.departments, column[6], true),
          contact_number: this.trim(column[3]),
          address: this.trim(column[4]),
          work_position: this.withIDValidator(this.work_positions, column[5]),
          work_position_id: this.getIDByTitle(this.work_positions, column[5]),
          status: true,
          avatar: null,
          isDepartmentHead: false,
          password: globals.USER_DEFAULT_PASSWORD,
        });
      });
      this.importsTable = table;
      this.sheet = true;
    },
    withIDValidator(data, column, nullable = false) {
      let test = this.getIDByTitle(data, column) ? column.trim() : "INVALID";
      if (test === "INVALID" && nullable && column.trim() === "") {
        return "Not specified";
      }
      return test;
    },
    getIDByTitle(data, title, nulable = false) {
      const test = data.filter((e) => e.title === title.trim())[0];
      const val = test ? test.id : null;
      let nullTest = !!!val ? null : val;
      if (!nullTest && nulable) {
        return "";
      }
      return nullTest;
    },
    handleImport() {
      this.importsTable = [];
      if (!this.fileInput) return;
      const reader = new FileReader();
      reader.onload = (e) => this.registerEach(e.target.result);
      reader.readAsText(this.fileInput);
    },
    isInvalid(field) {
      return !!!field || field === "INVALID";
    },
    hasInvalid(obj) {
      const ignores = [
        "password",
        "avatar",
        "status",
        "department_id",
        "isDepartmentHead",
      ];
      for (const i in obj) {
        if (this.isInvalid(obj[i]) && !ignores.includes(i)) {
          return true;
        }
      }
      return false;
    },
    rowFilter(item) {
      //Create an array then loop through to validate required
      if (this.hasInvalid(item)) {
        return "deep-orange darken-1 white--text";
      }
    },
    /*Import csv*/
    async initialize() {
      await this.setDepartments();
      await this.setWorkPositions();
      await this.setRoles();
      await this.setTasksUsers();
      await this.setAssistance();
      await this.setLogs();
      await this.setMessages();
      await this.setTasks();
      await this.setUsers();
      console.log(this.logs, this.messages);
    },
    getName(records, id) {
      return records.filter((e) => e.id === id)[0].title;
    },
    editItem(sel) {
      const item = { ...sel };
      delete item.role,
        delete item.department,
        delete item.work_position,
        delete item.avatar;
      this.editedIndex = this.users.indexOf(sel);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      this.editedIndex = this.users.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      this.users.splice(this.editedIndex, 1);
      axios
        .delete(`/api/users/${this.editedItem.id}`)
        .then(() => {
          this.closeDelete();
          alertSuccessWithAuto(
            `User ${this.editedItem.name} deleted successfully!`
          );
        })
        .catch(() => alertError("Something went wrong!"));
    },

    close() {
      this.$refs.form.resetValidation();
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    async save() {
      if (!this.$refs.form.validate()) return;
      if (this.editedIndex > -1) {
        axios
          .put("/api/users", this.editedItem)
          .then((r) => {
            alertSuccessWithAuto("User saved!");
            this.close();
          })
          .catch((e) => alertError(e.response.data.message));
        this.close();
      } else {
        axios
          .post("/api/users", this.editedItem)
          .then((r) => {
            this.close();
            alertSuccessWithAuto("User saved!");
          })
          .catch((e) => alertError(e.response.data.message));
      }
    },
  },
};
</script>