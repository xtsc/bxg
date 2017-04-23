define(['jquery','../utils','template','bootstrap'],function($,utils,template){
	//设置侧边栏导航高亮显示
	utils.setMenu('/teacher/teacher_list');

	//获取DOM元素
	var teacherList = $('#teacherList');
	var teacherModal = $('#teacherModal');
	var html;

	//发送请求获取数据
	$.ajax({
		url:'/api/teacher',
		type:'get',
		success:function(info){
			if(info.code == 200){
				info.result.forEach(function(element, index){
					element.tc_age = new Date().getFullYear()-element.tc_birthday.slice(0,4);
				});
				html = template('listTpl',{teacherData:info.result});
				teacherList.find('tbody').html(html);
			}
		}
	});
	
	teacherList.on('click','.view',function(){
		//显示模态框：查看讲师
		//获取讲师tc_id
		var tc_id = $(this).parent().attr('data-id');
		$.ajax({
			url:'/api/teacher/view',
			type:'get',
			data:{tc_id:tc_id},
			success:function(info){
				if (info.code == 200) {
					//调整籍贯格式
					info.result.tc_hometown = info.result.tc_hometown.replace(/\|/g, ' ');
					//调用模板
					html = template('modalTpl', info.result);
					teacherModal.find('table').html(html).end().modal();
				}
			}
		});
	}).on('click','.handle',function(){
		//tc_status=0:启用状态，文案为注销
		var _this = $(this);
		//获取讲师tc_id
		var tc_id = _this.parent().attr('data-id');
		//获取讲师当前状态
		var tc_status = _this.attr('data-status');

		$.ajax({
			url:'/api/teacher/handle',
			type:'post',
			data:{tc_id:tc_id,tc_status:tc_status},
			success:function(info){
				if (info.code == 200) {
					//更改按钮文字、data-status属性
					var txt = info.result.tc_status == 1 ? '启 用':'注 销';
					_this.text(txt).attr('data-status',info.result.tc_status);
				}
			}
		});
	});

});