catImg = document.getElementById('catImage');
let i = 1;
let currentInterval;
let slept = false;
let hasSlept = false;
let forced = "";
let facing = 'right';

function chooseRandom(){
    clearInterval(currentInterval);
    console.log(facing);
    if (slept){
        i=4;
        currentInterval = setInterval(unsleepCatAnim,150);
        hasSlept = true;
        return;
    }
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
        x = Math.floor(Math.random() * (2 - 1) + 1);
        hasSlept = false;
    } else {
        x = Math.floor(Math.random() * (3 - 1) + 1);
    }
    console.log("didn't slept");
    delay = Math.floor(Math.random() * (10000 - 2000) + 2000);
    switch(x){
        case 1:
            i=1;
            currentInterval = setInterval(walkCatIcon,150);
            break;
        case 2:
            i=1;
            currentInterval = setInterval(idleCatAnim,150);
            break;
        case 3:
            i=1;
            slept = true;
            currentInterval = setInterval(sleepCatAnim,150);
            break;
    }
    setTimeout(chooseRandom,delay);
}


function walkCatIcon(){
    catImg.src = `catSprites/catWalk/catWalk${i}.png`;
    current = catImg.style.left;
    current = current.replace("px","");
    if (parseInt(current) + 3 + 60 >= window.innerWidth && facing == "right"){
        forced = 'left';
        chooseRandom();
        return;
    }
    if (parseInt(current) - 3 - 60 <= 0 && facing == "left"){
        forced = 'right';
        chooseRandom();
        return;
    }
    if (facing == 'right'){
        catImg.classList.remove("facingLeft");
        catImg.style.left = (parseInt(current) + 3) + "px";
        i++;
        if(i>6){
            i = 1;
        }
    } else {
        catImg.classList.add("facingLeft");
        catImg.style.left = (parseInt(current) - 3) + "px";
        i++;
        if(i>6){
            i = 1;
        }
    }
}

function idleCatAnim(){
    catImg.src = `catSprites/catIdle/catIdle${i}.png`;
    i++;
    if(i>4){
        i = 1;
    }   
}

function sleepCatAnim(){
    catImg.src = `catSprites/catSleep/catSleep${i}.png`;
    i++;
    if(i>4){
        i=4;
    }
}

function unsleepCatAnim(){
    console.log('HIT IT');
    catImg.src = `catSprites/catSleep/catSleep${i}.png`;
    i--;
    console.log(i);
    if(i<1){
        slept = false;
        chooseRandom();
        return;
    }
}

chooseRandom();