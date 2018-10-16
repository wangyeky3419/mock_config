let envName = require('./env-name.json');//引入环境名称数据

module.exports = {
// 环境名称管理
    //登录
    'POST /mock/login':function(req,res){
        let userName = req.query.userName;
        if(userName == 'admin'){
            res.send({"state":"登录成功","user":"admin"})
        }
    },
    // 查询
    '/mock-config/envInfo/getList': function(req,res){
        let pageNumber = req.query.pageNumber;
        let pageSize = req.query.pageSize;
        let searchType = req.query.searchType;
        let searchText = req.query.searchText;
        let envName2 = envName.slice((pageNumber-1)*pageSize,pageSize*pageNumber);
        let total = envName.length;
        if(searchType&&searchText){
            envName2 = [];
            for(let i = 0; i < envName.length; i++){
                if(envName[i][searchType]==searchText){
                    envName2.push(envName[i])
                }
            }
            total = envName2.length;
        }
        let newEnvName = {
            pageNumber:pageNumber,
            pageSize:pageSize,
            rows:envName2,
            total:total
        }
        res.json(newEnvName)
    },
    // 新增
    'POST /mock-config/envInfo/add':function(req,res){
        let addItem = req.query;
        addItem.id = parseInt(10000*Math.random());
        console.log(addItem)
        envName.unshift(addItem)
        res.send({"uid":null,"sid":null,"token":null,"state":"success","content":null,"statedesc":"  请求成功!","timestamp":Date.parse(new Date())})
    },
    // 修改
    'POST /mock-config/envInfo/update':function(req,res){
        let updateItem = req.query;
        for(var i = 0; i < envName.length; i++){
            if(envName[i].id == updateItem.id){
                envName[i] = updateItem;
            }
        }
        res.send({"uid":null,"sid":null,"token":null,"state":"success","content":null,"statedesc":"  请求成功!","timestamp":Date.parse(new Date())})
    },
}