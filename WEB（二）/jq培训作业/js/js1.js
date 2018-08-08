$(document).ready(function(){
	bind();
});

function bind(){
	$(".btn-primary").click(function(){
		if(check()==false){
			layer.alert("结算失败，请检查输入是否正确",{icon:7})
			return;
		};
		var $price,$num,$postage,$sum;
		$price = $("#price").val();
		$num = $(".num").val();
		$postage = $("input[data-name=postage]").val();
		$sum = $price*$num+parseFloat($postage);
		$("input").last().val($sum);
	});
};

function check(){
	var flag = true;
	$.each($("input").not('[disabled="disabled"]'), function(index,item) {
		var $val = $(this).val();
		if(isNaN(parseInt($val)) || $val<0){
			$(this).addClass("has-error");
			$("input").last().val("");
			flag = false;
		}else{
			$(this).removeClass("has-error");
		}
	});
	return flag;
};
