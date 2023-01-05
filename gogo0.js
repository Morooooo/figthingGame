
const canvas=document.querySelector('canvas');
const c=canvas.getContext('2d');
canvas.width=1024;
canvas.height=576;
c.fillRect(0,0,canvas.width,canvas.height);
const gravity=0.5;
class Sprite{
    constructor({position,velocity,color,lastKey,attackBox}){
this.position=position;
this.velocity=velocity;
this.color=color;
this.width=50;
this.height=150;
this.lasKey=lastKey;
this.attackBox={
    position:this.position,
    width:100,
    height:20,
    color:'yellow'
},
this.isAttacking=false;
this.health=100;
    }
    draw(){
        c.fillStyle=this.color;
        c.fillRect(this.position.x,this.position.y,50,this.height);
       if(player.isAttacking) {c.fillStyle=player.attackBox.color
        c.fillRect(player.attackBox.position.x,player.attackBox.position.y,
         player.attackBox.width,player.attackBox.height)
        }else if(enemy.isAttacking){c.fillStyle=enemy.attackBox.color
            c.fillRect(enemy.attackBox.position.x+50,enemy.attackBox.position.y,
             -100,enemy.attackBox.height)}
    }
update(){
    this.draw()

    this.position.y+=this.velocity.y;
    this.position.x+=this.velocity.x;


    if(this.position.y+this.height+this.velocity.y
        >=canvas.height){
        this.velocity.y=0;
         }else{   
             this.velocity.y+=gravity;}

}
 attack(){
    this.isAttacking=true;
    
    setTimeout(()=>{
        this.isAttacking=false},20)
 }
}
const lastKey='';
const player=new Sprite({
    position:{x:0, y:0},
    velocity:{x:0,y:0},
    color:'green',
    lastKey:''
})
const enemy=new Sprite(
    {
        position:{x:400, y:100},
        velocity:{x:0,y:0},
        color:'red',
        lastKey:''
    })
const keys={
        a:{pressed:false},d:{pressed:false},s:{pressed:false},
        Arrowleft:{pressed:false},ArrowUp:{pressed:false},ArrowRigth:{pressed:false}
    }
    let timer=10;
    function determineWinner(enemy,player){
        if(player.health>enemy.health){document.querySelector('#result').innerHTML='Player won'}
        else if(enemy.health>player.health){
         document.querySelector('#result').innerHTML='Enemy won'
        }else{
         document.querySelector('#result').innerHTML='Tie'
        }
    }
  function decreaseTimer(){
    
    if (timer>0){setTimeout(decreaseTimer,1000) 
        timer-=1;
        document.querySelector('#timer').innerHTML=timer}
   else{ determineWinner(enemy,player)}
  }
  decreaseTimer()
   /* setInterval(() => { if(timer>0){ document.querySelector('#timer').innerHTML= timer-=1;  
}else{return console.log('Game Over');}}, 1000)*/
function animate(){
    window.requestAnimationFrame(animate)
    c.fillStyle='black'
    c.fillRect(0,0,canvas.width,canvas.height)
    player.update()
    enemy.update()
     //enemy
   if(keys.a.pressed){
  enemy.velocity.x=-3
    }else if(keys.d.pressed) {enemy.velocity.x=3}
  //player
    if(keys.Arrowleft.pressed){
        player.velocity.x=-3
          }else if(keys.ArrowRigth.pressed) {player.velocity.x=3}
 //detect collision
 if(player.attackBox.position.x+100>=enemy.position.x&&player.attackBox.position.x<enemy.position.x+50
    &&player.attackBox.position.y+20>=enemy.position.y&&player.isAttacking){console.log('Oh!');enemy.health-=5;document.querySelector('#enemyHealth').style.width=enemy.health+'%'} 
    if(enemy.attackBox.position.x-50<=player.position.x+50&&enemy.attackBox.position.x-50>player.position.x
        &&enemy.attackBox.position.y+20>=player.position.y&&enemy.isAttacking){console.log('Of!'); player.health-=5;document.querySelector('#playerHealth').style.width=player.health+'%'}          

        if(enemy.health<=0||player.health<=0) {
            determineWinner(enemy,player)
        }   }
animate()
window.addEventListener('keydown',(e)=>{ //console.log(e.key)
    switch(e.key){
        case 'ArrowLeft':keys.Arrowleft.pressed=true,player.lastKey=='Arrowleft';break;
        case 'ArrowRight':keys.ArrowRigth.pressed=true,player.lastKey=='ArrowRigth';break;
        case 'ArrowUp':player.velocity.y=-20;break;
        case ' ':player.attack();break;
        case 'a':keys.a.pressed=true,enemy.lastKey=='a';break;
        case 's':enemy.velocity.y=-20;break;
        case 'd':keys.d.pressed=true,enemy.lastKey=='d';break;
        case 'Shift':enemy.attack();break;
    }   
    window.addEventListener('keyup',(e)=>{
        switch(e.key){
            case 'ArrowRight':player.velocity.x=0,keys.ArrowRigth.pressed=false;break;
            case 'ArrowLeft':player.velocity.x=0,keys.Arrowleft.pressed=false;break;
            case 'ArrowUp':player.velocity.y=0;break;
            case 'a':enemy.velocity.x=0,keys.a.pressed=false;break;
            case 's':enemy.velocity.y=0;break;
            case 'd':enemy.velocity.x=0,keys.d.pressed=false;break;
        }
    })
    
})
