import React, { useState, useEffect, useRef } from 'react'
import {
  Card,
  Table,
  Button,
  App,
  Input,
  Space
} from 'antd'
import { reqUser } from '../../api'

function User() {
  const { message } = App.useApp()
  // 初始化和定义状态
  const [users, setUsers] = useState()  // 所有文章
  const [loading, setLoading] = useState() // 页面加载状态


  // 定义获取paper的方法
  const getUsers = async () => {
    // 在发送请求前，显示loading
    setLoading(true)

    // 发送异步请求，获取数据
    const usersRes = await reqUser() // 返回格式：长度为100的数组，每一个元素都是一个paper对象

    // 请求完成后，隐藏loading
    setLoading(false)

    // 更新获取的文章
    setUsers(usersRes)
  }



  useEffect(() => {
    getUsers()
  }, [])


  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',  // 指定需要显示数据的属性名
    },
    {
      title: 'name',
      dataIndex: 'name',  // 指定需要显示数据的属性名
    },
    {
      title: 'username',
      dataIndex: 'username',  // 指定需要显示数据的属性名
    },
    {
      title: 'email',
      dataIndex: 'email',  // 指定需要显示数据的属性名
    },
    {
      title: 'phone',
      dataIndex: 'phone',  // 指定需要显示数据的属性名
      // 13123123123123123
    },
  ]

  return (
    <Card title={'用户信息'} type='primary'>
      <Table
        bordered={true}
        rowKey='id'
        dataSource={users}
        columns={columns}
        pagination={{ defaultPageSize: 5, showQuickJumper: true }}
        loading={loading}
      />
    </Card>
  )
}

export default () => (
  <App>
    <User></User>
  </App>
)