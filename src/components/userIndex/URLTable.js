import React from 'react';
import { observer } from 'mobx-react';
import { Table,Input,Button,Alert } from 'antd';
import Store from './Store';

const columns = [{
  title: '网站标题',
  dataIndex: 'siteTitle',
}, {
  title: '点击量',
  dataIndex: 'hits',
}, {
  title: '是否公开',
  dataIndex: 'public',
}, {
  title: 'URL',
  dataIndex: 'url',
  className:"colmunURL",
  onCellClick:(record, event)=>console.log(record),
  render:(text, record, index)=><a href={text} target="_blank">{text}{/*存在XSS危险*/}</a>
}];

@observer
export default class UrlTable extends React.Component {
  state = {
    selectedRowKeys: [],  // Check here to configure the default column
    siteURL:"",
    alertShow:false,
    alertText:"",
    alertType:""
  };
  onSelectChange = (selectedRowKeys) => {
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    this.setState({ selectedRowKeys });
  }
  addFavorite = (url)=>{
    if(url==="" || !(url.indexOf("http://") !==-1 || url.indexOf("http://")!==-1)){
      this.setState({
        alertShow:true,
        alertText:"URL格式不正确，请检查。例如：http://www.loturl.com/",
        alertType:"warning"
      });
      return false;
    }
    this.setState({
      siteURL:"",
      alertShow:true,
      alertText:"收藏成功！",
      alertType:"success"
    });
    let data = {
      key: Store.favorite.默认收藏.length+1,
      siteTitle: "搂特网",
      hits: 0,
      public:"否",
      url: url
    }
    Store.favorite._addFavorite(data);
  }
  render() {
    const { selectedRowKeys,siteURL,alertShow,alertText,alertType } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
      hideDefaultSelections: true,
      selections: [{
        key: 'all-data',
        text: '选中所有',
        onSelect: (changableRowKeys) => {
          this.setState({
            selectedRowKeys: changableRowKeys,//[...Array(1).keys()],  // 0...45
          });
        },
      }, {
        key: 'public',
        text: '选中公开',
        onSelect: (changableRowKeys) => {
          console.log(changableRowKeys);
          //debugger
          let newSelectedRowKeys = [];
          newSelectedRowKeys = changableRowKeys.filter((key, index) => {
            if (Store.favorite.默认收藏[index].public === "是") {
              return true;
            }
            return false;
          });
          this.setState({ selectedRowKeys: newSelectedRowKeys });
        },
      }, {
        key: 'not-public',
        text: '选中不公开',
        onSelect: (changableRowKeys) => {
          let newSelectedRowKeys = [];
          newSelectedRowKeys = changableRowKeys.filter((key, index) => {
            if (Store.favorite.默认收藏[index].public === "否") {
              return true;
            }
            return false;
          });
          this.setState({ selectedRowKeys: newSelectedRowKeys });
        },
      }],
      onSelection: this.onSelection,
    };
    return (
      <div>
          <h3>总共：{Store.favorite[Store.favorite._selectKey].length}条</h3>
          <Table rowSelection={rowSelection} columns={columns} dataSource={Store.favorite[Store.favorite._selectKey]} />
          <div>
            <Input placeholder="URL" value={siteURL} onChange={(event)=>this.setState({siteURL:event.target.value})} style={{width:"50%",marginLeft:"10px"}} />
            <Button onClick={this.addFavorite.bind(this,siteURL)} type="primary"  style={{marginLeft:"10px"}}>添加数据</Button>
            {alertShow && <Alert
            style={{marginTop:10}}
            description={alertText}
            type={alertType}
            showIcon
            />}
          </div>
      </div>
    );
  }
}
