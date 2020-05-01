<template>
  <img
    class="mediNinja"
    :class="{medininjaGlow: correctAnimation}"
    src="../assets/images/medi-ninja.svg"
    alt="medi-ninja"
  />
</template>

<script>
export default {
  name: "MediNinja",
  //components: {},
  props: ["correctAnimation"]
};
</script>

<style lang="scss" scoped>
.medininja {
  display: inline;
  position: relative;
  height: 150px;
  bottom: -160px;
  margin: 0px;
  border-radius: 20px 20px;
  transition: filter linear 2s;
  background: rgba(241, 255, 0, 0.2);
  // filter: drop-shadow(16px -16px 3px rgba(255, 255, 0, 0))
  //   drop-shadow(-16px -16px 3px rgba(255, 255, 0, 0)) brightness(1)
  //   hue-rotate(0deg);
}

.medininjaGlow {
  // background: radial-gradient(
  //   circle,
  //   rgba(241, 255, 0, 1) 0%,
  //   rgba(255, 251, 0, 0) 80%,
  //   rgba(255, 251, 0, 0) 100%
  // );
  // filter: drop-shadow(16px -16px 3px rgba(255, 255, 0, 0.575))
  //   drop-shadow(-16px -16px 3px rgba(255, 255, 0, 0.596)) brightness(1.25)
  //   hue-rotate(40deg);
}
</style>