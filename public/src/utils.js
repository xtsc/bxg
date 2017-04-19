define(['jquery'],function($){
	return {
		setMenu:function (key){
			//根据key值来决定哪个导航链接可以被选中
			$('.navs a[href="'+key+'"]').addClass('active').parents('ul').show();
		}
	}
});