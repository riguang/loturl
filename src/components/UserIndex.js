import React, { Component} from 'react';
import '../css/UserIndex.less';
import { Layout, Menu } from 'antd';
import URLTable from './userIndex/URLTable';
import MenuItem from './userIndex/MenuItem';
const { Header, Content, Footer, Sider } = Layout;


class UserIndex extends Component {
  constructor(props){
    super(props);
    this.state ={
      selectedKey:1
    }
  };
  UpdateSelectedKey(selectedKey){
    console.log(selectedKey+'获取成功');
    this.setState({selectedKey});
  };
  render() {
    return (
        <Layout>
        <Sider style={{ overflow: 'auto', height: '100vh', position: 'fixed', left: 0}}>
          <div className="logo" />
          <MenuItem ClassName={this.props.ClassName} UpdateSelectedKey={this.UpdateSelectedKey.bind(this)} />
        </Sider>
        <Layout style={{ marginLeft: 200 }}>
          <Header style={{ background: '#fff', padding: 0 }} />
          <Content style={{ margin: '0px 0px 0', overflow: 'initial' }}>
            <div style={{ padding: 0, background: '#fff', textAlign: 'center' }}>
              <URLTable />
            </div>
          </Content>
          <Footer style={{ textAlign: 'center',backgroundColor:"#fff" }}>
            Ant Design ©2016 Created by Ant UED
          </Footer>
        </Layout>
      </Layout>
    );
  }
}


export default UserIndex;