import React, { Component } from 'react';
import { Search, Button, Select, Input } from "@icedesign/base";

export default class SearchTool extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchKey:'',
            searchValue:'',
            searchType:<Input style={{float:'right',width:'200px',borderRadius:'0'}}/>,
        }
    }

    onSearch = (value) => {
        console.log('搜索');
        let searchKey = this.state.searchKey;
        let searchValue = this.state.searchValue;
        let searchField = {};
        if(searchKey&&searchValue){
            searchField[searchKey]=searchValue;
            //调用父组件方法进行搜索
            this.props.search(searchField)
        }else{
            console.log('请输入');
        }
        
    }
    //选择框改变
    onChange = (value,options) => {
        console.log("value2",value)
        let searchType = this.createSearch(options)
        this.setState({
            searchType:searchType,
            searchKey:value
        })
    }
    //搜索值改变
    onValueChange = (value,options) => {
        this.setState({
            searchValue:value
        })
    }
    createSearch = (options) => {
        return(
            options.option?
                <Select style={{float:'right',width:'200px',borderRadius:'0'}} dataSource={options.option} onChange={this.onValueChange.bind(this)} hasClear={true}/>
            :
            <Input style={{float:'right',width:'200px',borderRadius:'0'}} onChange={this.onValueChange.bind(this)}/>
        )
    }
    onFilterChange = (value, obj) => {
        console.log(`filter is: ${value}`);
        console.log("fullData: ", obj);
    }
   
    render() {
        return (
            <React.Fragment>
                <Button
                    type="primary"
                    component="a"
                    size="small"
                    style={styles.buttonType}
                    onClick={this.onSearch}>
                    <span>搜索</span>
                </Button>
                {this.state.searchType}
                <Select style={styles.selectType} dataSource={this.props.filter} onChange={this.onChange.bind(this)} hasClear={true}/>
            </React.Fragment>
        );
    }
}
const styles = {
    selectType: {
        float:'right',
        width:'150px',
        borderTopRightRadius:'0',
        borderBottomRightRadius:'0',
        borderTopLeftRadius:'50px',
        borderBottomLeftRadius:'50px',
        marginRight:'-1px'
    },
    buttonType:{
        float:'right',
        borderTopLeftRadius:'0',
        borderBottomLeftRadius:'0',
        height:'28px',width:'80px',
        lineHeight:'28px'
    }
};
