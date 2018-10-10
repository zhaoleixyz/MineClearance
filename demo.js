//点击开始游戏--动态生成100个小格子--100个div
//没有雷 显示数据（当前小格为中心，周围的雷个数）扩散（当前周围八个格没有雷）
//rightClick 标记/取消标记  标记是否正确   正确-10个都标记正确  错--游戏结束
//没有标记并且没有标记
//已经出现数字  无效果
var startBtn = document.getElementById('btn');
var box = document.getElementById('box');
var flagBox = document.getElementById('flagBox');
var minesNum;
var mineOver;
var block;
var mineMap=[];
var alertBox=document.getElementsByClassName('alertBox')[0];
var alertImg=document.getElementsByClassName('alertImg')[0];
var close=document.getElementById('close');
var score=document.getElementById('score');
var startGame=true;
bindEvent();
function bindEvent() {
    startBtn.onclick = function () {
        if(startGame){
            console.log('a');
            box.style.display = 'block';
            flagBox.style.display = 'block';
            init(); 
            startGame=false;
        }

    }
    box.oncontextmenu=function(){
        return false;
    }
    box.onmousedown=function(e){
        var event=e.target;
        if(e.which==1){
            leftClick(event);
        }else if(e.which==3){
            rightClick(event);
        }
    }
    close.onclick=function(){
        alertBox.style.display='none';
        flagBox.style.display='none';
        box.style.display='none';
        box.innerHTML='';
        startGame=true;
    }
}
function init() {
    minesNum = 10;
    mineOver = 10;//剩余多少雷没被标记；
    score.innerHTML=mineOver;    
    for (var i = 0; i < 10; i++) {
        for (var j = 0; j < 10; j++) {
            var con = document.createElement('div');
            con.classList.add('block');
            con.setAttribute('id', i + '-' + j);
            box.appendChild(con);
            mineMap.push({mine:0});
        }
    }
    block = document.getElementsByClassName('block');
    while (minesNum) {
        var minIndex = Math.floor(Math.random() * 100);
        if(mineMap[minIndex].mine===0){
            mineMap[minIndex].mine=1;
            block[minIndex].classList.add('isLei');
            minesNum--;
        }
    }
}

function leftClick(dom){
     var isLei=document.getElementsByClassName('isLei');
     if(dom && dom.classList.contains('isLei')){
         console.log('gameover');
         for(var i=0;i<isLei.length;i++){
             isLei[i].classList.add('show');
         }
         setTimeout(function(){
             alertBox.style.display='block';
             alertImg.style.backgroundImage='url("img/over.jpg")';
         }, 800);

     }else{
         var n=0;
         var posArr=dom && dom.getAttribute('id').split('-');
         var posX=posArr && +posArr[0];
         var posY=posArr && +posArr[1];
         dom&&dom.classList.add('num');
        for(var i=posX-1;i<=posX+1;i++){
            for(var j=posY-1;j<=posY+1;j++){
                var aroundBox = document.getElementById(i+'-'+j);
                if(aroundBox&&aroundBox.classList.contains('isLei')){
                    n++;
                }
            }

        }
        dom&&(dom.innerHTML=n);
        if(n==0){
            for(var i=posX-1;i<=posX+1;i++){
                for(var j=posY-1;j<=posY+1;j++){
                    var nearBox=document.getElementById(i+'-'+j);
                    if(nearBox && nearBox.length!=0){
                        if(!nearBox.classList.contains('check'))
                        {
                            nearBox.classList.add('check');
                            leftClick(nearBox);
                        }
                    }
                   
                }
            }
        }

     }
}
function rightClick(dom){
    if(dom.classList.contains('num')){
        return;
    }
    dom.classList.toggle('flag');
    if(dom.classList.contains('isLei')&&dom.classList.contains('flag')){
        mineOver--;
    }
    if(dom.classList.contains('isLei')&& !dom.classList.contains('flag')){
        mineOver++;
    }
    score.innerHTML=mineOver;
    if(mineOver==0){
        alertBox.style.display='block';
        alertImg.style.backgroundImage='url("img/success.png")';
    } 
}

