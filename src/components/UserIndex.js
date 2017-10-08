import React, { Component} from 'react';
import '../css/UserIndex.less';
import { Layout,Input,Button} from 'antd';
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
      selectedKey:1,
      inputName:"",
      selectedKeys:['1']
    }
  };
 
  UpdateSelectedKey(selectedKey){
    console.log(selectedKey+'获取成功'+Object.keys(Store.favorite)[selectedKey-1]);
    this.setState({selectedKey});
    Store.favorite._selectKey=Object.keys(Store.favorite)[selectedKey-1];
  };
  addFavorite = () =>{
    const inputName = this.state.inputName;
    if(inputName !=="")
    {
      Store.favorite[inputName]=[];
      this.setState({
        inputName:""
      });//触发render才会刷新
    }
  }
  render() {
    const {inputName,selectedKeys} = this.state;
    return (
        <Layout>
        <Sider style={{ overflow: 'auto', height: '100vh', position: 'fixed', left: 0}}>
          <div className="logo" />
          <MenuItem ClassName={Object.keys(Store.favorite)} 
          UpdateSelectedKey={this.UpdateSelectedKey.bind(this)}
           />
          <div className="example-input">
              <Input size="default size" placeholder="请输入收藏夹名称" value={inputName} onChange={(v)=>this.setState({inputName:v.target.value})} />
              <Button type="primary" 
              className="btn-addFavorite" 
              style={{width: "100%"}}
              onClick={this.addFavorite}
              >添加收藏夹</Button>
          </div>
        </Sider>
        <Layout style={{ marginLeft: 200 }}>
          <Header style={{ background: '#fff', padding: 0 }} />
          <Content style={{ margin: '0px 0px 0', overflow: 'initial' }}>
            <div style={{ padding: 0, background: '#fff', textAlign: 'center' }}>
              <URLTable />
            </div>
          </Content>
          <Footer style={{ textAlign: 'center',backgroundColor:"#fff" }}>
            LotURL ©2017 Created by SunShine
          </Footer>
        </Layout>
      </Layout>
    );
  }
}


export default UserIndex;