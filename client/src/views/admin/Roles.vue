<template>
  <admin-base>
    <span slot="head">Roles</span>
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
        :items="roles"
        sort-by="calories"
        class="elevation-1"
      >
        <template v-slot:top>
          <v-toolbar flat>
            <v-toolbar-title>Roles</v-toolbar-title>
            <v-divider class="mx-4" inset vertical></v-divider>
            <v-spacer></v-spacer>
            <v-dialog v-model="dialog" max-width="500px">
              <!--   <template v-slot:activator="{ on, attrs }">
                <v-btn
                  disabled
                  color="primary"
                  class="mb-2"
                  v-bind="attrs"
                  v-on="on"
                >
                  New Role
                </v-btn>
              </template> -->
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
                            label="Position name"
                            :rules="requiredRules"
                          ></v-text-field>
                        </v-form>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="close">
                    Cancel
                  </v-btn>
                  <v-btn color="blue darken-1" text type="submit" @click="save">
                    Save
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
            <v-dialog v-model="dialogDelete" max-width="500px">
              <v-card>
                <v-card-title class="text-h5"
                  >Are you sure you want to delete this item?</v-card-title
                >
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="closeDelete"
                    >Cancel</v-btn
                  >
                  <v-btn color="blue darken-1" text @click="deleteItemConfirm"
                    >OK</v-btn
                  >
                  <v-spacer></v-spacer>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-toolbar>
        </template>
        <template v-slot:item.actions="{ item }">
          <v-icon small @click="editItem(item)"> mdi-pencil </v-icon>
          <!-- <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon> -->
        </template>
      </v-data-table>
    </template>
  </admin-base>
</template>

<script>
import AdminBase from "@/components/AdminBase";
import firestore__ from "@/database/firestore";
import { alertError, alertSuccessWithAuto } from "@/tools/swal";
import { requiredRules } from "@/tools/rules";

export default {
  name: "Roles",
  components: { AdminBase },
  data: () => ({
    dialog: false,
    search: "",
    requiredRules,
    dialogDelete: false,
    headers: [
      { text: "Title", value: "title" },
      { text: "Actions", value: "actions", sortable: false },
    ],
    roles: [],
    editedIndex: -1,
    editedItem: {
      title: "",
    },
    defaultItem: {
      title: "",
    },
  }),
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
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
    initialize() {
      firestore__.collection("roles").onSnapshot((snapshot) => {
        this.roles = snapshot.docs.map((e) => ({
          id: e.id,
          title: e.get("text"),
        }));
      });
    },
    uniqueValidation(title, id = null) {
      if (id) {
        return this.roles.some((e) => e.title === title && e.id !== id);
      }
      return this.roles.some((e) => e.title === title);
    },
    editItem(item) {
      this.editedIndex = this.roles.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      this.editedIndex = this.roles.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      // this.workPositions.splice(this.editedIndex, 1)
      firestore__
        .collection("roles")
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

      this.$refs.form.resetValidation();
      if (this.editedIndex > -1) {
        if (this.uniqueValidation(this.editedItem.title, this.editedItem.id)) {
          alertError("Item with this record already exists.");
          return;
        }
        // Object.assign(this.workPositions[this.editedIndex], this.editedItem)
        firestore__
          .collection("roles")
          .doc(this.editedItem.id)
          .update({ text: this.editedItem.title })
          .then(() => alertSuccessWithAuto())
          .catch((err) => alertError("Error Encountered", err.message));
      } else {
        if (this.uniqueValidation(this.editedItem.title)) {
          alertError("Item with this record already exists.");
          return;
        }
        firestore__
          .collection("roles")
          .add(this.editedItem)
          .then(() => {
            // this.workPositions.push(this.editedItem)
            alertSuccessWithAuto();
          })
          .catch((err) => alertError("Error Encountered", err.message));
      }
      this.close();
    },
  },
};
</script>

<style scoped>
</style>