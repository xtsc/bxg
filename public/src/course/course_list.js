define(['jquery','../utils','template'],function($,utils,template){
	utils.setMenu('/course/course_list');

	var coursesList = $('#coursesList');
	var html;

	$.ajax({
		url:'/api/course',
		type:'get',
		success:function(info){
			if(info.code == 200){
				html = template('listTpl',{listData:info.result});
				coursesList.append(html);
			}
		}
	})
});