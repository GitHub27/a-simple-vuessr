import * as  types  from './types';
import API from '../api/'

// console.log("[types.FETCH_LIST_DATA]", types.FETCH_LIST_DATA)
export default{
    [types.FETCH_LIST_DATA]: ({ commit, dispatch, state }, { type })=>{
        //const type = state.activeType;
        console.log('server log enter FETCH_LIST_DATA >>>')
        commit('SET_ACTIVE_TYPE', { type });
        return new Promise(function (resolve, reject) {
            console.log('server log enter FETCH_LIST_DATA  Promise >>>>>>>', type)
            
            API.post("/api/getlist",{type:type})
                .then(
                    function (data) {
                        commit('SET_LIST', { type, data })
                        commit('SET_ITEMS', { items:data })
                        resolve();
                    },function (data) {
                        reject(data);
                    });
        })

        // return fetchIdsByType(type)
        //     .then(ids => commit('SET_LIST', { type, ids }))
        //     .then(() => dispatch('ENSURE_ACTIVE_ITEMS'))
    }
}
