<template>
  <manager-base>
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
      <v-data-table
        height="500px"
        :headers="headers"
        :items="users"
        class="elevation-1"
        :search="search"
      >
        <template v-slot:top>
          <v-toolbar flat>
            <v-toolbar-title>Users</v-toolbar-title>
            <v-divider class="mx-4" inset vertical></v-divider>
            <v-spacer></v-spacer>
            <v-dialog v-model="dialog" max-width="800px">
              <v-form @submit.prevent="save" ref="form">
                <v-card>
                  <v-card-title>
                    <span class="text-h5">Assign Department</span>
                  </v-card-title>
                  <v-card-text>
                    <v-container>
                      <v-row>
                        <v-col cols="12">
                          <v-autocomplete
                            :items="departments"
                            v-model="editedItem.department_id"
                            label="Department"
                            required
                            item-text="title"
                            item-value="id"
                          ></v-autocomplete>
                        </v-col>
                      </v-row>
                    </v-container>
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="close">
                      Cancel
                    </v-btn>
                    <v-btn color="blue darken-1" text type="submit">
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
          <v-btn
            icon
            target="_blank"
            :to="{ name: 'profile_view', params: { id: item.id } }"
          >
            <v-icon color="primary" class="mr-2">mdi-account</v-icon>
          </v-btn>

          <v-icon
            v-if="['manager-role', 'admin-role'].includes(item.role)"
            disabled
          >
            mdi-pencil</v-icon
          >
          <v-icon v-else @click="editItem(item)"> mdi-pencil</v-icon>
          <v-tooltip left color="primary">
            <template v-slot:activator="{ on, attrs }">
              <v-icon
                v-bind="attrs"
                v-on="on"
                v-if="item.managerId !== user.id"
                color="success"
                @click="makeMine(item)"
                class="ml-2"
              >
                uil-check-circle</v-icon
              >
              <v-icon
                v-bind="attrs"
                v-on="on"
                v-else
                color="error"
                @click="makeMine(item, -1)"
                class="ml-2"
              >
                uil-times-circle</v-icon
              >
            </template>
            <span>Set/Remove employee under your command</span>
          </v-tooltip>
        </template>
        <template v-slot:item.status="{ item }">
          <v-chip v-if="item.status" small color="success">active</v-chip>
          <v-chip v-else color="error" small>suspended</v-chip>
        </template>
        <template v-slot:item.department="{ item }">
          {{ getName(departments, item.department_id) }}
        </template>
        <template v-slot:item.work_position="{ item }">
          {{ getName(work_positions, item.work_position_id) }}
        </template>
        <template v-slot:item.role="{ item }">
          {{ getName(roles, item.role_id) }}
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
            <v-btn class="mt-6" text color="red" @click="closeSheet">
              close
            </v-btn>
            <v-btn class="mt-6" text color="green" @click="saveImport">
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
    <!--    Import csv-->
  </manager-base>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import firestore__ from "@/database/firestore";
import { __users, departments, roles, work_positions } from "@/test-data";
import { requiredRules } from "@/tools/rules";
import { globals } from "@/config";
import axios from "axios";
import auth__ from "@/database/auth";
import { alertSuccessWithAuto } from "@/tools/swal";
import ManagerBase from "../../components/ManagerBase.vue";

export default {
  name: "ManagerUsers",
  components: { ManagerBase },
  data: () => ({
    dialog: false,
    dialogDelete: false,
    search: "",
    users: [],
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
      {
        text: "Action",
        value: "actions",
        width: "130px",
        filterable: false,
        sortable: false,
      },
    ],
    editedIndex: -1,
    editedItem: {
      user_id: "",
      department_id: "",
    },
    defaultItem: {
      department_id: "",
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
    this.setWorkPositions();
    this.setDepartments();
    this.setRoles();
    this.setUsers();
  },
  computed: mapGetters({
    departments: "getDepartments",
    // users: "getUsers",
    roles: "getRoles",
    work_positions: "getWorkPositions",
    loading: "getLoading",
    user: "getUser",
  }),
  methods: {
    ...mapActions([
      "setDepartments",
      // "setUsers",
      "setRoles",
      "setWorkPositions",
    ]),
    setUsers() {
      firestore__.collection("users").onSnapshot((snapshot) => {
        const docs = snapshot.docs.map((e) => {
          let avatar = e.get("avatar");
          const doc = e.data();
          doc.role = this.roles.find((role) => role.id === doc.role_id).title;
          doc.department = this.departments.find(
            (department) => department.id === doc.department_id
          ).title;
          doc.work_position = this.work_positions.find(
            (work_position) => work_position.id === doc.work_position_id
          ).title;
          const data = { ...doc, id: e.id };
          if (!avatar) {
            data.avatar = "https://joeschmoe.io/api/v1/" + data.name;
          }

          return data;
        });

        const users = docs.filter((e) => e.email !== this.user.email);
        const role = this.user.role;
        /* if (role === 'manager-role') {
          this.users = users.filter(user => (user.role === 'employee-role' && user.managerId === null) || user.managerId === state.user.id);
        } else if (role === 'admin-role') {
        }*/
        this.users = users.filter(
          (user) =>
            (user.role === "employee-role" &&
              [null, undefined].includes(user.managerId)) ||
            user.managerId === this.user.id
        );
      });
    },
    makeMine(item, status = 1) {
      Swal.fire({
        title: "Are you sure?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, confirm!",
      }).then((result) => {
        if (result.isConfirmed) {
          if (status === 1) {
            firestore__
              .collection("users")
              .doc(item.id)
              .update({ managerId: this.user.id });
          } else {
            firestore__
              .collection("users")
              .doc(item.id)
              .update({ managerId: null });
          }
          Swal.fire("Saved!", "", "success");
        }
      });
    },
    /*Import csv*/
    closeSheet() {
      this.sheet = false;
      this.fileInput = null;
    },
    validEmail: function (email) {
      var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/;
      return re.test(email.trim()) ? email.trim() : "INVALID";
    },
    async saveImport() {
      const filterTable = this.importsTable.filter((s) => !this.hasInvalid(s));
      this.closeSheet();
      alertSuccessWithAuto("Users imported successfully!");
      // const test = await axios.post("/api/users/add", filterTable);
      return;
      const batch = firestore__.batch();
      filterTable.forEach((subject) => {
        const {
          curriculum_id,
          department_id,
          title,
          lab_duration,
          lec_duration,
          group_id,
        } = subject;
        const doc = {
          curriculum_id,
          department_id,
          title,
          lab_duration,
          lec_duration,
          group_id,
        };
        const docRef = db.collection("subjects").doc();
        batch.set(docRef, doc);
      });
      batch.commit().then(() => {
        this.closeSheet();
        this.indexCurriculum();
        this.$swal({
          position: "top-end",
          icon: "success",
          title: "Saved!",
          showConfirmButton: false,
          timer: 1000,
        });
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
          employee_id: this.trim(column[0]),
          name: this.trim(column[1]),
          email: this.validEmail(this.trim(column[2])),
          role_id: this.getIDByTitle(this.roles, column[3]),
          role: this.withIDValidator(this.roles, column[3]),
          department: this.withIDValidator(this.departments, column[4]),
          department_id: this.getIDByTitle(this.departments, column[4]),
          contact_number: this.trim(column[5]),
          address: this.trim(column[6]),
          work_position: this.withIDValidator(this.work_positions, column[7]),
          work_position_id: this.getIDByTitle(this.work_positions, column[7]),
          status: true,
          avatar: null,
          password: globals.USER_DEFAULT_PASSWORD,
        });
      });
      this.importsTable = table;
      this.sheet = true;
    },
    withIDValidator(data, column) {
      return this.getIDByTitle(data, column) ? column.trim() : "INVALID";
    },
    getIDByTitle(data, title) {
      const test = data.filter((e) => e.title === title.trim())[0];
      const val = test ? test.id : null;
      return !!!val ? null : val;
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
      const ignores = ["password", "avatar", "status"];
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
    getName(records, id) {
      return records.filter((e) => e.id === id)[0].title;
    },
    editItem(item) {
      this.editedIndex = this.users.indexOf(item);
      this.editedItem = Object.assign(
        {},
        { user_id: item.id, department_id: item.department_id }
      );
      this.dialog = true;
    },

    deleteItem(item) {
      this.editedIndex = this.users.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      this.users.splice(this.editedIndex, 1);
      this.closeDelete();
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

    save() {
      if (!this.$refs.form.validate()) return;

      if (this.editedIndex > -1) {
        Object.assign(this.users[this.editedIndex], this.editedItem);
        firestore__
          .collection("users")
          .doc(this.editedItem.user_id)
          .update({
            department_id: this.editedItem.department_id,
            isDepartmentHead: false,
          })
          .then(() => {
            alertSuccessWithAuto("Department has been assigned.");
            this.close();
          });
      } else {
        this.users.push(this.editedItem);
      }
    },
  },
};
</script>

<!--<script>


export default {
  name: "Users",
  components: {AdminBase},
  data: () => ({
    /*Dialogs*/
    isAddUser: false,
    isImportUser: false,
    search: '',
    headers: [
      {text: '', value: 'avatar', filterable: false, sortable: false},
      {text: 'Name', value: 'name'},
      {text: 'ID', value: 'employee_id'},
      {text: 'Email', value: 'email'},
      {text: 'Role', value: 'role'},
      {text: 'Team', value: 'team'},
      {text: 'Contact no.', value: 'contact_number'},
      {text: 'Address', value: 'address'},
      {text: 'Status', value: 'status'},
    ],
  }),
  methods: mapActions(['setUsers','setRoles']),
  computed: mapGetters({users: 'getUsers', roles: 'getRoles'}),
  created() {
    this.setRoles()
    this.setUsers()
  }
}
</script>-->

<style scoped>
</style>