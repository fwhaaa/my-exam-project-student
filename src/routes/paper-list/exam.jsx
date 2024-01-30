import { Form, Input, Button, Checkbox } from '@arco-design/web-react';
import{ useEffect, useState   } from 'react';
import { useParams } from "react-router-dom";
const FormItem = Form.Item;
import httpServer from '../../httpServer';
const Exam = () => {
  const [data, setData] = useState();
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
        console.log('---data',data);
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
      
   console.log('enter');
  return (
    <div>
      <h1>exam</h1>
    <Form style={{ width: 600 }} autoComplete='off'>
      <FormItem >
       
      </FormItem>
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