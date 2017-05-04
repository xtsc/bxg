define(['jquery','../utils','template','jqueryForm','validate','bootstrap'],function($,utils,template){
	utils.setMenu('/course/course_add');

	var lessonInfo = $('#lessonInfo'),
		chapterModal = $('#chapterModal'),
		modalInfo = $('#modalInfo'),
		cs_id = utils.querySearch('cs_id'),
		html,btnTxt;

	//渲染页面
	render();

	//添加课时
	lessonInfo.on('click','#addLesson',function(){
		//弹出模态框
		chapterModal.modal();
		btnTxt = '  添 加 ';
		html = template('modalTpl',{btnTxt: btnTxt});
		modalInfo.html(html);
		
		//提交表单
		modalInfo.off('click','#save').on('click','#save',function(){
			modalInfo.find('form').ajaxSubmit({
				url:'/api/course/chapter/add',
				type:'post',
				data:{ct_cs_id: cs_id},
				success: function (info) {
					if(info.code == 200){
						//模态框隐藏
						chapterModal.modal('hide');
						//渲染页面
						render();
					}
				}
			});
		});
	});

	//编辑课时
	lessonInfo.on('click','.edit',function(){
		var ct_id = $(this).parent().attr('data-id');
		$.ajax({
			url:'/api/course/chapter/edit',
			type:'get',
			data:{ct_id: ct_id},
			success:function(info){
				if(info.code == 200){
					chapterModal.modal();
					btnTxt = ' 保 存 ';
					info.result.btnTxt = btnTxt;
					html = template('modalTpl',info.result);
					modalInfo.html(html);
					
					//修改课时
					modalInfo.off('click','#save').on('click','#save',function(){
						modalInfo.find('form').ajaxSubmit({
							url:'/api/course/chapter/modify',
							type:'post',
							data:{ct_cs_id: cs_id},
							success: function (info) {
								if(info.code == 200){
									//模态框隐藏
									chapterModal.modal('hide');
									//渲染页面
									render();
								}
							}
						});
					});
				}
			}
		})
	});

	
	//删除课时
	lessonInfo.on('click','.delete',function(){
		$(this).parents('li').remove();
	});

	
	//渲染页面
	function render(){
		$.ajax({
			url:'/api/course/lesson',
			type:'get',
			data:{cs_id:cs_id},
			success:function(info){
				if (info.code == 200) {
					console.log(info);
					html = template('lessonTpl',info.result);
					lessonInfo.html(html);
				}
			}
		});
	}
})