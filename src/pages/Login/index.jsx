import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Form, Input, App } from 'antd'
import { LockOutlined, UserOutlined } from '@ant-design/icons'
import './login.css'
import logo from '../../assets/images/logo.png'
import { reqLogin } from '../../api'
import memoryUtils from '../../utils/memoryUtils'
import storageUtils from '../../utils/storageUtils'

/* 
    登录的路由组件
*/
function Login() {
  const { message } = App.useApp()
  const navigate = useNavigate()
  // 成功提交
  const onFinish = async (values) => {
    const { username, password } = values;
    const result = await reqLogin(username, password)
    if (result.status === 0) {
      // 登录成功
      message.success('登录成功')
      const user = result.data
      memoryUtils.user = user  // 保存在内存中
      storageUtils.saveUser(user)  // 保存到local中，维持登录状态
      // 跳转到管理界面，设置跳转的方式是replace
      navigate('/', { replace: true })
    } else {
      // 登录出错，显示错误信息
      message.error(result.msg)
    }
  }

  return (
    <div className='login'>
      <header className='login-header'>
        <img src={logo} alt="logo" />
        <h1>React项目：后台管理系统</h1>
      </header>
      <section className='login-content'>
        <h2>用户登录</h2>
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
        >
          <Form.Item
            name="username"
            rules={[
              { required: true, whitespace: true, message: '必须输入用户名' },
              { min: 4, message: "用户名至少4位" },
              { max: 12, message: "用户名最多12位" },
              { pattern: /^[a-zA-Z0-9_]+$/, message: "用户名必须是英文、数字或下划线" }
            ]}
          >
            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" autoComplete="on" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              { required: true, whitespace: true, message: '必须输入密码' },
              { min: 4, message: "密码至少4位" },
              { max: 12, message: "密码最多12位" },
              { pattern: /^[a-zA-Z0-9_]+$/, message: "密码必须是英文、数字或下划线" }
            ]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
              autoComplete="on"
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" className="login-form-button">
              登录
            </Button>
          </Form.Item>
        </Form>
      </section>
    </div>
  )
}

// 用于解决引入antd静态函数，出现警告问题
export default () => (
  <App style={{height:'100%'}}>
    <Login />
  </App>
)










/*  
笔记：
  用async和await的好处：
      1. 来简化Promise写法，不用then()来指定成功/失败的回调函数
      2. 以同步的编码（没有回调函数）方式实现异步流程 
  ps：
    1. 在返回的Promise的表达式左侧写await：不想要Promise，想要Promise异步执行成功的value数据
    2. await所在函数（最近的）定义的左侧写async

  补充：如果用户已经登录，则自动跳转到Admin管理界面————————————没实现
        需要对存在内存中的user进行判断。
*/