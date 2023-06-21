import React, { useState, useEffect, useRef } from 'react'
import {
  Card,
  Table,
  Button,
  Popover,
  App,
  Modal,
  InputNumber,
  Form,
  Input,
} from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import LinkButton from '../../components/LinkButton'
import PicturesWall from './PicturesWall'
import { reqPaper } from '../../api'
import { reqAddPaper } from '../../api'


function Category() {
  const { message } = App.useApp()
  // 初始化和定义状态
  const [papers, setPapers] = useState()  // 所有文章
  const [loading, setLoading] = useState() // 页面加载状态


  const inputRef = useRef(null)
  const numberRef = useRef(null)
  const textAreaRef = useRef(null)
  const picRef = useRef(null)


  // 定义获取paper的方法
  const getPapers = async () => {
    // 在发送请求前，显示loading
    setLoading(true)

    // 发送异步请求，获取数据
    const paperRes = await reqPaper() // 返回格式：长度为100的数组，每一个元素都是一个paper对象

    // 请求完成后，隐藏loading
    setLoading(false)

    // 更新获取的文章
    setPapers(paperRes)
  }



  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOK = async () => {
    // 读取输入到表单里的值：title  userID  body
    let inputVal = inputRef.current.input.value
    let numberVal = numberRef.current.value
    let textAreaVal = textAreaRef.current.resizableTextArea.textArea.value
    let picURL = picRef.current.getItem()

    // 判断是否输入了信息
    if (inputVal === '' || numberVal === '') {
      message.error("请完善必要信息")
    } else {
      // 调用添加文章的接口
      const addRes = await reqAddPaper(inputVal, numberVal, textAreaVal)
      // 显示添加成功的效果
      if (addRes.id) {
        setIsModalOpen(false)  // 添加之后，关闭对话框
        message.success(`添加成功：文章id=${addRes.id}`)
        setPapers([{ title: inputVal, userId: numberVal, body: textAreaVal, id: addRes.id, img: <img src={picURL}/> }, ...papers])
      } else {
        message.error(`添加失败，请稍后再试`)
      }
    }
  }

  // 取消对话框展示
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    getPapers()  // 调用获取paper的函数
  }, [])

  // card 右侧
  const extra = (
    <Button type='primary' onClick={showModal}>
      <PlusOutlined />添加
    </Button>
  )

  const columns = [
    {
      title: '用户ID',
      dataIndex: 'userId',  // 指定需要显示数据的属性名
    },
    {
      title: '题目',
      dataIndex: 'title',  // 指定需要显示数据的属性名
    },
    {
      title: '图片',
      dataIndex: 'img',  // 指定需要显示数据的属性名
    },
    {
      title: '操作',
      render: (paper) => (  // 返回需要显示的界面标签
        <span>
          {/* <LinkButton>修改分类</LinkButton> */}
          {/* 向事件回调函数传递参数：先定义一个箭头函数，在函数调用处理的 函数并传入数据*/}
          <Popover content={paper.body} title="Content" trigger="click">
            <LinkButton>查看内容</LinkButton>
          </Popover>
        </span>
      )
    },
  ]




  return (
    <Card extra={extra} type='primary'>
      <Table
        bordered={true}
        rowKey='id'
        dataSource={papers}
        columns={columns}
        pagination={{ defaultPageSize: 5, showQuickJumper: true }}
        loading={loading}
      />
      <Modal title="添加文章"
        open={isModalOpen}
        onOk={handleOK}
        onCancel={handleCancel}
        okText={'确定'}
        cancelText={'取消'}
      >
        <Form
          name="basic"
          style={{
            maxWidth: 600,
          }}
          initialValues={{
            remember: true,
          }}
          autoComplete="off"
        >
          <Form.Item
            label="Title"
            name="title"
            rules={[
              {
                required: true,
                message: '请输入文章题目',
              },
            ]}
          >
            <Input ref={inputRef} value={''} />
          </Form.Item>

          <Form.Item
            label="UserId"
            name="userId"
            rules={[
              {
                required: true,
                message: '请输入用户ID',
              },
            ]}
          >
            <InputNumber min={1} ref={numberRef} value={''} />
          </Form.Item>

          <Form.Item
            label="Content"
            name="body"
          >
            <Input.TextArea rows={4} ref={textAreaRef} value={''} />
          </Form.Item>
          <Form.Item
            label="Pictures"
            name="img"
          >
            <PicturesWall ref={picRef} />
          </Form.Item>
        </Form >
      </Modal>
    </Card>
  )
}

export default () => (
  <App>
    <Category></Category>
  </App>
)