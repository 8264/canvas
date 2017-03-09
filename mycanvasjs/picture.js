window.onload=function(){
    var canvas=document.querySelector("canvas");
    var cobj=canvas.getContext("2d");
    var img=document.querySelector("img");
    /*模糊*/
    function blur(dataObj,num,x,y){
        var width=dataObj.width,height=dataObj.height;
        var arr=[];
        var num=num;
        for(var i=0;i<height;i++){//行
            for(var j=0;j<width;j++){//列
                var x1=j+num>width?j-num:j;
                var y1=i+num>height?i-num:i;
                var dataobj=cobj.getImageData(x1,y1,num,num);
                var r=0,g=0,b=0;
                for(var k=0;k<dataobj.width*dataobj.height;k++){
                    r+=dataobj.data[k*4+0];
                    g+=dataobj.data[k*4+1];
                    b+=dataobj.data[k*4+2];
                }
                r=parseInt(r/(dataobj.width*dataobj.height));
                g=parseInt(g/(dataobj.width*dataobj.height));
                b=parseInt(b/(dataobj.width*dataobj.height));
                arr.push(r,g,b,255);
            }

        }
        for(var i=0;i<dataObj.data.length;i++){
            dataObj.data[i]=arr[i];
        }
        cobj.putImageData(dataObj,x,y);
    }










    function masaike(dataObj,num,x,y){
        var num=num;
        var w=dataObj.width/num;
        var h=dataObj.height/num;
        var r=0,g=0,b=0;
        for(var i=0;i<num;i++){
            for(var j=0;j<num;j++){
                var boxObj=cobj.getImageData(i*w,j*h,w,h);
                for(var k=0;k<boxObj.width*boxObj.height;k++){
                    r+=boxObj.data[k*4+0];
                    g+=boxObj.data[k*4+1];
                    b+=boxObj.data[k*4+2];
                }
                r=parseInt(r/(w*h));
                g=parseInt(g/(w*h));
                b=parseInt(b/(w*h));
                for(var o=0;o<w*h;o++){
                    boxObj.data[o*4+0]=r;
                    boxObj.data[o*4+1]=g;
                    boxObj.data[o*4+2]=b;
                }
                cobj.putImageData(boxObj,x+i*w,y+j*h);
            }
        }

    }




    function fanxiang(dataObj,x,y){
        for(var i=0;i<dataObj.height*dataObj.width;i++){
            dataObj.data[i*4+0]=255-dataObj.data[i*4+0];//r
            dataObj.data[i*4+1]=255-dataObj.data[i*4+1];//g
            dataObj.data[i*4+2]=255-dataObj.data[i*4+2];//b
            dataObj.data[i*4+3]=255;//a透明度
        }
        cobj.putImageData(dataObj,x,y);
    }

//    文件上传
    var file=document.querySelector("input");
    file.onchange=function(){
        var fileObj=this.files[0];
        var reader=new FileReader();
        reader.readAsDataURL(fileObj);
        reader.onload=function(e){
            img.src=e.target.result;
            cobj.drawImage(img,0,0,canvas.width,canvas.height);
            dataObj=cobj.getImageData(0,0,canvas.width,canvas.height);
        }
    }
    var lists=document.getElementsByTagName("li");
    for(var i=0;i<lists.length;i++){
        lists[i].onclick=function(){
            var attr=this.getAttribute("data-role");
            if(attr=="blur"){
                blur(dataObj,5,0,0);
            }else if(attr=="fanxiang"){
                fanxiang(dataObj,0,0)
            }else if(attr=="masaike"){
                masaike(dataObj,20,0,0);
            }else if(attr=="reset"){
                cobj.drawImage(img,0,0,canvas.width,canvas.height);
            }
        }
    }
}