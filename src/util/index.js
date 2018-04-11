export {
    paramToString,
    baseURL
}

function paramToString(params) {
    var arr = [];
    for (var p in params) {
        arr.push(p + "=" + params[p] + '&');
    }
    var result = arr.join('');
    return result.length > 0 ? "?" + result.substr(0, result.length - 1) : "";
}

function baseURL(channel) {
    switch (channel) {
        case 'net':
            return "";
        case 'java':
            return "";
        default:
            return "";
    }
}