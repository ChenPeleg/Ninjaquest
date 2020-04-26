<template>
  <div class="question">
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
.question {
  vertical-align: top;
  position: relative;
  top: 20px;
  margin: 0px;
  display: inline-block;
  height: 400px;
  width: 600px;
}

.scroll {
  vertical-align: top;
  width: 100%;
  height: 100%;
}
</style>