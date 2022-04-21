function setup()
{
    canvas = createCanvas(400,400);
    canvas.center();
    background("white");
    canvas.mouseReleased(ClassifyCanvas);
    synth = window.speechSynthesis;
}

function ClearCanvas()
{
    background("white");
}

function preload()
{
    classifier = ml5.imageClassifier('DoodleNet');
}

function draw()
{
    strokeWeight(13);
    stroke(0);
    if (mouseIsPressed)
    {
        line(pmouseX , pmouseY , mouseX , mouseY);
    }
}

function ClassifyCanvas()
{
    classifier.classify(canvas , gotResults);
}

function gotResults(error,results)
{
    if(error)
    {
        console.error(error);
    }
    console.log(results);
    document.getElementById('label').innerHTML = 'Label: ' +results[0].label;
    document.getElementById('confidence').innerHTML = 'Confidence: ' +Math.round(results[0].confidence * 100) + "%";
    utterThis = new SpeechSynthesisUtterance(results[0].label);
    synth.speak(utterThis);
}