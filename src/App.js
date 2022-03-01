import React from 'react'
import { useSelector } from 'react-redux'
import { Routes, Route, Link } from 'react-router-dom'
import { Layout, Typography, Space } from 'antd'

import {
  Navbar,
  Homepage,
  Exchanges,
  Cyrptocurrencies,
  CyrptoDetails,
  News,
} from './components'

import './App.css'

const App = () => {
  return (
    <div className='app'>
      <div className='navbar'>
        <Navbar />
      </div>
      <div className='main'>
        <Layout>
          <div className='routes'>
            <Routes>
              <Route path='/' element={<Homepage />} />
              <Route path='/exchanges' element={<Exchanges />} />
              <Route path='/cryptocurrencies' element={<Cyrptocurrencies />} />
              <Route path='/crypto/:id' element={<CyrptoDetails />} />
              <Route path='/news' element={<News />} />
            </Routes>
          </div>
        </Layout>
        <div className='footer'>
          <Typography.Title
            style={{ color: 'white', textAlign: 'center' }}
            level={5}>
            Crytoverse <br />
            All rights reserved.
          </Typography.Title>
          <Space>
            <Link to='/'>Home</Link>
            <Link to='/exchanges'>Exchanges</Link>
            <Link to='/news'>News</Link>
          </Space>
        </div>
      </div>
    </div>
  )
}

export default App
