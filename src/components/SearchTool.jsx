import React, { Component } from 'react';
import { Search, Button, Select, Input, Feedback } from "@icedesign/base";
const Toast = Feedback.toast;
export default class SearchTool extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchKey:'',
            searchValue:'',
            options:[]
        }
    }
    componentDidMount(){
       
    }
    onSearch(value){
        let searchKey = this.state.searchKey;
        let searchValue = this.state.searchValue.trim();
        // let searchField = {};
        if(searchKey){
            // searchField[searchKey]=searchValue;
            //调用父组件方法进行搜索
            this.props.search(searchKey,searchValue);
        }else{
            Toast.prompt('请选择搜索字段')
        }
        
    }
    //选择框改变
    onChange(value,options){
        this.setState({
            options:options,
            searchKey:value,
            searchValue:'',
        })
    }
    //搜索值改变
    onValueChange(value,options,isClear){
        // if(isClear){
        //     console.log('clear')
        //     this.setState({
        //         searchValue:''
        //     })
        // }else{
            this.setState({
                searchValue:value
            })
        // }
    }
    onFilterChange(value, obj){
        console.log(`filter is: ${value}`);
        console.log("fullData: ", obj);
    }
    render() {
        let options = this.state.options
        return (
            <React.Fragment>
                <Button
                    type="primary"
                    component="a"
                    size="small"
                    style={styles.buttonType}
                    onClick={this.onSearch.bind(this)}>
                    <span>搜索</span>
                </Button>
                    {options.option?
                    <Select style={{float:'right',width:'140px',borderRadius:'0'}} size="small" value={this.state.searchValue} dataSource={options.option} onChange={this.onValueChange.bind(this)} hasClear={true}/>
                    :
                    <Input style={{float:'right',width:'140px',borderRadius:'0'}} size="small" value={this.state.searchValue} onChange={this.onValueChange.bind(this)} hasClear={true}/>
                    }
                <Select style={styles.selectType} size="small" dataSource={this.props.filter} onChange={this.onChange.bind(this)} hasClear={true}/>
            </React.Fragment>
        );
    }
}
const styles = {
    selectType: {
        width:'120px',
        float:'right',
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
    }
};
