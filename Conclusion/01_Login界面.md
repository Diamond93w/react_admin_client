## 一、维持登录 & 自动跳转
功能描述：登录成功后，无论是页面刷新、关闭浏览器还是电脑关机仍然保存当前登录；如果内存中没有账号密码则自动跳转到 Login 界面

实现思路：将用户登录的账号密码保存在 localstorage 中

    1. 建立单独的工具模块 storageUtils.js，定义对用户数据进行处理的方法，并暴露。
```js
const USER_KEY = 'user_key'
export default {
    // 保存user
    saveUser(user){
        localStorage.setItem(USER_KEY, JSON.stringify(user))
    },

    // 读取user
    getUser(){
        return JSON.parse(localStorage.getItem(USER_KEY) || '{}')
    },

    // 删除user
    removeUser(){
        localStorage.removeItem(USER_KEY)
    }
}
```
    2. 在 Admin 中判断当前内存中有无 user，没有的话自动跳转到登录界面
```jsx
if (!user || !user.id) {
    navigate("/login", { replace: true })
  }
```

## 二、antd v5 使用 message 出现的 “static function” 问题

解决方案：要用 antd 中的 App 包裹自己的组件，并且以这种方式使用： `const { message } = App.useApp()`
详见：`https://ant.design/components/app-cn#%E5%85%A8%E5%B1%80%E5%9C%BA%E6%99%AFredux-%E5%9C%BA%E6%99%AF`

## 三、异步——async

用 async 和 await 的好处：
      
    1. 来简化Promise写法，不用then()来指定成功/失败的回调函数
    2. 以同步的编码（没有回调函数）方式实现异步流程 
ps：
   
    1. 在返回的Promise的表达式左侧写await：不想要Promise，想要Promise异步执行成功的value数据
    2. await所在函数（最近的）定义的左侧写async

## 四、API 调用
功能描述：能够根据接口文档定义接口请求

实现过程：

1. 单独创建一个文件用来实现所有 API 的调用，调用封装好的 AJAX 请求函数完成调用

```js
// 登录接口
// BASE是基础路径
export const reqLogin = (username, password) => ajax(BASE + '/login', { username, password }, 'POST')
```
2. 配置代理

后端服务器运行在 5000 端口，前台应用运行在 3000 端口，需要配置代理完成数据的调用。
在 package.json 文件中添加代理：`"proxy": "http://localhost:5000"`（使用 React 脚手架创建项目，脚手架自带的有代理，只需要声明使用即可）

3. 统一处理请求异常

项目汇总存在许多接口的调用，如果单独对每一个请求进行判断失败与否会很麻烦。

实现步骤：

(1). 在 ajax( ) 请求函数外层包一个自己创建的Peomise对象，在请求出错的时候，不调用 reject( )，而是提示异常信息。
```js
export default function ajax(url, data = {}, method = 'GET') {
    return new Promise((resolve, reject) => {
        let promise;
        // 1. 执行异步ajax请求
        if (method === 'GET') {
            // 发送GET请求
            promise = axios.get(url, {
                params: data
            })
        } else {
            // 发送POST请求
            promise = axios.post(url, data)
        }
        promise.then(response => {
            // 2. 如果成功了，调用resolve()
            resolve(response.data)
        }).catch(error => {
            // 3. 如果失败了，不调用reject()，而是提示异常信息，如果调用就会触发外面的catch
            message.error("请求出错了：" + error.message)
        })
    })
}
```
(2). 在单独使用每个接口的调用时，不设置 catch 捕获请求失败的错误。只在请求成功中设置如：用户名密码错误等

