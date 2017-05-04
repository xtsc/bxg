define(['jquery','../utils','template'],function($,utils,template){
	//侧边导航栏高亮显示
	utils.setMenu('/course/course_category');

	var html;
	var category_list = $('#category_list');

	//渲染页面
	$.ajax({
		url:'/api/category',
		type:'get',
		success:function(info){
			if(info.code == 200){
				html = template('categoryTpl',{categoryList:info.result});
				category_list.find('tbody').html(html);
			}
		}
	});
});