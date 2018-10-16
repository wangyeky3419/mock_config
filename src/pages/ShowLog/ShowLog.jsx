import React, { Component } from 'react';
import CustomBreadcrumb from '../../components/CustomBreadcrumb';
import ShowLogTable from './components'
import './ShowLog.scss';
export default class ShowLog extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
        };
    }
   
    render() {
        const breadcrumb = [
            { text: '分类管理', link: '' },
            { text: '日志查询', link: '#/cate/showLog' },
        ];
        return (
        <div className="cate-list-page">
            <CustomBreadcrumb dataSource={breadcrumb} />
            <ShowLogTable/>
        </div>
        );
    }
}
