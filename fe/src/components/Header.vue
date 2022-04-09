<template>
  <div>
    <div>
      <h1>Header</h1>
    </div>
    <div>
      <button @click="mainBind">Main</button>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    mainBind: function () {
      this.$router.push("/");
    },
  },
};
</script>

<style>
</style>