import { Tree, Search, Loading, Feedback, Button } from "@icedesign/base";
import React, { Component } from 'react';
import AddModal from '../../../components/AddModal';
import EditModal from '../../../components/EditModal';
const Toast = Feedback.toast;
const { Node: TreeNode } = Tree;
import * as mock from './mock/envMock';
import * as ajax from '../../../utils/ajax.js';
let ids = [];
let getFields = [];
let getEditFields = [];
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
            loading:true,
            selTreeNode:null
        };
        this.matchedKeys = [];
        this.handleSearch = this.handleSearch.bind(this);
        this.handleExpand = this.handleExpand.bind(this);
    }
    componentDidMount() {
        getFields = mock.getFields();
        getEditFields = mock.getEditFields();
        let self = this;
        ajax.getTree('/mock-server/deploy/getTree',JSON.stringify({id:'',type:''}))
        .then(function(response){
            let data = response.data;
            if(data.state == 'success'){
                Toast.success(data.statedesc); 
                self.setState((prevState, props)=>({
                    treeData:JSON.parse(data.content),
                    loading:false
                })) 
            }else{
                self.setState({
                    loading:false
                })
                Toast.error(data.statedesc); 
            }
        }).catch(function(error){
            self.setState({
                loading:false
            })
        });
    }
    onSelect(selectedKeys,extra){
        console.log(extra.selectedNodes)
        let self = this;
        if(extra.selectedNodes.length==0){
            //再次点击取消选中的时候
            self.setState((prevState, props) => ({
                selTreeNode: null
            }));
        }else{
            if(extra.selectedNodes[0].props){
                let type = extra.selectedNodes[0].props.type;
                let id = extra.selectedNodes[0].props.id;
                self.setState((prevState, props) => ({
                    selTreeNode: extra.selectedNodes[0].props
                }));
                self.props.onSelect(type,id)
            }
        }
    }
    onLoadData(treeNode){
        let self = this;
        // 每次加载节点，先进行判断节点是否已经加载，如果已存在，不发送请求
        for(var i = 0; i < ids.length; i++){
            if(ids[i]==treeNode.props.id){
                return new Promise(function(resolve){resolve();});
            }
        }
        return new Promise(function(resolve){
            const treeData = [...self.state.treeData];//当前所有存在的节点，包含父子节点
            var params = {
                id:treeNode.props.id,
                type:treeNode.props.type
            }
            params = JSON.stringify(params)
            ajax.getTree('/mock-server/deploy/getTree',params)
            .then(function(response){
                let data = response.data;
                if(data.state == 'success'){
                    ids.push(treeNode.props.id)//已经加载的id进行保存
                    var newNode = JSON.parse(response.data.content);
                    Toast.success(data.statedesc)
                    getNewTreeData(treeData,treeNode.props.id,newNode);
                    self.setState(function(prevState, props) {
                        return {
                            treeData
                        };
                    });
                }else{
                    Toast.error(data.statedesc)
                }
                resolve();
            }).catch(function(error){
                console.log('error')
                Toast.error('数据加载异常');
                resolve();
            });
        });
    }
    onCancel(){
        this.setState({
            loading:false
        })
    }
    //把父组件传来的树节点给树赋值
    setTreeData(treeData){
        this.setState({
            treeData:treeData,
            loading:false
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
    //树新增
    onAddTree = () =>{
        this.openAddElement.onAddOpen()
    }
    //树新增提交
    AddSubmit = (values) => {
        //发送请求，回调公共组件
        let self = this;
        values = JSON.stringify([values])
        console.log(values)
        ajax.addTable('/mock-server/deploy/insertEnvInfo',values)
        .then(function(response){
            var data = response.data
            if(data.state == 'success'){
                Toast.success(data.statedesc);
                // self.onRefresh()
                console.log(data)
            }else{
                Toast.error(data.statedesc);
            }
            self.openAddElement.AddFinish()
        }).catch(function(error){
            Toast.error('请求异常');
            self.openAddElement.AddFinish()
        });
    }
    //修改树
    onEditTree = () => {
        let selNode = this.state.selTreeNode;
        console.log('selNode',selNode)
        let treeNode = {
            envName:selNode.label,
            id:selNode.id,
            envCode:selNode.envCode
        }
        if(selNode){
            if(selNode.type == 'env'){
                this.openEditElement.onEditOpen(treeNode)
            }else{
                Toast.prompt('请选择环境节点');
            }
        }else{
            Toast.prompt('请选择一个环境');
        }
    }
    //修改树提交
    EditSubmit = (values) => {
        //发送请求，回调公共组件
        let self = this;
        values = JSON.stringify(values)
        ajax.editTable('/mock-server/deploy/updateEnvInfo',values)
        .then(function(response){
            var data = response.data;
            if(data.state == 'success'){
                Toast.success(data.statedesc);
                self.onRefresh()
            }else{
                Toast.error(data.statedesc);
            }
            self.openEditElement.EditFinish()
        }).catch(function(error){
            Toast.error('请求异常');
            self.openEditElement.EditFinish()
        });
    }
    //删除树
    onDelTree = () =>{

    }
    render() {
        //定义loop方法，传入data参数，返回树节点
        function loop(data){
            return  data.map(function(item){
                if (item.children) {
                    return (
                        <TreeNode label={item.name} key={item.id} envCode={item.envCode} remark={item.remark} type={item.type} id={item.id}>
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
                        envCode={item.envCode}
                        remark={item.remark}
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
            <Loading visible={this.state.loading} style={{overflow:'auto'}} shape="fusion-reactor">
                <Search
                    type="normal"
                    size="small"
                    searchText=""
                    autoWidth={true}
                    value={value}
                    onSearch={this.handleSearch}
                />
                <div style={{marginTop:'5px',marginBottom:'10px'}}>
                    <Button size="small" type="primary" onClick={this.onAddTree}>新增</Button>
                    <Button size="small" type="primary" onClick={this.onEditTree} style={{marginLeft:'10px'}}>修改</Button>
                    <Button size="small" type="primary" onClick={this.onDelTree} style={{marginLeft:'10px'}}>删除</Button>
                </div>
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
                    <AddModal ref={el => this.openAddElement = el} AddSubmit={this.AddSubmit} fields={getFields}/>
                    <EditModal ref={el => this.openEditElement = el} EditSubmit={this.EditSubmit} fields={getEditFields}/>
            </Loading>
        );
    }
}
