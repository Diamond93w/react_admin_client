import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import {
  HomeOutlined,
  AppstoreOutlined,
  SmileOutlined,
  PieChartOutlined,
  BarChartOutlined,
  LineChartOutlined,
  UserOutlined,
  AreaChartOutlined,
  UnorderedListOutlined,
  ToolOutlined
} from '@ant-design/icons';
import { Menu } from 'antd';
import './index.css'
import logo from '../../assets/images/logo.png'


function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}
// 在label上添加路由链接，实路由跳转
const items = [
  getItem(<Link to='/home'>首页</Link>, '/home', <HomeOutlined />),
  getItem('商品', 'goods', <AppstoreOutlined />, [
    getItem(<Link to={'/category'}>品类管理</Link>, '/category', <UnorderedListOutlined />),
    getItem(<Link to='/product'>商品管理</Link>, '/product', <ToolOutlined />),
  ]),
  getItem(<Link to='/user'>用户管理</Link>, '/user', <UserOutlined />),
  getItem(<Link to='/role'>角色管理</Link>, '/role', <SmileOutlined />),
  getItem('图形图表', 'charts', <AreaChartOutlined />, [
    getItem(<Link to='/charts/bar'>柱形图</Link>, '/charts/bar', <BarChartOutlined />),
    getItem(<Link to='/charts/line'>折线图</Link>, '/charts/line', <LineChartOutlined />),
    getItem(<Link to='/charts/pie'>饼图</Link>, '/charts/pie', <PieChartOutlined />),
  ]),
];

export default function LeftNav() {
  const location = useLocation()
  let path = location.pathname  // 获取当前路由的路径
  /* 子列表的自动展开：根据当前路由的路径进行判断 */
  let openKey = ''
  if (path.indexOf('/charts') != -1) openKey = 'charts'
  if (path.indexOf('/category') != -1 || path.indexOf('/product') != -1) openKey = 'goods'

  // Product界面子路由，高亮显示
  if(path.indexOf('/product')===0){
    path='/product'
  }
  
  return (
    <div className='left-nav'>
      <Link to='/home' className='left-nav-header'>
        <img src={logo} alt="logo" />
        <h1>后台管理</h1>
      </Link>
      <Menu
        // 在当前路由被选中的时候显示高亮，且刷新的时候也保持（利用key来完成）
        selectedKeys={[path]}
        defaultOpenKeys={[openKey]}
        mode="inline"
        theme="dark"
        items={items}
      />
    </div>
  )
}
