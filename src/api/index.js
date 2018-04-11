import axios from 'axios'
import {
    paramToString,
    baseURL
} from '../util/index.js'

import store from '../store/index'


import {
    mapActions,
    mapMutations,
    mapGetters,
    mapState
} from "vuex";


var api = axios.create({
    timeout: 10000,//10秒超时
    headers: {
        'xyz': 'foobar'
    }
});

export default {
    async get(url, objparam = {}, apichannel = '') {
        const result = await axios.get(`${baseURL(apichannel)}${url}${paramToString(objparam)}`)
        return result.data;
    },
    async asyncPost(url, objparam, headers, apichannel) {
        store.dispatch("requestStart");
        let result = {
            status: false
        };
        try {
            const data = await axios.post(`${baseURL(apichannel)}${url}`, objparam, {
                headers: headers
            })
            result.status = data.status === 200;
            result.data = data.data ? data.data : null;
        } catch (error) {
            return result;
        }
        return result;
    },
    post(url, objparam, headers, apichannel) {
        url = "http://127.0.0.1:8088/getlist";
        console.log('server log enter FETCH_LIST_DATA  Promise  api post >>>', url, objparam, headers, apichannel)

        return new Promise(function (resolve, reject) {
            api.post(`${baseURL(apichannel)}${url}`, objparam, {
                headers: headers
            }).then(
                (response) => {
                    resolve(response.data);
                },
                (e) => {
                    reject({
                        message: "请求异常" + e
                    })
                })
        });
    }
}