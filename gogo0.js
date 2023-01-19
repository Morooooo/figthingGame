const canvas=document.querySelector('canvas');
const c=canvas.getContext('2d');


canvas.width=1024;
canvas.height=576;
c.fillRect(0,0,canvas.width,canvas.height);
const gravity=0.5;
 class Sprite{
    constructor(position,imageSrc,scale,velocity,framesMax=1,offset={x:0,y:0}){
        this.position=position;
        this.width=950;
        this.height=550;
        this.image=new Image();
        this.image.src=Object.values(imageSrc);
        this.scale=scale,
        this.velocity=velocity,
        this.framesMax=framesMax,
      this.framesCurrent=0,
      this.framesElapsed=0,
       this.framesHold=5 ,
       this.offset=offset /* */
    }
    draw(){
     c.drawImage(this.image,
        this.framesCurrent*(this.image.width/this.framesMax),
        0,this.image.width/this.framesMax,this.image.height,
        this.position.x,this.position.y,
        (this.image.width/this.framesMax)*this.scale,this.image.height*this.scale)   
    }
    update(){
        this.framesElapsed++
        if(this.framesElapsed % this.framesHold==0){ 
             if(this.framesCurrent<this.framesMax-1){
            this.framesCurrent++
        }else{this.framesCurrent=0} }
       
        this.draw()
    this.position.x+=this.velocity

    }
 }
class Figther{
    constructor({position,velocity,color,lastKey,attackBox,imageSrc,scale,framesMax=1,sprites}){
this.position=position;this.velocity=velocity;this.color=color;
this.width=150;this.height=150;this.lastKey=lastKey;
this.attackBox={
    position:this.position,
    width:100,
    height:150,
    color:this.color
};
this.sprites=sprites
for(let sprite in this.sprites){
    sprites[sprite].image=new Image();
    sprites[sprite].image.src=sprites[sprite].imageSrc
}
//for( let x of Object.keys(this.sprites)){this.image.src=`./Sprites/${x}.png`};console.log(x);

this.isAttacking=false;this.health=100;this.image=new Image();
this.image.src=imageSrc;this.scale=scale;this.framesMax=framesMax;
this.framesCurrent=0;this.framesElapsed=0;this.framesHold=5;this.sprites=sprites;
this.dead=false;
    }
    draw(){
        /*c.fillStyle=this.color;
    c.fillRect(this.position.x,this.position.y,50,this.height);
   if(player.isAttacking) {c.fillStyle=player.attackBox.color
     c.fillRect(player.attackBox.position.x,player.attackBox.position.y,
     player.attackBox.width,player.attackBox.height)
    }else if(enemy.isAttacking){c.fillStyle=enemy.attackBox.color
        }*/
        //c.fillRect(this.attackBox.position.x+150,this.attackBox.position.y,this.attackBox.width,this.attackBox.height)
         c.drawImage(this.image,
            this.framesCurrent*(this.image.width/this.framesMax),
            0,this.image.width/this.framesMax,this.image.height,
            this.position.x,this.position.y-100,
            (this.image.width/this.framesMax)*this.scale.x,this.image.height*this.scale.y)     
    }
    animateFrames(){
         this.framesElapsed++;
    if(this.framesElapsed % this.framesHold==0){ 
         if(this.framesCurrent<this.framesMax-1){
        this.framesCurrent++
    }else{ this.framesCurrent=0} }
 }
update(){
    if(this.dead==false){
        this.animateFrames()}
          this.draw()

    this.position.y+=this.velocity.y;
    this.position.x+=this.velocity.x;
  // c.fillRect(this.attackBox.position.x,this.attackBox.position.y,this.attackBox.width,this.attackBox.height)
    //gravity
   if(this.position.y+this.height+99+this.velocity.y
        >=canvas.height){
        this.velocity.y=0;
         }else{   
             this.velocity.y+=gravity;}/**/ 

}
 attack(){
    this.switchSprite('attack')
    this.isAttacking=true;
    
    setTimeout(()=>{this.isAttacking=false},20)
 }
 takesHit(){
    this.health-=5;
 if(this.health==enemy.health){ 
    document.querySelector(`#enemyHealth`).style.width=this.health+'%';  
      if(this.health<=0){
        this.switchSprite('death')}else{this.switchSprite('takeHit')}}
    else if(this.health==player.health){ 
        // document.querySelector(`#playerHealth`).style.width=this.health+'%';
       gsap.to('#playerHealth',{width:this.health+'%'})
    if(this.health<=0){this.switchSprite('death')}
    else{this.switchSprite('takeHit')}}
    
 }
 
 switchSprite(sprite){
    if (this.image==this.sprites.death.image){ this.image==this.sprites.death.image.framesMax-1; return;}
    if(this.image===this.sprites.attack.image&&this.framesCurrent<this.sprites.attack.framesMax-1){
        return}
        if(this.image===this.sprites.takeHit.image&&this.framesCurrent<this.sprites.takeHit.framesMax-1){
            return}
  
  
 
    switch(sprite){
   
    case 'idle':if(this.image!==this.sprites.idle.image) {this.image=this.sprites.idle.image};
        this.framesMax=this.sprites.idle.framesMax; break; 
       case 'run':if(this.image!==this.sprites.run.image) {this.image=this.sprites.run.image};
       this.framesMax=this.sprites.run.framesMax; break ;
       case 'jump': if( this.image!==this.sprites.jump.image){ this.image=this.sprites.jump.image};
       this.framesMax=this.sprites.jump.framesMax; break
       case 'fall': if( this.image!==this.sprites.fall.image){ this.image=this.sprites.fall.image};
       this.framesMax=this.sprites.fall.framesMax; break
       case 'attack': if( this.image!==this.sprites.attack.image){ this.image=this.sprites.attack.image};
       this.framesMax=this.sprites.attack.framesMax; break
       case 'takeHit':if (this.image!=this.sprites.takeHit.image){this.image=this.sprites.takeHit.image};
       this.framesMax=this.sprites.takeHit.framesMax;break;
       case 'death':if (this.image!=this.sprites.death.image){this.image=this.sprites.death.image};
       this.framesMax=this.sprites.death.framesMax;break;
   }
 }
 
}
const lastKey='';
const player=new Figther({
    position:{x:150, y:0},imageSrc:'./Sprites/Idle.png',//attackBox:{position:{x:10,y:0}},
     scale:{x:2,y:2},velocity:{x:0,y:0},framesMax:8,
    sprites:{idle:{imageSrc:'./Sprites/Idle.png',framesMax:8},
    run:{imageSrc:'./Sprites/Run.png',framesMax:8},
    jump:{imageSrc:'./Sprites/Jump.png',framesMax:2},
    fall:{imageSrc:'./Sprites/Fall.png',framesMax:2},
    attack:{imageSrc:'./Sprites/Attack1.png',framesMax:6},
death:{imageSrc:'./Sprites/Death.png',framesMax:6},
takeHit:{imageSrc:'./Sprites/Take Hit - white silhouette.png',framesMax:4}   }
   
})
const background=new Sprite({x:0,y:0},{imageSrc:'./images/images.png'},1,0)
const hero=new Sprite({x:0,y:233},{imageSrc:'./Sprites/Idle.png'},2,0,8)
/*background.setAttribute('width','950')
background.setAttribute('height','550')
background.setAttribute('id','background')
background.src=*/
const cloud=new Sprite({x:100,y:50},{imageSrc:'./images/moving-clouds-gif-transparent-1.gif'},
0.7,0.04,1,{x:0,y:-440})

const enemy=new Figther(
   {position: {x:365,y:0},imageSrc:'./Sprites/IdleEnemy.png',
    scale:{x:2.5,y:2},velocity:{x:0,y:0},framesMax:8,
    sprites:{idle:{imageSrc:'./Sprites/IdleEnemy.png',framesMax:8},
    run:{imageSrc:'./Sprites/RunEnemy.png',framesMax:8},
    jump:{imageSrc:'./Sprites/JumpEnemy.png',framesMax:2},
fall:{imageSrc:'./Sprites/FallEnemy.png',framesMax:2},
attack:{imageSrc:'./Sprites/Attack1Enemy.png',framesMax:6},
death:{imageSrc:'./Sprites/DeathEnemy.png',framesMax:6},
takeHit:{imageSrc:'./Sprites/Take HitEnemy - white silhouette.png',framesMax:4}  }}
    )
    //console.log(enemy.sprites)
const keys={
        a:{pressed:false},d:{pressed:false},s:{pressed:false},
        Arrowleft:{pressed:false},ArrowUp:{pressed:false},ArrowRigth:{pressed:false}
    }
    let timer=30;
    let timerId;
    function determineWinner(enemy,player){
        //document.querySelector('#result').setAttribute('style','color:green')
        if(player.health>enemy.health){document.querySelector('#result').innerHTML='Player won'}
        else if(enemy.health>player.health){
         document.querySelector('#result').innerHTML='Enemy won'
        }else{
         document.querySelector('#result').innerHTML='Tie'
        }
    }
  function decreaseTimer(){
    
    if (timer>0){
        timerId=setTimeout(decreaseTimer,1000) 
        timer-=1;
        document.querySelector('#timer').innerHTML=timer}
   else{ //determine winner based on health
    determineWinner(enemy,player)}
  }
  decreaseTimer()

   /* setInterval(() => { if(timer>0){ document.querySelector('#timer').innerHTML= timer-=1;  
}else{return console.log('Game Over');}}, 1000)*/
function animate(){
    window.requestAnimationFrame(animate)
    c.fillStyle='black'
    c.fillRect(0,0,canvas.width,canvas.height)
   
    background.update()
    c.fillStyle='rgba(255,255,255,0.2)'
    c.fillRect(0,0,canvas.width,canvas.height)
    
    cloud.update()
   // hero.update()
   
    enemy.update()
     player.update()
     //>>>>>>>>>>>>>>enemy movement>>>>>>>>>>>>>>>
enemy.health>=0?enemy.switchSprite('idle'):enemy.dead=true;
    if(keys.a.pressed){
  enemy.velocity.x=-3;enemy.switchSprite('run')
    }else if(keys.d.pressed) {
        enemy.velocity.x=3;enemy.switchSprite('run')}
    else if(enemy.velocity.y<0){
 enemy.switchSprite('jump'); 
    }else if(enemy.velocity.y>0){
        enemy.switchSprite('fall')}
    else if(
        enemy.isAttacking){player.switchSprite('takeHit')}
    //>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>player movement>>>>>>
    player.health>=0?player.switchSprite('idle'):player.dead=true;
    if(keys.Arrowleft.pressed){
        player.velocity.x=-3;player.switchSprite('run')
          }else if(keys.ArrowRigth.pressed) {player.velocity.x=3;player.switchSprite('run')}
          else if(player.velocity.y<0){player.switchSprite('jump')}else if(player.velocity.y>0){
            player.switchSprite('fall')}else if(player.isAttacking){enemy.switchSprite('takeHit')}
           
 //detect collision

 if(player.position.x+210>=enemy.position.x&&player.position.x<enemy.position.x+50
    &&player.position.y+150>=enemy.position.y&&player.isAttacking){console.log('Oh!');
    enemy.switchSprite('takeHit');enemy.takesHit()
    } 
    if(enemy.position.x-170<=player.position.x+40&&enemy.position.x-50>player.position.x
        &&enemy.position.y+150>=player.position.y&&enemy.isAttacking){console.log('Of!');
        player.switchSprite('takeHit'); player.takesHit();
        }          
//determine winner based on death
        if(enemy.health<=0||player.health<=0) {
            clearTimeout(timerId)
            determineWinner(enemy,player)
            } 
    
    }
animate()

window.addEventListener('keydown',(e)=>{ //console.log(e.key)
    if(!player.dead){
        switch(e.key){
        case 'ArrowLeft':keys.Arrowleft.pressed=true,player.lastKey=='Arrowleft';break;
        case 'ArrowRight':keys.ArrowRigth.pressed=true,player.lastKey=='ArrowRigth';break;
        case 'ArrowUp':player.velocity.y=-20;player.switchSprite('jump'); break;
        case ' ':player.attack();player.switchSprite('attack');break;
       
    }  }
    
    if(!enemy.dead){ 
        switch(e.key){ case 'a':keys.a.pressed=true,enemy.lastKey=='a';break;
        case 's':enemy.velocity.y=-20;enemy.switchSprite('jump'); break;
        case 'd':keys.d.pressed=true,enemy.lastKey=='d';break;
        case 'Enter':enemy.attack();enemy.switchSprite('attack');break; }
     } 
   
    
})
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
