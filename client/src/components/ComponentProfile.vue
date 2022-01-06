<template>
  <div>
    <v-row>
      <v-col cols="12" md="4">
        <div class="d-flex flex-column pl-md-4 align-center align-md-start">
          <v-avatar @click="dialog = true" color="success" size="228">
            <img :src="user.avatar" alt="Profile" />
          </v-avatar>
          <div class="d-flex flex-column mt-8">
            <div style="font-size: 1.5rem">{{ user.name }}</div>
            <div style="font-size: 0.89rem">{{ user.email }}</div>
          </div>
          <div class="mt-5 success--text" style="font-size: 1.1rem">
            <strong>ROLE</strong>
          </div>
          <div style="font-size: 0.8rem">{{ user.role.toUpperCase() }}</div>
          <div class="mt-5 success--text" style="font-size: 1.1rem">
            <strong>EMPLOYEE ID</strong>
            <v-icon color="success" small right>uil-postcard</v-icon>
          </div>
          <div style="font-size: 0.8rem">{{ user.count }}</div>
          <div class="mt-5 success--text" style="font-size: 1.1rem">
            <strong>DEPARTMENT</strong>
          </div>
          <div style="font-size: 0.8rem">{{ user.department }}</div>
          <div class="mt-5 success--text" style="font-size: 1.1rem">
            <strong>WORK POSITION</strong>
            <v-icon color="success" small right>uil-briefcase</v-icon>
          </div>
          <div style="font-size: 0.8rem">{{ user.work }}</div>
          <div class="mt-5 success--text" style="font-size: 1.1rem">
            <strong>LOCATION</strong>
            <v-icon color="success" small>uil-map-marker-info</v-icon>
          </div>
          <div style="font-size: 0.8rem">{{ user.address }}</div>
          <div class="mt-5 success--text" style="font-size: 1.1rem">
            <strong>CONTACT #</strong>
          </div>
          <div style="font-size: 0.8rem">{{ user.contact_number }}</div>
        </div>
        <v-divider class="my-6"></v-divider>
      </v-col>
      <!-- <v-divider vertical></v-divider> -->
      <v-col cols="12" md="8" class="">
        <div class="pl-md-4">
          <div class="success--text" style="font-size: 1.1rem">
            <strong>ABOUT ME</strong>
          </div>
          <div class="mt-2" style="font-size: 0.8rem">
            {{ user.description || "No description yet." }}
          </div>
          <v-divider class="my-6"></v-divider>
          <div class="primary--text" style="font-size: 1.1rem">
            <strong>UPDATE PROFILE</strong>
            <v-icon right color="primary" small>uil-user</v-icon>
          </div>
          <div class="mt-3">
            <v-text-field label="Location" v-model="form.address" />
            <v-text-field
              type="number"
              label="Contact Number"
              v-model="form.contact_number"
            />
            <v-textarea
              label="Description"
              rows="2"
              v-model="form.description"
            />
            <v-btn color="success" @click="save">save</v-btn>
            <v-divider class="my-6"></v-divider>
            <div class="primary--text" style="font-size: 1.1rem">
              <strong>UPDATE PASSWORD</strong>
              <v-icon right color="primary">uil-keyhole-circle</v-icon>
            </div>
            <v-text-field
              type="password"
              v-model="passForm.current_password"
              label="Current Password"
            />
            <v-text-field
              type="password"
              v-model="passForm.newPassword"
              label="New Password"
            />
            <v-text-field
              type="password"
              v-model="passForm.confirmPassword"
              label="Confirm Password"
            />
            <v-btn :loading="loading" color="primary" @click="savePass"
              >save
              <v-icon small right>uil-lock</v-icon>
            </v-btn>
          </div>
        </div>
      </v-col>
    </v-row>
    <v-dialog v-model="dialog" max-width="400px">
      <v-card>
        <v-card-title>Change Profile</v-card-title>
        <v-card-text>
          <v-file-input
            accept="image/png, image/jpeg, image/bmp"
            v-model="file"
            prepend-icon="uil-image"
            label="Upload profile picture"
          />
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="error" text @click="dialog = false"> Close </v-btn>
          <v-btn color="green darken-1" text @click="saveProfile">
            Continue
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { alertError, alertSuccess, alertWarning } from "@/tools/swal";
import db from "@/database";
import firestore__ from "@/database/firestore";
import auth__ from "@/database/auth";

export default {
  name: "ComponentProfile",
  computed: mapGetters({ user: "getUser", loading: "getLoading" }),
  data: () => ({
    form: {
      address: "",
      contact_number: "",
      description: "",
    },
    dialog: false,
    passForm: {
      current_password: "",
      newPassword: "",
      confirmPassword: "",
    },
    file: null,
  }),
  created() {
    this.form.address = this.user.address;
    this.form.contact_number = this.user.contact_number;
    this.form.description = this.user.description || "";
  },
  methods: {
    ...mapActions(["setLoading"]),
    saveProfile() {
      const file = this.file;
      const fileName = file.name;

      if (fileName.trim() === "") {
        return alertWarning("Invalid Image!", "Please upload a valid image.");
      }
      this.setLoading(true);

      db.storage()
        .ref()
        .child(`users/${this.user.id}/${fileName}`)
        .put(file)
        .then((res) => {
          res.ref
            .getDownloadURL()
            .then((res) => {
              firestore__
                .collection("users")
                .doc(this.user.id)
                .update({ avatar: res })
                .then((res) => {
                  this.setLoading(false);
                  this.dialog = false;
                  alertSuccess(
                    "Alright!",
                    "Profile picture updated successfully, re-login to apply the changes."
                  );
                })
                .catch((err) => {
                  this.setLoading(false);
                  alertError("Failed Updating!", err.message);
                });
            })
            .catch((err) => {
              this.setLoading(false);
              alertError("Failed On Fetch!", err.message);
            });
        })
        .catch((err) => {
          this.setLoading(false);
          alertError("Failed Uploading!", err.message);
        });
    },
    savePass() {
      if (
        this.passForm.newPassword.trim() &&
        this.passForm.current_password.trim() &&
        this.passForm.newPassword === this.passForm.confirmPassword
      ) {
        this.setLoading(true);
        auth__
          .signInWithEmailAndPassword(
            this.user.email,
            this.passForm.current_password
          )
          .then((res) => {
            res.user
              .updatePassword(this.passForm.newPassword)
              .then((res) => {
                this.setLoading(false);
                alertSuccess("Alright!", "Password updated successfully!");
              })
              .catch((err) => {
                this.setLoading(false);
                alertError("Failed!", err.message);
              });
          })
          .catch((err) => {
            this.setLoading(false);
            alertError("Invalid Credential!", err.message);
          });
      } else {
        alertWarning(
          "Invalid Data!",
          "Please fill out the required fields. Make sure the new password is the same as confirmed."
        );
      }
    },
    save() {
      if (!this.form.address.trim()) {
        return alertWarning("Invalid Data", "Address field is required.");
      }
      if (!this.form.contact_number.trim()) {
        return alertWarning(
          "Invalid Data",
          "Contact Number field is required."
        );
      }

      firestore__
        .collection("users")
        .doc(this.user.id)
        .update(this.form)
        .then((res) => {
          alertSuccess(
            "Alright!",
            "Please re-login your account to apply the changes."
          );
        });
    },
  },
};
</script>

<style scoped>
</style>