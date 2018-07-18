

import React, { Component } from 'react';
import CustomBreadcrumb from '../../components/CustomBreadcrumb';
import './MockSystem.scss';
export default class MockSystem extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            table:''
        };
    }
   
    render() {
        const breadcrumb = [
            { text: '分类管理', link: '' },
            { text: '环境管理', link: '#/cate/mockEnvironment' },
        ];
        return (
        <div className="cate-list-page">
            <CustomBreadcrumb dataSource={breadcrumb} />
            1234
        </div>
        );
    }
}
