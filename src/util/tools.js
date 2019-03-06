/*
 * @Author: 张培培
 * @Github: https: //github.com/ZiMingDaYou
 * @Date: 2019-01-16 18:09:08
 * @LastEditors: 张培培
 * @LastEditTime: 2019-01-18 20:41:24
 */
var Hogan = require('hogan.js');
var conf ={
    serverHost : ''
};
var _tools = {
    request: function(param){
        var _this = this;
        $.ajax({
            type     : param.method || 'get' ,
            url      : param.url    || ''   ,
            datatype : param.type   || 'json',
            data     : param .data  || ''    ,
    success  : function(res){
                //请求成功
                if(0 === res.status){
                    typeof param.success === 'function' && param.success(res.data,res.msg);
                }
                //没有登录状态，需要强制登陆
                else if(10 === res.status){
                    _this.doLogin();
                }
                //请求数据错误
                else if(1 === res.status){
                    typeof param.error === 'function' && param.error(res.msg);
                }
            },
    error    : function(err){
                typeof param.error === 'function' && param.error(err.statusText);
            }
        });
    },
    doLogin : function(){
        //同意登陆处理，登陆后跳转到来的地址，为防止地址有特殊字符，将地址进行编码
        window.location.href='./login.html?redirect='+encodeURIComponent(window.location.href);
    },
    //跳转主页的方法
    goHome : function(){
        window.location.href = './index.html';
    },
    //获取服务器地址
    getServerURL : function(path){
        return conf.serverHost + path;
    },
    //获取URL参数
    getURLParam : function(name){
        var reg    = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');//正则匹配，（&&）key = value  ($|&&),^&匹配直到&为止
        var result = window.location.search.substr(1).match(reg);//将URL？之后参数部分与正交规则相匹配,   并将?去掉
        return result ? decodeURIComponent(result[2]):null;//result[0]是完整匹配，result[1]是第一个括号的内容
    },
    //渲染html模板，把传入的html模板与data数据拼接起来
    renderHtml : function(htmlTemplate, data){
        var template = Hogan.compile(htmlTemplate),
            result   = template.render(data);
        return result; 
    },
    //成功提示
    successTips : function(res){
        alert(res||'操作成功');
    },
    //错误提示
    errorTips: function (errMsg) {
        alert(errMsg || '操作失败');
    },
    validate : function(value,type){
        var value = $.trim(value);
        //是否为空验证
        if('requre' === type){
            //requre必须有值
            return !!value;//强转布尔型
        }
        //手机号验证
        if('phone' === type){
            return /^1\d{10}$/.test(value);
        }
        //邮箱验证
        if('email' === type){
            return /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/.test(value);
        }
    }
};

module.exports = _tools;