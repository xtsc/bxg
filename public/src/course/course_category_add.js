define(['jquery','../utils','template','jqueryForm','validate'],function($,utils,template){
	//侧边导航栏高亮显示
	utils.setMenu('/course/course_category');

	//获取元素
	var courseAdd = $('#courseAdd'),
	 	cg_id = utils.querySearch('cg_id'),
	 	html,tips,data,source;

	if(cg_id){
		//编辑
		$.ajax({
			url:'/api/category/edit',
			type:'get',
			data:{cg_id:cg_id},
			success:function(info){
				if(info.code == 200){
					info.result.cg_action = '/api/category/modify';
					info.result.btn_txt = '修改';
					html = template('categoryAddTpl',info.result);
					courseAdd.html(html);
					tips = '修改成功';
					dealForm();
				}
			}
		});

	}else{
		//添加分类
		html = template('categoryAddTpl',{cg_action:'/api/category/add',btn_txt:'保存'});
		courseAdd.html(html);
		getTop($('#top'));
		tips = '添加成功';
		dealForm();
	}

	//获取顶级分类
	function getTop($top){
		$.ajax({
			url:'/api/category/top',
			type:'get',
			success:function(info){
				if(info.code == 200){
					data = {categoryTopData:info.result};
					source = '{{each categoryTopData}}\
					<option value="{{$value.cg_id}}">{{$value.cg_name}}</option>\
					{{/each}}';
					html = template.render(source,data);
					$top.append(html);
				}
			}
		});
	}

	//验证表单
	function dealForm(){
		courseAdd.find('form').validate({
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
							location.href = '/course/course_category';
						}
					}
				});
			},
			//描述信息
			description:{
				name:{
					required:'分类名称不能为空'
				}
			}
		});
	}
	




});