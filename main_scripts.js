/*---PARA CUANTIFICAR
const STANDARD_COMPASS = 4000; //4000 ms for a compass for 60 bpm
var compass = STANDARD_COMPASS;
var waitTime = 0;*/
var samplesPlaying = 0; //Numbor of samples playing at the same time
var onPlay = []; //Samples already playing
var itemOnPlay = []; //Items asociated to samples wich are playing 
//-----CHAPUCERO---------------
/*---PARA CUANTIFICAR
var controlAudio;
function activeBPM(control){
    controlAudio = control;
    //controlAudio.volume = 0;
    controlAudio.load();
    setBPM(90);
}*/
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