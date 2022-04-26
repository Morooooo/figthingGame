let canvas=document.querySelector(`canvas`) ;
let c=canvas.getContext(`2d`);
canvas.width=1024;
canvas.height=576;
c.fillRect(0,0,canvas.width,canvas.height);
let gravity=2;
class Sprite{
    constructor({position,velocity}){
        this.position=position;
        this.velocity=velocity;
        this.height=150;
    }
    draw (){
        c.fillStyle="red"
        c.fillRect(this.position.x,this.position.y,50,this.height);
        
    }
    update(){
        
        this.draw()
        this.position.y+=this.velocity.y;
        this.position.x+=this.velocity.x;
        //this.position.x+=3;
        if(this.position.y+this.height+this.velocity.y>canvas.height){
            this.velocity.y=0;
        }else {this.velocity.y=gravity;}
       

    }
}
let player=new Sprite({position:{x:0,y:0},velocity:{x:0,y:0}})

let enemy=new Sprite({position:{x:520,y:270},velocity:{x:0,y:0}})

console.log(enemy,player);
let keys={
    a:{pressed:false},
    d:{pressed:false}
}
function animate(){
    window.requestAnimationFrame(animate);
    c.fillStyle=`black`
    c.fillRect(0,0,canvas.width,canvas.height)
    player.update();
    enemy.update();
    if(keys.a.pressed=true){player.velocity.x=-1;}
    else if(keys.d.pressed=true){player.velocity.x=1;}

    console.log();
}animate()
window.addEventListener(`keydown`,(event)=>{//console.log(event.key)
    switch(event.key){
        case `d` :keys.d.pressed=true; break; //
        case `a` :keys.a.pressed=true; break;}//

})/**/
window.addEventListener(`keyup`,(event)=>{//console.log(event.key)
    switch(event.key){
        case `d` :keys.d.pressed=false; break; //
        case  `a` :keys.a.pressed=false; break;}//

})
