require(["config"], function(){
	require(["jquery", "template", "load"], function($, template){
		//异步加载列表页面数据，使用模板引擎渲染
		$.getJSON("/mock/detail.json", function(data){
			// 左边准备渲染数据
			var renderData = {elements : data.res_body.data};
			console.log(renderData);
			// 渲染数据
			var html = template("element_template", renderData);
			//console.log(html);
			$(".left").html(html);

			

// 获取行政区域
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
		});  // 行政区域的结束标签
	
		















		});
	});
});