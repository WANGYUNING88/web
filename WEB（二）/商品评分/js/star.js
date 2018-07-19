window.onload = function(){
    var comments=["差","一般般","中等","不错","非常好"];
    var imgs = document.getElementsByTagName('img');
    var txt = document.getElementById('txt');
    var clicked=false;
    for(var i=0;i<imgs.length;i++){
        //鼠标移入
        imgs[i].onmouseover = function(){
            if(clicked==true){
                return;
            }
            var pos = this.name.substr(4,1);
            if (pos<=2)
            {
                for(var j=0;j<pos;j++){
                imgs[j].src="images/star1.png";
            }
            txt.value=comments[pos-1];
            }
            else
            for(var j=0;j<pos;j++){
                imgs[j].src="images/star2.png";
            }
            txt.value=comments[pos-1];
        }
        imgs[i].onmouseout=function (){
            if(clicked==true){
                return;
            }
            for(var j=0;j<imgs.length;j++){
                imgs[j].src="images/star0.png"
            }
            txt.value="";
        }
        imgs[i].onclick=function() {
            if(clicked==false){
                clicked=true;
            }
            else{
                clicked=false;
            }
        }
    }


}