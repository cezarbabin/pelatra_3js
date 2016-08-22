/*
  camera.position.z = 60;
  camera.position.y = -85;
  camera.rotation.x = 70 * Math.PI / 180;

*/


Section = function(index) {
	var delimiterSize = 20;
    
  var pg = new THREE.PlaneGeometry(SECTIONHEIGHT, SECTIONHEIGHT, 30, 30);
  this.createDelimiter(pg, delimiterSize, index);
  pg.translate(0, SECTIONHEIGHT/2 + index*SECTIONHEIGHT, 0);
  var pm = new THREE.MeshPhongMaterial({
                                       color:'#009900',
                                       transparent:true,
                                       opacity:1,
                                       shading:THREE.FlatShading,
                                       });

  for (var i = 0; i < 8; i++){
    for (var j = 0; j < 2; j++){
      var max = 180;   
      var min = 100;
      var depth = Math.random() * (max - min) + min;
      var underWorld = MAKETERRAIN.WithParams((SECTIONHEIGHT-TRAILWIDTH)/3, SECTIONHEIGHT, depth);
      underWorld.rotation.x = 90*Math.PI/180;
      if (j == 0)
        underWorld.position.x = - 130;
      else
        underWorld.position.x = 150;
      underWorld.position.z -= 35;
      underWorld.position.y += (i+1) * SECTIONHEIGHT/8 + index*SECTIONHEIGHT;
      OC[index%NRSECTIONS]['underWorld'].push(underWorld);
      OC[index%NRSECTIONS].state['underWorld'] = true;
      scene.add(underWorld);
    }
  }
  
  var pg = new THREE.PlaneGeometry(TRAILWIDTH, SECTIONHEIGHT, 10, 10);
  pg.translate(0, SECTIONHEIGHT/2, 0);

var texture = THREE.ImageUtils.loadTexture( 'road.png' );
texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
texture.repeat.set( 1, 10 );

  var pm = new THREE.MeshPhongMaterial({ map: texture});
  var trail = new THREE.Mesh(pg, pm);
  trail.position.z = 1;
  trail.position.y = index * SECTIONHEIGHT;
  OC[index%NRSECTIONS]['trail'].push(trail);
  OC[index%NRSECTIONS].state['trail'] = true;
  scene.add(trail);
  
  var points =  [
    new THREE.Vector3(0, 0, 0),
    new THREE.Vector3(0, SECTIONHEIGHT*NRSECTIONS, 0)]

  var spline = new THREE.SplineCurve3(points);
 

  //var spline = new THREE.LineCurve(new THREE.Vector2( 0, 0 ), new THREE.Vector2( 0, 10 ));
  var extrudeSettings = {
    steps           : 1,
    bevelEnabled    : false,
    extrudePath     : spline
  };
  var shape = this.createShape();
  var geometry = new THREE.ExtrudeGeometry( shape, extrudeSettings );
  var material = new THREE.MeshLambertMaterial( { color: 0xC7CFC4, wireframe: false } );
  meshSpline = new THREE.Mesh( geometry, material );
  meshSpline.position.z = 11;
  meshSpline.position.x = TRAILWIDTH/2 -2;
  //meshSpline.rotation.x = 90 * Math.PI / 180;
  //meshSpline.rotation.z = 90 * Math.PI / 180;
  scene.add(meshSpline);

  var extrudeSettings = {
    steps           : 1,
    bevelEnabled    : false,
    extrudePath     : spline
  };
  var shape = this.createShape();
  var geometry = new THREE.ExtrudeGeometry( shape, extrudeSettings );
  var material = new THREE.MeshLambertMaterial( { 
    color: 0xC7CFC4, 
    wireframe: false } );
  meshSpline = new THREE.Mesh( geometry, material );
  
  meshSpline.position.x = -TRAILWIDTH/2 ;
  meshSpline.rotation.y = 180 * Math.PI / 180;
  meshSpline.position.z = 1;
  //meshSpline.rotation.z = 90 * Math.PI / 180;
  scene.add(meshSpline);


};

Section.prototype.createShape = function (){
    var squareShape = new THREE.Shape();
  squareShape.moveTo( 0,0 );
  //squareShape.lineTo( -9,sqLength);
  squareShape.lineTo( 2,2);
  
  squareShape.lineTo( 4,1);
  squareShape.lineTo( 6,2);
  squareShape.lineTo( 8,0);

  //squareShape.lineTo( -9,sqLength*9);
  squareShape.lineTo( 0, 0);

  
  return squareShape;
}


Section.prototype.createDelimiter = function(pg, boxSize, index){
	for (var i = 0; i < 2; i++){
        var cg = new THREE.BoxGeometry(boxSize, boxSize, boxSize);
        if (i%2 == 0)
            cg.translate(-TRAILWIDTH/2, 0 + index*SECTIONHEIGHT, 0)
            else
                cg.translate(TRAILWIDTH/2, 0 + index*SECTIONHEIGHT, 0)
                pg.merge(cg);
    }
}