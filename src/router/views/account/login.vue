<script>
import Layout from "../../layouts/auth";
import {
  authMethods,
  notificationMethods
} from "@/state/helpers";
import { mapState } from "vuex";

import appConfig from "@/app.config";
import { required, email } from "vuelidate/lib/validators";
import {mapActions, mapGetters} from 'vuex';
/**
 * Login component
 */
export default {
  page: {
    title: "Login",
    meta: [{ name: "description", content: appConfig.description }]
  },
  components: { Layout },
  data() {
    return {
      submitted: false,
      authError: null,
      tryingToLogIn: false,
      isAuthError: false,
      form: {
        email: 'moataz@outlook.com',
        password: 'password'
      },
    };
  },
  validations: {
    form: {
      email: { required, email },
      password: { required }
    }
  },
  computed: {
    ...mapGetters(['isSignedIn']),
    ...mapState("authfack", ["status"]),
    notification() {
      return this.$store ? this.$store.state.notification : null;
    }
  },
  /*watch: {
    isSignedIn(value) {
      if (value) {
        this.$router.replace('/');
      }
    }
  },*/
  methods: {
    ...mapActions(['login']),
    ...authMethods,
    ...notificationMethods,
    // Try to log the user in with the username
    // and password they provided.
    tryToLogIn() {
      this.submitted = true;
      // stop here if form is invalid
      this.$v.$touch();

      if (this.$v.$invalid) {
        return;
      }
      else {

          this.tryingToLogIn = true;
          // Reset the authError if it existed.
          this.authError = null;
          return (
            this.login({
              email: this.form.email,
              password: this.form.password
            })
              // eslint-disable-next-line no-unused-vars
              .then(token => {
                this.tryingToLogIn = false;
                this.isAuthError = false;
                // Redirect to the originally requested page, or to the home page
                this.$router.push(
                  this.$route.query.redirectFrom || { name: "default" }
                );
              })
              .catch(error => {
                this.tryingToLogIn = false;
                this.authError = error ? error : "";
                this.isAuthError = true;
              })
          );
        }
      }
  },
};
</script>

<template>
  <Layout>
    <div class="row justify-content-center">
      <div class="col-md-8 col-lg-6 col-xl-5">
        <div class="card overflow-hidden">
          <div class="bg-soft-primary">
            <div class="row">
              <div class="col-7">
                <div class="text-primary p-4">
                  <h5 class="text-primary">Welcome Back !</h5>
                  <p>Sign in to continue to Skote.</p>
                </div>
              </div>
              <div class="col-5 align-self-end">
                <img src="@/assets/images/profile-img.png" alt class="img-fluid" />
              </div>
            </div>
          </div>
          <div class="card-body pt-0">
            <div>
              <router-link tag="a" to="/">
                <div class="avatar-md profile-user-wid mb-4">
                  <span class="avatar-title rounded-circle bg-light">
                    <img src="@/assets/images/logo.svg" alt height="34" />
                  </span>
                </div>
              </router-link>
            </div>
            <b-alert v-model="isAuthError" variant="danger" class="mt-3" dismissible>{{authError}}</b-alert>

            <div
              v-if="notification.message"
              :class="'alert ' + notification.type"
            >{{notification.message}}</div>

            <b-form class="p-2" @submit.prevent="tryToLogIn()">
              <b-form-group id="input-group-1" label="Email" label-for="input-1">
                <b-form-input
                  id="input-1"
                  v-model="form.email"
                  type="text"
                  placeholder="Enter email"
                  :class="{ 'is-invalid': submitted && $v.form.email.$error }"
                ></b-form-input>
                <div v-if="submitted && $v.form.email.$error" class="invalid-feedback">
                  <span v-if="!$v.form.email.required">Email is required.</span>
                  <span v-if="!$v.form.email.email">Please enter valid email.</span>
                </div>
              </b-form-group>

              <b-form-group id="input-group-2" label="Password" label-for="input-2">
                <b-form-input
                  id="input-2"
                  v-model="form.password"
                  type="password"
                  placeholder="Enter password"
                  :class="{ 'is-invalid': submitted && $v.form.password.$error }"
                ></b-form-input>
                <div
                  v-if="submitted && !$v.form.password.required"
                  class="invalid-feedback"
                >Password is required.</div>
              </b-form-group>
              <div class="mt-3">
                <b-button type="submit" variant="primary" class="btn-block">Log In</b-button>
              </div>
            </b-form>
          </div>
          <!-- end card-body -->
        </div>
        <!-- end card -->

        <!-- end row -->
      </div>
      <!-- end col -->
    </div>
    <!-- end row -->
  </Layout>
</template>

<style lang="scss" module></style>
