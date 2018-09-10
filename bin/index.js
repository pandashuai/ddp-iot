const rp = require('./rp');
const toGETParam = require('./toGETParam');
const dictionarySort = require('./dictionarySort');
const crypto = require('crypto');

function ddpIot(opt = {}) {
    this.Url = opt.Url;
    this.AccessKeySecret = opt.AccessKeySecret || '';
    this.opt = {};
    this.opt.Format = opt.Format || 'JSON';
    this.opt.AccessKeyId = opt.AccessKeyId || '';
    this.opt.Version = '2018-01-20';
    this.opt.SignatureMethod = 'HMAC-SHA1';
    this.opt.regionId = opt.regionId || 'cn-shanghai';
    this.opt.SignatureVersion = '1.0';
    this.opt.SignatureNonce = opt.SignatureNonce || '';
    this.opt.Timestamp = opt.Timestamp || '';
    this.init();
    return this;
}
ddpIot.prototype.init = function() {
    if (!this.Url)
        throw new Error('The address is not filled, such as: iot.cn-shanghai.aliyuncs.com');
    if (!this.AccessKeySecret)
        throw new Error('AccessKeySecret is not filled, view on Alibaba Cloud platform');
    if (!this.opt.AccessKeyId)
        throw new Error('AccessKeyId is not filled, view on Alibaba Cloud platform');
};
ddpIot.prototype.request = async function(opt = {}) {
    opt = Object.assign(this.opt, opt);
    if (!opt.SignatureNonce)
        opt.SignatureNonce = Math.random()
    if (!opt.Timestamp)
        opt.Timestamp = new Date().toISOString();
    // Dictionary ordering
    opt = dictionarySort(opt);
    // signature
    let sign = 'GET&%2F&' + encodeURIComponent(toGETParam(opt));
    sign = crypto.createHmac('sha1', this.AccessKeySecret + '&').update(sign).digest().toString('base64');
    opt.Signature = sign;
    // Convert to get parameter
    const getparam = toGETParam(opt);
    let res = await rp({
        url: `https://${this.Url}/?${getparam}`
    });
    return this.opt.Format === 'JSON' ? (typeof(res.body) === 'string' ? JSON.parse(res.body) : res.body) : res.body
};


module.exports = ddpIot;