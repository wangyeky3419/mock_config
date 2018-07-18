import { Tree, Search, Loading } from "@icedesign/base";
import React, { Component } from 'react';

const { Node: TreeNode } = Tree;

function generateTreeNodes(treeNode) {
    const arr = [];
    const key = treeNode.props.eventKey;
    for (let i = 0; i < 3; i++) {
      arr.push({ name: `pNode ${key}-${i}`, key: `${key}-${i}`,type:`100+${i}` });
    }
    return arr;
}
function setLeaf(treeData, curKey, level) {
    const loopLeaf = (data, lev) => {
        const l = lev - 1;
        data.forEach(item => {
            if (
                item.key.length > curKey.length
                    ? item.key.indexOf(curKey) !== 0
                    : curKey.indexOf(item.key) !== 0
            ) {
                return;
            }
            if (item.children) {
                loopLeaf(item.children, l);
            } else if (l < 1) {
                item.isLeaf = true;
            }
        });
    };
    loopLeaf(treeData, level + 1);
}
function getNewTreeData(treeData, curKey, child, level) {
    const loop = data => {
        if (level < 1 || curKey.length - 3 > level * 2) {
            return;
        }
  
        data.forEach(item => {
            if (curKey.indexOf(item.key) === 0) {
                if (item.children) {
                    loop(item.children);
                } else {
                    item.children = child;
                }
            }
        });
    };
    loop(treeData);
    setLeaf(treeData, curKey, level);
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
        setTimeout(() => {
          this.setState({
            treeData: [
                { name: "pNode 0-0", key: "0-0",type:100},
                { name: "pNode 0-1", key: "0-1",type:200},
                { name: "pNode 0-2", key: "0-2",type:300, isLeaf: true }
            ],
            visible:false
          });
        }, 2000);
      }
    onSelect = (selectedKeys,extra) => {
        this.props.onSelect(selectedKeys,extra)
    }
    onLoadData = (treeNode) => {
        return new Promise(resolve => {
            setTimeout(() => {
            const treeData = [...this.state.treeData];
            //当前加载的节点属性值
            console.log('treeNode.props',treeNode.props)
            getNewTreeData(treeData,treeNode.props.eventKey,generateTreeNodes(treeNode),2);
            this.setState({ treeData });
                resolve();
            }, 500);
        });
    }
    handleSearch = (result) => {
        const value = result.key;
        const matchedKeys = [];
        let treeData = this.state.treeData
        console.log('treeData',treeData)
        const loop = data =>
            treeData.forEach(item => {
                console.log('item.name',item.name)
                if (item.name.indexOf(value.trim()) > -1) {
                    matchedKeys.push(item.key);
                }
                if (item.children && item.children.length) {
                    loop(item.children);
                }
            });
        loop(treeData);
        this.setState({
            value: result.key,
            expandedKeys: matchedKeys,
            autoExpandParent: true
        });
        this.matchedKeys = matchedKeys;
    }

    handleExpand = (keys) => {
        this.setState({
            expandedKeys: keys,
            autoExpandParent: false
        });
    }
    
    render() {
        //定义loop方法，传入data参数，返回树节点
        const loop = data =>
            data.map(item => {
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
        //返回的treeNodes就是要渲染到页面上的树节点数据
        const treeNodes = loop(this.state.treeData);

        const { value, expandedKeys, autoExpandParent } = this.state;
        //待筛选的节点
        const filterTreeNode = node =>
        value && this.matchedKeys.indexOf(node.props.eventKey) > -1;
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
                        filterTreeNode={filterTreeNode}
                        onExpand={this.handleExpand}
                    >
                        {treeNodes}
                    </Tree>
            </Loading>
        );
    }
}
