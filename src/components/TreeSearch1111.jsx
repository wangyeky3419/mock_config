import { Tree, Search, Loading } from "@icedesign/base";
import React, { Component } from 'react';
import * as action from '../utils/commonFn';
const { Node: TreeNode } = Tree;

function generateTreeNodes(treeNode) {
    const arr = [];
    const key = treeNode.props.eventKey;
    for (let i = 0; i < 3; i++) {
      arr.push({ name: `leaf ${key}-${i}`, key: `${key}-${i}` });
    }
    return arr;
  }
  
  function setLeaf(treeData, curKey, level) {
      console.log('current',treeData,curKey,level)
    const loopLeaf = (data, lev) => {
      const l = lev - 1;
      data.forEach(item => {
        if (item.key.length > curKey.length ? item.key.indexOf(curKey) !== 0 : curKey.indexOf(item.key) !== 0) {
            return;
        }
        console.log('ininin')

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
        this.setState({
            treeData:this.props.treeData,
            visible:false
        })
    }
    onCancel(){
        this.setState({
            visible:false
        })
    }
    onSelect(selectedKeys,extra){
        this.props.onSelect(selectedKeys,extra)
    }
    onLoadData(treeNode){
        //当前加载的节点属性值
        // console.log('点击加载',treeNode.props)
        // var params = {
        //     id:treeNode.props.id,
        //     type:treeNode.props.type
        // }
        // this.props.getTreeNode(params)
        return new Promise(resolve => {
            setTimeout(() => {
              const treeData = [...this.state.treeData];
              getNewTreeData(
                treeData,
                treeNode.props.eventKey,
                generateTreeNodes(treeNode),
                2
              );
              this.setState({ treeData });
              resolve();
            }, 500);
          });
      
    }
    handleSearch(result){
       
    }
    //把父组件传来的树节点给树赋值
    setTreeData(treeData){
        this.setState({
            treeData:treeData,
            visible:false
        })
    }
    handleExpand(keys){
        this.setState({
            expandedKeys: keys,
            autoExpandParent: false
        });
    }
    toTreeData(data) {
        for(var i = 0; i < data.length; i++){
            data[i].key = data[i].id;
        }
        var pos = {};
        var tree = [];
        var i = 0;
        while (data.length != 0) {
            if (data[i].pId == '0'||data[i].pId == null) {
                //根节点
                data[i].children = []
                tree.push(data[i]);
                pos[data[i].id] = [tree.length - 1];
                data.splice(i, 1);
                i--;
            } else {
                // 非跟节点
                var posArr = pos[data[i].pId];
                if (posArr != undefined) {
                    var obj = tree[posArr[0]];
                    for (var j = 1; j < posArr.length; j++) {
                        obj = obj.children[posArr[j]];
                    }
                    data[i].children = []
                    obj.children.push(data[i]);
                    pos[data[i].id] = posArr.concat([obj.children.length - 1]);
                    data.splice(i, 1);
                    i--;
                }
            }
            i++;
            if (i > data.length - 1) {
                i = 0;
            }
        }
    }
    render() {
        //定义loop方法，传入data参数，返回树节点
        function loop(data){
            return  data.map(function(item){
                if (item.children) {
                    return (
                        <TreeNode label={item.name} key={item.key}  type={item.type} id={item.id}>
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
                        id={item.id}
                    />
                );
        });
        }
           
        //返回的treeNodes就是要渲染到页面上的树节点数据
        const treeNodes = loop(this.state.treeData);

        const { value, expandedKeys, autoExpandParent } = this.state;
        
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
                        // filterTreeNode={filterTreeNode.bind(this)}
                        onExpand={this.handleExpand.bind(this)}
                        editable={true}
                    >
                        {treeNodes}
                    </Tree>
            </Loading>
        );
    }
}
