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
