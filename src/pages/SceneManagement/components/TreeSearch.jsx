import { Tree, Search, Loading, Feedback } from "@icedesign/base";
import React, { Component } from 'react';
const Toast = Feedback.toast;
const { Node: TreeNode } = Tree;
import * as ajax from '../../../utils/ajax.js';
var ids = [];
function getNewTreeData(treeData, curId, child) {
    const loop = data => {
        data.forEach(item => {
            if(item.id==curId){
                item.children = child;
            }
            else{
                if(item.children){
                    loop(item.children);
                }
            }
        });
    };
    loop(treeData);
}
export default class TreeSearch extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: "",
            expandedKeys: [],
            autoExpandParent: true,
            treeData: [],
            visible:true
        };
        this.matchedKeys = [];
        this.handleSearch = this.handleSearch.bind(this);
        this.handleExpand = this.handleExpand.bind(this);
    }
    componentDidMount() {
    }
    onSelect(selectedKeys,extra){
        this.props.onSelect(selectedKeys,extra)
    }
    onLoadData(treeNode){
        let self = this;
        //每次加载节点，先进行判断节点是否已经加载，如果已存在，不发送请求
        for(var i = 0; i < ids.length; i++){
            if(ids[i]==treeNode.props.id){
                return new Promise(function(resolve){resolve();});
            }
        }
        return new Promise(function(resolve){
            setTimeout(()=>{
            const treeData = [...self.state.treeData];//当前所有存在的节点，包含父子节点
            var params = {
                id:treeNode.props.id,
                type:treeNode.props.type
            }
            ajax.getTree('/mock-server/env/tree/get',params)
            .then(function(response){
                console.log('success')
                ids.push(treeNode.props.id)//已经加载的id进行保存
                var newNode = JSON.parse(response.data.content);
                getNewTreeData(treeData,treeNode.props.id,newNode);
                self.setState(function(prevState, props) {
                    return {
                        treeData
                    };
                });
            }).catch(function(error){
                console.log('error')
                Toast.error('数据加载失败')
            });
                resolve();
            }, 400);
        });
    }
    onCancel(){
        this.setState({
            visible:false
        })
    }
     //把父组件传来的树节点给树赋值
     setTreeData(treeData){
        this.setState({
            treeData:treeData,
            visible:false
        })
    }
    handleSearch(result){
    }
    handleExpand(keys){
        console.log('keys',keys)
        this.setState({
            expandedKeys: keys,
            autoExpandParent: false
        });
    }
    render() {
        //定义loop方法，传入data参数，返回树节点
        function loop(data){
            return  data.map(function(item){
                if (item.children) {
                    return (
                        <TreeNode label={item.name} key={item.id}  type={item.type} id={item.id}>
                            {loop(item.children)}
                        </TreeNode>
                    );
                }
                return (
                    <TreeNode
                        label={item.name}
                        key={item.id}
                        isLeaf={item.isLeaf}
                        type={item.type}
                        id={item.id}
                    />
                );
        });
        }
           
        //返回的treeNodes就是要渲染到页面上的树节点数据
        const treeNodes = loop(this.state.treeData);

        const { value, expandedKeys, autoExpandParent } = this.state;
        //待筛选的节点
        function filterTreeNode(node){
            return value && this.matchedKeys.indexOf(node.props.eventKey) > -1;
        }
        return (
            <Loading visible={this.state.visible} style={{}} shape="fusion-reactor">
                <Search
                    type="normal"
                    size="small"
                    searchText=""
                    autoWidth={true}
                    value={value}
                    onSearch={this.handleSearch}
                />
                    <Tree
                        onSelect={this.onSelect.bind(this)}
                        loadData={this.onLoadData.bind(this)}
                        showLine={true}
                        expandedKeys={expandedKeys}
                        autoExpandParent={autoExpandParent}
                        filterTreeNode={filterTreeNode.bind(this)}
                        onExpand={this.handleExpand.bind(this)}
                        editable={true}
                    >
                        {treeNodes}
                    </Tree>
            </Loading>
        );
    }
}
