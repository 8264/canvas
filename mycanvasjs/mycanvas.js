$(function(){
    var canvasBox=document.querySelector(".canvas-box");
    var canvasBoxW=canvasBox.offsetWidth;
    var canvasBoxH=canvasBox.clientHeight;
    var canvas=document.querySelector("canvas");
    canvas.width=canvasBoxW;
    canvas.height=canvasBoxH;
    var cobj=canvas.getContext("2d");
    var copy=document.querySelector(".copy");
    var drawObj=new shape(canvas,copy,cobj);
    $(copy).mousedown(function(e){
        e.preventDefault();
    });
    $(copy).mousemove(function(e){
        e.preventDefault();
    });
    /*菜单*/
    $("header .headlist").click(function(){
            var index=$("header .headlist").index(this);
           $(".menu ul").hide().eq(index).slideDown(100);
    })
    /*画图*/
    $(".aside-list:eq(1) li").click(function(){
        var fn=$(this).attr("data-role");
        if(fn!=="pencil"){
            if(fn=="duobian"){
                var bian=prompt("请输入边数");
                drawObj.bianNum=bian;
            }else if(fn=="duojiao"){
                var jiao=prompt("请输入要画图形的角的个数");
                drawObj.jiaoNum=jiao;
            }
            drawObj.type=fn;
            drawObj.draw();
        }else{
            drawObj.pencil();
        }
    })
    /*画图的方式*/
    $(".aside-list:eq(2) li").click(function(){
        var fn=$(this).attr("data-role");
        drawObj.fill=fn;
        drawObj.draw();
    })

    /*画图的颜色*/
    $(".aside-list:eq(3) li input").change(function(){
        drawObj[$(this).attr("data-role")]=$(this).val();
        drawObj.draw();
    })
    /*线条的宽度*/
    $(".aside-list:eq(4) li").click(function(){
        var num=$(this).attr("data-role");
        if(num!=="null"){
            drawObj.lineWidth=num;
            drawObj.draw();
        }
    })
    $(".aside-list:eq(4) li input").change(function(){
        var num=$(this).val();
        alert(num);
        drawObj.lineWidth=num;
        drawObj.draw();
    })

    /*文件*/
    $(".aside-list:eq(0) li").click(function(){
        var index=$(".aside-list:eq(0) li").index(this);
        if(index==0){/*新建*/
            if(drawObj.history.length>0){
                var save=confirm("是否保存");
                if(save){
                    var url=canvas.toDataURL();
                    var newurl=url.replace("image/png","stream/octet");
                    location.href=newurl;
                }
            }
            cobj.clearRect(0,0,canvas.width,canvas.height);
            drawObj.history=[];
        }else if(index==1){/*返回*/
            if(drawObj.history.length==0){
                cobj.clearRect(0,0,canvas.width,canvas.height);
                setTimeout(function(){
                    alert("不能返回");
                },10)
            }else{
                if(drawObj.isback){
                    if(drawObj.history.length==1){
                        drawObj.history.pop();
                        cobj.clearRect(0,0,canvas.width,canvas.height);
                    }else{
                        drawObj.history.pop();
                        cobj.putImageData(drawObj.history.pop(),0,0);
                    }
                }else{
                    cobj.putImageData(drawObj.history.pop(),0,0);
                }
                drawObj.isback=false
            }
        }else if(index==2){
            var url=canvas.toDataURL();
            var newurl=url.replace("image/png","stream/octet");
            location.href=newurl;
        }
    })

    /*图像处理*/
    $(".headlist").eq(5).click(function(){
        "use strict";
        $("input[type='file']").css("display","block");
    })
})