/*---PARA CUANTIFICAR
const STANDARD_COMPASS = 4000; //4000 ms for a compass for 60 bpm
let compass = STANDARD_COMPASS;
let waitTime = 0;*/
let samplesPlaying = 0; //Numbor of samples playing at the same time
let activeGrid; //Grid with the music genre active right now;
let itemOnPlay = []; //Items asociated to samples wich are playing 
let onPlay = []; //Samples already playing
//-----CHAPUCERO---------------
/*---PARA CUANTIFICAR
let controlAudio;
function activeBPM(control){
    controlAudio = control;
    //controlAudio.volume = 0;
    controlAudio.load();
    setBPM(90);
}*/
function sOpnConfMenu(){
    $('#confMenu').animate({
        left: '0'
    });
}
function selectGenre(genre, item) {
    let grid = document.getElementById("modernRapGrid");
    grid.style.display = "none";
    item.style.backgroundColor = "#FA2";
}
//-----PLAY/STOP SAMPLES-------
function playSample(sample, item, row){
    if (sample.paused) {  
        /*---PARA CUANTIFICAR
        if(samplesPlaying == 0){                            
            sample.play();
            controlAudio.play();
            samplesPlaying++;                
        } else {
            //cambiar aspecto del pad a espera en css
            sample.load();
            waitTime = compass-(controlAudio.currentTime*1000*60/90);
            setTimeout(function(){
                sample.play();
                samplesPlaying++;
            }, waitTime);              
        }*/     
        sample.play();
        if (onPlay[row] != null){ //Another sample is playing on the same row
            onPlay[row].pause();
            onPlay[row].currentTime = 0;
            changeColor(itemOnPlay[row], row, 1);
        }
        changeColor(item, row, 0);   
        onPlay[row] = sample;   
        itemOnPlay[row] = item;
    }
    else{
        /*---PARA CUANTIFICAR
        sample.pause();
        samplesPlaying--;
        if(samplesPlaying == 0){
            controlAudio.pause();
            controlAudio.currentTime = 0;
        }
        sample.currentTime = 0;*/
        sample.pause();
        sample.currentTime = 0;
        changeColor(item, row, 1)
        onPlay[row] = null;
        itemOnPlay[row] = null;
    }
}
function changeColor(elem, colorSelector, action){
    //action = 0 playing, = 1 paused
    switch(colorSelector){
        case 0: 
            if (action == 0) elem.style.backgroundColor = "#A734A7";
            else elem.style.backgroundColor = "#E3A8E3";
            break;
        case 1: 
            if (action == 0) elem.style.backgroundColor = "#FFFF48";
            else elem.style.backgroundColor = "#FFFFC6";
            break;
        case 2: 
            if (action == 0) elem.style.backgroundColor = "#DA3B6C";
            else elem.style.backgroundColor = "#FF97D0";
            break;
        case 3: 
            if (action == 0) elem.style.backgroundColor = "#0F87FF";
            else elem.style.backgroundColor = "#93C9FF";
            break;
        case 4: 
            if (action == 0) elem.style.backgroundColor = "#05FF30";          
            else elem.style.backgroundColor = "#93FFC9";
            break;
        }      
}
function setBPM(bpm) {
    controlAudio.playbackRate = bpm/60; 
    compass = STANDARD_COMPASS*(60/bpm);
}
document.onkeydown = function(e) {
    switch (e.keyCode) {
        case 49: //1
        case 97: //1 Keypad
            document.getElementById("column1_row0").click();
            break;
        case 81: //Q
            document.getElementById("column1_row1").click();
            break;
        case 65: //A
            document.getElementById("column1_row2").click();
            break;
        case 54: //6
        case 102: //6 Keypad
            document.getElementById("column1_row3").click();
            break;
        case 55: //7
        case 103: //7 Keypad
            document.getElementById("column2_row3").click();
            break;
        case 56: //8
        case 104: //8 Keypad
            document.getElementById("column3_row3").click();
            break;
        case 89: //Y
            document.getElementById("column1_row4").click();
            break;
    }
};