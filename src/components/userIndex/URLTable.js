import React, { Component} from 'react';
import { Table,Popover, Button } from 'antd';
import Store from './Store';
const {Favorite} = Store;

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


for (let i = 0; i < 46; i++) {
  Favorite.默认收藏.push({
    key: i,
    siteTitle: `搂特网 ${i}`,
    hits: 0,
    public:i%2!==0?"是":"否",
    url: `http://www.loturl.com/.${i}`,
  });
}

export default class UrlTable extends React.Component {
  state = {
    selectedRowKeys: [],  // Check here to configure the default column
  };
  onSelectChange = (selectedRowKeys) => {
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    this.setState({ selectedRowKeys });
  }
  render() {
    const { selectedRowKeys } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
      hideDefaultSelections: true,
      selections: [{
        key: 'all-data',
        text: '选中所有',
        onSelect: () => {
          this.setState({
            selectedRowKeys: [...Array(46).keys()],  // 0...45
          });
        },
      }, {
        key: 'public',
        text: '选中公开',
        onSelect: (changableRowKeys) => {
          let newSelectedRowKeys = [];
          newSelectedRowKeys = changableRowKeys.filter((key, index) => {
            if (Favorite.默认收藏[key].public === "是") {
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
            if (Favorite.默认收藏[key].public === "否") {
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
        <Table rowSelection={rowSelection} columns={columns} dataSource={Favorite.默认收藏} />
    );
  }
}
