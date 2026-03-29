<template>
  <div id="app" class="absolute h-full w-full m-0 p-0 overflow-hidden text-[#2c3e50] [font-family:Avenir,Helvetica,Arial,sans-serif] [background:linear-gradient(to_bottom,#b7eaff_0%,#5395b1_30%,#94dfff_100%)]">
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
      zone: "medi",
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

