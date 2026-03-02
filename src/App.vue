<template>
  <div id="app">
    <GameHeader text="Ninja Quest" :size="sizeOfHeader" />

    <MeditationZone
      v-if="AllQuestions && zone === 'medi'"
      :AllQuestions="AllQuestions"
      :questionNumber="questionNumber"
      @nextQuestion="questionNumber++"
    />
    <BattleZone v-if="zone==='battle'" />
    <paintingBackGround :zone="zone" />
  </div>
</template>

<script>
import BattleZone from "./components/BattleZone.vue";
import axios from "axios";
import GameHeader from "./components/GameHeader.vue";
import paintingBackGround from "./components/PaintedBackGround.vue";
import MeditationZone from "./components/MeditaionZone.vue";
export default {
  name: "App",
  components: {
    GameHeader,
    paintingBackGround,
    MeditationZone,
    BattleZone
  },
  data: () => {
    return {
      zone: "battle",
      sizeOfHeader: 50,
      AllQuestions: false,
      questionNumber: 1
    };
  },
  mounted: function() {
    const url = "/allquestions.json";
    axios.get(url, { crossdomain: true }).then(res => {
      this.AllQuestions = res.data;
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
