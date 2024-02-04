import { Card, Grid, Radio, Checkbox, Input, Form} from '@arco-design/web-react';
const { Row, Col } = Grid;
const RadioGroup = Radio.Group;
const CheckboxGroup = Checkbox.Group;
const FormItem = Form.Item;



const QuestionCard = ({question, index }) => {
    console.log('question in card',question);
    const options = [
        {
            label: `A、${question.selectA}`,
            value: question.selectA

        },
        {
            label: `B、${question.selectB}` ,
            value: question.selectB
        },
        {
            label: `C、${question.selectC}` ,
            value: question.selectC
        },
        {
            label: `D、${question.selectD}` ,
            value: question.selectD
        },
      ];
  return (
    <Form>
        <FormItem>
        <Row gutter={20}>
        <Col span={24}>
            <Card
            title={ `${index}、${question.stem}` }
            bordered={false}
            style={{ width: '100%' }}
            >
            {   
                question.type === 'judge'    ?
                <RadioGroup direction='vertical' >
                    <Radio value='true'>正确</Radio>
                    <Radio value='false'>错误</Radio>
                </RadioGroup>
               :
                question.type === 'saq'    ?
               <Input></Input>
               
               :
                question.type === 'single' ?
                <RadioGroup direction='vertical' >
                    <Radio value='a'>A、{question.selectA}</Radio>
                    <Radio value='b'>B、{question.selectB}</Radio>
                    <Radio value='c'>C、{question.selectC}</Radio>
                    <Radio value='d'>D、{question.selectD}</Radio>
                </RadioGroup>
            :
            <CheckboxGroup direction='vertical' options={options} />
            }
            </Card>
        </Col>
    </Row>
        </FormItem>
    
    </Form>
  );
};

export default QuestionCard;
