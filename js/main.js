		var reg_user=document.getElementById("re_user");
		var reg_psw=document.getElementById("re_psw");
		var reg_psw_again=document.getElementById("re_psw_again");
		var lg_user=document.getElementById("lg_user");
		var lg_psw=document.getElementById("lg_psw");
		var patt_name=/^[a-z0-9_-]{3,16}$/;
		var patt_psw=/^[a-z0-9_-]{6,18}$/;
		var token;
		$(function(){
			
			if(getCookie("username")){
				
				$("#index_login").html(getCookie("username"));
				$("#lg_user").val(getCookie("username"));
				$("#lg_psw").val(getCookie("password"));
				$("#index_reg").html('<a href="#" style="color: red;">退出</a>').click(function(){
					removeCookie("username");
					removeCookie("password");
					removeCookie("token");
					location.href="login.html";
				})
				
			}
			
		})
		
		function setCookie(name, value, n) {
			var oDate = new Date();
			oDate.setDate(oDate.getDate() + n);
			document.cookie = name + "=" + value + ";expires=" + oDate + ";path=/";
		}
		
		function getCookie(name) {
			var str = document.cookie;
			var arr = str.split("; ");
			for(var i = 0; i < arr.length; i++) {
				var newArr = arr[i].split("=");
				if(newArr[0] === name) {
					return newArr[1];
				}
			}
		}
		
		function removeCookie(name) {
			setCookie(name, 1, -1);
		}
		function reg_yz(){
			var reg_name=reg_user.value;
			var reg_pw=reg_psw.value;
			var reg_pw_psw=reg_psw_again.value;
			
			if(!patt_name.test(reg_name)){
				alert("用户名格式不正确");
			}else if(!patt_psw.test(reg_pw)){
				alert("密码格式不正确");
			}else if(reg_pw!=reg_pw_psw){
				alert("两次密码不一致");
			}else{
				jQuery.post("http://h6.duchengjiu.top/shop/api_user.php",{status:"register",username:reg_name,password:reg_pw},function(data){
						if(data.code==0){
							alert(data.message);
							location.href="login.html";
						}else{
							alert(data.message);
							location.reload();
						}
						
					})
			}
		}
		function login_yz(){
			var lg_name=lg_user.value;
			var lg_pw=lg_psw.value;
			jQuery.post("http://h6.duchengjiu.top/shop/api_user.php",{status:"login",username:lg_name,password:lg_pw},function(data){
						if(data.code==0){/*
							console.log(data);*/
							token=data["data"].token;/*
							alert(data.message);*/
								setCookie("username",lg_name,7);
								setCookie("password",lg_pw,7);
								setCookie("user_id",data["data"].user_id);
								setCookie("token",token,7);
								location.href="index.html";
						}else{
							alert(data.message);
							location.reload();
						}
					})	
			
		}
$(function(){
	var str1="";
	$.get("http://h6.duchengjiu.top/shop/api_cat.php",function(a){
//					console.log(a);
					for(var i=0;i<a.data.length;i++){
							str1+=`<a href="prolist.html?cat_id=${a.data[i].cat_id}">${a.data[i].cat_name}</a>`;
					}
					$("#sub_1").prepend(str1);
			})
	
})

$(function(){
	
	$.get("http://h6.duchengjiu.top/shop/api_cat.php",function(a){
					for(let i=0;i<a.data.length;i++){
						
							$.get("http://h6.duchengjiu.top/shop/api_goods.php",{cat_id:a.data[i]["cat_id"]},function(b){
							/*console.log(b);*/
								var str2="";
								var str_main="";
								for(var j=0;j<4;j++){
									if(b.code==0){
										str_main+=`<dl  class="goods_this_det" goods_id="${b.data[j]["goods_id"]}">
											<dt><img src="${b.data[j]["goods_thumb"]}"/></dt>
											<dd>￥${b.data[j].price}</dd>
											<a goods_id="${b.data[j]["goods_id"]}" href="prodetial.html?goods_id=${b.data[j]["goods_id"]}">${b.data[j].goods_name}</a>
										</dl>
										`;	
									}else{
										str_main+=`<div>无数据</div>
										`;	
									}
									
								}
								
								str2+=`
									<div class="articel">
										<div class="articel_til">
											<a href="prolist.html?cat_id=${a.data[i].cat_id}">${a.data[i].cat_name}</a>
										</div>
										<div class="atr_mcon">
											${str_main}
										</div>
									</div>`;
									$("#pro_list").append(str2);
							})	
					}	
		})
})



$(function(){
$.get("http://h6.duchengjiu.top/shop/api_cat.php",function(a){
					for(let i=0;i<4;i++){
							$.get("http://h6.duchengjiu.top/shop/api_goods.php",{cat_id:a.data[i]["cat_id"]},function(b){
								/*console.log(b);*/
								var str3="";
								var str3_main="";
								for(var j=0;j<5;j++){
									str3+=`<li class="goods_this_det" goods_id="${b.data[j]["goods_id"]}">
										<img src="${b.data[j]["goods_thumb"]}"/>
										<div>
											<a goods_id="${b.data[j]["goods_id"]}" href="prodetial.html?goods_id=${b.data[j]["goods_id"]}">${b.data[j].goods_name}</a>
											<p>
												<span>￥${b.data[j].price}　</span>
												<b>￥149</b>
											</p>
										</div>
									</li>`;
								}
								str3_main=`<ul>
								${str3}
								</ul>`
								$("#hot_sale").children().eq(i).append(str3_main);
							})	
							
					}	
		})
})

$(function(){
		var arr=location.href;
		var newArr=arr.split("=");
	$.get("http://h6.duchengjiu.top/shop/api_goods.php",{cat_id:newArr[1],"page":1},function(b){

			var str3="";
			for(var j=0;j<b.data.length;j++){
				str3+=`<dl class="goods_this_det" goods_id="${b.data[j]["goods_id"]}">
					<dt><img src="${b.data[j]["goods_thumb"]}"/></dt>
					<dd><a goods_id="${b.data[j]["goods_id"]}" href="prodetial.html?goods_id=${b.data[j]["goods_id"]}">${b.data[j].goods_name}</a></dd>
					<span >￥${b.data[j].price}　</span>
				</dl>`;
	}
		$("#pro_list_1").html("").append(str3);
})							
	for(var k=0;k<$("#list_num ul").children().length;k++){
		$("#list_num ul").children().eq(k).click(function(){
			$(this).css("background","red");
			$(this).siblings().css("background","");
			var page=$(this).attr("page");
							$.get("http://h6.duchengjiu.top/shop/api_goods.php",{cat_id:newArr[1],"page":page},function(b){
								/*/*console.log(b);*/
								var str3="";
								for(var j=0;j<b.data.length;j++){
									str3+=`<dl class="goods_this_det" goods_id="${b.data[j]["goods_id"]}">
											<dt><img src="${b.data[j]["goods_thumb"]}"/></dt>
											<dd><a goods_id="${b.data[j]["goods_id"]}" href="prodetial.html?goods_id=${b.data[j]["goods_id"]}">${b.data[j].goods_name}</a></dd>
											<span class="pro_price">￥${b.data[j].price}　</span>
										</dl>`;
								}
								$("#pro_list_1").html("").append(str3);
							})	
			
		})
					
	}/*
	
	$("#list_num a").click(function(){
		$(this).css("background","red");
		$(this).siblings().css("background","");
		
	})
	*/
	
})

$(function(){
	
	var str=location.href;
	/*console.log(str);*/
	var newarr=str.split("=");
	/*console.log(newarr);*/
	$.get("http://h6.duchengjiu.top/shop/api_goods.php",{"goods_id":newarr[1]},function(b){
		var str3="";
		/*console.log(b);*/
		str3+=`<div class="imgbox">
				    <div class="probox">
				        <img src="${b.data[0]["goods_thumb"]}" alt="">
				        <div class="hoverbox"></div>
				    </div>
				    <div class="showbox">
				        <img src="${b.data[0]["goods_thumb"]}" alt="">
				    </div>
				</div>		
					<div class="pro_info">
						<p class="pro_name">${b.data[0].goods_name}</p>
						<p class="pro_des">${b.data[0].goods_desc}</p>
						<p class="pro_price">￥${b.data[0].price}　<span>3.4折</span><b>包邮</b></p>
						<p class="cn">服务承诺：全场包邮，七天无理由退货，退货补运费</p>
						<a class="add_cart">加入购物车</a>
						<a class="buy" href="cart.html">去结算</a>
					
			</div>`;
			
			
		$(".detial_left").html("").append(str3);
		$(".add_cart").click(function(){
			var aa=getCookie(newarr[1]);
			if(getCookie(newarr[1])){
				aa++;
				setCookie(newarr[1],aa);
				alert("数量+1");
				location.reload();
			}else{
				setCookie(newarr[1],1);
				alert("已成功添加购物车");
			}
		})
	})
	
})
var cookies=document.cookie;
var preCookie=cookies.split(";");
var newCart=[];
var valuecart=[];
for (var i=0;i<preCookie.length;i++) {
	newCart.push(preCookie[i].split("=")[0]);
	valuecart.push(preCookie[i].split("=")[1]);
}
/*console.log(valuecart);*/
$(function(){
	var sum_num=0;
	var sum_price=0;
	for(let m=0;m<newCart.length;m++){
		
		var cart_id=Number(newCart[m]);
		var str3="";
		if(Boolean(cart_id)){
			
			$.get("http://h6.duchengjiu.top/shop/api_goods.php",{"goods_id":newCart[m]},function(b){
				/*console.log(Number(valuecart[m]));*/
				str3=`<li goods_id="${cart_id}">
						<input type="checkbox" class="pre_checked" value="" checked="checked"/>
						<img src="${b.data[0]["goods_thumb"]}"/>
						<a href="prodetial.html?goods_id=${b.data[0].goods_id}">${b.data[0].goods_name}</a>
						<span>${b.data[0]["price"]}</span>
						<em><a class="jian_cart" goods_id="${b.data[0].goods_id}">　-　</a>　${Number(valuecart[m])}　<a goods_id="${b.data[0].goods_id}" class="jia_cart">　+　</a></em>
						<b class="count_price">${Number(b.data[0]["price"])*Number(valuecart[m])}</b>
						<a class="delete_this" goods_id="${b.data[0].goods_id}">删除</a>
					</li>
				`;
					$("#cart_info_main").prepend(str3);
					$(".delete_this").click(function(){
						removeCookie($(this).attr("goods_id"));
						location.reload();
					});	
					
					sum_num+=Number(valuecart[m]);
					sum_price+=Number(b.data[0]["price"])*Number(valuecart[m]);
					$("#count_num").html(sum_num);
					$("#count_price").html(sum_price);
					window.oninput=function(){
							console.log($(".checkall").is(":checked"));
							if($(".checkall").is(":checked")){
								$("input[type='checkbox']").prop("checked",true);
								}
							}
					$(".jian_cart").eq(0).on("click",function(){
						var pre_cart=getCookie($(this).attr("goods_id"));
						pre_cart--;
						setCookie($(this).attr("goods_id"),pre_cart);
						if(pre_cart<=0){
							removeCookie($(this).attr("goods_id"));
						}
						location.reload();
					})
					$(".jia_cart").eq(0).on("click",function(){
						var pre_cart=getCookie($(this).attr("goods_id"));
						pre_cart++;
						setCookie($(this).attr("goods_id"),pre_cart);
						location.reload();
					})
				})
			}
		}
	})

$(function(){
	
		$(".delete_all").click(function(){
			for(let n=0;n<newCart.length;n++){
			var cart_id=Number(newCart[n]);
			console.log(cart_id);
			if(Boolean(cart_id)){
				removeCookie(cart_id);
				location.reload();
					}
				}
		})
		
})
