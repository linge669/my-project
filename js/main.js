		var reg_user=document.getElementById("re_user");
		var reg_psw=document.getElementById("re_psw");
		var reg_psw_again=document.getElementById("re_psw_again");
		var lg_user=document.getElementById("lg_user");
		var lg_psw=document.getElementById("lg_psw");
		var patt_name=/^[a-z0-9_-]{3,16}$/;
		var patt_psw=/^[a-z0-9_-]{6,18}$/;
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
							location.href="../login.html";
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
						if(data.code==0){
							alert(data.message);
							location.href="../index.html";
						}else{
							alert(data.message);
							location.reload();
						}
					})
			
		}
$(function(){
	var str1="";
	$.get("http://h6.duchengjiu.top/shop/api_cat.php",function(a){
					console.log(a);
					for(var i=0;i<a.data.length;i++){
							str1+=`<a href="../prolist.html" cat_id="${a.data[i].cat_id}">${a.data[i].cat_name}</a>`;
					}
					$("#sub_1").prepend(str1);
			})
	
})

$(function(){
	
	$.get("http://h6.duchengjiu.top/shop/api_cat.php",function(a){
					for(let i=0;i<a.data.length;i++){
						
							$.get("http://h6.duchengjiu.top/shop/api_goods.php",{cat_id:a.data[i]["cat_id"]},function(b){
//								console.log(b);
								var str2="";
								var str_main="";
								for(var j=0;j<4;j++){
									if(b.code==0){
										str_main+=`<dl goods_id="${b.data[j]["goods_id"]}">
											<dt><img src="${b.data[j]["goods_thumb"]}"/></dt>
											<dd>￥${b.data[j].price}</dd>
											<a href="../prodetial.html">${b.data[j].goods_name}</a>
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
											<a href="../prodetial.html">${a.data[i].cat_name}</a>
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
									str3+=`<li goods_id="${b.data[j]["goods_id"]}">
										<img src="${b.data[j]["goods_thumb"]}"/>
										<div>
											<a href="../prodetial.html">${b.data[j].goods_name}</a>
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
	
$.get("http://h6.duchengjiu.top/shop/api_cat.php",function(a){
	for(let i=0;i<1;i++){
							$.get("http://h6.duchengjiu.top/shop/api_goods.php",{cat_id:a.data[i]["cat_id"],"page":1},function(b){
								console.log(b);
								var str3="";
								for(var j=0;j<b.data.length;j++){
									str3+=`<dl goods_id="${b.data[j]["goods_id"]}">
											<dt><img src="${b.data[j]["goods_thumb"]}"/></dt>
											<dd><a href="../prodetial.html">${b.data[j].goods_name}</a></dd>
											<span class="pro_price">￥${b.data[j].price}　</span>
										</dl>`;
								}
								$("#pro_list_1").html("").append(str3);
							})	
							
					}
	
	for(var k=0;k<$("#list_num ul").children().length;k++){
		$("#list_num ul").children().eq(k).click(function(){
			var page=$(this).attr("page");
			for(let i=0;i<1;i++){
							$.get("http://h6.duchengjiu.top/shop/api_goods.php",{cat_id:a.data[i]["cat_id"],"page":page},function(b){
								console.log(b);
								var str3="";
								for(var j=0;j<b.data.length;j++){
									str3+=`<dl goods_id="${b.data[j]["goods_id"]}">
											<dt><img src="${b.data[j]["goods_thumb"]}"/></dt>
											<dd><a href="../prodetial.html">${b.data[j].goods_name}</a></dd>
											<span class="pro_price">￥${b.data[j].price}　</span>
										</dl>`;
								}
								$("#pro_list_1").html("").append(str3);
							})	
							
					}	
			
		})
					
	}
	
		})
})