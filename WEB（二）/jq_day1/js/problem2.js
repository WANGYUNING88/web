$(document).ready(function(){
	bind();
});
function bind(){
	var $element = '<span class="li_icon animated zoomInDown"><span class="glyphicon glyphicon-plane"></span></span>';
	$(".button-3d").click(function(){
		$(".panel-body").append($element);
	});
	
	$(document).on('dblclick','.li_icon',function(){
		var $index = $(this).index()+1;
		$(".li_icon").css('background-color','gainsboro').css('color','#000');
		$(this).css('background-color','#E74C3C').css('color','#fff');
		layer.alert("这是第"+$index+"个小灰机",{icon:1});
	});
//	$(".panel-body").delegate(".li_icon",'dblclick',function(){
//		
//	});
};
