import * as types from './types';
import Vue from 'vue'


export default {
    [types.SET_ACTIVE_TYPE]: (state, { type }) => {
        state.activeType = type;
    },
    [types.SET_LIST]: (state, { type,data }) => {
        state.lists[type] = data;
    },

    SET_ITEMS: (state, { items }) => {
        items.forEach(item => {
            if (item) {
                Vue.set(state.items, item.id, item)
            }
        })
    },

    SET_USER: (state, { id, user }) => {
        Vue.set(state.users, id, user || false) /* false means user not found */
    }
}