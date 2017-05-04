define(['jquery','../utils','template','uploadify','Jcrop'],function($,utils,template){
	utils.setMenu('/course/course_add');

	var pictureInfo = $('#pictureInfo'),
		cs_id = utils.querySearch('cs_id'),
		html,jcrop_api;

	//渲染页面
	$.ajax({
		url:'/api/course/picture',
		type:'get',
		data:{cs_id:cs_id},
		success:function(info){
			if (info.code == 200) {
				html = template('pictureTpl',info.result);
				pictureInfo.append(html);
				// 获取图片裁切原始图片
            	var preview = $('.preview img');

            	//上传封面图并裁切
				$('#upfile').uploadify({
					//设置上传按钮的尺寸
					width:70,
					height:'auto',
					//设置input[type="file"]上的文字
					buttonText:'选择图片',
					buttonClass:'btn btn-success btn-sm',
					//data
					formData: {cs_id: cs_id},
					//设置上传文件的类型
					fileTypeExts:'*.jpg;*.png;*.gif',
					//设置上传文件的大小
					fileSizeLimit:'2MB',
					//flash插件
					swf:'/public/assets/uploadify/uploadify.swf',
					//请求地址
					uploader:'/api/uploader/cover',
					//用来定义进度条的html结构
		            itemTemplate: '<span></span>',
					//input[type="file"]的name值
					fileObjName:'cs_cover_original',
					onUploadSuccess:function(file,data){
						//file：上传的文件
						//data：json字符串，返回的数据
						data = JSON.parse(data);

						//图片预览
						preview.attr('src',data.result.path);
					
						//图片裁切
						imgJcrop(preview);
						//改变裁切按钮状态
						$('#cut').attr('data-status','save').val('保存图片').prop('disabled',false);
					}
				});
				
				//点击进行裁切
				pictureInfo.on('click','#cut',function(){
					var status = $(this).attr('data-status');
					if(status == 'save'){
						//已经设置了选区，将记录的选区提交到服务器
						$.ajax({
							url:'/api/course/update/picture',
							type:'post',
							data: $('#coords').serialize(),
							success:function(info){
								if(info.code == 200){
                                location.href = '/course/course_add_step3?cs_id=' + info.result.cs_id;
								}
							}
						})
					}else{
						$(this).attr('data-status','save').val('保存图片').prop('disabled',false);
						imgJcrop(preview);
					}
				});

				//获得实时的裁切尺寸
				preview.parent().on('cropstart cropmove cropend',function(e,s,c){
					$('#x').val(c.x);
	                $('#y').val(c.y);
	                $('#w').val(c.w);
	                $('#h').val(c.h);
				});
			}
		}
	});

	//图片裁切
	function imgJcrop(preview){
		//避免多次实例操作
		if(jcrop_api){
			jcrop_api.destroy();
		}
		preview.Jcrop({
			boxWidth: 400,
			aspectRatio: 2
		},function(){
			//赋值全局实例
			jcrop_api = this;
			//计算选区尺寸
			var w = this.ui.stage.width,
			    h = w/2,
			    x = 0,
			    y = (this.ui.stage.height - h)/2;
		    //新建一个选区
		    this.newSelection();
		    this.setSelect([x,y,w,h]);
		    this.refresh();
		    //生成缩略图
		    this.initComponent('Thumbnailer', {
                //缩略图的尺寸
                width: 240,
                height: 120,
                thumb: '.thumb'
            });
		});
		
	}

})