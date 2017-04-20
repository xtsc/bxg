define(['jquery','../utils','template','jqueryForm','validate'],function($,utils,template){
	//设置侧边栏高亮
	utils.setMenu('/teacher/teacher_list');

	//获取元素
	var teacherAdd = $('#teacherAdd');
	var tc_id = utils.querySearch('tc_id');
	var html,tips;

	if(tc_id){
		//编辑
		$.ajax({
			url:'/api/teacher/edit',
			type:'get',
			data:{tc_id:tc_id},
			success:function(info){
				if(info.code == 200){
					console.log(info.result);
					//提示文案：修改成功
					tips = '修改成功';
					//追加数据
					info.result.title = '修改讲师';
					info.result.action = '/api/teacher/update';
					info.result.btnText = ' 修 改 ';
					//调用模板引擎
					html = template('addTpl',info.result);
					//追加DOM
					teacherAdd.html(html);
					//验证表单
					dealForm();
				}
			}
		});
	}else{
		//添加
		//调用模板引擎
		html = template('addTpl',{
			//追加数据
			title : '添加讲师',
			action : '/api/teacher/add',
			btnText : ' 添 加 '
		});
		//追加DOM
		teacherAdd.html(html);
		//提示文案：添加成功
		tips = '添加成功';
		//验证表单
		dealForm();
	}

	//验证表单
	function dealForm(){
		$('#teacherAddForm').validate({
			//阻止表单默认提交
			sendForm:false,
			//校验表单
			onKeyup:true,
			//合法的表单执行
			eachValidField:function(){
				//this指合法的表单项
				$(this).next().addClass('glyphicon-ok').removeClass('glyphicon-remove').parents('.form-group').addClass('has-success').removeClass('has-error');
			},
			//不合法的表单执行
			eachInvalidField:function(){
				//this指不合法的表单项
				$(this).next().addClass('glyphicon-remove').removeClass('glyphicon-ok').parents('.form-group').addClass('has-error').removeClass('has-success');
			},
			//所有表单都合法时执行
			valid:function(){
				//提交表单，this指当前表单
				$(this).ajaxSubmit({
					type: 'post',
					success: function(info){
						if(info.code == 200){
							alert(tips);
							location.href = '/teacher/teacher_list';
						}
					}
				});
			},
			//描述信息
			description:{
				name:{
					required:'讲师名称不能为空'
				},
				pass:{
					required:'密码不能为空',
					pattern:'密码为6-12位字母或数字'
				},
				date:{
					required:'入职时间不能为空'
				}
			}
		});
	}
	
});