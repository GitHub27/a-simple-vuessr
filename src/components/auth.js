import utils from './utils.js'

export default{
    checkLogin: function () {
        const userToken=utils.getCookie('userid');
            if (userToken) {
                return true;
            }
            return false;
        }
}