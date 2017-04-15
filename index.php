<?php 

	//输出当前系统内php的详细信息
	//phpinfo();
	//退出
	//exit;

	//通过PHP来获得地址的信息，根据地址的信息执行不同的逻辑
	//如何获得地址信息？
	//PHP通过$_GET可以获得get方式发送的请求
	//PHP通过$_POST可以获得post方式发送的请求
	//PHP通过$_FILES可以获得上传的文件
	//PHP通过$_SERVER可以获得服务器信息
	
	//var_dump($_SERVER);

	//通过$_SERVER['PATH_INFO']可以获得地址的部分信息
	//通过此信息可以调整输出的内容

	$pathinfo = $_SERVER['PATH_INFO'];
	//include './views'.$pathinfo.'.html';

	//当网站规模较大时，页面会增多，需要处理的逻辑就会变复杂，这时有必要对路由进行设计，以达到优化的目的

	//通过分析博学谷项目，发现页面基本是两层结构，例如讲师管理包含添加讲师、修改讲师以及讲师列表，课程管理包含基本信息、图片信息、课时信息等等

	//页面分成两层结构，地址也需要进行相应的调整，地址也需要是两层的
	//例如：bxg.com/index.php/teacher/teacher_add

	//$pathinfo就包含了路径的两部分

	//为了保证地址的灵活性，URL地址需要支持一层结构，如bxg.com/login，
	//假如是一层结构，默认采用的目录名称为index，
	//如上相当于是bxg.com/index/login

	//和两层结构，如bxg.com/teacher/teacher_add


	//首先判断地址是一层结构还是两层

	//将$pathinfo拆分成数组，判断数组长度得到地址的结构
	
	//截取字符串
	$pathinfo = substr($pathinfo, 1);
	//使用explode()将字符串拆成数组
	$route = explode('/', $pathinfo);
	//print_r($route);

	//PHP使用empty()函数可以判断某个变量是否为空，为空则为true，否则为false
	if (empty($pathinfo)) {
		$path = 'index/index';
	}else if(count($route) == 1){
		//判断数组长度为1
		$path = 'index/'.$route[0];
	}else{
		//判断数组长度为2
		$path = $route[0].'/'.$route[1];
	}

	include './views/'.$path.'.html';
	
?>