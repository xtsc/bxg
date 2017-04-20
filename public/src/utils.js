define(['jquery'],function($){
	return {
		//设置侧边栏导航高亮
		setMenu:function (key){
			//根据key值来决定哪个导航链接可以被选中
			$('.navs a[href="'+key+'"]').addClass('active').parents('ul').show();
		},
		//获取location.search，并转化为对象
		querySearch:function(key){
			//格式：?键=值&键=值，转化为数组
			var search = location.search.slice(1).split('&');
			var obj = {};
			//遍历数组，转化为对象
			for (var i = 0; i < search.length; i++) {
				var temp = search[i].split('=');
				obj[temp[0]] = temp[1];
			}
			return obj[key];
		}
	}
});