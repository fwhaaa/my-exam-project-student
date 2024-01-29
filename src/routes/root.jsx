import React from 'react';
import { Layout } from '@arco-design/web-react';
import { Link, Outlet } from 'react-router-dom';
import '../layout.css'


const Header = Layout.Header;
const Footer = Layout.Footer;
const Content = Layout.Content;



class Root extends React.Component {
 

  render() {
    return (
      <div className='layout-basic-demo'>
         <Layout >
        <Content><Outlet></Outlet></Content>
      </Layout>
      </div>
    );
  }
}

export default Root;
