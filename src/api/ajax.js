/* 
    能发送AJAX请求的函数模块
    封装axios库
    函数的返回值：Promise对象
    1. 优化：统一处理请求异常？
        在外层包一个自己创建的Peomise对象
        在请求出错的时候，不调用reject(),而是进行错误提示
    2. 优化：异步得到的不是response，而是response.data？
        在请求成功resolve时，resolve(response.data)
*/
import axios from "axios";
import { message } from "antd";



// 只暴露一个的时候使用 default 方便
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
            console.log(error);
        })
    })
}