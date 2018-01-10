require(["config"], function(){
	require(["jquery", "template", "zoom","cookie","load"], function($,template){
		
	// 配置 cookie 插件的 json 数据自动转换
	$.cookie.json = true;

	//加载相应商品的数据
	//从cookie里面拿到传过来的id
	var contrast = $.cookie("id"); 
	
	$.getJSON("/mock/detail.json",function(data){
		 let contrastData = data.res_body.data;
		 //定义一个数组来存放json里面的id
		 let arr=[],
			  xb=0;
	$.each(contrastData,function( index ,elements){
		arr.push(`${elements.id}`);
	})		  
	xb = $.inArray(contrast,arr);
	let cData = {products : data.res_body.data};

	var array =[];
	//获取下标对应的数据
	array.push(cData.products[xb])

	var html = "";
	//定义模板	
	$.each(array, function(index, element){
				html = `<div class="box">
					<div class="id" style="display:none">${element.id}</div>
					<div class="title">${element.title}</div>
					
					<div class="price">${element.price}</div>
					
					<p>配送至:</p>
					 	<select id="province"></select>
						<select id="city"></select>
						<select id="district"></select>
				</div>`
			});
	//渲染到界面
	$(".mb_box").html(html);

    var pic = "";
    $.each(array, function(index, e){
				pic = `<div id="imgwrapper"> 
    					<img id="zoom_03" src="${e.img}" data-zoom-image="${e.big_img}"/> 
					</div> 
					<div id="pics"> 
    					<a href="http://www.sucaihuo.com/js" data-image="${e.img}" data-zoom-image="${e.big_img}"> 
        				<img  src="${e.s_img}" />
    					</a> 
 
    					<a href="#" data-image="${e.img2}" data-zoom-image="${e.big_img2}"> 
        				<img  src="${e.s_img2}" /> 
   						</a> 
					</div>`
			});
    		//渲染
			$(".pic_box").html(pic); 
			//缩略图部分
			$("#zoom_03").elevateZoom({ 
    			gallery: 'pics', //缩略图id 
    			lensColour: '#fede4f', //放大镜背景颜色 
   				cursor: 'move', //悬浮在放大镜鼠标形状 
    			borderSize: '1', //右侧放大镜边框尺寸 
    			borderColour: '#6dc4df' //右侧放大镜边框颜色 
			});		

			//加载配送地址
		$(function(){
			// 加载省份
			function loadProvince() {
				var url1 = "http://route.showapi.com/1149-1?showapi_appid=29550&showapi_sign=08402fce064a484baad949d9a18f75e7&level=1&page=1",
					url2 = "http://route.showapi.com/1149-1?showapi_appid=29550&showapi_sign=08402fce064a484baad949d9a18f75e7&level=1&page=2";

				$.when($.ajax(url1), $.ajax(url2)).then(function(a1, a2){
					// 将响应回的两页省份数据合并为一个数组结构
					var provinces = a1[0].showapi_res_body.data.concat(a2[0].showapi_res_body.data);
					// 遍历数组
					var html = `<option value="-1">请选择省份</option>`;
					$.each(provinces, function(index, province){
						html += `<option value="${province.id}">${province.areaName}</option>`;
					});
					// 渲染
					$("#province").html(html);
				});
			}

			// 根据选择省份加载城市
			function loadCity() {
				// 获取选择的省份 id
				var _id = $("#province").val();
				// 构建URL
				var url = `http://route.showapi.com/1149-2?showapi_appid=29550&showapi_sign=08402fce064a484baad949d9a18f75e7&parentId=${_id}`;
				// 请求
				$.getJSON(url).done(function(data){
					// 获取所有城市信息
					var cities = data.showapi_res_body.data;
					// 遍历
					var html = `<option value="-1">请选择城市</option>`;
					$.each(cities, function(index, city){
						html += `<option value="${city.id}">${city.areaName}</option>`;
					});
					// 渲染
					$("#city").html(html);
				});
			}

			// 加载区县信息
			function loadDistrict() {
				// 获取选择的城市 id
				var _id = $("#city").val();
				// 构建URL
				var url = `http://route.showapi.com/1149-2?showapi_appid=29550&showapi_sign=08402fce064a484baad949d9a18f75e7&parentId=${_id}`;
				// 请求
				$.getJSON(url).done(function(data){
					// 获取所有区县信息
					var districts = data.showapi_res_body.data;
					// 遍历
					var html = `<option value="-1">请选择区县</option>`;
					$.each(districts, function(index, district){
						html += `<option value="${district.id}">${district.areaName}</option>`;
					});
					// 渲染
					$("#district").html(html);
				});
			}

			// 页面打开即加载省份
			loadProvince();
			// 当省份选择项改变，则加载城市
			$("#province").change(function(){
				$("#city").html(`<option>请选择城市</option>`);
				$("#district").html(`<option>请选择区县</option>`);
				loadCity();
			});
			// 当城市选择项改变，则加载区县
			$("#city").change(function(){
				$("#district").html(`<option>请选择区县</option>`);
				loadDistrict();
			});
		});  // 配送地址的结束标签



	});
			

		});
	});
