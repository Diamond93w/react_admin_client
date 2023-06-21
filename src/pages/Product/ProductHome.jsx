import React, { useState, useEffect, useRef } from 'react'
import {
  Card,
  Table,
  Button,
  App,
  Input,
  Select,
  Space
} from 'antd'
import { reqPosts } from '../../api'
import { reqSearchPostID } from '../../api'
import { reqSearchUserID } from '../../api'

function ProductHome() {
  const { message } = App.useApp()
  const { Option } = Select
  // 初始化和定义状态
  const [posts, setPosts] = useState()  // 所有文章
  const [loading, setLoading] = useState() // 页面加载状态
  const [selectVal, setSelect] = useState('serachID')
  const inputRef = useRef(null)


  // 定义获取paper的方法
  const getPosts = async () => {
    // 在发送请求前，显示loading
    setLoading(true)

    // 发送异步请求，获取数据
    const postsRes = await reqPosts() // 返回格式：长度为100的数组，每一个元素都是一个paper对象

    // 请求完成后，隐藏loading
    setLoading(false)

    // 更新获取的文章
    setPosts(postsRes)
  }


  // 保存select到状态
  const changeSelVal = (value) => {
    setSelect(value)
  }
  // 定义按照帖子ID搜索
  const searchPosts = async () => {
    // 获取输入框内的ID
    const id = inputRef.current.input.value

    // 在发送请求前，显示loading
    setLoading(true)
    // 判断搜索类型，调用不用的接口请求数据
    if (selectVal === 'serachUserID') {
      const searchRes = await reqSearchUserID(id)
      setLoading(false)
      setPosts(searchRes)
    } else {
      const searchRes = await reqSearchPostID(id)
      setLoading(false)
      // 按照帖子Id查询，只有一个结果，格式为对象，需要写成一个数组的形式
      setPosts([searchRes])
    }
  }



  useEffect(() => {
    getPosts()  // 调用获取paper的函数
    searchPosts()
  }, [])


  // Card左侧
  const cardLeft = (
    <Space>
      <Select defaultValue='serachID' onChange={changeSelVal}>
        <Option value='serachID'>按帖子ID搜索</Option>
        <Option value='serachUserID'>按用户ID搜索</Option>
      </Select>
      <Input placeholder='请输入ID' ref={inputRef} />
      <Button type='primary' onClick={searchPosts}>搜索</Button>
    </Space>
  )

  const columns = [
    {
      title: '用户 ID',
      dataIndex: 'userId',  // 指定需要显示数据的属性名
    },
    {
      title: '帖子 ID',
      dataIndex: 'id',  // 指定需要显示数据的属性名
    },
    {
      title: 'Title',
      dataIndex: 'title',  // 指定需要显示数据的属性名
    },
    {
      title: 'Content',
      dataIndex: 'body',  // 指定需要显示数据的属性名
    },
  ]




  return (
    <Card title={cardLeft} type='primary'>
      <Table
        bordered={true}
        rowKey='id'
        dataSource={posts}
        columns={columns}
        pagination={{ defaultPageSize: 3, showQuickJumper: true }}
        loading={loading}
      />
    </Card>
  )
}

export default () => (
  <App>
    <ProductHome></ProductHome>
  </App>
)