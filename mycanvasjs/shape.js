function shape(canvas,copy,cobj){
    this.canvas=canvas;
    this.cobj=cobj;
    this.copy=copy;
    this.type="line";
    this.fill="stroke";
    this.width=this.canvas.width;
    this.height=this.canvas.height;
    this.fillStyle="black";
    this.lineWidth="1";
    this.strokeStyle="black";
    this.history=[];
    this.bianNum="5";
    this.jiaoNum="5";
    this.isback=true;
}
shape.prototype={
    init:function(){
     this.cobj.fillStyle=this.fillStyle;
        this.cobj.strokeStyle=this.strokeStyle;
        this.cobj.lineWidth=this.lineWidth;
    },
    draw:function(){
        var that=this;
       this.copy.onmousedown=function(e){
            var ox=e.offsetX;
            var oy=e.offsetY;
            that.copy.onmousemove=function(e){
                that.isback=true;
                that.init();
                var endx=e.offsetX;
                var endy=e.offsetY;
                that.cobj.clearRect(0,0,that.width,that.height);
                if(that.history.length>0){
                    that.cobj.putImageData(that.history[that.history.length-1],0,0) ;
                }
                that[that.type](ox,oy,endx,endy);
            }
           that.copy.onmouseup=function(){
               that.copy.onmousemove=null;
                that.copy.onmouseup=null;
                that.history.push(that.cobj.getImageData(0,0,that.width,that.height));
            }
        }
    },
    line:function(ox,oy,x1,y1){
        this.cobj.beginPath();
        this.cobj.moveTo(ox,oy);
        this.cobj.lineTo(x1,y1);
        this.cobj.stroke();
    },
    pencil:function(){
      var that=this;
      this.copy.onmousedown=function(e){
          var startx=e.offsetX;
          var starty=e.offsetY;
          that.cobj.beginPath();
          that.cobj.moveTo(startx,starty);
          that.copy.onmousemove=function(e){
              that.init();
              var endx=e.offsetX;
              var endy=e.offsetY;
              that.cobj.clearRect(0,0,that.width,that.height);
              if(that.history.length>0){
                  that.cobj.putImageData(that.history[that.history.length-1],0,0);
              }
                  that.cobj.lineTo(endx,endy);
                  that.cobj.stroke();
          }
              that.copy.onmouseup=function(){
                  that.copy.onmouseup=null;
                  that.copy.onmousemove=null;
                  that.history.push(that.cobj.getImageData(0,0,that.width,that.height));
          }
      }
    },
    rect:function(ox,oy,endx,endy){
        this.init();
        this.cobj.beginPath();
        this.cobj.rect(ox,oy,endx-ox,endy-oy);
        this.cobj[this.fill]();
    },
    arc:function(ox,oy,endx,endy){
        this.init();
        this.cobj.beginPath();
        var r=Math.sqrt(Math.pow(endx-ox,2)+Math.pow(endy-oy,2));
        this.cobj.arc(ox,oy,r,0,2*Math.PI);
        this.cobj[this.fill]();
    },
    duobian:function(ox,oy,endx,endy){
        this.init();
        this.cobj.beginPath();
        var r=Math.sqrt(Math.pow(endx-ox,2)+Math.pow(endy-oy,2));
         for(var i=0;i<this.bianNum;i++){
             this.cobj.lineTo(r*Math.cos(i*360/this.bianNum*Math.PI/180)+ox,
             r*Math.sin(i*360/this.bianNum*Math.PI/180)+oy);
         }
        this.cobj.closePath();
        this.cobj[this.fill]();
    },
    duojiao:function(ox,oy,endx,endy){
        this.init();
        this.cobj.beginPath();
        var angle=360/(this.jiaoNum*2)*Math.PI/180;
        var r=Math.sqrt(Math.pow(endx-ox,2)+Math.pow(endy-oy,2));
        var r1=r/3;
        for(var i=0;i<this.jiaoNum*2;i++){
            if(i%2==0){
                this.cobj.lineTo(Math.cos(angle*i)*r+ox,Math.sin(angle*i)*r+oy);
            }else{
                this.cobj.lineTo(Math.cos(angle*i)*r1+ox,Math.sin(angle*i)*r1+oy);
            }
        }
        this.cobj.closePath();
        this.cobj[this.fill]();
    }

}
