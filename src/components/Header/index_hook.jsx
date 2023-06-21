import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { App } from 'antd'
import { ExclamationCircleFilled } from '@ant-design/icons'
import LinkButton from '../LinkButton'
import { reqWeather } from '../../api'
import { formateDate } from '../../utils/dateUtils'
import memoryUtils from '../../utils/memoryUtils'
import storageUtils from '../../utils/storageUtils'
import './index.css'

function Header() {
  // 读取内存中的用户数据
  const username = memoryUtils.user.username
  // 初始化和定义状态
  const [date, setDate] = useState()
  const [web, setWeb] = useState('首页')
  const [weather, setWeather] = useState()
  const [user, setUser] = useState(username)
  // 放置错误“Static function”出现
  const { modal } = App.useApp()



  // 调用天气接口，请求数据
  const getWeather = async () => {
    const weatherRes = await reqWeather()
    const data = weatherRes.lives[0]  // 具体数据格式，建议先打印出来再进行提取
    // 获取天气
    const weather = data.weather
    // 更新天气数据
    setWeather(weather)
  }

  // 根据当前的路由显示不同的页面名称
  const { pathname } = useLocation()
  const getWeb = (path) => {
    let webPage = ''
    switch (path) {
      case '/home':
        webPage = '首页'
        break;
      case '/category':
        webPage = '品类管理'
        break;
      case '/product':
        webPage = '商品管理'
        break;
      case '/user':
        webPage = '用户管理'
        break;
      case '/role':
        webPage = '角色管理'
        break;
      case '/charts/bar':
        webPage = '柱形图'
        break;
      case '/charts/line':
        webPage = '折线图'
        break;
      case '/charts/pie':
        webPage = '饼图'
        break;
      default:
        webPage = '首页'
        break;
    }
    setWeb(webPage)
  }

  // 退出登录
  const navigate = useNavigate()
  const logOut = () => {
    // 显示确认框
    modal.confirm(
      {
        title: '确定要退出吗?',
        icon: <ExclamationCircleFilled />,
        okText: '确定',
        cancelText: '取消',
        onOk() {
          // 清除保存的user数据
          storageUtils.removeUser()
          memoryUtils.user = {}

          // 跳转到login
          navigate('/login', { replace: true })
        },
      })
  }


  useEffect(() => {
    // 设置定时器，更新页面的时间
    const timer = setInterval(() => {
      setDate(formateDate(Date.now()))
    }, 1000)

    // 更新天气
    getWeather()

    // 更新当前页面名称：该功能不完善
    getWeb(pathname)


    // 每次卸载都执行此函数，清除定时器
    return () => {
      clearTimeout(timer)
    }
  }, [])  // [] 表示只执行一次



  return (
    <div className='header'>
      <div className="header-top">
        <span>欢迎您，{user}</span>
        {/* <a href="#" onClick={logOut}>退出</a> */}
        <LinkButton onClick={logOut}>退出</LinkButton>
      </div>
      <div className="header-bottom">
        <div className="header-bottom-left">{`${web}(没实现)`}</div>
        <div className="header-bottom-right">
          <span>{date}</span>
          {/* <img src="" alt="weather" /> */}
          <span>{weather}</span>
          {/* 城市可改进：根据登录地址自动查询城市  */}
          <span>重庆市</span>
        </div>
      </div>
    </div>
  )
}

export default () => (
  <App>
    <Header />
  </App>
)
