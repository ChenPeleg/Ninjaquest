<template>
  <div id="meditaionzone">
    <ul class="circle-container">
      <li v-for="(image_src,index) in answers" :key="index" v-on:click="removeFromCircle($event)">
        <img :src="image_src" />
      </li>
    </ul>
    <!-- <img class="mediNinja" src="../assets/images/medi-ninja.svg" alt="medi-ninja" /> -->
    <button class="addBtn" v-on:click="addToCircle">Add 1</button>
  </div>
</template>

<script>
export default {
  name: "MeditaionZone",
  data() {
    return {
      originAnswers: [
        "ans/avt (1).svg",
        "ans/avt (2).svg",
        "ans/avt (3).svg",
        "ans/avt (4).svg",
        "ans/avt (5).svg",
        "ans/avt (6).svg",
        "ans/avt (7).svg",
        "ans/avt (8).svg"
      ],
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
  methods: {
    addToCircle() {
      this.answers.push("ans/avt (9).svg");
    },
    removeFromCircle(event) {
      event.target.remove();
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
  border: solid black;
  text-align: center;
  z-index: 20;
}
.mediNinja {
  height: 200px;
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

    $angle: (360 / $item-count);
    $rot: 0;

    @for $i from 1 through $item-count {
      &:nth-of-type(#{$i}) {
        transform: rotate($rot * 1deg)
          translate($circle-size / 2)
          rotate($rot * -1deg);
      }

      $rot: $rot + $angle;
    }
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
.addBtn {
  padding: 10px;
  position: absolute;
  top: 44px;
  left: 25%;
  background-color: burlywood;
  border: 0px;
  border-radius: 4px;
}
.addBtn:hover {
  box-shadow: 2px 2px 4px 2px rgba(15, 15, 15, 0.5);
}
</style>