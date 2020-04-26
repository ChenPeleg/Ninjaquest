<template>
  <div id="app">
    <GameHeader text="Ninja Quest" :size="sizeOfHeader" />
    <MeditationZone v-if="AllQuestions" :AllQuestions="AllQuestions" />
    <paintingBackGround />
  </div>
</template>

<script>
import axios from "axios";
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
      sizeOfHeader: 50,
      AllQuestions: false
    };
  },
  mounted: function() {
    const url = "/allquestions.json";
    axios.get(url, { crossdomain: true }).then(res => {
      this.AllQuestions = res.data;
      console.log(this.AllQuestions);
    });
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
