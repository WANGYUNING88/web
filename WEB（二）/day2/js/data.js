$(document).ready(function(){
	find();
});

function find(){
	 $("#city").append('<option value="">' + "请选择" + '</option>');
	$.ajax({
		type:'get',
		url:'data.json',
		async:true,
		dataType:'json',
		success:function(data){
			console.log(data);
			
			if(data.data.length==0){
				return;
			}
			for (var i=1;i<data.data.length;i++){
				var city = data.data[i].PRVNCE_NM;
   				$("#city").append('<option value="'
   				+city+'">'
   				+city+'</option>');
			}
		},
		error:function(XMLHttpRequest){
			alert("错误状态："+XMLHttpRequest.readyState);
		}
	});
};
