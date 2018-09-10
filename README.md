# ddp-iot (Node SDK 使用说明)

更新时间：2018-09-10 11:00:00

## 环境依赖

- node 注:版本需支持`ES6`，`async/await`

## 安装 ddp-iot

```

npm install

```

## 初始化SDK

```

const device = new ddpIot({
    Url: '<you-Url> such as:iot.cn-shanghai.aliyuncs.com',
    AccessKeySecret: '<you-AccessKeySecret>',
    AccessKeyId: '<you-AccessKeyId>',
});

```

请在阿里云官网控制台AccessKey管理中创建或查看您的AccessKeyId和AccessKeySecret。

## 发起调用

调用该接口查询指定设备的属性记录为例。

```
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

```

例子请查看./test/test.js
