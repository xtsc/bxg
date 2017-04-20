//检测用户是否登录，如果没有登录跳转到登录界面
//如果用户登录了，会在服务器端存储一个session，浏览器会设置一个名字叫PHPSESSID的cookie

//只要检测PHPSESSID是否存在就能判断用户是否登录过
//通过document.cookie可以读取本地存的cookie
//location对象，可以获得浏览器的地址信息

define(['jquery','template','nprogress','cookie'],function($,template,nprogress){
	//进度条
	nprogress.start();
	nprogress.done();


	//检测用户是否登录
	if(document.cookie.indexOf('PHPSESSID') == -1 && location.pathname != '/login'){
		//PHPSESSID不存在，说明未登录过，若不是登录界面，则跳转至登录界面
		location.href = '/login';
	}
	
	//获取用户登录信息，储存在cookie中
	//JSON.parse()解析一个JSON字符串，构造由字符串描述的JavaScript值或对象
	//未登录前不存在，为undefined
	var loginInfo = $.cookie('loginInfo') && JSON.parse($.cookie('loginInfo'));
	loginInfo = loginInfo || {};
	
	//将存在cookie的用户名和头像显示在页面中
	/*操作DOM耗费性能，不推荐
	$('.profile img').attr('src',loginInfo.tc_avatar);
	$('.profile h4').text(loginInfo.tc_name);*/
	//模板引擎
	// 基于模板名渲染模板
	//template(filename, data);
	//第一个是模板所在DOM标签的ID，第二个是模板所需要的数据(对象类型)
	// 将模板源代码编译成函数
	//template.compile(source, options);
	//第一个是字符串形式的模板，第二个是配置选项，可省略
	// 将模板源代码编译成函数并立刻执行
	//template.render(source, data, options);

	var source = '<div class="avatar img-circle">\
            		<img src="<%= tc_avatar %>">\
    			  </div>\
        		  <h4><%= tc_name %></h4>';
	/*var render = template.compile(source);
	var html = render(loginInfo);*/
	var html = template.render(source,loginInfo);
	$('.aside .profile').append(html);


	//退出登录：点击"退出"按钮，发送ajax请求
	$('#logout').click(function(){
		$.ajax({
			url:'/api/logout',
			type:'post',
			success:function(info){
				if (info.code == 200) {
					location.href = '/login';
					/*var date=new Date();
					//将date设置为过去的时间
					date.setTime(date.getTime()-10000);
					//将cookie删除
					document.cookie="expire="+date.toGMTString();*/
				}
			}
		});
	});

	//侧边栏导航切换
	$('.aside .navs ul').prev('a').on('click',function(){
		$(this).next().slideToggle();
	});
});
