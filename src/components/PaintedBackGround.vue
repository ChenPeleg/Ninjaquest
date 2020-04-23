<template>
  <div class="img_container staticFocus">
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
  position: absolute;
  top: 0%;
  height: 100%;
}
.background_img {
  position: relative;
  height: 100%;
}
.float {
  animation: bgFloats 10s ease-in-out infinite;
}
@keyframes bgFloats {
  0% {
    transform: translateX(0%);
  }
  50% {
    transform: translateX(-7%);
  }
  100% {
    transform: translateX(0%);
  }
}
.focusTree {
  animation: focusAnim 30s ease-in-out infinite;
}

@keyframes focusAnim {
  0% {
    transform: scale(1, 1);
  }
  50% {
    transform: scale(1.1, 1.1);
  }
  100% {
    transform: scale(1, 1);
  }
}
.staticFocus {
  transform: scale(1.4, 1.4) translateX(11%) translateY(-2%);
}
</style>