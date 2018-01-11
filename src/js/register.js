require(["config"], function(){
	require(["load"], function(){
		$.cookie.json = true;
		$(".btn").click(function(){
				var user = $(".username").val(),
			pass = $(".pwd").val()
		var url1 = `http://10.7.187.142/do_register.php?username=${user}&password=${pass}`
		$.ajax({
			url:url1,
			type:"GET",
			datatype:"json",
			success:function(data){
			// alert("注册成功");
			alert("登录成功！");
				setTimeout(function  () {
							location="/index.html";
						},2000);




			 }
			// 
			// 
			// 
			})
		})

	});
});