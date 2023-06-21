/* 
    应用的根组件
*/

import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ConfigProvider } from 'antd'
import Login from './pages/Login/index.jsx'
import Admin from './pages/Admin/index.jsx'

export default function App() {
  return (
    <ConfigProvider 
    theme={{
      token:{
        colorPrimary:'#00b96b',
      },
    }}>
      <BrowserRouter>
        <Routes> {/* 只匹配其中一个 */}
          <Route path='/login' element={<Login />}></Route>
          {/* 让管理界面成为根路径 */}
          <Route path='/' element={<Admin />}></Route>
        </Routes>
      </BrowserRouter>
    </ConfigProvider>
  )
}
