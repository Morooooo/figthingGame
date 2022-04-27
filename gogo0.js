let canvas=document.querySelector(`canvas`) ;
let c=canvas.getContext(`2d`);
canvas.width=1024;
canvas.height=576;
c.fillRect(0,0,canvas.width,canvas.height);
let gravity=7;
class Sprite{
    constructor({position,velocity,color}){
        this.position=position;
        this.velocity=velocity;
        this.height=150;
        this.width=50;
        this.lastKey;
        this.color=color;
        this.attackBox={
            position:this.position,
            width:100,
            height:20
        }
    }
    draw (){
        c.fillStyle=this.color;
        c.fillRect(this.position.x,this.position.y,this.width,this.height);
        //attackBox
        c.fillRect(this.attackBox.position.x,this.attackBox.position.y,this.attackBox.width,this.attackBox.height)
    }
    update(){
        
        this.draw()
        this.position.y+=this.velocity.y;
        this.position.x+=this.velocity.x;
        
    
        if(this.position.y+this.height+this.velocity.y>canvas.height){
            this.velocity.y=0;
        }else {this.velocity.y=gravity;}
        
       

    }
}
let player=new Sprite({position:{x:0,y:0},velocity:{x:0,y:0},color:`green`})

let enemy=new Sprite({position:{x:520,y:270},velocity:{x:0,y:0},color:`rgb(255,0,244)`})

console.log(enemy,player);
let keys={
    a:{pressed:false},
    d:{pressed:false},
    s:{pressed:false},
    ArrowRight:{pressed:false},
    ArrowLeft:{pressed:false},
    ArrowUp:{pressed:false}
} 
//https://www.youtube.com/watch?v=vyqbNFMDRGQ
function animate(){
    window.requestAnimationFrame(animate);
    c.fillStyle=`black`
    c.fillRect(0,0,canvas.width,canvas.height)
    player.update();
    enemy.update();
    player.velocity.x=0;
    enemy.velocity.x=0;
   if(player.attackBox.position.x+player.attackBox.width>=enemy.position.x
   &&player.attackBox.position.x<=enemy.position.x+enemy.attackBox.width
    &&player.attackBox.position.y+player.attackBox.height>=enemy.position.y
    &&player.attackBox.position.y<=enemy.position.y+enemy.height){console.log(`Oooh`);} /**/
  // else{console.log(`ne me boli`)}
    
//player movememt
    if(keys.a.pressed&&player.lastKey===`a`){
        player.velocity.x=-5;}
     if(keys.d.pressed&&player.lastKey===`d`){
        player.velocity.x=5;}
     //if(keys.s.pressed&&lastKey===`s`){ player.velocity.y=-5; }
    //enemy movement
     if(keys.ArrowLeft.pressed&&enemy.lastKey===`ArrowLeft`){
        enemy.velocity.x=-5;}
     if(keys.ArrowRight.pressed&&enemy.lastKey===`ArrowRight`){
        enemy.velocity.x=5;}
   
}animate()
window.addEventListener(`keydown`,(event)=>{//console.log(event.key)
    switch(event.key){
        case `d` :keys.d.pressed=true;player.lastKey=`d`; break; //
        case `a` :keys.a.pressed=true;player.lastKey=`a`; break;//
        case `s`: player.velocity.y=-25;break;
        case `ArrowRight` :keys.ArrowRight.pressed=true;enemy.lastKey=`ArrowRight`; break; //
        case `ArrowLeft` :keys.ArrowLeft.pressed=true;enemy.lastKey=`ArrowLeft`; break;//
        case `ArrowUp`: enemy.velocity.y=-25;break;
    }
})/*console.log(event.key); */
window.addEventListener(`keyup`,(event)=>{//console.log(event.key)
    switch(event.key){
        case `d` :keys.d.pressed=false; break; //
        case  `a` :keys.a.pressed=false; break;
        case  `s` :keys.s.pressed=false; break;
        case `ArrowRight` :keys.ArrowRight.pressed=false; break; //
        case  `ArrowLeft` :keys.ArrowLeft.pressed=false; break;
        case  `ArrowUp` :keys.ArrowUp.pressed=false; break;


        

    }//

})
