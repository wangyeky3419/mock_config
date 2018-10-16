import React, { Component } from 'react';
import { Button} from '@icedesign/base';

import IceContainer from '@icedesign/container';
import CustomTable from '../../../components/CustomTable';
import DeleteBalloon from '../../../components/DeleteBalloon';
import AddModal from '../../../components/AddModal';
import EditModal from '../../../components/EditModal';
import * as mock from './mock/sceneTempMock';
let getFields = [];
export default class SceneTempTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSource: [],
        };
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
                <Button type="primary" size="small" onClick={() => this.reRefsh()} style={{marginBottom:'4px',marginLeft:'4px'}}>刷新</Button>                
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
