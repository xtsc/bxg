requirejs.config({
	//直接改变基目录
	baseUrl:'/public',
	//直接指定它的网址或路径
	paths:{
		'jquery':'assets/jquery/jquery.min',
		'cookie':'assets/jquery-cookie/jquery.cookie',
		'bootstrap':'assets/bootstrap/js/bootstrap.min',
		'echarts':'assets/echarts/echarts.min',
		'template':'assets/artTemplate/template-web',
		'nprogress':'assets/nprogress/nprogress'
	},
	//shim属性，配置不兼容的模块。每个模块要定义（1）exports值（输出的变量名），表明这个模块外部调用时的名称；（2）deps数组，表明该模块的依赖性。
	shim:{
		'bootstrap':{
			exports:'bootstrap',
			deps:['jquery']
		}
	}
});


require(['src/common']);