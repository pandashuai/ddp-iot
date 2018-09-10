const request = require('request');
const rp = (opt) => {
    return new Promise((resolve, reject) => {
        const rq = request(opt, (err, httpResponse, body) => {
            if (err) {
                return reject(err);
            }
            return resolve(httpResponse);
        }).on('error', (err) => {
            return reject(err);
        });
    });
};
module.exports = rp;