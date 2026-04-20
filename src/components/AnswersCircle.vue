<template>
  <div id="answerscircle" class="relative p-0 m-0">
    <ul id="listOfAnswers" ref="ansRef"
        class="spin shadow left-[70px] p-0 w-[var(--sizeOfwheel)] h-[var(--sizeOfwheel)] my-[10px] mx-auto border-4 border-[rgba(73,70,70,0.301)] inline-block rounded-full list-none"
        :class="{pause : ispaused}">
      <li
          class="item trasition w-[var(--sizeOfans)] h-[var(--sizeOfans)] text-center rounded-full absolute"
          :class="{pause : ispaused}"
          v-for="(ans, index) in answers"
          :key="index"
          :data-ansnum="ans.id"
          @click="pressAnswer($event, ans.id )"
      >
        <img
            :src="ans.image"
            :data-ansnum="ans.id"
            :class="{correctAnimationRemaining : correctAnimation && +correctAnimation !== +ans.id, correctAnimationCorrect : correctAnimation && +correctAnimation === +ans.id}"
        />
      </li>
    </ul>
    <LetterInCircle :isbright="correctAnimation"/>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import getCurrentRotationFixed from "../Utils/getAngle";
import LetterInCircle from "./LetterInCircle.vue";

interface Answer {
  id: number;
  image: string;
}

export default defineComponent({
  name: "AnswersCircle",
  components: { LetterInCircle },
  props: {
    answers: {
      type: Array as PropType<Answer[]>,
      required: true
    },
    ispaused: {
      type: Boolean,
      required: true
    },
    correctAnimation: {
      type: [Boolean, Number],
      required: true
    }
  },
  data() {
    return {
      oldAnswers: [...this.answers] as Answer[],
      spinDuration: 24 as number,
      sizeOfwheel: 340 as number
    };
  },
  mounted() {
    if (window.innerWidth < 768) {
      this.sizeOfwheel = 250;
    }
    setTimeout(() => {
      const list = this.$refs.ansRef as HTMLElement;
      list.style.setProperty("--spinduration", `${this.spinDuration}s`);
      list.style.setProperty("--sizeOfwheel", `${this.sizeOfwheel}px`);
      this.updateLayout();
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
        updatedAns = newAnswers[0] ?? 1000;
        break;
      default:
        updatedAns = 1000;
    }

    this.updateLayout(updatedAns);
  },
  methods: {
    animateCorrect() {},
    pressAnswer(event: Event, id: number) {
      this.$emit("pressAnswer", { event, id });
    },

    updateLayout(updateNumber: number = 0) {
      const calcItemSize = (widthOfContainer: number, numberOfItems: number) =>
        widthOfContainer / 4.5 + (widthOfContainer * 0.2) / numberOfItems + 5;

      const container = this.$refs.ansRef as HTMLElement;

      const fields = container.childNodes;
      const width = container.offsetWidth;
      const height = container.offsetHeight;
      const angleOfContainer = getCurrentRotationFixed(this.$refs.ansRef as HTMLElement);
      const radius = Number(width) / 2;
      const animationDelay = `${(angleOfContainer / 360) * -this.spinDuration}s`;
      const itemSize = calcItemSize(width, fields.length);
      container.style.setProperty("--sizeOfans", itemSize + "px");

      let angle = 0;
      const step = (2 * Math.PI) / fields.length;

      fields.forEach(a => {
        const element = a as HTMLElement;
        if (!element || !element.style) {
          return;
        }
        const x = Math.round(width / 2 + radius * Math.cos(angle) - element.offsetWidth / 2);
        const y = Math.round(height / 2 + radius * Math.sin(angle) - element.offsetHeight / 2);
        element.style.left = x + "px";
        element.style.top = y + "px";

        if (updateNumber === +element.dataset.ansnum! || updateNumber === 1000) {
          element.style.animationDelay = animationDelay;
          element.classList.remove("trasition");
          element.style.opacity = "0.0";
          setTimeout(() => {
            element.classList.add("trasition");
            element.style.opacity = "1";
          }, 300);
        }
        angle += step;
      });
    }
  }
});
</script>

<style scoped>
#listOfAnswers {
  --sizeOfwheel: 340px;
  --spinduration: 12s;
  --numberOfAnswers: 7;
  --sizeOfans: 90px;
  @media screen and (max-width: 640px) {
    --sizeOfwheel: 250px;
    --sizeOfans: 60px;

  }
}

.item {
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

.correctAnimationRemaining {
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
    filter: drop-shadow(0px 0px 3px rgba(30, 255, 0, 0.835)) drop-shadow(0px 0px 2px rgb(255, 255, 0)) brightness(1);
  }
  80% {
    opacity: 1;
    filter: drop-shadow(0px 0px 4px rgb(51, 255, 0)) drop-shadow(0px 0px 5px rgb(255, 255, 0)) brightness(1);
  }
  100% {
    opacity: 0;
  }
}
</style>
