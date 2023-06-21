import React from 'react'
import { Button, Form, Input } from 'antd'
import { LockOutlined, UserOutlined } from '@ant-design/icons'
import './login.css'
import logo from './images/logo.png'

/* 
    登录的路由组件
*/
export default function Login() {
  // 成功提交
  const onFinish = (values) => {
    const username = values.username; 
    const password = values.password;
    console.log(username);

  }

  // 失败提交
  const onFinishFailed = () => {
    alert("检验失败！")
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
          onFinishFailed={onFinishFailed}
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
              { min: 6, message: "密码至少6位" },
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
          {/* <Form.Item>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <a className="login-form-forgot" href="">
              Forgot password
            </a>
          </Form.Item> */}

          <Form.Item>
            <Button type="primary" htmlType="submit" className="login-form-button">
              登录
            </Button>
            {/* Or <a href="">register now!</a> */}
          </Form.Item>
        </Form>
      </section>
    </div>
  )
}
