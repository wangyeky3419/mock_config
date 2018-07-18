

import React, { Component } from 'react';
import CustomBreadcrumb from '../../components/CustomBreadcrumb';
import Table from './components/Table';

import './ExecutiveMachine.scss';

export default class ExecutiveMachine extends Component {
    static displayName = 'ExecutiveMachine';

    constructor(props) {
        super(props);
        this.state = {};
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
