/* 
    要求：能够根据接口文档定义接口请求
    包含应用中所有接口请求函数的模块
    每个函数的返回值为Promise对象
*/
import ajax from "./ajax";

const BASE = ''

// 登录接口
export const reqLogin = (username, password) => ajax(BASE + '/login', { username, password }, 'POST')

// 添加用户
export const reqAddUser = (user) => ajax(BASE + '/manage/user/add', user, 'POST')

// 天气：城市定死（重庆）
export const reqWeather = () => ajax(
    `https://restapi.amap.com/v3/weather/weatherInfo?key=d49195749773a4fa68cd1c136aa6135a&city=500000&extensions=base&output=JSON`,
    {},
    'GET'
)

// 获取文章：每条内容都有帖子 ID、发贴人 ID、标题、以及简介
export const reqPaper = () => ajax(
    'http://jsonplaceholder.typicode.com/posts',
    {},
    'GET'
)

// 添加文章：使用 POST 发送一篇文章，发送成功会返回一个文章 ID 回来。
export const reqAddPaper = (title, userId, body) => ajax(
    'http://jsonplaceholder.typicode.com/posts',
    { title, userId, body },
    'POST'
)

// 获取所有帖子列表（默认展示部分）
export const reqPosts = () => ajax(
    'http://jsonplaceholder.typicode.com/posts',
    {},
    'GET'
)

// 按照帖子ID进行搜索
export const reqSearchPostID = id => ajax(
    `http://jsonplaceholder.typicode.com/posts/${id}`,
    {},
    'GET'
)

// 按照用户ID进行搜索
export const reqSearchUserID = userId => ajax(
    `http://jsonplaceholder.typicode.com/posts?userId=${userId}`,
    {},
    'GET'
)

// 删除上传的图片
export const reqDeleteImg = imgName=>ajax(
    'http://localhost:5000/manage/img/delete',
    {imgName},
    'POST'
)

// 获取用户信息
export const reqUser = ()=>ajax(
    'http://jsonplaceholder.typicode.com/users',
    {},
    'GET'
)