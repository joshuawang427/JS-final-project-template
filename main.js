// 創造 img HTML 元素，並放入變數中
var bgImg = document.createElement("img");
var enimg = document.createElement("img");
var casimg = document.createElement("img");
var towimg = document.createElement("img");
// 設定這個元素的要顯示的圖片
bgImg.src = "images/map.pn2.png";
enimg.src = "images/rukia.gif";
casimg.src = "images/tower-btn.png";
towimg.src = "images/tower.png";
// 找出網頁中的 canvas 元素
var canvas = document.getElementById("game-canvas");

// 取得 2D繪圖用的物件
var ctx = canvas.getContext("2d");

function draw(){
	// 將背景圖片畫在 canvas 上的 (0,0) 位置
  ctx.drawImage(bgImg,0,0);
ctx.drawImage(enimg,enmey.x,enmey.y);
ctx.drawImage(casimg,576,416 ,64,64);
if (isbuilding == true){
ctx.drawImage(towimg,cursor.x,cursor.y);	

}

};



// 執行 draw 函式
setInterval(draw, 16);
 var cursor = {
x:100,
y:200

}
var enmey ={
	x:30,
	y:480-32
}

$("#game-canvas").on("mousemove",mousemove);
function mousemove(event) {
	cursor.x = event.offsetX
	cursor.y = event.offsetY
}
var isbuilding = false
$("#game-canvas").on("click",mouseclick);
function mouseclick(){
	if(cursor.x>576&&cursor.y>416){
		isbuilding = true;
	}else{
		isbuilding	= false
	}
}