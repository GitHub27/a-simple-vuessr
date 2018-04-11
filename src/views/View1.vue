<template>
  <main>
    <img src="/public/logo.png">
    <h3 class="view1-title">This is View1</h3>
        <router-link to="/">Main</router-link>
        <router-link to="/view1">view1</router-link>
        <router-link to="/view2">view2</router-link>
    <br/><br/>
    <a href="/">Main</a>
    <a href="/view1">view1</a>
    <a href="/view2">view2</a>
    <p>
      count:{{count}}
    </p>
  </main>
</template>
<script>
import { mapActions, mapMutations, mapGetters, mapState } from "vuex";

export default {
  async asyncDataServer({ store, route }) {
    return {
      title: "view1 page",
      description: "this is main description",
      keywords: "view, main"
    };
  },
  asyncData({ store, route }) {
    // 触发 action 后，会返回 Promise
    //return store.dispatch("addCount", "");
  },
  mounted() {
    this.$emit("view", this.meta());
  },

  preFetch() {
    return this.methods.meta();
  },
  computed: {
    count() {
      return this.$store.state.test.count;
    }
  },

  methods: {
    //...mapGetters(["getCount"]),
    meta() {
      return {
        title: " —— view1",
        description: "this is view1 description",
        keywords: "view, view1"
      };
    }
  }
};
</script>
