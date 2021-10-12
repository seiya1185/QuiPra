<template>
  <div class="number">
    <p>第{{ quizNumber }}問</p>
  </div>
</template>

<script>
export default {
  name: "quizNumber",
  props: {
    quizNumber: Number,
    default: 1,
  },
};
</script>

<style scoped lang="scss">
@import "../assets/sass/prepends.scss";

.number {
  position: absolute;
  top: 7%;
  left: 0;
  @media (max-width: 480px) {
    left: 5%;
  }
  right: 0;
  bottom: 0;
  text-align: center;
  p {
    @include rem(40);
    font-weight: 700;
  }
}
</style>
