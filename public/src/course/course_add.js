define(['jquery','../utils','template','jqueryForm','validate'],function($,utils,template){
	utils.setMenu('/course/course_add');

	$('#addCourse').validate({
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
				url:'/api/course/create',
				type: 'post',
				success: function(info){
					if(info.code == 200){
						location.href = '/course/course_add_step1?cs_id='+info.result.cs_id;
					}
				}
			});
		},
		//描述信息
		description:{
			name:{
				required:'课程名称不能为空'
			}
		}
	});
})