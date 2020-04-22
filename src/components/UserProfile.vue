<template>
  <div>
    <h3>Logged in as {{ user.uid }}</h3>
    <button @click="auth.signOut()">sing out</button>
  </div>
</template>

<script>
import { auth } from "../firebase";

export default {
  data() {
    return {
      auth
    };
  },
  props: ["user"]
};
</script>

<style>
</style>
