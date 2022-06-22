import './App.css';
import 'antd/dist/antd.css'
import React, { useState } from 'react';
import axios from 'axios';
// import Form from 'antd/lib/form/Form';
// import Input from 'antd/lib/input/Input';
// import Card from 'antd/lib/card/Card';
import { Space, Form, Input, Card, InputNumber, Button } from 'antd';
// import CustomQueryForm from './CustomQueryForm';
const { TextArea } = Input;
function AddQuestions() {
const  [data,setData] = useState();

const onSubmitForm = (values) =>{

  console.log('submited_value', values)
    axios({
      method: "POST",
      url: `http://0.0.0.0:5001/mcq/entered_questions`,
      data: {
          question: String(values.question),
          answer: String(values.answer),
          option1: String(values.option1),
          option2: String(values.option2),
          option3: String(values.option3),
          // option4: values.option4,
          type: values.type,
          field: values.field,
          marks: values.mark,
          difficulty: values.difficulty
      
      },
      }).then((res) => {
          console.log("RES", res.data)
          setData(res.data)                
            })
            .catch((err) => {
                console.log(err);
            });
}

  // question: str
  //   answer: str
  //   options: list
  //   type: str
  //   field: str
  //   marks: int
  //   difficulty: int
  
  return(
    
    <Space style={{marginTop:"40px"}}>
    <Card style={{width:"800px"}}>
      <Form onFinish={onSubmitForm} name='Questions' style={{padding:"30px"}}>
        <Form.Item label="Enter Question" name="question">
          <TextArea rows={4} />
        </Form.Item>

        <Form.Item label="Enter Anser" name="answer">
          <Input style={{width:'140px'}}></Input>
        </Form.Item>

        <Form.Item label="Enter Option 1" name="option1">
          <Input style={{width:'140px'}}></Input>
        </Form.Item>
        <Form.Item label="Enter Option 2" name="option2">
          <Input style={{width:'140px'}}></Input>
        </Form.Item>
        <Form.Item label="Enter Option 3" name="option3">
          <Input style={{width:'140px'}}></Input>
        </Form.Item>

        <Form.Item label="Enter Type" name="type">
          <Input style={{width:'140px'}}></Input>
        </Form.Item>

        <Form.Item label="Enter Field" name="field">
          <Input style={{width:'140px'}}></Input>
        </Form.Item>

        <Form.Item label="Enter Marks" name="mark">
          <InputNumber style={{width:'140px'}}></InputNumber>
        </Form.Item>

        <Form.Item label="Enter Difficulty" name="difficulty">
          <InputNumber min={0} style={{width:'140px'}} max={10}></InputNumber>
        </Form.Item>

        <Form.Item>
        <Button htmlType="submit" type='primary' size='large'>Submit Question</Button>
        </Form.Item>



      </Form>
      </Card>
      </Space>
    
    

  )
}
export default AddQuestions;