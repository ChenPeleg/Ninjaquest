<template>
  <div id="meditaionzone">
    <ul id="listOfAnswers" class="circle-container">
      <li
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
export default {
  name: "MeditaionZone",
  data() {
    return {
      storedAnswers: ["ans/avt (9).svg", "ans/avt (10).svg"],
      answers: [
        "ans/avt (1).svg",
        "ans/avt (2).svg",
        "ans/avt (3).svg",
        "ans/avt (4).svg",
        "ans/avt (5).svg",
        "ans/avt (6).svg",
        "ans/avt (7).svg",
        "ans/avt (8).svg"
      ]
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
      const listItems = document.querySelector("#listOfAnswers").childNodes;
      for (var i = 0; i < listItems.length; i++) {
        var offsetAngle = 360 / listItems.length;
        var rotateAngle = offsetAngle * i;
        listItems[i].style.transform =
          "rotate(" +
          rotateAngle +
          "deg) translate(0, -120px) rotate(-" +
          rotateAngle +
          "deg)";
        // const s = i;
        // setTimeout(() => {
        //   listItems[s].classList.add("turningCircle");
        // }, 1000);
      }
    }
  }

  //components: {}
  //props: {}
};
</script>

<style lang="scss" scoped>
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

/// Mixin to place items on a circle
/// @author Hugo Giraudel
/// @author Ana Tudor
/// @param {Integer} $item-count - Number of items on the circle
/// @param {Length} $circle-size - Large circle size
/// @param {Length} $item-size - Single item size

@mixin on-circle($item-count, $circle-size, $item-size) {
  position: relative;
  width: $circle-size;
  height: $circle-size;
  border-radius: 50%;
  padding: 0;
  list-style: none;

  > * {
    display: block;
    position: absolute;
    top: 50%;
    left: 50%;
    margin: -($item-size / 2);
    width: $item-size;
    height: $item-size;
    transition: all 0.2s;
  }
}

.circle-container {
  @include on-circle($item-count: 7, $circle-size: 16em, $item-size: 4em);
  margin: 5em auto 0;
  border: solid 5px tomato;

  img {
    display: block;
    max-width: 100%;
    border-radius: 50%;
    border: solid 0px tomato;
    transition: 0.15s;

    &:hover {
      transform: scale(1.2);
    }
  }
  z-index: 20;
}
.turningCircle {
  animation: turnCircle 20s linear infinite;
}
@keyframes turnCircle {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
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
</style>