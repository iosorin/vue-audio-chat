<template>
  <aside>
    <h3>Sign in Anonymously</h3>
    <button @click="auth.signInAnonymously()">Sign in</button>

    <div v-if="newUser">
      <h3>Sign Up with new account</h3>
      <a href="#" @click="newUser = false">Returning user?</a>
    </div>

    <div v-else>
      <h3>Sign Up with Email</h3>
      <a href="#" @click="newUser = true">Returning user?</a>
    </div>

    <label for="email">Email</label>
    <br />
    <input v-model="email" placeholder="email" class="input" type="email" name="email" />

    <label for="password">password</label>
    <br />
    <input v-model="password" placeholder="password" class="input" type="password" name="password" />

    <button
      @click="signInOrCreateUser()"
      :class="{'is-loading': loading }"
    >{{ newUser ? 'Sign Up' : 'Login' }}</button>

    <p class="danger" :if="errorMessage">{{errorMessage}}</p>
  </aside>
</template>

<script>
import { auth } from "../firebase";

export default {
  data() {
    return {
      auth,
      newUser: false,
      email: "",
      password: "",
      loading: false,
      errorMessage: ""
    };
  },
  methods: {
    async signInOrCreateUser() {
      this.loading = true;
      this.errorMessage = "";

      try {
        if (this.newUser) {
          await auth.createUserWithEmailAndPassword(this.email, this.password);
        } else {
          await auth.signInWithEmailAndPassword(this.email, this.password);
        }
      } catch (error) {
        this.errorMessage = error.message;
      }
      this.loading = false;
    }
  }
};
</script>

<style>
.is-loading {
  background: #ccc;
}
.danger {
  color: red;
}
</style>
