//用户提交表单时将数据发送到服务端
//要将表单提交有两种方式：鼠标点击、回车
//submit事件，表单提交时触发
define(['jquery','cookie'],function(){
	$('#loginForm').on('submit',function(){
        //表单数据 序列化，自动忽略没有name属性的表单元素
        var formData = $(this).serialize();
    
        $.ajax({
            url:'/api/login',
            type:'post',
            data:formData,
            success:function(info){
                if(info.code == 200){
                    //JSON.stringify()将一个JavaScript值转换为一个JSON字符串
                    //cookie只能存储字符串
                    $.cookie('loginInfo',JSON.stringify(info.result));
                    location.href = '/';
                }
            }
        });
        //阻止默认事件
        return false;
    });
})