import React, { useEffect, useState } from 'react'
import { useNavigate, Route, Routes, Navigate } from 'react-router-dom'
import { Layout } from 'antd';
import memoryUtils from '../../utils/memoryUtils'
import LeftNav from '../../components/LeftNav';
import Header from '../../components/Header/index_hook';
import Home from '../Home';
import Category from '../Category';
import Product from '../Product';
import Role from '../Role';
import User from '../User';
import Pie from '../Charts/Pie';
import Line from '../Charts/Line';
import Bar from '../Charts/Bar';


const { Footer, Sider, Content } = Layout;

/* 
    后台管理的路由组件
*/
export default function Admin() {
  const navigate = useNavigate()
  const user = memoryUtils.user
  // 如果内存中没有存储user ===> 当前没有登录

  // 自动跳转登录的界面
  // useEffect(() => {
  //   if (!user || !user.id) {
  //     navigate("/login", { replace: true })
  //   }
  // })
  return (
    <Layout style={{ height: '100%' }}>
      <Sider>
        {/* 左侧导航 */}
        <LeftNav />
      </Sider>
      <Layout>
        <Header>Header</Header>
        <Content style={{ margin:20, backgroundColor: '#fff' }}>
          <Routes>
            <Route path='/home' element={<Home />} />
            <Route path='/category' element={<Category />} />
            <Route path='/product/*' element={<Product />} />
            <Route path='/role' element={<Role />} />
            <Route path='/user' element={<User />} />
            <Route path='/charts/bar' element={<Bar />} />
            <Route path='/charts/line' element={<Line />} />
            <Route path='/charts/pie' element={<Pie />} />
            <Route path="*" element={<Navigate to="/home" />} />
          </Routes>
        </Content>
        <Footer style={{ textAlign: 'center', color: '#ccc' }}>Admin Client ©2023 Created by Little Ye</Footer>
      </Layout>
    </Layout>
  )
  if (!user || !user.id) {
    navigate("/login", { replace: true })
  }
}
