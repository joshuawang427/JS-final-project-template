var FPS = 60;
var clock = 0;
var HP = 100;
var score = 0;
var money = 100000;
// 創造 img HTML 元素，並放入變數中
var bgImg = document.createElement("img");
var enimg = document.createElement("img");
var casimg = document.createElement("img");
var towimg = document.createElement("img");
var crosshairimg = document.createElement("img")
// 設定這個元素的要顯示的圖片
bgImg.src = "images/map.pn2.png";
enimg.src = "images/rukia.gif";
casimg.src = "images/tower-btn.png";
towimg.src = "images/tower.png";
crosshairimg.src = "images/crosshair.png";
// 找出網頁中的 canvas 元素
var canvas = document.getElementById("game-canvas");

// 取得 2D繪圖用的物件
var ctx = canvas.getContext("2d");

function draw() {
	clock++;
	if ((clock%1) ==0){
		var newEnemy  =  new Enemy();
		enemies.push(newEnemy);	

	}
	
	// 將背景圖片畫在 canvas 上的 (0,0) 位置
	ctx.drawImage ( bgImg,0,0 );
	for (var i=0; i<enemies.length; i++){
		if (enemies[i].HP<=0){
			enemies.splice(i,1);
			money+=1000;
			score+=1000;
		}else{
			ctx.drawImage ( enimg,enemies[i].x ,enemies[i].y );
			
			enemies[i].move();
		}
	}
	

	ctx.drawImage (casimg,576,416 ,64,64);
	ctx.fillText("HP:"+HP,0,20);
	ctx.fillText("money:"+money,0,40);
	ctx.fillText("score:"+score,0,60);
	ctx.font = "25px Arial";
	ctx.fillStyle = "white";
	if (HP <= 0){
    clearInterval(intervalID);
    ctx.font="64px Arial";
    ctx.fillStyle = "white";
    ctx.fillText("Game over", 150, 240);



	}
	for (var i = 0; i < towers.length; i++) {
ctx.drawImage(towimg,towers[i].x,towers[i].y);
	towers[i].searchEnemy();
	if(towers.aimingEnemyId!=null){
		var id = towers.aimingEnemyId;
		ctx.drawImage(crosshairimg, enemies[id].x,enemies[id].y)
	}
	}
	if ( isbuilding == true ) {
		ctx.drawImage(towimg,cursor.x,cursor.y);
	}else{
		

	}
	}
	
	
	



// 執行 draw 函式
 var intervalID = setInterval(draw, 1000/FPS);
 var enemypath = [
{x:32,  y:320   },
{x:160,  y:320   },
{x:160,  y:224   },
{x:128,  y:224   },
{x:128,  y:192   },
{x:32,  y:192   },
{x:32,  y:64   },
{x:128,  y:64 },
{x:128,  y:32   },
{x:192,  y:32  },
{x:192,  y:128   },
{x:352,  y:128   },
{x:352,  y:192   },
{x:288,  y:192   },
{x:288,  y:352 },
{x:224,  y:352   },
{x:224,  y:448   },
{x:384,  y:448   },  
{x:384,  y:352   },
{x:448,  y:352   },
{x:448,  y:256   },
{x:480,  y:256   },
{x:480,  y:128  },
{x:448,  y:128   },
{x:448,  y:64   },
{x:352,  y:64   }







 ]
 var cursor = {
x:100,
y:200

}
var enemies =[];
function Enemy (){
	this.x=32;
	this.y=480-32;
	this.HP = 1;
	this.speedx=0;
	this.speedy=-64;
	this.pathDes=0;
	this.move= function(){
		
		if(isCollided(
			enemypath[this.pathDes].x,
			 enemypath[this.pathDes].y,
			 this.x,
			 this.y,
			  64/FPS,
			  64/FPS)){
			this.x = enemypath[this.pathDes].x;
		    this.y = enemypath[this.pathDes].y;

		
			this.pathDes++;
			if(this.pathDes == enemypath.length){
			this.HP = 0;
			HP -= 0.1;
			return;

			}
			if( enemypath[this.pathDes].y < this.y){ 	

	        	this.speedx = 0;
	        	this.speedy = -64;
			}else if(enemypath[this.pathDes].x > this.x){
	        	this.speedx  =64;
	        	this.speedy = 0;


			}else if(enemypath[this.pathDes].y > this.y){
				this.speedx = 0;
	        	this.speedy = 64;


			} else if(enemypath[this.pathDes].x < this.x){
				this.speedx = -64;
	        	this.speedy = 0;

				}

		}else{
			this.x = this.x+this.speedx/FPS;
				this.y = this.y+this.speedy/FPS;





		}	
	}

}
function Tower(){
this.x=0;
this.y=0;
this.range= 1500;
this.aimingEnemyId= null;


this.fireRate= 0.1;
this.readyToShootTime=0.;
this.damage=100;
this.searchEnemy= function(){
		this.readyToShootTime -= 1/FPS;
		for(var i=0; i<enemies.length; i++){
			var distance = Math.sqrt(Math.pow(this.x-enemies[i].x,2) + Math.pow(this.y-enemies[i].y,2));
			if (distance<=this.range) {
				this.aimingEnemyId = i;
				if (this.readyToShootTime <= 0) {

				this.shoot(i);		
				this.readyToShootTime = this.fireRate; 
				}



				return;
			}
		}
		// 如果都沒找到，會進到這行，清除鎖定的目標
		this.aimingEnemyId = null;
	},
	this.shoot=function(id){
		ctx.beginPath();
		ctx.moveTo(this.x, this.y);
		ctx.lineTo(enemies[id].x+16, enemies[id].y+16);
		ctx.strokeStyle = 'red';
		ctx.lineWidth = 3;
		ctx.stroke();
		enemies[id].HP -= this.damage;



},

this.fireRate= 0.1,
this.readyToShootTime=0.1,
this.damage=100
}
var towers = [];
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
		if(isbuilding==true){
			if (money >= 1){
			var newTower = new Tower();
			newTower.x=cursor.x - cursor.x%32;
			newTower.y=cursor.y - cursor.y%32;
		towers.push(newTower);
		money -= 1;
		}
	}
		isbuilding	= false;
	}
}
function isCollided (pointx, pointy, targetx, targety,targetWidth, targetHeight){
	if(targetx <= pointx &&
	              pointx <= targetx + targetWidth && 
	   targety <= pointy &&
	              pointy <= targety + targetHeight){
		return true;
	}else{
		return false;
	}

}

