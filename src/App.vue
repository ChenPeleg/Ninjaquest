<template>
  <div id="app">
    <GameHeader text="Ninja Quest" :size="sizeOfHeader" />
    <MeditationZone />
    <paintingBackGround />
  </div>
</template>

<script>
import GameHeader from "./components/GameHeader.vue";
import paintingBackGround from "./components/PaintedBackGround";
import MeditationZone from "./components/MeditaionZone";
export default {
  name: "App",
  components: {
    GameHeader,
    paintingBackGround,
    MeditationZone
  },
  data: () => {
    return {
      sizeOfHeader: 50
    };
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
  overflow: hidden;

  background: linear-gradient(to bottom, #b7eaff 0%, #5395b1 30%, #94dfff 100%);
}
</style>
