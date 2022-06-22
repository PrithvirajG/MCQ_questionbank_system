import './App.css';
import 'antd/dist/antd.css'
import React, { useEffect, useState, useRef } from 'react';
import {Button, Card, Divider, Image} from 'antd';
import {Link, Route, Routes, useParams} from 'react-router-dom';
import Printer, { print } from 'react-pdf-print'
import axios from 'axios';
import logo from './vitlogo.png';


function Show_Results() {
    let {id} = useParams();
    const print_ids = ['1']
    const table_style = {
        margin:"auto",
        fontSize:'21px',
        borderWidth:'1px',
        borderStyle:'solid',
        // padding:"20px",
        width:"700px"
    }
    
    const image_style = {
        marginLeft: 250,
        // marginTop: -5,
        position: 'absolute'
    }
    const student_info_style ={
        margin:"auto",
        fontSize:'21px',
        // padding:"200px",
        width:"700px"
    }

    const red_row ={
        backgroundColor: 'pink',
        fontSize:'17px'
    }

    const green_row ={
        backgroundColor: 'lightgreen',
        fontSize:'17px'
    }
    const [data, setData] = useState();
    useEffect(() => {
        console.log("USEEFFECT", typeof id)
        axios({
            method: "POST",
            url: `http://0.0.0.0:5001/mcq/get_result`,
            data: {
                "result_ID":id},
            }).then((res) => {
                console.log("RES", res.data)
                setData(res.data)
            })
            .catch((err) => {
                console.log(err);
            });
    }, [id])

    return(
        <>
        <Divider></Divider>
        <Button onClick={() => print(print_ids)}>Print</Button>
        <Divider></Divider>
        <Printer>
            <div id={print_ids[0]} style={{ width:'210mm', height: '297mm', margin:'auto' }}>
            
                <Card style={{width:"850px", padding:"40px", marginTop:"40px", border:"2px solid black"}} >
                <img src={logo} width={100} style={image_style}/>
                    <h3 style={{fontWeight:"900", fontFamily:"AssistantRegular", fontSize:"20px"}}>Bansilal Ramlal Agarwal Charitable Trust's</h3>
                    <h1 style={{fontWeight:"900", fontFamily:"AssistantRegular", fontSize:"30px"}}>Vishwakarma Institute of Technology</h1>
                    <h3 style={{fontWeight:"400", fontSize:"18px"}}>Affiliated to Savitribai Phule Pune University</h3>
                    {/* <Image width={200} src='vit_logo.png'/> */}
                    <table style={student_info_style}>
                        <tr style={{border:"1px solid black"}}>
                            <th style={{border:"1px solid black"}}>
                                Name:
                            {/* <p>NAME :      <Divider type='vertical'></Divider>{data.Name} {data.Surname}</p> */}
                            </th>
                            <Divider type='vertical'/>
                            <td style={{border:"1px solid black"}}>{data?.Name} {data?.Surname}</td>
                        </tr>
                        <tr style={{border:"1px solid black"}}>
                            <th style={{border:"1px solid black"}}>
                                GR No.:
                            {/* <p>NAME :      <Divider type='vertical'></Divider>{data.Name} {data.Surname}</p> */}
                            </th>
                            <Divider type='vertical'/>
                            <td style={{border:"1px solid black"}}>{data?.GR_no}</td>
                        </tr>
                        <tr style={{border:"1px solid black"}}>
                            <th style={{border:"1px solid black"}}>
                                Ques. Paper ID:
                            {/* <p>NAME :      <Divider type='vertical'></Divider>{data.Name} {data.Surname}</p> */}
                            </th>
                            <Divider type='vertical'/>
                            <td style={{border:"1px solid black"}}>{data?.QuestionPaperID}</td>
                        </tr>
                        {/* <p>GR Number : <Divider type='vertical'></Divider>{data.GR_no}</p> */}
                    </table>
                    <Divider type='horizontal'/>
                    <table style={table_style}>
                        <tr>
                            <th>Question</th><Divider type='vertical'/>
                            <th>Actual Answer</th><Divider type='vertical'/>
                            <th>Your Answer</th>

                        </tr>
                    {data?.Checking?.map((check) => {
                        return(
                            <>                            
                                <tr style={check.status?green_row:red_row}>
                                    <td>{check.question}</td><Divider type='vertical'/>
                                    <td>{check.actual_answer}</td><Divider type='vertical'/>
                                    <td>{check.your_answer}</td>
                                    
                                </tr>
                                {/* <Divider type='horizontal'/>  */}
                            </>

                            
                            // <p>
                            //     {check.question} {check.your_answer} {check.actual_answer}
                            // </p>
                        )
                    })

                    }
                    </table>
                    

                </Card>
                
                <Divider type='horizontal'/>
                
            </div>
            </Printer>
            
        </>
    )
}
export default Show_Results