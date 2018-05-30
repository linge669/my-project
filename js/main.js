		var reg_user=document.getElementById("re_user");
		var reg_psw=document.getElementById("re_psw");
		var reg_psw_again=document.getElementById("re_psw_again");
		var lg_user=document.getElementById("lg_user");
		var lg_psw=document.getElementById("lg_psw");
		var patt_name=/^[a-z0-9_-]{3,16}$/;
		var patt_psw=/^[a-z0-9_-]{6,18}$/;
		var token;
		$(function(){
			if(getCookie("user_id")==null){
				
			}else{
				$("#index_login").html(getCookie("user_id"));
				$("#index_reg").html('<a href="#" style="color: red;">退出</a>').click(function(){
					removeCookie("username");
					removeCookie("password");
					removeCookie("user_id");
					removeCookie("token");
					location.reload();
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
							token=data["data"].token;
							alert(data.message);
								setCookie("username",lg_name,7);
								setCookie("password",lg_pw,7);
								setCookie("user_id",data["data"].user_id);
								setCookie("token",token,7);
						}else{
							alert(data.message);
							location.reload();
						}
					})	
			location.href="index.html";
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
			}else{
				setCookie(newarr[1],1);
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
console.log(newCart);
$(function(){
	
	for(var i=0;i<newCart.length;i++){
		var str3="";
		var cart_id=Number(newCart[i]);
		var id_value=Number(valuecart[i]);
		if(Boolean(cart_id)){
			console.log(id_value);
			$.get("http://h6.duchengjiu.top/shop/api_goods.php",{"goods_id":newCart[i]},function(b){
				
				str3=`<li goods_id="${cart_id}">
						<input type="checkbox" value="" />
						<img src="${b.data[0]["goods_thumb"]}"/>
						<a href="prodetial.html?goods_id=cart_id">${b.data[0].goods_name}</a>
						<span>${b.data[0]["price"]}</span>
						<em><a href="#">　-　</a>${id_value}<a href="#">　+　</a></a></em>
						<b class="count_price">${Number(b.data[0]["price"])*id_value}</b>
						<a href="#">删除</a>
					</li>
				`;
				$("#cart_info_main").prepend(str3);
			})
		}
	}
	
})
