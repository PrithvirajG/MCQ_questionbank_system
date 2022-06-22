import './App.css';
import 'antd/dist/antd.css'
import React, { useState } from 'react';
import { Space, Form, Input, Card, InputNumber, Button } from 'antd';
// import CustomQueryForm from './CustomQueryForm';
import axios from 'axios';

function GenerateQuestionPaper() {
  const [data, setData] = useState();


  const onSubmitForm = (values) => {
    console.log('submited_value', values)
    axios({
      method: "POST",
      url: `http://0.0.0.0:5001/mcq/generate_question_paper`,
      data: {
          field: values.field,
          generation_type: 'automatic',
          number_of_question: values.num_of_q
      
      },
      }).then((res) => {
          console.log("RES", res.data)
          setData(res.data)                
            })
            .catch((err) => {
                console.log(err);
            });
  }

  // field: str
    // generation_type: str #custom, automatic, premade
    // number_of_question: int
  
  return(
    <>
    <Card style={{margin:'auto', marginTop:'40px', width:'400px'}}>
        <Form onFinish={onSubmitForm} name='Questions' style={{padding:"30px", margin:'auto'}}>
          <Form.Item label="Enter Field" name="field">
            <Input style={{width:'140px'}}></Input>
          </Form.Item>
          {/* <Form.Item label="Enter Field" name="field">
            <Input></Input>
          </Form.Item> */}
          <Form.Item label="Enter Number of Questions" name="num_of_q">
            <InputNumber style={{width:'140px'}}></InputNumber>
          </Form.Item>

          <Form.Item>
            <Button htmlType="submit" type='primary' size='large'>Submit Paper</Button>
          </Form.Item>

        </Form>
      </Card>
      
    </>
  )
}
export default GenerateQuestionPaper;