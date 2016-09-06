window.addEventListener('load', init, false);

var Colors = {
red:0xf25346,
white:0xd8d0d1,
brown:0x59332e,
pink:0xF5986E,
brownDark:0x23190f,
blue:0x68c3c0,
green:0x007f00
};

var sectionIndex;
function init() {
    new Scene();
    new Lights();
    
    for (var i = 0; i < NRSECTIONS; i++) {
        OC.push(new ObjectContainer());
    }
    for (var i = 0; i < NRSECTIONS; i++) {
        initializeSection(i, 0);
    }
    sectionIndex = NRSECTIONS;
    
    GOC = new ObjectContainer();
    GOC.initialize('chasingBall');
    GOC.initialize('player');
    
    //this.chasingBall = new ChasingBall();
    new Player();
    setupTert();
}

function setupTert(){
    utils.createParticles();
    $('#flashText').hide();
}

var previousScenery = 'mountains';
function initializeSection(i, level, old) {
    if (old == "falling"){
        fillFalling(i);
    } else if (old == "sliding") {
        fillSliding(i);
    } else {
        var scenery = 'labirinth';
        if (previousScenery != scenery){
            if (scenery == 'temple'){
                camera.position.z = 60;
                camera.position.y = -85;
                camera.rotation.x = 70 * Math.PI / 180;
                previousScenery = scenery;
            }
        }
        
        OC[i%NRSECTIONS].initialize('underWorld');
        OC[i%NRSECTIONS].initialize('trail');
        OC[i%NRSECTIONS].initialize('lane');
        OC[i%NRSECTIONS].initialize('obstacleContainer');
        OC[i%NRSECTIONS].initialize('chargingObstacleContainer');
        OC[i%NRSECTIONS].initialize('simpleObstacleContainer');
        OC[i%NRSECTIONS].initialize('slidingObstacleContainer');
        // Player loading starts the gmame
        if (scenery == 'temple'){
            TRAILWIDTH = 230;
            new Temple(i);
            //fillFalling(i);
        }
        
        if (scenery == 'labirinth'){
            new Labirinth(i);
            fillSliding(i);
        }
        
        if (scenery == 'mountains'){
            new Section(i);
            //fillSimple(i);
        }
        
        //new Labirinth(i);
        
        //if (level == 0) fillFalling(i);
        //if (level == 1) fillCharging(i);
        //if (level == 2)
        //fillSliding(i);
        //fillFalling(i);
        //fillCharging(i);
        //fillSimple(i);
    }
    
    
}

function fillFalling(index) {
    for (var row = 0; row < ROWS; row++){
        var rnd = 2;
        for (var o = 0; o < rnd; o++){
            var rndForm = Math.random();
            var rndLane = Math.random() * 3 | 0;
            new FallingObstacle(row, rndLane, index);
        }
    }
}

function fillSimple(index) {
    for (var row = 0; row < ROWS; row++){
        var rnd = 2;
        for (var o = 0; o < rnd; o++){
            var rndForm = Math.random();
            var rndLane = Math.random() * 3 | 0;
            new SimpleObstacle(row, rndLane, index);
        }
    }
}

function fillCharging(index) {
    for (var r = 6; r < ROWS; r++){
        var rndLane = Math.random() * 3 | 0;
        new ChargingObstacle(r, rndLane, index)
    }
}

var anySlidingObstacles;
function fillSliding(index) {
    var rndLane = 1;
    var max = lanes[2];
    var min = lanes[0];
    for (var r = 0; r < 10; r ++){
        for (var j = 0; j < 2; j++) {
            new SlidingObstacle(r, index, j)
        }
    }
}

var _tick = 0;
var sectionChange = 0;
var filterStrength = 20;
var frameTime = 0, lastLoop = new Date, thisLoop;
var frames = 0;

var speedMeter = document.getElementById('flashWrite2');
function loop(){
    var thisFrameTime = (thisLoop=new Date) - lastLoop;
    frameTime+= (thisFrameTime - frameTime) / filterStrength;
    lastLoop = thisLoop;
    frames +=1;
    
    stats.update();
    
    if (false){
        speed = pedalSpeed*3;
        pedaling = false;
    }
    
    GOC['player'].position.y += speed * frameTime/30;
    if (GOC.state['chasingBall'] == true){
        GOC['chasingBall'].position.y += speed * frameTime/30;
        this.chasingBall.rotate();
    }
    
    camera.position.y += speed * frameTime/30;
    
    
    var rowNr = ((GOC['player'].position.y / ROWSIZE | 0) + 1)%ROWS;
    var sectionNr = (camera.position.y / SECTIONHEIGHT | 0) % NRSECTIONS;
    var currentContainer = OC[sectionNr%NRSECTIONS]
    var previousContainer = OC[sectionChange%NRSECTIONS]
    
    if (sectionNr != sectionChange){
        var arr = ['trail','lane', 'obstacleContainer',
                   'chargingObstacleContainer', 'underWorld', 'slidingObstacleContainer'];
        
        /*
        for (var i = 0; i < arr.length; i++){
            if (previousContainer.state[arr[i]] == true && arr[i] == "obstacleContainer")
                utils.disposeOf(previousContainer[arr[i]], arr[i]);
        }
         */
        
        
        // TEMPLE
        /*
         for (var j = 0; j < previousContainer['underWorld'].length; j++){
         previousContainer['underWorld'][j].position.y =(sectionIndex)*SECTIONHEIGHT;
         }
         
         previousContainer['trail'][0].position.y =(sectionIndex)*SECTIONHEIGHT + SECTIONHEIGHT/2;
         initializeSection(sectionIndex, sectionIndex /7 | 0, 'falling');
        
        */
        // LABIRINHT
        
         previousContainer['trail'][0].position.y =(sectionIndex)*SECTIONHEIGHT + SECTIONHEIGHT/2;
         previousContainer['trail'][1].position.y =(sectionIndex)*SECTIONHEIGHT ;
         initializeSection(sectionIndex, sectionIndex /7 | 0, 'sliding');
        
        /*
        for (var i = 0; i < arr.length; i++){
            if (previousContainer.state[arr[i]] == true && arr[i] == "obstacleContainer")
                utils.disposeOf(previousContainer[arr[i]], arr[i]);
        }
        initializeSection(sectionIndex, sectionIndex /7 | 0, 'falling');
         */
        
        sectionIndex++;
    }
    sectionChange = sectionNr;
    
    var anyObstacles = (
                        currentContainer.state['obstacleContainer'] == true ||
                        currentContainer.state['chargingObstacleContainer'] == true);
    
    if (anyObstacles){
        var minRow = rowNr - 1;
        if (minRow < 0)
            minRow = 0;
        var maxRow = rowNr + 1;
        if (maxRow > ROWS){
            maxRow = 0;
            for (var r = minRow; r < maxRow; r++)
                utils.checkRows(sectionNr+1, r);
        } else {
            for (var r = minRow; r < maxRow; r++)
                utils.checkRows(sectionNr, r);
        }
    }
    
    anySlidingObstacles = currentContainer.state['slidingObstacleContainer'] == true;
    if (anySlidingObstacles){
        var r = (rowNr*ROWSIZE) / (SECTIONHEIGHT/10 -5) | 0;
        if (sectionNr == 1){
            // console.log("SECTION" + sectionNr);
        }
        
        utils.slideObstacles(sectionNr, r, sectionIndex-2);
    }
    
    utils.updateKeyboard();
    renderer.render(scene, camera);
    
    // call the loop function again
    requestAnimationFrame(loop);
    //limitLoop(loop, 30);
}




