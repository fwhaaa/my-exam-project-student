import { Form, Input, Button, Checkbox, Message } from '@arco-design/web-react';
import Password from '@arco-design/web-react/es/Input/password';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import httpServer from './../../httpServer';
import '../../index.css';

const Login = () => {
    const FormItem = Form.Item;
    const [ form ] =Form.useForm();
    const navigate =useNavigate();
    localStorage.getItem('username');
    function BeforeRouterEnter() {
      const username = localStorage.getItem("username");
      if (username) {
       navigate('/home')
      }
    } 
  
    async function login(data) {
        console.log('-------------username',data);
        await form.validate();
        httpServer({
          url: `/login/student`,
          method: 'POST'
        }, data)
        .then((res) => {
          console.log('----res',res);
          let respData = res.data;
          if(respData.respCode === -1){
            Message.error(`登录失败,${respData.respMsg}`)
            
          }else {
            Message.success('登录成功');
            const username = form.getFieldValue('username');
            localStorage.setItem('username',username);
            localStorage.setItem('password',respData.results[0].password);
            navigate(`/home`);
          }
        })
        .catch((err) => {
          console.log('err',err);
        })
      }
    function handSubmit(){
         const data = form.getFieldsValue();
         login(data);
         
    }
  
  useEffect(()=>{
     BeforeRouterEnter()
   },[])
  return (
    <div className='student-login' >
        <Form form={form} style={{ width: '600px' }} autoComplete='off'>
            <FormItem label='用户名' field='username' rules={[{required:true}]}>
                <Input placeholder='请输入账号' />
            </FormItem>
  
            <FormItem label='密码' field='password' rules={[{required:true}]}>
            <Input defaultValue='password'  placeholder='请输入密码'/>
            </FormItem>
            <FormItem wrapperCol={{ offset: 5 }}>
                <Button type='primary' onClick={handSubmit}>登录</Button>
            </FormItem>
        </Form>
    </div>
  );
};

export default Login;