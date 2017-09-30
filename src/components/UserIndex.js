import React, { Component} from 'react';
import '../css/UserIndex.less';
import { Layout} from 'antd';
import URLTable from './userIndex/URLTable';
import MenuItem from './userIndex/MenuItem';
import Store from './userIndex/Store';
import { observer } from 'mobx-react';

const { Header, Content, Footer, Sider } = Layout;

@observer
class UserIndex extends Component {
  constructor(props){
    super(props);
    this.state ={
      selectedKey:1
    }
  };
 
  UpdateSelectedKey(selectedKey){
    console.log(selectedKey+'获取成功'+Object.keys(Store.favorite)[selectedKey-1]);
    this.setState({selectedKey});
    Store.favorite._selectKey=Object.keys(Store.favorite)[selectedKey-1];
  };
  render() {
    return (
        <Layout>
        <Sider style={{ overflow: 'auto', height: '100vh', position: 'fixed', left: 0}}>
          <div className="logo" />
          <MenuItem ClassName={Object.keys(Store.favorite)} UpdateSelectedKey={this.UpdateSelectedKey.bind(this)} />
        </Sider>
        <Layout style={{ marginLeft: 200 }}>
          <Header style={{ background: '#fff', padding: 0 }} />
          <Content style={{ margin: '0px 0px 0', overflow: 'initial' }}>
            <div style={{ padding: 0, background: '#fff', textAlign: 'center' }}>
              <URLTable />
            </div>
          </Content>
          <Footer style={{ textAlign: 'center',backgroundColor:"#fff" }}>
            LotURL ©2017 Created by Shine
          </Footer>
        </Layout>
      </Layout>
    );
  }
}


export default UserIndex;