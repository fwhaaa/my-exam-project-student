import React from 'react';
import { Layout, Menu, Breadcrumb } from '@arco-design/web-react';
// import Menus from './menus';
import { Link, Outlet } from 'react-router-dom';



const Content = Layout.Content;

class Root extends React.Component {
  state = {
    collapsed: false,
  };
  handleCollapsed = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  render() {
    return (
      <Layout className='layout-collapse-demo'>
        <Layout>
            <Content><Outlet /></Content>
          </Layout>
        </Layout>
     
    );
  }
}

export default Root;
