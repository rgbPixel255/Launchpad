/*---PARA CUANTIFICAR
const STANDARD_COMPASS = 4000; //4000 ms for a compass for 60 bpm
var compass = STANDARD_COMPASS;
var waitTime = 0;*/
var samplesPlaying = 0; //Numbor of samples playing at the same time
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
function playSample(sample, elem, colorSelector){
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
        switch(colorSelector){
            case 0: elem.style.backgroundColor = "#A734A7";
                break;
            case 1: elem.style.backgroundColor = "#FFFF48";
                break;
            case 2: elem.style.backgroundColor = "#DA3B6C";
                break;
            case 3: elem.style.backgroundColor = "#0F87FF";
                break;
            case 4: elem.style.backgroundColor = "#05FF30";
                break;
        }      
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
        switch(colorSelector){
            case 0: elem.style.backgroundColor = "#E3A8E3";
                break;
            case 1: elem.style.backgroundColor = "#FFFFC6";
                break;
            case 2: elem.style.backgroundColor = "#FF97D0";
                break;
            case 3: elem.style.backgroundColor = "#93C9FF";
                break;
            case 4: elem.style.backgroundColor = "#93FFC9";
                break;
        }

    }
}
function setBPM(bpm) {
    controlAudio.playbackRate = bpm/60; 
    compass = STANDARD_COMPASS*(60/bpm);
}