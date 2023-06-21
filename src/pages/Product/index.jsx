import React from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'
import ProductAdd from './ProductAdd'
import ProductHome from './ProductHome'
import ProductDetail from './ProductDetail'

export default function Product() {
  return (
    <div>
      <Routes>
        <Route path='/product/add' element={<ProductAdd />} />
        <Route path='/product/detail' element={<ProductDetail />} />
        <Route path='/product' element={<ProductHome />} exact/>
        {/* <Route path="/product/*" element={<Navigate to="/product" />} /> */}
      </Routes>

      <ProductHome></ProductHome>

    </div>
  )
}
