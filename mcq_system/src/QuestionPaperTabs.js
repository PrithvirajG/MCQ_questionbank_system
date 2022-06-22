import './App.css';
import 'antd/dist/antd.css'
import React, { useEffect } from 'react';
import { Card,Button } from 'antd';
import { useState } from 'react';
// import CustomQueryForm from './CustomQueryForm';
const gridStyle =  {
    width: '25%',
    textAlign: 'center',
  };
function QuestionPaperTabs(papers) {
    // const [papertabs, setPaperTabs] = useState([])
    // var i;
    // var paper_list = [];
    
    console.log(papers, typeof papers);
    if(papers == undefined){
        return
    }
    // else{
    console.log("INSIDE TABSS", papers);
    return(
        papers.papers?.map(paper => {
            return(
                <li key={paper}>{paper.object_id.$oid}</li>
                // <Card hoverable color='red' extra={<Button onClick={alert("HEYY THERE")}>Test</Button>}>
                //     <div className='CardText'>
                //         Subject : {paper.subject}<br></br>
                //         Number of Question : {paper.number_of_questions}<br></br>
                //         Question Paper ID : {paper.object_id.$oid}    <br></br>
                //     </div>
                //     {/* <button>Start Test</button> */}
                // </Card>
            )

        })  
    )
        // setPaperTabs(papers.papers);
    // }
    // for(i=0;i<papers.papers.length; i++){
    //     console.log(i)
    //     // paper_list.push(papers[i])
    // }

    // setPaperTabs(paper_list)
    // useEffect(() => {
    //     if(!papers){
    //         console.log("SKIPPED")
    //         return
    //     }
    //     else{
    //         console.log("PRESENT")
    //     }
        

    // },[papers])
    // papertabs.map(paper => {
    //     console.log(paper);
        // return(
        //     <Card.Grid style={gridStyle}>Content</Card.Grid>
        // )
    // })
    
    // return(
        
    //         <Card.Grid>{papers.subject}</Card.Grid>
        
    // )
//   return papers.map((index) => {
//       console.log("HELLOWWWW", index)
//     //   return(
//     //     <Card.Grid style={gridStyle}>Content</Card.Grid>
//     //   )
//   })
    
  
}
export default QuestionPaperTabs;