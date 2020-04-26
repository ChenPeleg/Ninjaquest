<template>
  <div class="question">
    <div class="question-text">
      <slot />
    </div>

    <img class="scroll" src="../assets/images/scroll.svg" />
  </div>
</template>

<script>
export default {
  name: "Question"
  //components: {}
  //props: {}
};
</script>

<style lang="scss" scoped>
@font-face {
  font-family: "Julee";
  src: url("../assets/fonts/Julee-Regular.ttf");
}
.question {
  vertical-align: top;
  position: relative;
  top: 20px;
  margin: 0px;
  display: inline-block;
  height: 400px;
  width: 600px;
}
.question-text {
  font-family: "Julee";
  font-weight: bold;
  padding: 90px;
  position: absolute;
  font-size: 37px;
}
.scroll {
  vertical-align: top;
  width: 100%;
  height: 100%;
}
</style>