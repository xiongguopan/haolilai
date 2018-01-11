require(["config"], function(){
	require(["load"], function(){
		$.cookie.json = true;
		//
		$(".dl").click(function(e){
		e = e || event;
		e.preventDefault ? e.preventDefault():e.returnValue = false;

		var pass = $(".pwd").val(),
			user = $(".username").val();
		// console.log(pass);

		var urls = 	`http://10.7.187.142/do_login.php`;

			$.ajax({
						url: urls,
						type: "POST",
						data:`username=${user}&password=${pass}`,
						dataType:"json",
						success:function(data){
													
							if (data.status == 1) {
									alert("登录成功！");
									setTimeout(function  () {
												location="/index.html";
											},2000);
							}else{
									alert("登录失败,请重新登录！");

										
								}
						}
				});
			
			});



		//	


	});
});