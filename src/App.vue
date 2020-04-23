<template>
  <div id="app">
    <paintingBackGround />
    <GameHeader text="Welcome to Your Vue.js App" />
  </div>
</template>

<script>
import GameHeader from "./components/GameHeader.vue";
import paintingBackGround from "./components/PaintedBackGround";
export default {
  name: "App",
  components: {
    GameHeader,
    paintingBackGround
  }
};
</script>

<style>
#app {
  position: absolute;
  height: 100%;
  width: 100%;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  color: #2c3e50;
  margin: 0px;
  padding: 0px;
  /* overflow: hidden;
  overflow-y: hidden; */
  background: linear-gradient(to bottom, #b7eaff 0%, #5395b1 30%, #94dfff 100%);
}
#paintingBackGround {
  position: relative;
  height: 100%;
  width: 100%;
}
</style>
