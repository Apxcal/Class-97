statuss="";
objects=[];
sound="";

function preload(){
    sound=loadSound("smoke-143172.mp3");
}

function setup(){
    canvas=createCanvas(500, 350);
    canvas.center;
    video=createCapture(VIDEO);
    video.size(500, 350); 
    video.hide;
    objectDetector=ml5.objectDetector("cocossd", modelLoaded);
    document.getElementById("status").innerHTML="Status: Detecting Objects";
}

function draw(){
    image(video, 0, 0, 500, 350);
    if(statuss != ""){
        objectDetector.detect(video, gotResult);
        for(i=0; i<objects.length; i++){
            document.getElementById("status").innerHTML="Status: Objects Detected";
            fill(255, 0, 0);
            percent=floor(objects[i].confidence*100);
            text(objects[i].label+" "+percent+"%", objects[i].x+15, objects[i].y+15);
            noFill();
            stroke(255, 0, 0);
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
            if(objects[i].label=="person"){
                document.getElementById("status").innerHTML="Status: Person Detected";
                sound.play();
            }
            else{
                document.getElementById("status").innerHTML="Status: Person not detected";
                 sound.stop();
            }
        }
    }
}

function gotResult(error, results){
    if(error){
        console.log(error);
    }
    else{
        console.log(results);
        objects=results;
    }
}

function modelLoaded(){
    console.log("Model is Loaded");
    statuss="true";
}