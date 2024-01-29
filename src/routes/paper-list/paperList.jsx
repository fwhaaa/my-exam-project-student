import{ useState, React  } from 'react';
import { Table,Button,Modal } from '@arco-design/web-react';


const data = [
  {
    id: '1',
    subject: 'math',
    examname: '期末数学',
    time:'120'
  },

];

const  PaperList = () => {
  const [visible, setVisible] = useState(false);
  
const columns = [
  {
    title: '试卷编号',
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
  {

  }
];

  
  return <div>
    <Table columns={columns} data={data} />
    <Modal
        title='Modal Title'
        visible={visible}
        onOk={() => setVisible(false)}
        onCancel={() => setVisible(false)}
        autoFocus={false}
        focusLock={true}
      >
        <p>
          确认开始考试？
        </p>
      </Modal>
    </div>;
};

export default PaperList;
