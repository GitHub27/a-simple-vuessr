import * as types from '../types'

export default{
    [types.GET_PRODUCT_LIST](state, {
        list
    }) {
        state.productlist = list;
    }
}
