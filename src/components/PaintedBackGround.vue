<template>
  <div class="img_container">
    <img class="background_img" src="../assets/images/bgninjafin128.svg" alt="forest" />
  </div>
</template>

<script>
export default {
  name: "PaintedBackGround"
};
</script>

<style lang="scss" scoped>
.img_container {
  position: relative;
  height: 100%;
}
.background_img {
  position: relative;
  height: 100%;
}
.float {
  animation: bgFloats 20s ease-in-out infinite;
}
@keyframes bgFloats {
  0% {
    transform: translateX(0%);
  }
  50% {
    transform: translateX(-5%);
  }
  100% {
    transform: translateX(0%);
  }
}
.focusTree {
  animation: focusAnim 20s ease-in-out infinite;
}

@keyframes focusAnim {
  0% {
    transform: scale(0%, 0%);
  }
  50% {
    transform: scale(-5%, -5%);
  }
  100% {
    transform: scale(0%, 0%);
  }
}
</style>