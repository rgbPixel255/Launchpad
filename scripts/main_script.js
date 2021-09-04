/************************
--- Audio constructor ---
************************/
const column1_row0 = createPad(document.getElementById("column1_row0"), document.getElementById("modernRapDrum_1"), "#A734A7", "#E3A8E3");
const column2_row0 = createPad(document.getElementById("column2_row0"), document.getElementById("modernRapDrum_2"), "#A734A7", "#E3A8E3");
const column3_row0 = createPad(document.getElementById("column3_row0"), document.getElementById("modernRapDrum_3"), "#A734A7", "#E3A8E3");
const column4_row0 = createPad(document.getElementById("column4_row0"), document.getElementById("modernRapDrum_4"), "#A734A7", "#E3A8E3");
const column5_row0 = createPad(document.getElementById("column5_row0"), document.getElementById("modernRapDrum_5"), "#A734A7", "#E3A8E3");
const column1_row1 = createPad(document.getElementById("column1_row1"), document.getElementById("modernRapXDrum_1"), "#FFFF48", "#FFFFC6");
const column2_row1 = createPad(document.getElementById("column2_row1"), document.getElementById("modernRapXDrum_2"), "#FFFF48", "#FFFFC6");
const column3_row1 = createPad(document.getElementById("column3_row1"), document.getElementById("modernRapXDrum_3"), "#FFFF48", "#FFFFC6");
const column4_row1 = createPad(document.getElementById("column4_row1"), document.getElementById("modernRapXDrum_4"), "#FFFF48", "#FFFFC6");
const column5_row1 = createPad(document.getElementById("column5_row1"), document.getElementById("modernRapXDrum_5"), "#FFFF48", "#FFFFC6");
const column1_row2 = createPad(document.getElementById("column1_row2"), document.getElementById("modernRapBass_1"), "#DA3B6C", "#FF97D0");
const column1_row3 = createPad(document.getElementById("column1_row3"), document.getElementById("modernRapMelodic_1"), "#0F87FF", "#93C9FF");
const column2_row3 = createPad(document.getElementById("column2_row3"), document.getElementById("modernRapMelodic_2"), "#0F87FF", "#93C9FF");
const column3_row3 = createPad(document.getElementById("column3_row3"), document.getElementById("modernRapMelodic_3"), "#0F87FF", "#93C9FF");
const column1_row4 = createPad(document.getElementById("column1_row4"), document.getElementById("modernRapXMelodic_1"), "#05FF30", "#93FFC9");
/**********************/
let activeGenre = modernRapButton;
let samplesPlaying = 0; //Numbor of samples playing at the same time
let activeGrid; //Grid with the music genre active right now;
let itemOnPlay = []; //Items asociated to samples wich are playing 
let onPlay = []; //Samples already playing
let padOnPlay = []; //Cells that are playing
let isHidden = 1; //0 = Not hidden, 1 = Hidden

function createPad(item, sound, color1, color2){
    let cell = item;
    let audio = sound;
    let playingColor = color1;
    let pausedColor = color2;

    return {
        getCell: () => {
            return cell;
        },
        getAudio: () => {
            return audio;
        },
        getPlayingColor: () => {
            return playingColor;
        },
        getPausedColor: () => {
            return pausedColor;
        },
        setAudio: (newAudio) => {
            audio = newAudio;
        },
        setPlayingColor: () => {
            cell.style.backgroundColor= playingColor;
        },
        setPausedColor: () => {
            cell.style.backgroundColor= pausedColor;
        },
        playSample: () => {
            audio.play();
        },
        pauseSample: () => {
            audio.pause();
        },
        isPlaying: () => {
            return audio.playing;
        },
        isPaused: () => {
            return audio.paused;
        },
    }
}
function sShowMenu(){
    if (isHidden){
        document.getElementById("confMenu").className = "showedElement";
        isHidden = 0;
    } else {
        document.getElementById("confMenu").className = "hiddenElement";
        isHidden = 1;
    }
}
function changeGenre(item, newGenre) {
//0 = Modern Rap; 1 = Rap Rock
    for(var i=0;i<5;i++){
        if (padOnPlay[i] != null){ //A sample is playing on this row
            padOnPlay[i].pauseSample();
            padOnPlay[i].getAudio().currentTime = 0;
            padOnPlay[i].setPausedColor();
            padOnPlay[i] = null;
        }
    }
    activeGenre.style.backgroundColor = "#CCC"
    item.style.backgroundColor = "#FA2";
    activeGenre = item;
    switch(newGenre){
        case 0:
            column1_row0.setAudio(modernRapDrum_1);
            break; 
        case 1:
            column1_row0.setAudio(modernRapMelodic_3);
            break; 
    }
}
//-----PLAY/STOP SAMPLES-------
function playSamplePOO(item, row){
    if (item.isPaused()) {  
        item.playSample();
        if (padOnPlay[row] != null){ //Another sample is playing on the same row
            padOnPlay[row].pauseSample();
            padOnPlay[row].getAudio().currentTime = 0;
            padOnPlay[row].setPausedColor();
        }
        item.setPlayingColor(); 
        padOnPlay[row] = item;   
    }
    else{
        item.pauseSample();
        item.getAudio().currentTime = 0;
        item.setPausedColor();
        padOnPlay[row] = null;
    }
}
function changeColor(elem, colorSelector, action){
    //action = 0 playing, = 1 paused
    switch(colorSelector){
        case 0: 
            if (action === 0) elem.style.backgroundColor = "#A734A7";
            else elem.style.backgroundColor = "#E3A8E3";
            break;
        case 1: 
            if (action === 0) elem.style.backgroundColor = "#FFFF48";
            else elem.style.backgroundColor = "#FFFFC6";
            break;
        case 2: 
            if (action === 0) elem.style.backgroundColor = "#DA3B6C";
            else elem.style.backgroundColor = "#FF97D0";
            break;
        case 3: 
            if (action === 0) elem.style.backgroundColor = "#0F87FF";
            else elem.style.backgroundColor = "#93C9FF";
            break;
        case 4: 
            if (action === 0) elem.style.backgroundColor = "#05FF30";          
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
        case 50: //2
        case 98: //2 Keypad
            document.getElementById("column2_row0").click();
            break;
        case 51: //3
        case 99: //3 Keypad
            document.getElementById("column3_row0").click();
            break;
        case 52: //4
        case 100: //4 Keypad
            document.getElementById("column4_row0").click();
            break;
        case 53: //5
        case 101: //5 Keypad
            document.getElementById("column5_row0").click();
            break;
        case 81: //Q
            document.getElementById("column1_row1").click();
            break;
        case 87: //W
            document.getElementById("column2_row1").click();
            break;
        case 69: //E
            document.getElementById("column3_row1").click();
            break;
        case 82: //R
            document.getElementById("column4_row1").click();
            break;
        case 84: //T
            document.getElementById("column5_row1").click();
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
document.getElementById("sOpenConf").addEventListener("click", function(e){
    sShowMenu();
});
document.getElementById("modernRapButton").addEventListener("click", function(e){
    changeGenre(modernRapButton, 0);
});
document.getElementById("rapRockButton").addEventListener("click", function(e){
    changeGenre(rapRockButton, 1);
});
document.getElementById("column1_row0").addEventListener("click", function(e){
    playSamplePOO(column1_row0, 0);
});
document.getElementById("column2_row0").addEventListener("click", function(e){
    playSamplePOO(column2_row0, 0);
});
document.getElementById("column3_row0").addEventListener("click", function(e){
    playSamplePOO(column3_row0, 0);
});
document.getElementById("column4_row0").addEventListener("click", function(e){
    playSamplePOO(column4_row0, 0);
});
document.getElementById("column5_row0").addEventListener("click", function(e){
    playSamplePOO(column5_row0, 0);
});
document.getElementById("column1_row1").addEventListener("click", function(e){
    playSamplePOO(column1_row1, 1);
});
document.getElementById("column2_row1").addEventListener("click", function(e){
    playSamplePOO(column2_row1, 1);
});
document.getElementById("column3_row1").addEventListener("click", function(e){
    playSamplePOO(column3_row1, 1);
});
document.getElementById("column4_row1").addEventListener("click", function(e){
    playSamplePOO(column4_row1, 1);
});
document.getElementById("column5_row1").addEventListener("click", function(e){
    playSamplePOO(column5_row1, 1);
});
document.getElementById("column1_row2").addEventListener("click", function(e){
    playSamplePOO(column1_row2, 2);
});
document.getElementById("column1_row3").addEventListener("click", function(e){
    playSamplePOO(column1_row3, 3);
});
document.getElementById("column2_row3").addEventListener("click", function(e){
    playSamplePOO(column2_row3, 3);
});
document.getElementById("column3_row3").addEventListener("click", function(e){
    playSamplePOO(column3_row3, 3);
});
document.getElementById("column1_row4").addEventListener("click", function(e){
    playSamplePOO(column1_row4, 4);
});