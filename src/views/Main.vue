<template>
  <main>
    <!-- <img src="/public/logo.png"> -->
    <h2 class="main-title">This is Main View</h2>
    Router link
    <br/>
    <br/>
    <router-link to="/">Main</router-link>
    <router-link to="/view1">view1</router-link>
    <router-link to="/view2">view2</router-link>
    <br/><br/> A link
    <br/><br/>
    <a href="/">Main</a>
    <a href="/view1">view1</a>
    <a href="/view2">view2</a>
    <br/>
    <br/>
    <button type="button" @click="addCount()">
      >>>addCount>>>
    </button>
    <p>
      count:{{count}}
    </p>
    <p>
      loading:{{loading}}
    </p>
    <p>
      serverloading:{{serverloading}}
    </p>
    <br/>
    <button type="button" @click="asyncRequest()">
      asyncRequest
    </button>
              <button type="button" @click="blockRequest()">
      blockRequest
    </button>
    <button type="button" @click="getVerificationCode()">获取验证码</button>
    <img :src="imgCode" alt="点击刷新" @click="getVerificationCode()">
    <!-- obj.name:{{obj.data.name}} -->
  </main>
</template>

<script>
// import $ from 'jquery'
import { mapActions, mapMutations, mapGetters, mapState } from "vuex";
import API from "../api/index.js";
export default {
  data() {
    return {
      imgCode: "",
      obj: { c: 2 }
    };
  },
  mounted() {
    //this.$store.dispatch("requestStart");
    // setTimeout(() => {
    //   this.$store.dispatch("requestCompleted");
    // }, 1000);
    console.log("main mounted");
    this.$emit("view", this.meta());
    this.getVerificationCode();
  },
  async asyncDataServer({ store, route }) {
    var p = new Promise(function(resolve, reject) {
      setTimeout(function() {
        resolve({
          title: "MainVue —— SSR Template ",
          description: "this is main description",
          keywords: "view, main"
        });
      }, 1000);
    });
    return p;
    return {
      title: "MainVue —— SSR Template ",
      description: "this is main description",
      keywords: "view, main"
    };
  },
  asyncDataClient({ store, route }) {
    API.post(
      "/StoreServices.svc/p2p/product/productfinanclist",
      { date: "" },
      { xxx: "XMLHttpRequest" }
    ).then(
      function(response) {
        console.log("asyncDataClient:", response.result, new Date());
      },
      function(response) {
        console.log("asyncDataClient:", response.result, new Date());
      }
    );
  },
  created() {
    console.log("this.obj.c=", this.obj.c);
    // const list = await this.$store.dispatch("getProductList");
    // console.log("list:", list);
    // this.obj={data:{name:'111'}}
  },
  computed: {
    //...mapState(["count", "loading"]),
    count() {
      return this.$store.state.test.count;
    },
    loading() {
      return this.$store.state.test.loading;
    },
    serverloading() {
      return this.$store.state.test.serverloading;
    }
  },

  methods: {
    ...mapActions(["addCount", "requestStart", "getProductList"]),
    //...mapGetters(["getCount"]),
    meta() {
      return {
        title: "Vue SSR Template",
        description: "this is main description",
        keywords: "view, main"
      };
    },
    asyncRequest() {
      this.$store.dispatch("addCount");
      API.post(
        "/StoreServices.svc/reservationzone/reservationproductlist",
        { date: "" },
        { xxx: "XMLHttpRequest" }
      ).then(
        function(response) {
          console.log("resolve:", response);
        },
        function(response) {
          console.log("reject:", response);
        }
      );

      API.post(
        "/javaapi/members/info",
        { date: "" },
        { xxx: "XMLHttpRequest" }
      ).then(
        function(response) {
          console.log("resolve:", response);
        },
        function(response) {
          console.log("reject:", response);
        }
      );
    },
    async blockRequest() {
      //this.getProductList();
      const list = await this.$store.dispatch("getProductList");
      console.log("list:", list);
    },
    async getVerificationCode() {
      this.$bar.start();
      const img = await API.get("/verificationcode?t=" + new Date().getTime());
      this.imgCode = img;
      this.$bar.finish();
    }
  }
};
</script>
