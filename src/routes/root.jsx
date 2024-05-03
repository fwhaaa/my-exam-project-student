import React, { useEffect, useState } from 'react';
import { Layout, Menu, Breadcrumb } from '@arco-design/web-react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { PageHeader, Radio } from '@arco-design/web-react';
import '../layout.css'

const Sider = Layout.Sider;
const Header = Layout.Header;
const Footer = Layout.Footer;
const Content = Layout.Content;

function Root() {
  const username = localStorage.getItem('username');
  const navigate = useNavigate();

  
  function BeforeRouterEnter() {
    const username = localStorage.getItem("username");
    if (!username) {
     navigate('/login')
    }
  } 

  useEffect(()=>{
    BeforeRouterEnter();
  },[])
   return (
    <div className='layout-basic-demo'>
       <Layout>
        <Content><Outlet></Outlet></Content>
      </Layout>
    </div> 
  );

}


export default Root;
