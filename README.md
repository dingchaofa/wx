# wx

> 微信小程序、微信公众号、web及后台开发。

>技术栈：Node.js、Koa、Koa-router、Nuxt.js、Vue.js、ES6、ES7、ramda.js、sha1、raw-body、ejs、


### 扫描二维码进入测试

![测试二维码](https://raw.githubusercontent.com/dingchaofa/wx/master/static/img/test_account.png)


### 进度
1. 部署MongoDB，开通微信个人订阅号实力青铜V5。

2. 公众号拿到微信测试号access_token，并存储到本地数据库，测试地址：https://mp.weixin.qq.com/debug/cgi-bin/sandboxinfo?action=showinfo&t=sandbox/index。

3. 公众号通过微信测试账号，能自动回复用户消息。

4. 公众号回复用户消息模版引擎构建模版`wx/server/wechat-lib/tpl.js`

5. 公众号测试新增、获取、修改、删除素材接口

6. 公众号测试获取用户信息接口，标签接口

7. 公众号自定义菜单


### 注意事项

1. xml格式的数据传输，注意数据的字段是否有空格，不允许出现空格。
2. ejs中的`<%- %>`是不会转译标签的，`<%= %>`是会转译标签的。

### 项目笔记
https://dingchaofa.github.io/