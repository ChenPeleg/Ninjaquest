<template>
  <div :style="{fontSize: size + 'px'}" class="mainHeaderText">{{text}}</div>
</template>

<script>
export default {
  name: "GameHeader",
  props: {
    text: String,
    size: Number
  }
};
</script>
<style scoped>
@font-face {
  font-family: "Julee";
  src: url("../assets/fonts/Julee-Regular.ttf");
}
.mainHeaderText {
  position: relative;
  padding: 10px;
  font-family: "Julee";
  width: auto;
  font-weight: bold;
  font-size: 100px;
  color: rgb(46, 46, 112);
  text-shadow: 1px 1px rgb(151, 88, 82), 2px 2px rgba(126, 52, 126, 0.836),
    3px 3px rgba(122, 94, 245, 0.836), 4px 4px rgba(110, 18, 95, 0.836),
    5px 5px rgba(205, 245, 94, 0.836), 8px 8px 8px rgba(18, 19, 17, 0.836);
  z-index: 100;
}
</style>
