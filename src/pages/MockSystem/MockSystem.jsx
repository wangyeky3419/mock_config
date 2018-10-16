import React, { Component } from 'react';
import CustomBreadcrumb from '../../components/CustomBreadcrumb';
import MockSystemTable from './components'
import './MockSystem.scss';
export default class MockSystem extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
        };
    }
   
    render() {
        const breadcrumb = [
            { text: '分类管理', link: '' },
            { text: '仿真系统管理', link: '#/cate/mockSystem' },
        ];
        return (
        <div className="cate-list-page">
            <CustomBreadcrumb dataSource={breadcrumb} />
            <MockSystemTable/>
        </div>
        );
    }
}
