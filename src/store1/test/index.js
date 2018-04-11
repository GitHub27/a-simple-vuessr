

export default {
  state: {
    count: 1,
    loading:false,
    serverloading:false
  },

  actions: {
    addCount({
      commit,
      state
    }) {
      commit("ADD_COUNT");
    },
    addCount2({
      commit,
      state
    }) {
      commit("ADD_COUNT");
    },
    getTXSDate({ commit,state}){
      
      commit("ADD_COUNT");
    },
    requestStart({ commit, state }){
      commit("REQUEST_START");
    },
    requestCompleted({ commit, state }) {
      commit("REQUEST_COMPLETED");
    },
    requestStartServer({ commit, state }) {
      commit("REQUEST_START_Server");
    },
    requestCompletedServer({ commit, state }) {
      commit("REQUEST_COMPLETED_Server");
    },
  },

  mutations: {
    ADD_COUNT(state) {
      state.count++;
    },
    REQUEST_START_SERVER(state){
      state.serverloading=true;
    },
    REQUEST_COMPLETED_SERVER(state) {
      state.serverloading = false;
    },
    REQUEST_START(state) {
      state.loading = true;
    },
    REQUEST_COMPLETED(state) {
      state.loading = false;
    }
  },
  getters: {
    // getCount({
    //   state
    // }) {
    //   return state.count;
    // },
    baseURL(state) {
      let host
      if (process.env.NODE_ENV === 'production') {
        host = 'http://198.13.32.165:8080/v1'
      } else {
        host = 'http://127.0.0.1:8080/v1'
      }
      return host
    }
  }
}
