<template>
  <div>
    <div v-if="loading()" class="txs-ajax-loading-container">
      <div class="txs-ajax-loading-img">加载中。。
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapMutations, mapGetters, mapState } from "vuex";
export default {
  data() {
    return {
      ...mapState({
        loading: state => state.test.loading
      })
    };
  }
};
</script>

<style>
.txs-ajax-loading-img {
  height: 100%;
  background: url(../assets/img/loading.gif) center no-repeat;
  background-size: 2.774rem 2.774rem;
}
.txs-ajax-loading-container {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 999999;
}
</style>
