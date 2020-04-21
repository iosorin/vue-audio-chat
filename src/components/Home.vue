<template>
  <div class="container">
    <h1>home</h1>
    <User v-slot:user="{ user }">
      <div v-if="user">Loggen-is as {{ user.uid }}</div>
      <Login v-else />
    </User>
  </div>
</template>

<script>
import Login from "./Login";
import User from "./User";

export default {
  components: {
    Login,
    User
  }
};
</script>
