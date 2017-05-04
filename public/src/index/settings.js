define(['jquery','template','ckeditor','jqueryForm','validate','datepicker','language','region','uploadify'],function($,template,CKEDITOR){
	//获取元素
	var settings = $('#settings');
	var html;

	//先获取讲师基本信息，然后进行展示
	$.ajax({
		url:'/api/teacher/profile',
		type:'get',
		success:function(info){
			if(info.code == 200){
				//渲染页面
				html = template('settingsTpl',info.result);
				settings.find('form').html(html);
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
    			//省市县三级联动
    			$('.hometown').region({
    				url:'/public/assets/jquery-region/region.json'
    			});
    			//表单处理
    			settings.find('form').validate({
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
    						url:'/api/teacher/modify',
    						type:'post',
    						success:function(info){
    							if(info.code == 200){
    								console.log(info);
    							}
    						}
    					});
    				},
    				description:{
    					//错误信息描述
    				}
    			});

    			//头像上传
    			$('#upfile').uploadify({
    				//设置上传按钮的尺寸
    				width:120,
    				height:120,
    				//设置input[type="file"]上的文字
    				buttonText:'',
    				//设置上传文件的类型
    				fileTypeExts:'*.jpg;*.png',
    				//设置上传文件的大小
    				fileSizeLimit:'2MB',
    				//flash插件
    				swf:'/public/assets/uploadify/uploadify.swf',
    				//请求地址
    				uploader:'/api/uploader/avatar',
    				//input[type="file"]的name值
    				fileObjName:'tc_avatar',
    				onUploadSuccess:function(file,data){
    					//file：上传的文件
    					//data：json字符串，返回的数据
    					data = JSON.parse(data);
    					console.log(data);
    					$('.preview img').attr('src',data.result.path);
    				}
    			})
			};
		}
	});
})