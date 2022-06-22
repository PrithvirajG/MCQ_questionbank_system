import './App.css';
import 'antd/dist/antd.css'
import React, { useState } from 'react';
import { Card, Avatar, Icon, Button, Divider, Space} from 'antd';
import {Link, Route, Routes} from 'react-router-dom';
// import { useState } from 'react';
// import axios from 'axios';
import StartQuestionPaper from './StartQuestionPaper';

import QuestionPaperTabs from './QuestionPaperTabs';
// import CustomQueryForm from './CustomQueryForm';

function DisplayQuestionPaper(papers) {
  // const history = useHistory();
  console.log("INSIDE DISPLAY QUESTIONPAPER", papers);
  console.log("INSIDE DISPLAY QUESTIONPAPER", papers.papers);
  const [questionPaper, setQuestionPaper] = useState();
  if(papers.papers == undefined){
    console.log("SKIPPED")
  }
  var paper_list = []
  return(
    <Space style={{marginTop:"40px"}}>
     
       {/* <Card>
         <QuestionPaperTabs papers={papers.papers}></QuestionPaperTabs>
       </Card> */}
     
    {papers.papers?.map((paper, index) => {
      console.log("Mapped",paper, index)
      // setQuestionPaper(paper);
      console.log("QUESTIONPAPER", questionPaper)
      // paper_list.push(paper)
      // console.log("Mapped2",paper_list)
      return(
          <Card title={paper.subject} hoverable>
              Serial Number : {index + 1} <br></br>
              <Divider></Divider>
              Number of Questions : {paper.number_of_questions}<br></br>
              <Divider></Divider>
              <Link to={"/Home/start_mcq_test/" + paper.object_id.$oid}> 
                <Button onClick={() => setQuestionPaper(questionPaper)}>START TEST</Button>
              </Link>
          </Card>   
        // </div>
        // <li key={paper}>
        //   {paper.object_id.$oid}  
        // </li>
      )
    })}
      {/* <Routes> */}
        {/* <Route path="/show_mcq_test/*" element={<DisplayQuestionPaper papers = {papers}/>}/> */}
        {/* <Route path="/start_mcq_test" element={<StartQuestionPaper papers = {questionPaper}/>} /> */}
      {/* </Routes> */}
    </Space>
    

  )

  
  
}
export default DisplayQuestionPaper;