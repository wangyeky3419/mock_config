import React, { Component } from 'react';
import CustomBreadcrumb from '../../components/CustomBreadcrumb';
import EnvNameTable from './components'
import './EnvName.scss';
export default class EnvName extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
        };
    }
   
    render() {
        const breadcrumb = [
            { text: '分类管理', link: '' },
            { text: '环境名称管理', link: '#/cate/envName' },
        ];
        return (
        <div className="cate-list-page">
            <CustomBreadcrumb dataSource={breadcrumb} />
            <EnvNameTable/>
        </div>
        );
    }
}
