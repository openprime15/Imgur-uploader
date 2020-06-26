<template>
  <div>Loggin in ...</div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "AuthHandler",
  methods: mapActions(["finalizeLogin"]),
  created() {
    this.finalizeLogin(location.hash);
  }
};
console.log(location.hash);
</script>

<style>
</style>