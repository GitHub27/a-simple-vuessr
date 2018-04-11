import API from '../../api/'

export default {
    /**
     * 获取产品列表
     * @param {*} param0 
     */
    async getProductList({
        commit,
        state
    }) {
        const result = await API.asyncPost("/StoreServices.svc/user/getnoticeinfolist", {}, '');
        return result;
    }
}