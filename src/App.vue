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

<script lang="ts">
import { defineComponent } from 'vue';
import BattleZone from "./components/BattleZone.vue";
import AllQuestionsData from "./allquestions.json";
import GameHeader from "./components/GameHeader.vue";
import paintingBackGround from "./components/PaintedBackGround.vue";
import MeditationZone from "./components/MeditaionZone.vue";

export default defineComponent({
  name: "App",
  components: {
    GameHeader,
    paintingBackGround,
    MeditationZone,
    BattleZone
  },
  data() {
    return {
      zone: "medi" as string,
      sizeOfHeader: 50 as number,
      AllQuestions: AllQuestionsData,
      questionNumber: 1 as number
    };
  }
});
</script>

