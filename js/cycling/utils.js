Utils = function(){
	this.slidingInitialized = false;
  this.slidingObstaclesDirect = [];
}


Utils.prototype.disposeOf = function(arr, name){
	if (name == "chargingObstacleContainer"){
    for (var j = 0; j < arr.length; j++) {
      this.disposeOfObject(arr[j]);
    }
  } else if (name =='obstacleContainer'){
      for (var j = 0; j < arr.length; j++) {
        for (var d = 0; d < 2; d++){
          this.disposeOfObject(arr[j][d]);
        }
      }
  } else {
      if (arr[0] != undefined)
        this.disposeOfObject(arr[0])
  }
}

Utils.prototype.disposeOfObject = function(obj){
	scene.remove(obj);
  obj.geometry.dispose();
  obj.material.dispose();
  
  renderer.dispose(obj);
  renderer.dispose(obj.geometry);
  renderer.dispose(obj.material);
  
  obj = undefined;
}

Utils.prototype.updateKeyboard = function(){
	keyboard.update();
  var mesh = GOC.player;
  var moveDistance = 70 * clock.getDelta();
  
  if ( keyboard.pressed("A") ) {
      //console.log("cecece");
      var possible = mesh.position.x > lanes[0];
      if (possible){
          mesh.translateX( -LANEWIDTH - LANESPACING );
      }
  }
  if ( keyboard.pressed("D")  ) {
      var possible = mesh.position.x < lanes[2];
      if (possible){
          mesh.translateX(  + LANEWIDTH + LANESPACING );
      } 
  }
  if ( keyboard.down("1") ){
      speed = SPEEDINITIAL + 1;
      $('#pb').attr('aria-valuenow', speed * 5 );
  };
  if ( keyboard.down("2") ){
      speed = SPEEDINITIAL + 2;
      $('#pb').attr('aria-valuenow', speed * 5 );
  };
  if ( keyboard.down("3") ){
      speed = SPEEDINITIAL + 3;
      $('#pb').attr('aria-valuenow', speed * 5 );
  };
  if ( keyboard.down("4") ){
      speed = SPEEDINITIAL + 4;
      $('#pb').attr('aria-valuenow', speed * 5 );
  };
  if ( keyboard.down("9") ){
      speed = SPEEDINITIAL + 9;
      $('#pb').attr('aria-valuenow', speed * 5 );
  };
  if ( keyboard.up("S") ) {
      //speed = SPEEDINITIAL;
      //$('#pb').attr('aria-valuenow', speed * 10 );
  }
  if ( keyboard.pressed("Q") ) {
    //console.log('hi');
    mesh.translateX( -moveDistance );
  } 
  
  if ( keyboard.pressed("E") )
    mesh.translateX(  moveDistance );
}

Utils.prototype.createParticles = function(){
    for (var i=0; i<1; i++){
        var particle = new Particle();
        particlesPool.push(particle);
    }
    particlesHolder = new ParticlesHolder();
    scene.add(particlesHolder.mesh);
}

Utils.prototype.checkRows = function(sectionNr, rowNr){
  var ballPresent = GOC.state['chasingBall'];
	var chasingBall = GOC['chasingBall'];
  var player = GOC['player'];
  for (var o = 0; o < OC[sectionNr]['obstacleContainer'][rowNr].length; o++){
    var object = OC[sectionNr]['obstacleContainer'][rowNr][o];
    //if (ballPresent) {
      var condition = object.position.y - player.position.y;
      var condition2 = object.position.x == player.position.x;
      //console.log(condition, rowNr);
      //this.checkParticles(object, condition, condition2);
      if(condition < 250 && object.position.z > 5 ){
          object.position.z -= speed * 3;
      } 
    //}       
  }
  for (var o = 0; o < OC[sectionNr]['chargingObstacleContainer'].length; o++){
    var object = OC[sectionNr]['chargingObstacleContainer'][o];
    //if (ballPresent){
      var condition = object.position.y - player.position.y;
      var condition2 = object.position.x == player.position.x;
      //console.log(condition, rowNr);
      //this.checkParticles(object, condition, condition2);
      if(condition < 650){
          OC[sectionNr]['chargingObstacleContainer'][o].position.y -= speed/2;
      }
    //} 
  }
}

Utils.prototype.checkParticles = function(object, condition, condition2){
    if (condition<25 && condition2){
        scene.remove(object);
        particlesHolder.spawnParticles(object.position.clone(), 1, Colors.pink, 4);
    }    
}

Utils.prototype.initSlidingDirection = function(l){
  //this.slidingObstaclesDirect = [];
  this.slidingInitialized = true;
  for (var i = 0; i< l; i++){
    var r = Math.random();
    if (r < 0.5){
      this.slidingObstaclesDirect.push(1)
    } else {
      this.slidingObstaclesDirect.push(1)
    }
  }
    
}

Utils.prototype.slideObstacles = function(sectionNr, rowNr, index){
  var container = OC[sectionNr]['slidingObstacleContainer'];
  
  //if (this.slidingInitialized == false){
  //  this.initSlidingDirection(container.length);
  //}

  console.log(2*rowNr + (index/2 | 0) *20);

  var obstacleRight = container[2*rowNr + (index/2 | 0) *20];
  var obstacleLeft = container[2*rowNr +(index/2 | 0) *20 + 1 ];

  //console.log(obstacleLeft.position.x, obstacleRight.position.x);

  obstacleRight.position.x -= 0.5
  obstacleLeft.position.x += 0.5

  //if (obstacle.position.x == (lanes[2] + 20) || obstacle.position.x == (lanes[0] - 20))
    //this.slidingObstaclesDirect[rowNr] *= -1;

    /*
  if (GOC['player'].position.y > obstacleRight.position.y -200 ||
   GOC['player'].position.y < obstacleRight.position.y + 100 ){
    console.log("moving");
    obstacleRight.position.x -= 2
    obstacleLeft.position.x += 2
  }
  */
  //obstacleRight.position.x += 2/15//this.slidingObstaclesDirect[rowNr/2 | 0];
  
}




