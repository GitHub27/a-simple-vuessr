import Vue from "vue";
import Vuex from "vuex";
import getters from "./getters";
import actions from "./actions";
import mutations from "./mutations";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    activeType: "top",
    itemsPerPage: 10,
    items: {
      /* [id: number]: Item */
    },
    users: {
      /* [id: string]: User */
    },
    lists: {
      top: [
        /* number */
      ],
      new: [],
      show: [],
      ask: [],
      job: []
    }
  },
  getters,
  actions,
  mutations
});