<template>
  <admin-base>
    <span slot="head">Department Management</span>
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
        :search="search"
        height="580px"
        :headers="headers"
        :items="departments.filter((e) => !!e.id)"
        sort-by="calories"
        class="elevation-1"
      >
        <template v-slot:item.user_name="{ item }">
          {{
            users.find(
              (e) => e.department_id === item.id && e.isDepartmentHead
            ) &&
            users.find((e) => e.department_id === item.id && e.isDepartmentHead)
              .name
          }}
        </template>

        <template v-slot:top>
          <v-toolbar flat>
            <v-toolbar-title>Departments</v-toolbar-title>
            <v-divider class="mx-4" inset vertical></v-divider>
            <v-spacer></v-spacer>
            <v-dialog v-model="dialog" max-width="800px">
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  color="primary"
                  dark
                  class="mb-2"
                  v-bind="attrs"
                  v-on="on"
                >
                  New Department
                </v-btn>
              </template>
              <v-card>
                <v-card-title>
                  <span class="text-h5">{{ formTitle }}</span>
                </v-card-title>

                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col cols="12">
                        <v-form ref="form" @submit.prevent="save">
                          <v-text-field
                            v-model="editedItem.title"
                            label="Department Name"
                            :rules="requiredRules"
                          ></v-text-field>
                          <v-autocomplete
                            readonly
                            v-model="editedItem.head_user_id"
                            class="my-2"
                            :items="users"
                            chips
                            item-text="name"
                            item-value="id"
                            label="Department Head"
                            :rules="requiredRules"
                            @click="handleUsersDialog('leader')"
                          >
                            <template v-slot:selection="data">
                              <v-chip
                                v-bind="data.attrs"
                                :input-value="data.selected"
                                @click="data.select"
                              >
                                <v-avatar left>
                                  <v-img :src="data.item.avatar"></v-img>
                                </v-avatar>
                                {{ data.item.name }}
                              </v-chip>
                            </template>
                            <template v-slot:item="data">
                              <template v-if="typeof data.item !== 'object'">
                                <v-list-item-content
                                  v-text="data.item"
                                ></v-list-item-content>
                              </template>
                              <template v-else>
                                <v-list-item-avatar>
                                  <img :src="data.item.avatar" />
                                </v-list-item-avatar>
                                <v-list-item-content>
                                  <v-list-item-title
                                    v-html="data.item.name"
                                  ></v-list-item-title>
                                  <v-list-item-subtitle
                                    >{{ data.item.email }}
                                  </v-list-item-subtitle>
                                </v-list-item-content>
                              </template>
                            </template>
                          </v-autocomplete>
                        </v-form>
                      </v-col>
                    </v-row>
                    <v-card-subtitle
                      >*click twice to edit dpt head.</v-card-subtitle
                    >
                  </v-container>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn
                    color="blue darken-1"
                    text
                    @click="close"
                    :disabled="loading"
                  >
                    Cancel
                  </v-btn>
                  <v-btn
                    color="blue darken-1"
                    :disabled="loading"
                    text
                    type="submit"
                    @click="save"
                  >
                    Save
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
            <v-dialog v-model="dialogDelete" max-width="500px">
              <v-card>
                <v-card-title class="text-h5"
                  >Are you sure you want to delete this item?
                </v-card-title>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn
                    color="blue darken-1"
                    text
                    @click="closeDelete"
                    :disabled="loading"
                    >Cancel
                  </v-btn>
                  <v-btn
                    color="blue darken-1"
                    text
                    @click="deleteItemConfirm"
                    :disabled="loading"
                    >OK
                  </v-btn>
                  <v-spacer></v-spacer>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-toolbar>
        </template>
        <template v-slot:item.actions="{ item }">
          <v-icon small class="mr-2" @click="editItem(item)">
            mdi-pencil
          </v-icon>
          <v-icon small @click="deleteItem(item)"> mdi-delete</v-icon>
        </template>
      </v-data-table>
    </template>

    <!--    Users dialog-->
    <v-dialog
      v-model="usersDialog"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
    >
      <v-card tile>
        <v-toolbar flat dark color="primary">
          <v-btn icon dark @click="usersDialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>Choose a department head</v-toolbar-title>
        </v-toolbar>
        <v-card-text>
          <v-card flat>
            <v-card-title>
              <v-text-field
                v-model="searchOnUserDialog"
                append-icon="mdi-magnify"
                label="Search"
                single-line
                hide-details
              ></v-text-field>
            </v-card-title>
            <v-data-table
              height="480px"
              :headers="headersOnUserDialog"
              :items="users.filter((u) => !u.isDepartmentHead)"
              :search="searchOnUserDialog"
              @click:row="userRowClick"
            >
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
              <template v-slot:item.status="{ item }">
                <v-chip v-if="item.status" small color="success">active</v-chip>
                <v-chip v-else color="error" small>suspended</v-chip>
              </template>
            </v-data-table>
          </v-card>
        </v-card-text>
        <div style="flex: 1 1 auto"></div>
      </v-card>
    </v-dialog>
  </admin-base>
</template>

<script>
import firestore__ from "@/database/firestore";
import { alertError, alertSuccessWithAuto } from "@/tools/swal";
import { requiredRules } from "@/tools/rules";
import { mapActions, mapGetters } from "vuex";
import AdminBase from "../../components/AdminBase.vue";

export default {
  name: "AdminDepartment",
  components: { AdminBase },
  data: () => ({
    dialog: false,
    usersDialog: false,
    search: "",
    searchOnUserDialog: "",
    usersDialogType: "leader",
    requiredRules,
    dialogDelete: false,
    headers: [
      { text: "Title", value: "title" },
      { text: "Dpt. Head", value: "user_name" },
      { text: "Actions", value: "actions", sortable: false },
    ],
    headersOnUserDialog: [
      { text: "", value: "avatar", filterable: false, sortable: false },
      { text: "Name", value: "name" },
      { text: "ID", value: "employee_id", width: "9rem" },
      { text: "Email", value: "email" },
      { text: "Role", value: "role" },
      { text: "Work", value: "work_position" },
      { text: "Department", value: "department" },
      { text: "Contact #", value: "contact_number" },
      { text: "Address", value: "address" },
      { text: "Status", value: "status", filterable: false, sortable: false },
    ],
    editedIndex: -1,
    editedItem: {
      title: "",
      head_user_id: "",
    },
    defaultItem: {
      title: "",
      head_user_id: "",
    },
  }),

  computed: {
    ...mapGetters({
      users: "getUsers",
      departments: "getDepartments",
      loading: "getLoading",
    }),
    formTitle() {
      return this.editedIndex === -1 ? "New Department" : "Edit Department";
    },
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },

  created() {
    this.initialize();
  },

  methods: {
    ...mapActions(["setDepartments", "setUsers", "setLoading"]),
    userRowClick(val) {
      this.usersDialog = false;
      this.editedItem.head_user_id = val.id;
    },
    remove(item) {
      const index = this.users.indexOf(item.name);
      if (index >= 0) this.users.splice(index, 1);
    },
    handleUsersDialog(type) {
      this.usersDialogType = type;
      this.usersDialog = true;
    },
    initialize() {
      this.setUsers();
      this.setDepartments();
    },
    uniqueValidation(title, id = null) {
      if (id) {
        return this.departments.some((e) => e.title === title && e.id !== id);
      }
      return this.departments.some((e) => e.title === title);
    },
    editItem(item) {
      const head = this.users.find(
        (u) => u.department_id === item.id && u.isDepartmentHead
      );
      item.head_user_id = head && head.id;
      this.editedIndex = this.departments.indexOf(item);
      this.editedItem = Object.assign({}, item);

      this.dialog = true;
    },

    deleteItem(item) {
      this.editedIndex = this.departments.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    async deleteItemConfirm() {
      //if there are employees and not head
      if (
        this.users.some(
          (u) =>
            u.department_id === this.editedItem.id /* && !u.isDepartmentHead*/
        )
      ) {
        alertError("This department has an existing records");
        return;
      }

      const currentHead = this.users.find(
        (u) => u.department_id === this.editedItem.id && u.isDepartmentHead
      );

      if (currentHead) {
        await firestore__
          .collection("users")
          .doc(currentHead.id)
          .update({ department_id: "", isDepartmentHead: false });
      }

      firestore__
        .collection("departments")
        .doc(this.editedItem.id)
        .delete()
        .then(() => alertSuccessWithAuto("Data has been deleted!"))
        .catch((err) => alertError("Error Encountered", err.message));
      this.closeDelete();
    },

    close() {
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
      this.editedItem.title = this.editedItem.title.trim();
      if (!this.$refs.form.validate()) return;
      this.setLoading();

      this.$refs.form.resetValidation();
      if (this.editedIndex > -1) {
        if (this.uniqueValidation(this.editedItem.title, this.editedItem.id)) {
          alertError("Item with this record already exists.");
          return;
        }
        // Object.assign(this.workPositions[this.editedIndex], this.editedItem)
        firestore__
          .collection("departments")
          .doc(this.editedItem.id)
          .update({
            title: this.editedItem.title,
          })
          .then(async () => {
            //remove current user head
            const currentHead = this.users.find(
              (u) =>
                u.department_id === this.editedItem.id && u.isDepartmentHead
            );
            if (currentHead) {
              await firestore__
                .collection("users")
                .doc(currentHead.id)
                .update({ department_id: "", isDepartmentHead: false });
            }
            firestore__
              .collection("users")
              .doc(this.editedItem.head_user_id)
              .update({
                department_id: this.editedItem.id,
                isDepartmentHead: true,
              })
              .then(() => {
                alertSuccessWithAuto();
                this.close();
              })
              .finally(() => this.setLoading());
          })
          .catch((err) => alertError("Error Encountered", err.message));
      } else {
        if (this.uniqueValidation(this.editedItem.title)) {
          alertError("Item with this record already exists.");
          return;
        }
        firestore__
          .collection("departments")
          .add({ title: this.editedItem.title })
          .then((result) => {
            firestore__
              .collection("users")
              .doc(this.editedItem.head_user_id)
              .update({ department_id: result.id, isDepartmentHead: true })
              .then(() => {
                alertSuccessWithAuto();
                this.close();
              })
              .finally(() => this.setLoading());
          })
          .catch((err) => alertError("Error Encountered", err.message));
      }
    },
  },
};
</script>

<style scoped>
</style>