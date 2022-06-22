import './App.css';
import 'antd/dist/antd.css'
import React, { useState } from 'react';
import { Route, Routes, Link, Outlet } from 'react-router-dom';
import axios from 'axios';
//IMPORTS OF NAVIGATING MAIN PAGE
// import CustomQueryForm from './CustomQueryForm';
import DisplayQuestionPaper from './DisplayQuestionPaper';
import GenerateQuestionPaper from './GenerateQuestionPaper';
import AddQuestions from './AddQuestions';

import { Layout, Menu } from 'antd';
import StartQuestionPaper from './StartQuestionPaper';
import Show_Results from './Show_Results';
// import {
//   MenuUnfoldOutlined,
//   MenuFoldOutlined,
//   UserOutlined,
//   VideoCameraOutlined,
//   UploadOutlined,
// } from '@ant-design/icons';
const {SubMenu} = Menu;

const { Header, Footer, Sider, Content } = Layout;

const HomePage =()=>
{
  const [data, setData] = useState()

  const onClick = () => {
    // console.log("SUBMITTED",values);
    axios({
      method: "POST",
      url: `http://0.0.0.0:5001/mcq/show_available_test`,
      data: {},
      }).then((res) => {
          console.log("RES", res.data)
          setData(res.data)
      })
      .catch((err) => {
          console.log(err);
      });
  };


    return(
        <Layout>
          <Outlet />
          <Layout>
            <Header>
              <div className="logo" style={{color:"white",fontSize:"20px", fontWeight:"1000", fontFamily:"sans-serif"}}>
                  Quiz-Hub               
              </div>
              <Menu
                mode="horizontal"
                theme='dark'
                >
                {/* <SubMenu key="sub1"
                  title="SERVICES"> */}
                  <div onClick={() => onClick()}> 
                    <Menu.Item key="5">
                      <Link to="/Home/show_mcq_test">BEGIN MCQ TEST</Link>
                    </Menu.Item>
                  </div>
                  <Menu.Item key="6">
                    <Link to="/Home/add_questions">ADD QUESTIONS TO QUESTION-BANK</Link>
                  </Menu.Item>
                  <Menu.Item key="7">
                    <Link to="/Home/generate_question_paper">GENERATE QUESTION PAPER</Link>
                  </Menu.Item>
                {/* </SubMenu> */}
              </Menu>
            </Header>
            <Content
              style={
                  {
                      height: "calc(100vh - 55px)",
                      marginTop: "4%"
                  }
                 }
                >
              <Routes>
                <Route path="/start_mcq_test/:id" element={<StartQuestionPaper/>} />
                <Route path="/show_result/:id" element={<Show_Results/>} />
                <Route exact path="/show_mcq_test" element={<DisplayQuestionPaper papers ={data}/>}/>
                <Route path="/add_questions" element={<AddQuestions />}/>
                <Route path="/generate_question_paper" element={<GenerateQuestionPaper />}/>
              <Route path="/show_mcq_test_/*" element={<DisplayQuestionPaper papers ={data}/>}/>

                {/* <Route path="/start_mcq_test" element={<StartQuestionPaper />}/> */}

                {/* <Route path="/add_questions" element={<AddQuestions />}/> */}

              </Routes>
            </Content>
            <Footer
              
              style={{
                  width:"100%",
                  position: "fixed",
                  bottom: "0",
                  height:"10px"
      
              
              }}>
                  <p>MCQ Question Bank System</p>
              {/* <a href="https://smartiam.in/" target="_blank">
              Integrated Active Monitoring Services
              </a> */}
            </Footer>
          </Layout>
        </Layout>
    )
}
export default HomePage;