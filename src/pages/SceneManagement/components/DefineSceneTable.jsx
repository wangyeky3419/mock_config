import React, { Component } from 'react';
import { Button} from '@icedesign/base';

import IceContainer from '@icedesign/container';
import CustomTable from '../../../components/CustomTable';
import AddModal from '../../../components/AddModal';
import EditModal from '../../../components/EditModal';
import SearchTool from '../../../components/SearchTool';
import * as mock from './mock/defineSceneMock';
let getFields = [];
export default class DefineSceneTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSource: [],
        };
    }
    //搜索请求
    search = (searchField) => {
        console.log('发起搜索请求')
    }
    componentDidMount(){
        getFields = mock.getFields()
        this.onRefresh()
    }
    EditSubmit = (values) => {
        console.log('修改了',values)
    }
    handleRemove = (value, index) => {
        //删除，调用删除请求
        const { dataSource } = this.state;
        dataSource.splice(index, 1);
        this.setState({
            dataSource,
        });
    };
    AddSubmit = (values) => {
        console.log('提交',values)
        //发送请求，回调公共组件
        this.openElement.AddFinish()
    }
    onOpen = () => {
        this.openElement.onAddOpen()
        console.log(this.openElement)
    };
  render() {
    return (
      <div className="tab-table">
        <IceContainer>
            <Button type="primary" size="small" onClick={() => this.onOpen()} style={{marginBottom:'4px',marginLeft:'2px'}}>新增</Button>                
            <Button type="primary" size="small" onClick={() => this.onOpen()} style={{marginBottom:'4px',marginLeft:'2px'}}>删除</Button>                
            <Button type="primary" size="small" onClick={() => this.reRefsh()} style={{marginBottom:'4px',marginLeft:'4px'}}>刷新</Button>                
            <SearchTool filter={mock.filter()} search={this.search}/>
            <CustomTable
                dataSource={this.state.dataSource}
                columns={mock.columns()}
                hasBorder={false}
            />
            <AddModal ref={el => this.openElement = el} AddSubmit={this.AddSubmit} fields={getFields}/>
        </IceContainer>
      </div>
    );
  }
}
