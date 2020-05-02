<template>
  <div class="img_container staticFocus">
    <img
      v-if="zone=== 'medi'"
      class="background_img"
      src="../assets/images/bgninjafin128.svg"
      alt="forest"
    />
    <img
      v-if="zone=== 'battle'"
      class="background_battle"
      src="../assets/images/cave.svg"
      alt="cave"
    />
  </div>
</template>

<script>
export default {
  name: "PaintedBackGround",
  props: ["zone"]
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
.background_battle {
  position: relative;
  height: 160%;
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