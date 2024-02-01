import { Form, Input, Button, Checkbox } from '@arco-design/web-react';
import{ useEffect, useState   } from 'react';
import { useParams } from "react-router-dom";
import httpServer from '../../httpServer';
import QuestionCard from './question-card';

const FormItem = Form.Item;
const Exam = () => {
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

   



  
  useEffect(()=>{
     getList();
  },[])
      
  console.log('single',single);
   console.log('enter');
  return (
    <div>
      <h1>exam</h1>
      <Form  autoComplete='off'> 
       单选
       {
        single && Object.keys(single).map((v,index)=> {
           const obj = single[v];
           console.log('obj',obj);
           return (
           <FormItem >
              <QuestionCard question={obj} index={index+1}></QuestionCard>
           </FormItem>
           )
         })
       }
         多选
          {
           multiple && Object.keys(multiple).map((v,index)=> {
           const obj = single[v];
           console.log('obj',obj);
           return (
           <FormItem >
              <QuestionCard question={obj} index={index+1}></QuestionCard>
           </FormItem>
           )
         })
       }
         判断
          {
           judge && Object.keys(judge).map((v,index)=> {
           const obj = single[v];
           console.log('obj',obj);
           return (
           <FormItem >
              <QuestionCard question={obj} index={index+1}></QuestionCard>
           </FormItem>
           )
         })
       }  
       简答
          {
           saq && Object.keys(saq).map((v,index)=> {
           const obj = single[v];
           console.log('obj',obj);
           return (
           <FormItem >
              <QuestionCard question={obj} index={index+1}></QuestionCard>
           </FormItem>
           )
         })
       }
      <FormItem >
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