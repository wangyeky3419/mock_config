import React, { Component } from 'react';
import { Tree, Button, Loading } from "@icedesign/base";
import * as ajax from '../../utils/ajax.js';
import * as action from '../../utils/commonFn';
var node = [
    {name:'child1',id:'001',pId:'01',key:'001'},
    {name:'child2',id:'002',pId:'01',key:'002'},
    {name:'children1',id:'0001',pId:'001',key:'0001'}
]
let newNode = {
    name:'newChild1',id:'001',pId:'01',key:'001'
}
const { Node: TreeNode } = Tree;
    function createTreeNodes(treeNode) {
        const arr = [];
        const id = treeNode.props.id;
        for (let i = 0; i < node.length; i++) {
            if(id==node[i].pId){
                arr.push(node[i]);
            }
        }
        return arr;
    }
    function getNewTreeData(treeData, curTd, child) {
        console.log(treeData, curTd, child)
        const loop = data => {
            data.forEach(item => {
                if(item.id==curTd){
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
export default class test extends Component {
    constructor(props) {
        super(props);
        this.state = {
            treeData: [],
            selectId:''
        };
    }
    componentDidMount() {
        setTimeout(() => {
            this.setState({
                treeData: [
                    { name: "pNode 01", key: "0" ,id: '01',pId:'0'},
                    { name: "pNode 02", key: "1" ,id: '02',pId:'0'}
                ]
            });
        }, 100);
    }
    onLoadData(treeNode) {
        let self = this;
        return new Promise(resolve => {
            setTimeout(() => {
                const treeData = [...this.state.treeData];
                getNewTreeData(treeData,treeNode.props.id,createTreeNodes(treeNode));
                self.setState(function(prevState, props) {
                    console.log('prevState',prevState,props)
                    return {
                        treeData
                    };
                });
                resolve();
            }, 500);
        });
    }
    onSelect(selectedKeys,extra){
        this.setState({
            selectId:extra.node.props
        })
        console.log('extra.node',extra.node.props)
    }
    onAdd(){
        console.log('this.state.treeData',this.state.treeData)
        let treeData = this.state.treeData;
        function loop(data){
            for(var i = 0; i < data.length; i++){
                if(data[i].id==newNode.id){
                    data[i] = newNode;
                    return data;
                }
                if(data[i].children){
                    loop(data[i].children)
                }else{
                    
                }
            }
        }
        loop(treeData)
        this.setState((prevState,props)=>({
            treeData
        }))
        console.log('newNode',newNode)
    }
    onUp(){
        [
            {name:'1',id:1,children:[{name:'11',id:11}]},
            {name:'2',id:2}
        ]
        let treeData = this.state.treeData;
        // let selectId = this.state.selectId;
        function loop2(data){
            for(var i = 0; i < data.length; i++){
                data[i].isdel = 0;
                if(data[i].id==newNode.id){
                    if(data[i].children){
                        newNode.children = data[i].children
                    }
                    data[i] = newNode;
                    return;
                }
            }
            for(var i = 0; i < data.length; i++){
                if(data[i].children){
                    loop2(data[i].children)
                }
            }
        }
        loop2(treeData)
        console.log(treeData)
        this.setState((prevState,props)=>({
            treeData:treeData
        }))
    }
    onDel(){

    }
    render() {
        const loop = data =>
        data.map(item => {
            if (item.children) {
                return (
                    <TreeNode label={item.name} key={item.key} id={item.id}>
                        {loop(item.children)}
                    </TreeNode>
                );
            }
            return (
                <TreeNode
                    label={item.name}
                    key={item.key}
                    isLeaf={item.isLeaf}
                    disabled={item.key === "0-0-0"}
                    id={item.id}
                />
            );
        });
        const treeNodes = loop(this.state.treeData);
        return (
            <div style={{background:'#fff'}}>
                <Tree
                    loadData={this.onLoadData.bind(this)}
                    onSelect={this.onSelect.bind(this)}
                >
                    {treeNodes}
                </Tree>
                <Button type="primary" onClick={this.onAdd.bind(this)}>新增节点</Button>
                <Button type="primary" onClick={this.onUp.bind(this)}>修改节点</Button>
                <Button type="primary" onClick={this.onDel.bind(this)}>删除节点</Button>
            </div>
        );
    }
}
