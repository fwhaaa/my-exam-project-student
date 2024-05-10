import { useState, React, useEffect } from "react";
import { Table, Button, Modal } from "@arco-design/web-react";
import httpServer from "../../httpServer";
import { useMatches, useParams, Link, useNavigate } from "react-router-dom";

const PaperList = () => {
  // const [form] = Form.useForm();
  const studentId = localStorage.getItem("username");
  const [data, setData] = useState();
  const [score, setScore] = useState();
  const [visible, setVisible] = useState(false);
  const [scoreVisible, setScoreVisible] = useState(false);
  const [currentRecord, setCurrentRecord] = useState(undefined);
  const navigate = useNavigate();
  const matches = useMatches();
  // const subject = matches[0].params.subject;
  const { subject } = useParams();
  console.log("subject", subject);
  console.log("matches", matches);
  async function getList() {
    httpServer({
      url: `/exam/examManagement/list?subject=${subject}`,
      method: "GET",
    })
      .then((res) => {
        console.log("----res", res);
        let respData = res.data;
        if (res.status === 200 && respData.respCode === 1) {
          setData(res.data.results);
        }
      })
      .catch((err) => {
        console.log("err", err);
      });
  }
  async function getPoint(record) {
    // const examId = form.getFieldValue("username");
    const examId = record.id;
    console.log(examId, "examid");
    httpServer({
      url: `/pending_approval/score/paper?examId=${examId}&studentId=${studentId}`,
      method: "GET",
    })
      .then((res) => {
        console.log("----res", res);
        let respData = res.data;
        console.log(res.data);
        if (res.status === 200 && respData.respCode === 1) {
          setScore(res.data.results[0].score);
          console.log(res.data.results[0].score);
          setScoreVisible(true);
        }
      })
      .catch((err) => {
        console.log("err", err);
      });
  }

  const columns = [
    {
      title: "考试编号",
      dataIndex: "id",
    },
    {
      title: "科目",
      dataIndex: "subject",
    },
    {
      title: "考试名称",
      dataIndex: "examname",
    },
    {
      title: "考试时长",
      dataIndex: "time",
    },
    // {
    //   title: "成绩",
    //   dataIndex: "score",
    // },
    {
      title: "操作",
      dataIndex: "op",
      render: (_, record) => (
        <div>
          <Button
            onClick={() => {
              console.log("---log", record);
              setCurrentRecord(record);
              // // form.setFieldsValue(record)
              setVisible(true);
            }}
            type="primary"
            status="default"
          >
            开始考试
          </Button>
          <Button
            onClick={() => {
              // setCurrentRecord(record);
              // // // form.setFieldsValue(record)

              getPoint(record);
            }}
            type="primary"
            status="default"
          >
            查看成绩
          </Button>
        </div>
      ),
    },
  ];
  useEffect(() => {
    getList();
  }, []);

  function exam() {
    console.log("----currentrecord", currentRecord);
    console.log(currentRecord.paperId);
    navigate(`/exam/take/${currentRecord.id}/${currentRecord.paperId}`);
    setVisible(false);
  }

  console.log("----markinglist");
  return (
    <div className="papar-list" style={{ width: "1400px" }}>
      <p>同学 你好！请选择考试试卷： </p>
      <Table columns={columns} data={data} style={{ margin: "20px" }}></Table>
      <Modal
        title="Modal Title"
        visible={visible}
        onOk={exam}
        onCancel={() => setVisible(false)}
        autoFocus={false}
        focusLock={true}
      >
        <p>确认开始考试？</p>
      </Modal>
      <Modal
        title="查询分数"
        visible={scoreVisible}
        onOk={() => setScoreVisible(false)}
        onCancel={() => setScoreVisible(false)}
        autoFocus={false}
        focusLock={true}
      >
        <p>分数为 {score} 分</p>
      </Modal>
    </div>
  );
};

export default PaperList;
