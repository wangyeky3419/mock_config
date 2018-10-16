import { Tree, Search, Loading } from "@icedesign/base";
import React, { Component } from 'react';
const { Node: TreeNode } = Tree;
let selectedKeys2 = '';
let selectedKeysTop = [];
let extraTop = {};
export default class TreeSearchLocal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: "",
            expandedKeys: [],
            selectedKeys: [],
            autoExpandParent: true,
            treeData: [],
            visible:true
        };
        this.matchedKeys = [];
        this.handleSearch = this.handleSearch.bind(this);
        this.handleExpand = this.handleExpand.bind(this);
    }
    componentDidMount() {
        let self = this;
        setTimeout(function(){
            self.setState({
                treeData: self.props.treeData,
                visible:false
            });
        }, 2000);
      }
    onSelect(selectedKeys,extra){
        console.log(selectedKeys,extra);
        if(!extra.selected){
            //第二次点击为取消选中，禁止掉取消选中
            console.log('selectedKeysTop',selectedKeysTop)
            this.setState({
                selectedKeys:selectedKeysTop
            })
            this.props.onSelect(selectedKeysTop,extraTop)
        }else{
            selectedKeysTop = selectedKeys
            extraTop = extra
            this.setState({
                selectedKeys:selectedKeys
            })
            this.props.onSelect(selectedKeys,extra)
        }
    }
   
    handleSearch(result){
        const value = result.key;
        const matchedKeys = [];
        let treeData = this.state.treeData
        function loop(data){
            return treeData.forEach(function(item){
                if (item.name.indexOf(value.trim()) > -1) {
                    matchedKeys.push(item.key);
                }
                if (item.children && item.children.length) {
                    loop(item.children);
                }
            });
        }
            
        loop(treeData);
        this.setState({
            value: result.key,
            expandedKeys: matchedKeys,
            autoExpandParent: true
        });
        this.matchedKeys = matchedKeys;
    }
    expendNode(selectedKeys){
        let expandedKeys = this.state.expandedKeys;
        let index;
        if(selectedKeys[0]){
            index =expandedKeys.indexOf(selectedKeys[0]);
            selectedKeys2 = selectedKeys[0]        
        }else {
            index =expandedKeys.indexOf(selectedKeys2);
        }
        if(index == -1){
            //展开节点
            expandedKeys.push(selectedKeys2)
            this.setState({
                expandedKeys:expandedKeys
            })
        }else if(index != -1) {
            // console.log('关闭')
            expandedKeys.splice(index,1);
            this.setState({
                expandedKeys:expandedKeys
            })
        }
    }
    handleExpand(keys){
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
                        <TreeNode label={item.name} key={item.key}  type={item.type}>
                            {loop(item.children)}
                        </TreeNode>
                    );
                }
                return (
                    <TreeNode
                        label={item.name}
                        key={item.key}
                        isLeaf={item.isLeaf}
                        type={item.type}
                    />
                );
            });
        }
           
        //返回的treeNodes就是要渲染到页面上的树节点数据
        const treeNodes = loop(this.state.treeData);

        const { value, expandedKeys, autoExpandParent, selectedKeys } = this.state;
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
                        showLine={true}
                        expandedKeys={expandedKeys}
                        selectedKeys={selectedKeys}
                        autoExpandParent={autoExpandParent}
                        filterTreeNode={filterTreeNode.bind(this)}
                        onExpand={this.handleExpand.bind(this)}
                    >
                        {treeNodes}
                    </Tree>
            </Loading>
        );
    }
}
