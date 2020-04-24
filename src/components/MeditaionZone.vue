<template>
  <div id="meditaionzone">
    <ul id="listOfAnswers" class="spin" :class="{pause : ispaused}">
      <li
        class="item trasition"
        :class="{pause : ispaused}"
        v-for="(image_src,index) in answers"
        :key="index"
        :data-ansnum="index"
        v-on:click="removeFromCircle($event)"
      >
        <img :src="image_src" :key="index" :data-ansnum="index" />
      </li>
    </ul>
    <img class="mediNinja" src="../assets/images/medi-ninja.svg" alt="medi-ninja" />
    <button class="addBtn" v-on:click="addToCircle">Add 1</button>
    <button class="addBtn" v-on:click="toggleSpin">stop/ play</button>
  </div>
</template>

<script>
import getCurrentRotationFixed from "../Utils/getAngle";
export default {
  name: "MeditaionZone",
  data() {
    return {
      storedAnswers: [9, 10, 11, 12, 13, 2, 3, 4, 5, 6, 7, 8].map(
        e => `ans/avt (${e}).svg`
      ),
      // 2, 3, 4, 5, 6, 7, 8
      answers: [1, 2].map(e => `ans/avt (${e}).svg`),
      spinDuration: 12,
      ispaused: false,
      sizeOfwheel: 340,
      numberOfAnswers: 7
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

  methods: {
    addToCircle() {
      if (this.storedAnswers.length) {
        const returned = this.storedAnswers.pop();
        this.answers.push(returned);
        const arrayPosition = this.answers.length;
        setTimeout(() => {
          this.updateLayout(arrayPosition);
        }, 1);
      } else {
        alert("no more");
      }
    },
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
      // adjust to move out items in and out

      const container = document.querySelector("#listOfAnswers");

      const fields = container.childNodes;
      const width = container.offsetWidth;
      const height = container.offsetHeight;
      const angleOfContainer = getCurrentRotationFixed("listOfAnswers");
      var radius = Number(width) / 2;
      const animationDelay = `${(angleOfContainer / 360) *
        -this.spinDuration}s`;
      const itemSize = `${(width * 0.3) / fields.length + fields.length * 5}px`;
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

  //components: {}
  //props: {}
};
</script>

<style lang="scss" scoped>
#listOfAnswers {
  --sizeOfwheel: 340px;
  --spinduration: 10s;
  --numberOfAnswers: 6;
  --sizeOfans: 60px;
  //  calc(var(--sizeOfwheel) / (var(--numberOfAnswers) / 3.4));
  padding: 0px;
  width: var(--sizeOfwheel);
  height: var(--sizeOfwheel);
  margin: 10px auto;
  border: 1px solid #000;
  position: relative;
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

#meditaionzone {
  position: relative;
  width: 50%;
  text-align: center;
  z-index: 20;
}
.mediNinja {
  position: relative;
  height: 200px;
  right: -350px;
  top: -100px;
}

.addBtn {
  padding: 10px;
  position: relative;
  top: -132px;
  left: -130px;
  margin: 10px;
  background-color: burlywood;
  border: 0px;
  border-radius: 4px;
}
.addBtn:hover {
  box-shadow: 2px 2px 4px 2px rgba(15, 15, 15, 0.5);
}

/* new try */
</style>

