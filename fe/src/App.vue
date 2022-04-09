<template>
  <div>
    <Header></Header>
    <!-- <BoardMain></BoardMain> -->
    <router-view></router-view>
  </div>
</template>

<script>
// import BoardMain from "@/components/board/BoardMain.vue";
import Header from '@/components/Header.vue'

export default {
  name: "App",
  components: {
    Header,
    // BoardMain,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
