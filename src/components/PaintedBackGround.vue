<template>
  <div class="staticFocus absolute top-0 h-full">
    <img
      v-if="zone=== 'medi'"
      class="relative h-full object-cover"
      src="../assets/images/bgninjafin128.svg"
      alt="forest"
    />
    <img
      v-if="zone=== 'battle'"
      class="relative h-[160%]"
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

<style scoped>
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
  //transform: scale(1.4, 1.4) translateX(11%) translateY(-2%);
}
</style>
