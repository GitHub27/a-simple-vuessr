<template>
  <div class="page">
    login
  </div>
</template>

<script>
import auth from "../components/auth.js";

export default {
  data() {
    return {
      id: ""
    };
  },
  //   props: ["detailid"],
  components: {},
  mounted() {
    this.id = this.$route.params.id;
  }
};
</script>

<style scoped lang="stylus">
</style>
