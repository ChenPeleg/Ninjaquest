<template>
  <div id="answerscircle">
    <ul id="listOfAnswers" ref="ansRef" class="spin shadow" :class="{pause : ispaused}">
      <li
        class="item trasition"
        :class="{pause : ispaused}"
        v-for="(ans, index) in answers"
        :key="index"
        :data-ansnum="ans.id"
        @click="pressAnswer($event, ans.id )"
      >
        <img
          :src="ans.image"
          :data-ansnum="ans.id"
          :class="{correctAnimationRemainig : correctAnimation && +correctAnimation !== +ans.id, correctAnimationCorrect : correctAnimation && +correctAnimation === +ans.id}"
        />
      </li>
    </ul>
    <LetterInCircle :isbright="correctAnimation" />
  </div>
</template>

<script>
import getCurrentRotationFixed from "../Utils/getAngle.js";
import LetterInCircle from "./LetterInCircle.vue";
export default {
  name: "AnswersCircle",
  components: { LetterInCircle },
  props: ["answers", "ispaused", "correctAnimation"],
  data() {
    return {
      oldAnswers: [...this.answers],
      spinDuration: 24, //12
      sizeOfwheel: 340
    };
  },
  mounted() {
    setTimeout(() => {
      const list = this.$refs.ansRef;
      list.style.setProperty("--spinduration", `${this.spinDuration}s`);
      list.style.setProperty("--sizeOfwheel", `${this.sizeOfwheel}px`);
      this.updateLayout();
      //setTimeout(() => this.updateLayout(), 300); // to get the radious good after the initial ordering
    }, 100);
  },
  updated() {
    if (this.correctAnimation) {
      this.animateCorrect();
    }
    const newAnswers = [...this.answers]
      .map(o => o.id)
      .filter(a => !this.oldAnswers.map(o => o.id).includes(a));

    this.oldAnswers = [...this.answers];
    let updatedAns = 1000;
    switch (newAnswers.length) {
      case 0:
        updatedAns = 0;
        break;
      case 1:
        updatedAns = newAnswers[0];
        break;
      default:
        updatedAns = 1000;
    }

    this.updateLayout(updatedAns);
  },
  methods: {
    animateCorrect() {},
    pressAnswer(event, id) {
      this.$emit("pressAnswer", { event, id });
    },

    updateLayout(updateNumber = 0) {
      const calcItemSize = (widthOfContainer, numberOfItems) =>
        widthOfContainer / 4.5 + (widthOfContainer * 0.2) / numberOfItems + 5;

      const container = this.$refs.ansRef;

      const fields = container.childNodes;
      const width = container.offsetWidth;
      const height = container.offsetHeight;
      const angleOfContainer = getCurrentRotationFixed(this.$refs.ansRef);
      var radius = Number(width) / 2;
      const animationDelay = `${(angleOfContainer / 360) *
        -this.spinDuration}s`;
      const itemSize = calcItemSize(width, fields.length);
      container.style.setProperty("--sizeOfans", itemSize + "px");

      var angle = 0,
        step = (2 * Math.PI) / fields.length;

      fields.forEach(a => {
        var x = Math.round(
          width / 2 + radius * Math.cos(angle) - a.offsetWidth / 2
        );
        var y = Math.round(
          height / 2 + radius * Math.sin(angle) - a.offsetHeight / 2
        );
        a.style.left = x + "px";
        a.style.top = y + "px";
        a.dataset.ansnum === "1";

        if (updateNumber === +a.dataset.ansnum || updateNumber === 1000) {
          a.style.animationDelay = animationDelay;
          a.classList.remove("trasition");
          a.style.opacity = "0.0";
          setTimeout(() => {
            a.classList.add("trasition");
            a.style.opacity = "1";
          }, 300);
        }
        angle += step;
      });
    }
  }
};
</script>

<style lang="scss" scoped>
#answerscircle {
  position: relative;
  padding: 0px;
  margin: 0px;
}
#listOfAnswers {
  --sizeOfwheel: 340px;
  --spinduration: 12s;
  --numberOfAnswers: 7;
  --sizeOfans: 90px;
  //  calc(var(--sizeOfwheel) / (var(--numberOfAnswers) / 3.4));
  // position: relative;
  // display: inline;
  left: 70px;
  padding: 0px;
  width: var(--sizeOfwheel);
  height: var(--sizeOfwheel);
  margin: 10px auto;
  border: 4px solid rgba(73, 70, 70, 0.301);
  display: inline-block;
  border-radius: 50%;
  list-style-type: none;
}
.item {
  width: var(--sizeOfans);
  height: var(--sizeOfans);
  text-align: center;
  border-radius: 50%;
  position: absolute;
  animation-name: inherit;
  animation-duration: inherit;
  animation-iteration-count: inherit;
  animation-timing-function: inherit;
  animation-direction: reverse;
}
.spin {
  animation-name: spin;
  animation-duration: var(--spinduration);
  animation-iteration-count: infinite;
  animation-timing-function: linear;
}
.pause {
  animation-play-state: paused;
}
@keyframes spin {
  100% {
    transform: rotate(1turn);
  }
}
.trasition {
  transition: all 0.5s ease-in-out;
}
.shadow {
  box-shadow: 4px 4px 1px rgba(134, 134, 141, 0.3),
    -2px -4px 1px rgba(121, 120, 120, 0.5),
    4px 4px 8px 5px rgba(100, 100, 100, 0.7),
    -1px 0px 1px 1px rgba(229, 255, 0, 0.404);
}
.correctAnimationRemainig {
  animation: fading 1s forwards;
}
@keyframes fading {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
.correctAnimationCorrect {
  animation: fadingAndGlowing 2s forwards;
}
@keyframes fadingAndGlowing {
  0% {
    opacity: 1;
    filter: drop-shadow(0px 0px 3px rgba(30, 255, 0, 0.835))
      drop-shadow(0px 0px 2px rgb(255, 255, 0)) brightness(1);
  }
  80% {
    opacity: 1;
    filter: drop-shadow(0px 0px 4px rgb(51, 255, 0))
      drop-shadow(0px 0px 5px rgb(255, 255, 0)) brightness(1);
  }
  100% {
    opacity: 0;
  }
}
</style>