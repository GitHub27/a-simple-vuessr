<template>
  <div class="page">
    <p>{{id}}</p>
  </div>
</template>

<script>
import auth from "../util/auth.js";

export default {
  data() {
    return {
      id: ""
    };
  },
  //   props: ["detailid"],
  components: {},
  beforeRouteEnter: (to, from, next) => {
    if (auth.checkLogin()) {
      next();
    } else {
      next({ path: "/login" });
    }
  },
  mounted() {
    this.id = this.$route.params.id;
  }
};
</script>

<style scoped lang="stylus">
</style>
