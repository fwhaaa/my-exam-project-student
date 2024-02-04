import { Form, Input, Button, Checkbox, Radio, Grid, Card } from '@arco-design/web-react';
import{ useEffect, useState   } from 'react';
import { useParams } from "react-router-dom";
import httpServer from '../../httpServer';
import QuestionCard from './question-card';
const RadioGroup = Radio.Group;
const FormItem = Form.Item;
const { Row, Col } = Grid;
const Exam = () => {
  const [ form ] =Form.useForm();
  const [data, setData] = useState();
  const [single,setSingle] = useState();
  const [multiple,setMultiple] = useState();
  const [judge,setJudge] = useState();
  const [saq,setSaq] = useState();
  const [question,setQuestion] = useState();


  let { paperId } = useParams();
  console.log('paperid',paperId);

  async function getList() {
    httpServer({
      url: `/paper/paperManagement/list?id=${paperId}`,
      method: 'GET'
    })
    .then((res) => {
      console.log('----res',res);
      let respData = res.data;
      if(res.status ===200 && respData.respCode ===1 ) {
        setData(res.data.results);
        console.log('---resluts',res.data.results);
        res.data.results?.map((v)=>{
          const question=JSON.parse(v.questioncontent);
          console.log('---------question',question);
          setSingle(question['single']);
          setMultiple(question['multiple']);
          setJudge(question['judge']);
          setSaq(question['saq']);
          setQuestion(question);
          
        })
 
      }
    })
    .catch((err) => {
      console.log('err',err);
    })
  }
  console.log('----data',data);

  async function handSubmit() {
    // JSON.stringify(form.getFieldsValue())
    console.log('answer',JSON.stringify(form.getFieldsValue()));
  }



  
  useEffect(()=>{
     getList();
  },[])
      
  console.log('single',single);
   console.log('enter');
  return (
    <div style={{padding:'40px 60px',background:'pink'}}>
      <h1 >exam</h1>
      <Form  autoComplete='off' form={form}  layout='vertical' style={{width:'600px'}}> 
       <h3 style={{textAlign: 'left'}}>单选题</h3>
       {
        single && Object.keys(single).map((v,index)=> {
           const singleObj = single[v];
           console.log('singleObj',singleObj);
           return (
           <FormItem field={`${singleObj.id}`} label={`${index+1}、${singleObj.stem}`} style={{textAlign: 'left'}}>
              {/* <QuestionCard question={singleObj} index={index+1}></QuestionCard> */}
            {/* <Card
            title={ `${index+1}、${singleObj.stem}` }
            bordered={false}
            style={{ width: '100%' }}
            > */}   
                {/* <div> */}
                  {/* <p>{singleObj.stem}</p> */}
                  <RadioGroup direction='vertical' >
                      <Radio value={'a'}>A、{singleObj.selectA}</Radio>
                      <Radio value={'b'}>B、{singleObj.selectB}</Radio>
                      <Radio value={'c'}>C、{singleObj.selectC}</Radio>
                      <Radio value={'d'}>D、{singleObj.selectD}</Radio>
                  </RadioGroup>
                {/* </div> */}
                
            {/* </Card> */}
 
           </FormItem>
           )
         })
       }
         {/* 多选
          {
           multiple && Object.keys(multiple).map((v,index)=> {
           const multipleObj = multiple[v];
           console.log('multipleObj',multipleObj);
           return (
           <FormItem field={'multiple'}>
              <QuestionCard question={multipleObj} index={index+1}></QuestionCard>
           </FormItem>
           )
         })
       }
         判断
          {
           judge && Object.keys(judge).map((v,index)=> {
           const judgeObj = judge[v];
           console.log(' judgeObj', judgeObj);
           return (
           <FormItem field={'judge'}>
              <QuestionCard question={judgeObj} index={index+1}></QuestionCard>
           </FormItem>
           )
         })
       }  
       简答
          {
           saq && Object.keys(saq).map((v,index)=> {
           const saqObj = saq[v];
           console.log('saqObj',saqObj ); 
           return (
           <FormItem field={'saq'}>
              <QuestionCard question={saqObj} index={index+1}></QuestionCard>
           </FormItem>
           )
         })
       } */}
     <FormItem wrapperCol={{ offset: 5 }}>
          <Button type='primary'  onClick={handSubmit}    >提交</Button>
        </FormItem>
      <FormItem wrapperCol={{ offset: 5 }}>
      </FormItem>
      <FormItem wrapperCol={{ offset: 5 }}>
       
      </FormItem>
    </Form>
    </div>

  );
};

export default Exam;