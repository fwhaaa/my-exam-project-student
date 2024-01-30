import{ useState, React, useEffect } from 'react';
import { Table,Button,Modal } from '@arco-design/web-react';
import httpServer from '../../httpServer';
import { useMatches, useParams, Link, Outlet } from "react-router-dom";



const  PaperList = () => {
  const [data, setData] = useState();
  const [visible, setVisible] = useState(false);
  const matches = useMatches();
  // const subject = matches[0].params.subject;
  const  {subject} = useParams();
  console.log('subject',subject);
  console.log('matches',matches);
  async function getList() {
    httpServer({
      url: `/exam/examManagement/list?subject=${subject}`,
      method: 'GET'
    })
    .then((res) => {
      console.log('----res',res);
      let respData = res.data;
      if(res.status ===200 && respData.respCode ===1 ) {
        setData(res.data.results);
      }
    })
    .catch((err) => {
      console.log('err',err);
    })
  }
  
const columns = [
  {
    title: '考试编号',
    dataIndex: 'id',
  },
  {
    title: '科目',
    dataIndex: 'subject',
  },
  {
    title: '考试名称',
    dataIndex: 'examname',
  },
  {
    title: '考试时长',
    dataIndex: 'time',
  },
  {
    title: '操作',
    dataIndex: 'op',
    render: (_, record) => ( 
      <div>
        <Button onClick={() =>{
        // setCurrentRecord(record)
        // // form.setFieldsValue(record)
        setVisible(true)
      } 
       } type='primary' status='default'  >
        开始考试
      </Button>  
      </div>  
    ),
  },
];
useEffect(()=>{
  getList();
},[])
  
   function exam(id) {
    console.log(id);
    <Link  to={`/exam/123`}>查看</Link>
    setVisible(false)
  }

  
  return <div>
    <Table columns={columns} data={data} />
    <Modal
        title='Modal Title'
        visible={visible}
        onOk={() => exam()}
        onCancel={() => setVisible(false)}
        autoFocus={false}
        focusLock={true}
      >
        <p>
          确认开始考试？
        </p>
      </Modal>
      <Outlet></Outlet>
    </div>;
};

export default PaperList;
