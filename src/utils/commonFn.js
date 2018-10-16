import { Feedback, Dialog } from '@icedesign/base';
const Toast = Feedback.toast;
//生成树节点
export function toTreeData(data) {
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
    return tree;
}
//确认弹框
export function confirm(param,url,text,iSingle){
    if(iSingle){
        if(param.length == 0){
            Toast.prompt("请选择一行数据");
            return false;
        }
        if(param.length != 1){
            Toast.prompt("请选择一行数据");
        }else {
            //接口调用
            let url = url
            Dialog.confirm({
                content: "确定要"+text+"吗？",
                title: "是否"+text,
                onOk: () => {
                    Toast.success(text+"成功");
                }
            });
        }
    }else{
        if(param.length == 0){
            Toast.prompt("请选择一行数据");
        }else {
            //删除接口调用
            let url = url
            Dialog.confirm({
                content: "确定要"+text+"吗？",
                title: "是否"+text,
                onOk: () => {
                    Toast.success(text+"成功");
                }
            });
        }
    }
}
export function getSelectNode(treeNodes,key){
    for(var i = 0; i< treeNodes.length; i++){
        if(treeNodes[i].id == key){
            //有数据，说明不在children里面
            return treeNodes[i]
        }
    }
}