catImg = document.getElementById('catImage');
catPose = document.getElementById('catPose');
catSpan = document.getElementById('catSpan');
let i = 0;
let currentInterval;
let currentDelay;
let slept = false;
let hasSlept = false;
let forced = "";
let facing = 'right';

console.log(window.innerWidth);

function chooseRandom(){
    
    clearInterval(currentInterval);
    clearTimeout(currentDelay);
    if (forced == 'left') {
        facing = 'right';
        forced = "";
    } else if (forced == 'right'){
        facing = 'left';
        forced = "";
    } else {
        if (Math.floor(Math.random() * (50 - 0) + 0) > 25){
            facing = "left";
        } else {
            facing = "right";
        }
    }
    if (hasSlept){
        x = Math.floor(Math.random() * (3 - 1) + 1);
        hasSlept = false;
    } else {
        x = Math.floor(Math.random() * (4 - 1) + 1);
         
    }
    delay = Math.floor(Math.random() * (30000 - 6000) + 6000);
    if (slept){
        i=3;
        currentInterval = setInterval(unsleepCatAnim,150);
        currentDelay = setTimeout(chooseRandom,delay);
        hasSlept = true;
        return;
    }
    switch(x){
        case 1:
            i=0;
            
            currentInterval = setInterval(walkCatIcon,150);
            currentDelay = setTimeout(chooseRandom,delay);
            break;
        case 2:
            i=0;
            
            currentInterval = setInterval(idleCatAnim,150);
            currentDelay = setTimeout(chooseRandom,delay);
            break;
        case 3:
            i=0;
            slept = true;
            
            currentInterval = setInterval(sleepCatAnim,150);
            currentDelay = setTimeout(chooseRandom,delay);
            break;
    }
    
    
}

chooseRandom();


function walkCatIcon(){
    
    catImg.src = `catSprites/catWalk/catWalk${i}.png`;
    current = catPose.style.left;
    current = current.replace("px","");
    
    if (parseInt(current) + 10 + 75 >= window.innerWidth && facing == "right"){
        forced = 'left';
        
        chooseRandom();
        return;
    }
    if (parseInt(current) - 10 <= 0 && facing == "left"){
        forced = 'right';
        
        chooseRandom();
        return;
    }
    if (facing == 'right'){
        catSpan.classList.remove("facingLeft");
        catPose.style.left = (parseInt(current) + 10) + "px";
        i++;
        if(i>5){
            i = 0;
        }
    } else {
        catSpan.classList.add("facingLeft");
        catPose.style.left = (parseInt(current) - 10) + "px";
        i++;
        if(i>5){
            i = 0;
        }
    }
}

function idleCatAnim(){
    catImg.src = `catSprites/catIdle/catIdle${i}.png`;
    i++;
    if(i>3){
        i = 0;
    }   
}

function sleepCatAnim(){
    catImg.src = `catSprites/catSleep/catSleep${i}.png`;
    i++;
    if(i>10){
        i = 5;
    }
}

function unsleepCatAnim(){
    
    catImg.src = `catSprites/catSleep/catSleep${i}.png`;
    i--;
    
    if(i<0){
        slept = false;
        chooseRandom();
        return;
    }
}

function startAttack(){
    clearTimeout(currentDelay);
    clearInterval(currentInterval);
    i = 0;
    slept = false;
    currentInterval = setInterval(attackCatAnim,150);
}

function startAttackLeft(){
    clearTimeout(currentDelay);
    clearInterval(currentInterval);
    i = 0;
    slept = false;
    catImg.classList.add('facingLeft');
    currentInterval = setInterval(attackCatAnim,150);
}

function stopAttack(){
    
    clearInterval(currentInterval);
    catImg.classList.remove('facingLeft');
    chooseRandom();
}

function attackCatAnim(){
    catImg.src = `catSprites/catAttack/catAttack${i}.png`;
    i++;
    if(i>3){
        setTimeout(()=>{},300);
        i=1;
    }
}

function startCuddle(){
    clearTimeout(currentDelay);
    clearInterval(currentInterval);
    i = 0;
    currentInterval = setInterval(cuddleCatAnim,150);
}

function stopCuddle(){
    clearInterval(currentInterval);
    chooseRandom();
}

function cuddleCatAnim(){
    catImg.src = `catSprites/catCuddle/catCuddle${i}.png`;
    i++;
    if(i>3){
        setTimeout(()=>{},300);
        i=0;
    }
}
