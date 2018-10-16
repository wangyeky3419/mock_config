import React, { Component } from 'react';
import { Button, Pagination, Loading } from '@icedesign/base';
import IceContainer from '@icedesign/container';
import CustomTable from '../../../components/CustomTable';
import SearchTool from '../../../components/SearchTool';
import * as mock from './mock/systemVersionMock';

export default class SystemVersionTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSource: [],
            loading:false,
            current:0,
        };
    }
    componentDidMount(){
        this.onRefresh()
    }
    //搜索请求
    search = (searchField) => {
        console.log('发起搜索请求');
        this.onRefresh()
    }
    //刷新
    onRefresh = () => {
        this.setState({
            loading:true
        })
        setTimeout(()=>{
            this.setState({
                loading:false
            })
        },1500)
    }
    //分页
    handleChange(current) {
        console.log('current',current)
        this.setState({
            current
        });
    }
    render() {
        const handlePageSizeChange = size => console.log(size);
        return (
        <div className="tab-table">
            <IceContainer>
                <Button type="primary" size="small" onClick={() => this.onRefresh()} style={{marginBottom:'4px',marginLeft:'2px'}}>刷新</Button>                
                <SearchTool filter={mock.filter()} search={this.search}/>
                <div style={{width:'100%',overflow:'auto'}}>
                    <Loading visible={this.state.loading} shape="fusion-reactor">
                        <CustomTable
                            dataSource={this.state.dataSource}
                            columns={mock.columns()}
                            hasBorder={false}
                        />
                    </Loading>
                </div>
                <Pagination 
                    current={this.state.current} 
                    onChange={this.handleChange.bind(this)} 
                    shape="arrow-only"
                    pageSizeSelector="dropdown"
                    pageSizePosition="end"
                    total={50}
                    onPageSizeChange={handlePageSizeChange}
                    style={{marginTop:'20px'}}/>
            </IceContainer>
        </div>
        );
    }
}
