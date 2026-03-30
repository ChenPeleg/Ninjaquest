<template>
  <img
    class="mediNinja desaturate"
    :class="{medininjaGlow: correctAnimation}"
    src="../assets/images/medi-ninja.svg"
    alt="medi-ninja"
  />
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: "MediNinja",
  props: {
    correctAnimation: {
      type: [Boolean, Number],
      required: true
    }
  }
});
</script>

<style scoped>
.medininjaGlow {
  animation: ninjaObsorves 3s forwards;
  animation-delay: 1s;
}
@keyframes ninjaObsorves {
  0% {
    filter: grayscale(0%) drop-shadow(-16px -16px 10px rgba(255, 255, 0, 0.596))
      drop-shadow(-56px -16px 2px rgba(255, 255, 0, 0.651))
      drop-shadow(-26px -06px 2px rgba(255, 230, 0, 0.89))
      drop-shadow(-76px -16px 2px rgba(255, 255, 0, 0.89))
      drop-shadow(-126px -66px 2px rgb(255, 255, 0)) hue-rotate(30deg)
      brightness(1.75);
  }
  100% {
    filter: grayscale(0%);
  }
}
</style>
