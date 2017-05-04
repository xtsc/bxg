define(['jquery','../utils','template','ckeditor','jqueryForm','validate'],function($,utils,template,CKEDITOR){
	utils.setMenu('/course/course_add');

	var basicInfo = $('#basicInfo'),
		cs_id = utils.querySearch('cs_id'),
		html,cg_id,data,source;

	//渲染页面
	$.ajax({
		url:'/api/course/basic',
		type:'get',
		data:{cs_id:cs_id},
		success:function(info){
			if(info.code == 200){
				html = template('basicTpl',info.result);
				basicInfo.append(html);
				//富文本编辑器
				CKEDITOR.replace('ckeditor',{
					toolbarGroups : [
						{ name: 'clipboard',   groups: [ 'clipboard', 'undo' ] },
        				{ name: 'editing',     groups: [ 'find', 'selection', 'spellchecker' ] },
        				{ name: 'links' },
        				{ name: 'insert' },
        				{ name: 'forms' },
        				{ name: 'tools' },
        				{ name: 'document',    groups: [ 'mode', 'document', 'doctools' ] },
        				{ name: 'others' },
        				'/',
        				{ name: 'basicstyles', groups: [ 'basicstyles', 'cleanup' ] },
        				{ name: 'paragraph',   groups: [ 'list', 'indent', 'blocks', 'align', 'bidi' ] },
        				{ name: 'styles' },
        				{ name: 'colors' },
        				{ name: 'about' }
									]
    			});
    			dealForm();
			}
		}
	});

	basicInfo.on('change','#top',function(){
		var _this = $(this);
		cg_id = _this.val();
		//查询二级分类
		$.ajax({
			url:'/api/category/child',
			type:'get',
			data:{cg_id:cg_id},
			success:function(info){
				if(info.code == 200){
					data = {levelData:info.result};
					source = '<option value="">选择二级分类</option>\
					{{each levelData}}\
                                <option value="{{$value.cg_id}}" {{if cs_cg_id == $value.cg_id}}selected{{/if}}>{{$value.cg_name}}</option>\
                                {{/each}}';
					html = template.render(source,data);
					_this.next('select').html(html);
				}
			}
		});
	});
	
	//表单处理
	function dealForm(){
		basicInfo.find('form').validate({
			sendForm:false,
			onKeyup:true,
			eachValidField:function(){
				//this指合法的表单项
			},
			eachInvalidField:function(){
				//this指不合法的表单项
			},
			valid:function(){
				//提交富文本数据
				for(instance in CKEDITOR.instances){
					CKEDITOR.instances[instance].updateElement();
				}
				//this指当前被验证的表单
				$(this).ajaxSubmit({
					url:'/api/course/update/basic',
					type:'post',
					success:function(info){
						if(info.code == 200){
							console.log(info.result);
							location.href = '/course/course_add_step2?cs_id='+info.result.cs_id;
						}
					}
				});
			},
			description:{
				//错误信息描述
			}
		});
	}

})