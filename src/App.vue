<template>
  <div id="app">
    <GameHeader text="Welcome to Your Vue.js App" />
  </div>
</template>

<script>
import GameHeader from "./components/GameHeader.vue";
export default {
  name: "App",
  components: {
    GameHeader
  }
};
</script>

<style>
#app {
  position: absolute;
  height: 99%;
  width: 99%;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  color: #2c3e50;
  margin: 0px;
  padding: 0px;
  overflow: hidden;
  overflow-y: hidden;
  background-image: url("assets/images/bgninjafin.png");
}
</style>
