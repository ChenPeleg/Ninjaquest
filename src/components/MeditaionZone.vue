<template>
  <div id="meditaionzone">
    <ul id="listOfAnswers" class>
      <li
        class="item"
        v-for="(image_src,index) in answers"
        :key="index"
        :data-ansNum="index"
        v-on:click="removeFromCircle($event)"
      >
        <img :src="image_src" :key="index" :data-ansnum="index" />
      </li>
    </ul>
    <img class="mediNinja" src="../assets/images/medi-ninja.svg" alt="medi-ninja" />
    <button class="addBtn" v-on:click="addToCircle">Add 1</button>
  </div>
</template>

<script>
import getCurrentRotationFixed from "../Utils/getAngle";
export default {
  name: "MeditaionZone",
  data() {
    return {
      storedAnswers: ["ans/avt (9).svg", "ans/avt (10).svg"],
      // 2, 3, 4, 5, 6, 7, 8
      answers: [1, 2, 3, 4, 5, 6, 7, 8].map(e => `ans/avt (${e}).svg`)
    };
  },
  mounted() {
    setTimeout(() => this.updateLayout(), 0);
  },

  methods: {
    addToCircle() {
      if (this.storedAnswers.length) {
        const returned = this.storedAnswers.pop();
        this.answers.push(returned);
        setTimeout(() => this.updateLayout(), 2);
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

    updateLayout() {
      var radius = 120; // adjust to move out items in and out
      const container = document.querySelector("#listOfAnswers");
      const fields = container.childNodes;
      const angleOfContainer = getCurrentRotationFixed("listOfAnswers");
      console.log(angleOfContainer);
      const width = container.offsetWidth;
      const height = container.offsetHeight;

      var angle = 0,
        step = (2 * Math.PI) / fields.length;
      fields.forEach(a => {
        var x = Math.round(
          width / 2 + radius * Math.cos(angle) - a.offsetWidth / 2
        );
        var y = Math.round(
          height / 2 + radius * Math.sin(angle) - a.offsetHeight / 2
        );
        var animationDelay = `${-10 + (angleOfContainer / 360) * 10}s`;
        // animationDelay = "-0s";
        a.style.left = x + "px";
        a.style.top = y + "px";
        a.style.animationDelay = animationDelay;
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
  padding: 0px;
  width: 230px;
  height: 230px;
  margin: 10px auto;
  border: 1px solid #000;
  position: relative;
  border-radius: 50%;
  animation: spin 10s linear infinite;
  list-style-type: none;
  transition: all 0.5s ease-in-out;
}
.item {
  width: 50px;
  height: 50px;
  text-align: center;
  border-radius: 50%;
  position: absolute;
  animation: spin 10s linear infinite reverse;
}
@keyframes spin {
  100% {
    transform: rotate(1turn);
  }
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
  right: -200px;
  top: -100px;
}

.addBtn {
  padding: 10px;
  position: absolute;
  top: -22px;
  left: 15%;
  background-color: burlywood;
  border: 0px;
  border-radius: 4px;
}
.addBtn:hover {
  box-shadow: 2px 2px 4px 2px rgba(15, 15, 15, 0.5);
}

/* new try */
</style>

