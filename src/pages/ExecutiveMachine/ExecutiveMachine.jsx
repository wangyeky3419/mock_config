import React, { Component } from 'react';
import CustomBreadcrumb from '../../components/CustomBreadcrumb';
import Table from './components/Table';
import './ExecutiveMachine.scss';
import axios from 'axios';
import { getExampleData, getUser213 } from '../../service';
export default class ExecutiveMachine extends Component {
    static displayName = 'ExecutiveMachine';

    constructor(props) {
        super(props);
        this.state = {};
    }
    componentDidMount(){
        // let id = 1001
        // axios({
        //     method:'post',
        //     url:'/api/users/add2/100',
        //     withCredentials:true,
        //     // params:{id:'code001'}
        // })
        getUser213({ name: 'user/user2/user3'} )
    }
    render() {
        const breadcrumb = [
            { text: '分类管理', link: '' },
            { text: '执行机管理', link: '#/cate/executiveMachine' },
        ];
        return (
        <div className="cate-list-page">
            <CustomBreadcrumb dataSource={breadcrumb} />
            <Table />
        </div>
        );
    }
}
