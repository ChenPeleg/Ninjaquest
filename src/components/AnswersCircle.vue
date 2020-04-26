<template>
  <div id="answerscircle">
    <ul id="listOfAnswers" class="spin" :class="{pause : ispaused}">
      <li
        class="item trasition"
        :class="{pause : ispaused}"
        v-for="(ans, index) in answers"
        :key="index"
        :data-ansnum="ans.ki"
        v-on:click="removeFromCircle($event)"
      >
        <img :src="ans.image" :data-ansnum="ans.ki" />
      </li>
    </ul>
  </div>
</template>

<script>
import getCurrentRotationFixed from "../Utils/getAngle.js";

export default {
  name: "AnswersCircle",
  //components: {}
  props: ["answers", "ispaused"],
  data() {
    return {
      oldAnswers: [],
      spinDuration: 12,
      sizeOfwheel: 340
    };
  },
  mounted() {
    setTimeout(() => {
      const list = document.querySelector("#listOfAnswers");
      list.style.setProperty("--spinduration", `${this.spinDuration}s`);
      list.style.setProperty("--sizeOfwheel", `${this.sizeOfwheel}px`);
      this.updateLayout();
    }, 0);
  },
  updated() {
    const newAnswers = [...this.answers].filter(
      a => !this.oldAnswers.includes(a)
    );

    console.log(newAnswers);
    this.oldAnswers = [...this.answers];
    const updatedAns = newAnswers.length
      ? this.answers.indexOf(newAnswers)
      : 99999999;
    this.updateLayout(updatedAns);
  },
  methods: {
    removeFromCircle(event) {
      const key = event.target.dataset.ansnum;
      const removed = this.answers.splice(key, 1);
      this.storedAnswers.push(removed);
      setTimeout(() => this.updateLayout(), 2);
    },
    toggleSpin() {
      this.ispaused = !this.ispaused;
    },

    updateLayout(updateNumber = 10000000) {
      const calcItemSize = (widthOfContainer, numberOfItems) =>
        widthOfContainer / 4.5 + (widthOfContainer * 0.2) / numberOfItems + 5;

      const container = document.querySelector("#listOfAnswers");

      const fields = container.childNodes;
      const width = container.offsetWidth;
      const height = container.offsetHeight;
      const angleOfContainer = getCurrentRotationFixed("listOfAnswers");
      var radius = Number(width) / 2;
      const animationDelay = `${(angleOfContainer / 360) *
        -this.spinDuration}s`;
      const itemSize = calcItemSize(width, fields.length) + "px";
      container.style.setProperty("--sizeOfans", itemSize);

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

        if (updateNumber === [...fields].indexOf(a) + 1) {
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
  padding: 0px;
  margin: 0px;
}
#listOfAnswers {
  --sizeOfwheel: 340px;
  --spinduration: 10s;
  --numberOfAnswers: 7;
  --sizeOfans: 60px;
  //  calc(var(--sizeOfwheel) / (var(--numberOfAnswers) / 3.4));
  // position: relative;
  display: inline;
  left: 70px;
  padding: 0px;
  width: var(--sizeOfwheel);
  height: var(--sizeOfwheel);
  margin: 10px auto;
  border: 1px solid #000;
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
</style>