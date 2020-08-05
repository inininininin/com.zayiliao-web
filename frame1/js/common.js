function IsPC() {
	var userAgentInfo = navigator.userAgent;
	var Agents = new Array("Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod");
	var flag = true;
	for(var v = 0; v < Agents.length; v++) {
		if(userAgentInfo.indexOf(Agents[v]) > 0) {
			flag = false;
			break;
		}
	}
	//alert(flag);
	return flag;
}

$(document).ready(function() {
	//返回顶部
	$("#gototop").click(function() {
		$("html,body").animate({
			scrollTop: 0
		}, 800);
		return false;
	});
	$("#gotocate").click(function() {
		$("html,body").animate({
			scrollTop: $("#classification").offset().top - 50
		}, 800);
		return false;
	});

	$("ul.menu_body").each(function() {
		if($(this).text().replace(/[\r\n ]/g, "").length <= 0) {
			$(this).prev().remove();
		} //去掉span
	});

	$("#firstpane span").click(function() {
		var spanatt = $(this).next("ul").css('display');
		if(spanatt == "block") {
			var spantext = "+";
			// $(this).prev().removeClass("left_active");
		} else {
			var spantext = "-";
			//$(this).prev().addClass("left_active");
		}
		$(this).html(spantext).addClass("current").next("ul").slideToggle(300).siblings("ul");
	});
	//导航无分类就隐藏
	if($("#firstpane").children().length == 0) {
		$("#classification").hide();
	}
	if($(".firstSelected") != null) {
		$(".firstSelected").next("span").html("-");
		$(".firstSelected").next("span").next("ul").slideToggle(300);
	}

	$("#smallSearch").click(function() {
		$(".searchBox").slideToggle();
	});
});

//把导航中没有子元素的ul和展开按钮删除
$('.dropdown').each(function(i) {
	var len = $(this).children(".dropdown-menu").children().length;
	if(len == 0) {
		$(this).children("#app_menudown").hide();
		$(this).children(".dropdown-menu").hide();

		$(this).children('.dropdown-toggle').dropdownHover();
		$(this).children('a.dropdown-toggle').one('click', function() {
			location.href = $(this).attr('href');
		});
	}
})

//如果是电脑版的就鼠标悬停展开下级菜单
if($(window).width() >= 768 && IsPC()) {
	$('.dropdown-toggle').dropdownHover();
	$('a.dropdown-toggle').one('click', function() {
		location.href = $(this).attr('href');
	});
	$(".dropdown-menu li").hover(function() {
		$(this).children("ul").toggle();
	});
}

//底部产品
$(".bottomButton").click(function() {
	for(var i = 1; i < 4; i++) {
		if($(this).attr('id') == "bottomProductBtn" + i) {
			$("#bottomProductBtn" + i).addClass("selectedBottomButton");
			$("#bottomProductList" + i).show();
			$("#bottomProductTitle" + i).show();
		} else {
			$("#bottomProductBtn" + i).removeClass("selectedBottomButton");
			$("#bottomProductList" + i).hide();
			$("#bottomProductTitle" + i).hide();
		}
	}
});

function utf16to8(str) {
	var out, i, len, c;
	out = "";
	len = str.length;
	for(i = 0; i < len; i++) {
		c = str.charCodeAt(i);
		if((c >= 0x0001) && (c <= 0x007F)) {
			out += str.charAt(i);
		} else if(c > 0x07FF) {
			out += String.fromCharCode(0xE0 | ((c >> 12) & 0x0F));
			out += String.fromCharCode(0x80 | ((c >> 6) & 0x3F));
			out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F));
		} else {
			out += String.fromCharCode(0xC0 | ((c >> 6) & 0x1F));
			out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F));
		}
	}
	return out;
}

function type() {
	debugger
	$.ajax({
		url: '/article-types',
		type: 'get',
		data: "articleTypeUpperId=1",
		async: false,
		ContentType: 'application/x-www-form-urlencoded',
		success: function(res) {
			console.log(res, res.code)
			if(res.code == 0) {
				for(var i in res.data.rows) {
					var id = res.data.rows[i].articleTypeId
					var name = res.data.rows[i].name
					//							detailList(id, name)
					if(res.data.rows[i].name == '医疗器械') {
						$.ajax({
							url: '/article-types',
							type: 'get',
							data: "articleTypeUpperId=" + res.data.rows[i].articleTypeId,
							async: false,
							ContentType: 'application/x-www-form-urlencoded',
							success: function(res) {
								console.log(res, res.code)
								if(res.code == 0) {
									for(var i in res.data.rows) {
										$('.ylqx').append('<a href="product.html?id=' + res.data.rows[i].articleTypeId + '&keyName=' + encodeURIComponent(res.data.rows[i].name) + '">' + res.data.rows[i].name + '</a>')
										$('.qxfenlei').append("<li><a class='' href='product.html?id=" + res.data.rows[i].articleTypeId + "&keyName=" + encodeURIComponent(res.data.rows[i].name) + "'>" + res.data.rows[i].name + "</a></li>")
									}
								} else {
									alert(res.codeMsg)
								}
							}
						})
					} else if(res.data.rows[i].name == '新闻中心') {
						$.ajax({
							url: '/article-types',
							type: 'get',
							data: "articleTypeUpperId=" + res.data.rows[i].articleTypeId,
							async: false,
							ContentType: 'application/x-www-form-urlencoded',
							success: function(res) {
								console.log(res, res.code)
								if(res.code == 0) {
									for(var i in res.data.rows) {
										$('.xwzx').append('<a href="article.html?id=' + res.data.rows[i].articleTypeId + '&keyName=' + encodeURIComponent(res.data.rows[i].name) + '">' + res.data.rows[i].name + '</a>')
										$('.xwanli').append("<li><a class='' href='article.html?id=" + res.data.rows[i].articleTypeId + "&keyName=" + encodeURIComponent(res.data.rows[i].name) + "'>" + res.data.rows[i].name + "</a></li>")
									}
								} else {
									alert(res.codeMsg)
								}
							}
						})
					} else if(res.data.rows[i].name == '案例中心') {
						$.ajax({
							url: '/article-types',
							type: 'get',
							data: "articleTypeUpperId=" + res.data.rows[i].articleTypeId,
							async: false,
							ContentType: 'application/x-www-form-urlencoded',
							success: function(res) {
								console.log(res, res.code)
								if(res.code == 0) {
									for(var i in res.data.rows) {
										$('.xwzx').append('<a href="album.html?id=' + res.data.rows[i].articleTypeId + '&keyName=' + encodeURIComponent(res.data.rows[i].name) + '">' + res.data.rows[i].name + '</a>')
										$('.anlizhongxin').append("<li><a class='' href='album.html?id=" + res.data.rows[i].articleTypeId + "&keyName=" + encodeURIComponent(res.data.rows[i].name) + "'>" + res.data.rows[i].name + "</a></li>")

									}
								} else {
									alert(res.codeMsg)
								}
							}
						})
					}
				}
			} else {
				alert(res.codeMsg)
			}
		}
	})
}

function getLocalTime(nS) {
	return new Date(parseInt(nS) * 1000).toLocaleString().replace(/:\d{1,2}$/, ' ');
}

function getQueryVariable(variable) {
	var query = window.location.search.substring(1);
	var vars = query.split("&");
	for(var i = 0; i < vars.length; i++) {
		var pair = vars[i].split("=");
		if(pair[0] == variable) {
			return pair[1];
		}
	}
	return(false);
}

var version = ''
var versionIntro = ''
$.ajax({
	url: '../config.json',
	type: 'get',
	async: false,
	ContentType: 'application/x-www-form-urlencoded',
	success: function(res) {
		console.log(res)
		version = res.version;
		versionIntro = res.versionIntro;
		$('.showVersion').html("版本: " + res.version.split('-')[0])
	}
})
$('.showVersion').click(function() {
	alert('版本: ' + version + "\n" + '更新: ' + versionIntro)
})

function ads(banner) {
	$.ajax({
		url: '/ads',
		type: 'get',
		//				data: "articleTypeUpperId=1",
		async: false,
		ContentType: 'application/x-www-form-urlencoded',
		success: function(res) {
			console.log(res, res.code)
			if(res.code == 0) {
				for(var i in res.data.rows) {
					if(banner == 1) {//target="_blank"
						$('.slider__wrapper').append('<li class="slider__item"><a  title="' + res.data.rows[i].name + '" href="javascript:;" style="background-image:url(' + res.data.rows[i].cover + ')"><img src="images/banner-1.png" alt="' + res.data.rows[i].name + '" /></a></li>')

					} else if(banner == 2) {
						$('.slider__wrapper').append('<li class="slider__item"><a title="' + res.data.rows[i].name + '" href="javascript:;" style="background-image:url(' + res.data.rows[i].cover + ')"><img src="images/banner-2.png" alt="' + res.data.rows[i].name + '" /></a></li>')

					} else {
						$('.slider__wrapper').append('<li class="slider__item"><a title="' + res.data.rows[i].name + '" href="javascript:;" style="background-image:url(' + res.data.rows[i].cover + ')"><img src="images/banner-3.png" alt="' + res.data.rows[i].name + '" /></a></li>')

					}
				}
			} else {
				alert(res.codeMsg)
			}
		}
	})
}