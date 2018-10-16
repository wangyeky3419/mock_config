export function setUrl(url){
    var isService = true;//服务器模式
    // var isService = false;//非服务器模式
    if(!isService){
        //不是服务器模式
        return url+'.json'
    }else{
        //是服务器模式
        return url;
    }
}
