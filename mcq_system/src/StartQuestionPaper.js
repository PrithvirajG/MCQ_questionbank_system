import './App.css';
import 'antd/dist/antd.css'
import React, { useEffect, useState, useRef } from 'react';
import {Checkbox, Form, Radio, Card, Button, Input, InputNumber, Space, Row, Col, Divider} from 'antd';
import {Link, Route, Routes, useParams, useNavigate} from 'react-router-dom';
import axios from 'axios';

// import ShowQuestion from './ShowQuestion';
// import Form from 'antd/lib/form/Form';

function StartQuestionPaper() {
    const refsContainer = useRef({});
    // const [studentinfo, setStudentInfo] = useState({sname:"", surname:"", gr_no:0})
    let {id} = useParams();
    const [resultdata, setResultData] = useState()
    // const [answer, setAnswers] = useState({})
    const [data, setData] = useState()
    console.log(id)
    const navigate = useNavigate();
    const onSubmitPaper = (values) => {
        console.log('submited_value', values)
        // setStudentInfo(studentinfo =>({
        //     ...studentinfo,
        //     sname: values.name,
        //     surname: values.surname,
        //     gr_no: values.gr_no
        // }))

        // console.log('Dict', studentinfo)
        console.log('SUBMITTED', refsContainer.current)
        axios({
            method: "POST",
            url: `http://0.0.0.0:5001/mcq/submit_paper`,
            data: {
                student_name: values.name,
                student_surname: values.surname,
                student_gr_no: values.gr_no,
                question_paper_id: id,
                quesID_ans_dict: refsContainer.current
            
            },
            }).then((res) => {
                console.log("RES", res.data)
                setResultData(res.data)
                // if(resultdata!=undefined){
                //     return(
                //         <>
                //             <Link to="/show_result">PPPP</Link>
                //         </>
                //     )

                // }
                // console.log("RESSSPPPPP",navigate)
                navigate('/show_result/' + res.data.$oid, {replace: true});
                // this.props.history.push('/path/' + resultdata)
            })
            .catch((err) => {
                console.log(err);

            });

    };
    const layout = {
        labelCol: {
          span: 8,
        },
        wrapperCol: {
          span: 16,
        },
      };

    const mystyle = {
        fontSize:"20px",
        color: "blue",
        backgroundColor: "lightblue",
        padding:"10px",
        fontFamily: "Arial",
        marginRight: "300px",
        marginLeft: "300px"
      };

    const question_style = {
        fontSize:"20px",
        size:"25px",
        color: "blue",
        backgroundColor: "lightblue",
        padding:"10px",
        fontFamily: "Arial",
        marginRight: "150px",
        marginLeft: "150px"
      };

    const radio_style ={
        padding: "10px",
        marginRight: "10px",
        textalign:"left",
        backgroundColor: "red"
    }
    
      
    const setRef = (ques_id, element) => {
        refsContainer.current[ques_id] = element
    };

    const onChangeCheckBox = (ques_id, e) => {
        // setAnswers({ques_id: e.target.value})
        setRef(ques_id, e.target.value)
        console.log('checked ', ques_id, e.target.value)
        console.log('setREF', refsContainer.current)
        // console.log('answers', answer)
    };

    useEffect(() => {
        console.log("USEEFFECT", typeof id)
        axios({
            method: "POST",
            url: `http://0.0.0.0:5001/mcq/get_question_paper`,
            data: {
                "object_id":id},
            }).then((res) => {
                console.log("RES", res.data)
                setData(res.data)
                
            })
            .catch((err) => {
                console.log(err);
            });
    }, [id])

    // console.log("START QUESTION PAPER", paper)
    return(
        <>
        <Form onFinish={onSubmitPaper} name='QuestionPaper' style={{padding:"30px"}}>
            <Card>
                <Form.Item label="Name" name="name"
                    rules={[
                    {
                        required: true,
                        message: 'Please input your name!',
                    },]}
                    style={mystyle}
                    >
                        <Input size='large'/>
                </Form.Item>

                <Form.Item label="Surname" name="surname"
                    rules={[
                    {
                        required: true,
                        message: 'Please input your surname!',
                    },]}
                    style={mystyle}
                    >
                        <Input size='large'/>
                </Form.Item>
                <Form.Item label="GR_no" name="gr_no"
                    rules={[
                    {
                        required: true,
                        message: 'Please input your GR number!',
                    },]}
                    style={mystyle}>
                    <InputNumber size='large'></InputNumber>
                </Form.Item>
            </Card>

    {data?.map((quest_info, index) => {
        console.log(quest_info)

        return(
        
        <>
        <Col span={30} style={question_style}>
            <Card>
            <Form.Item
            noStyle="true"
            >    
                <p style={{fontSize:"17px"}}>{quest_info.question}</p>
                
                <Radio.Group
                    size='large'
                    onChange={(e) => onChangeCheckBox(quest_info.ques_id.$oid, e)}
                >
                    <Col >
                    {quest_info.options?.map((option) => {
                        return(
                            <Radio value={option} style={{fontSize:"17px"}}>{option} </Radio>
                        )
                    })}
                </Col>


                </Radio.Group>
            
            </Form.Item>
            </Card>
            <Divider></Divider>
            </Col>
    
        </>)


    })}
    <Divider></Divider>
    <Form.Item style={mystyle}>
                    
        <Button htmlType="submit" type='primary' size='large'>Submit Quiz</Button>
        
    </Form.Item>
    </Form>
    <Routes>
        <Route>

        </Route>
    </Routes>
    </>
    

    )
    

}
export default StartQuestionPaper