const ddpIot = require('../bin');

// new ddpIot
const device = new ddpIot({
    Url: '<you-Url> such as:iot.cn-shanghai.aliyuncs.com',
    AccessKeySecret: '<you-AccessKeySecret>',
    AccessKeyId: '<you-AccessKeyId>',
});


// Alibaba Cloud platform to view the parameters of QueryDevicePropertyData
(async function() {
    try {
        let res = await device.request({
            Action: 'QueryDevicePropertyData',
            ProductKey: '<you-ProductKey>',
            DeviceName: '<you-DeviceName>',
            Identifier: '<you-Identifier>',
            StartTime: +new Date('<you-StartTime>'),
            EndTime: +new Date('<you-EndTime>'),
            PageSize: '<you-PageSize>',
            Asc: '0(倒序) or 1(升序)'
        });
        console.log(res);
    } catch (error) {
        console.log(error);
    }
})();