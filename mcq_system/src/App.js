import './App.css';
import 'antd/dist/antd.css'
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import HomePage from './Home'
import Show_Results from './Show_Results';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
} from '@ant-design/icons';

function App() {

  

  return (
    <>
<div className='App'> 

      <Routes>
        <Route path="/Home/*" element={<HomePage/>}/>
        <Route path="/show_result/:id" element={<Show_Results/>} />
  
      </Routes>
      </div>
    </>
  )


}
export default App;