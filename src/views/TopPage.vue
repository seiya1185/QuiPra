<template>
  <div>
    <top></top>
    <feature></feature>
    <how-to-use></how-to-use>
  </div>
</template>

<script>
import Top from "../components/Top.vue";
import Feature from "../components/Feature.vue";
import HowToUse from "../components/HowToUse.vue";

export default {
  components: {
    Top,
    Feature,
    HowToUse,
  },
};
</script>
