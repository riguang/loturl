import React, { Component} from 'react';
import { Menu } from 'antd';
//侧边栏Menu
export default class MenuItem extends Component{
    static defaultProps={
      ClassName:["默认收藏"]
    }
    render(){
      const {ClassName} = this.props;
      return (
          <Menu theme="light" 
          mode="inline" 
          style={{height: 'calc(100vh - 56px)'}} 
          defaultSelectedKeys={['1']}
          onSelect={({ item, key, selectedKeys })=>this.props.UpdateSelectedKey(key)}
          >
            {
              ClassName.map((value,index)=> value !=="_selectKey" &&
              <Menu.Item key={index+1}>
                  <span className="nav-text">{value}</span>
              </Menu.Item>
              )
            }
          </Menu>
      );
    }
  }