<template>
  <div class="question align-top relative top-5 m-0 inline-block h-100 lg:w-150 w-screen">
    <div class="question-text font-bold p-[90px] absolute text-[37px]">
      <slot />
    </div>
    <img class="align-top w-full h-full" src="../assets/images/scroll.svg" />
  </div>
</template>

<script>
export default {
  name: "Question"
  //components: {}
  //props: {}
};
</script>

<style scoped>
@font-face {
  font-family: "Julee";
  src: url("../assets/fonts/Julee-Regular.ttf");
}
.question-text {
  font-family: "Julee";
}
</style>
