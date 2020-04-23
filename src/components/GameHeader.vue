<template>
  <div class="mainHeaderText">Ninja Quest</div>
</template>

<script>
export default {
  name: "GameHeader",
  props: {
    text: String
  }
};
</script>
<style lang="scss" scoped>
$color1: rgb(110, 110, 233);
$color2: rgb(46, 46, 112);
$color3: rgb(15, 65, 71);
$border: 12px;

@font-face {
  font-family: "Julee";
  src: url("../assets/fonts/Julee-Regular.ttf");
}
.mainHeaderText {
  position: absolute;
  top: 0px;
  padding: 30px;
  font-family: "Julee";
  width: auto;
  font-weight: bold;
  font-size: 100px;
  color: $color2;
  text-shadow: 1px 1px rgb(151, 88, 82), 2px 2px rgba(126, 52, 126, 0.836),
    3px 3px rgba(122, 94, 245, 0.836), 4px 4px rgba(110, 18, 95, 0.836),
    5px 5px rgba(205, 245, 94, 0.836), 8px 8px 8px rgba(18, 19, 17, 0.836);
}
</style>
