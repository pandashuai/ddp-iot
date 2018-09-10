function toGETParam(param) {
    let _vr = [];
    for (let key in param) {
        _vr.push(key + '=' + encodeURIComponent(param[key]));
    }

    return _vr.join('&')
};
module.exports = toGETParam;