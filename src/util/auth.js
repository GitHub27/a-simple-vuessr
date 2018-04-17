import cookie from './cookie.js'

export default {
    checkLogin: function () {
        const userToken = cookie.getCookie('userid');
        if (userToken) {
            return true;
        }
        return false;
    }
}