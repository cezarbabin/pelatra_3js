Labirinth = function(index){

  
  var pg = new THREE.BoxGeometry(10, SECTIONHEIGHT-10, 40);
  pg.translate(lanes[2] + 20, 0, 20);
  var pm = new THREE.MeshPhongMaterial({
                                       color:Colors.red,
                                       opacity:1,
                                       wireframe:true,
                                       shading:THREE.FlatShading,
                                       });

  /// SECOND LEVEL
  var g2 = new THREE.BoxGeometry(10, SECTIONHEIGHT - 10, 40);
	g2.translate(lanes[0] - 20, 0, 20);
	g2 = new THREE.Mesh(g2, pm);
	g2.updateMatrix();
	pg.merge(g2.geometry, g2.matrix);

	for (var i = 0; i < 2; i++){
		var g2 = new THREE.BoxGeometry(10, SECTIONHEIGHT - 10, 10);
		if (i==0)
			g2.translate(lanes[0] - 30, 0, 45);
		else 
			g2.translate(lanes[2] + 30, 0, 45);
		g2 = new THREE.Mesh(g2, pm);
		g2.updateMatrix();
		pg.merge(g2.geometry, g2.matrix);
	}

	for (var i = 0; i < 2; i++){
		var g2 = new THREE.BoxGeometry(10, SECTIONHEIGHT - 10, 10);
		if (i==0)
			g2.translate(lanes[0] - 40, 0, 55);
		else 
			g2.translate(lanes[2] + 40, 0, 55);
		g2 = new THREE.Mesh(g2, pm);
		g2.updateMatrix();
		pg.merge(g2.geometry, g2.matrix);
	}

	for (var i = 0; i < 40; i++){
    for (var j = 0; j < 2; j++){
      var g2 = new THREE.ConeGeometry(20, 40, 10 );
      g2.rotateX(90*Math.PI/180)
      if (i%2 == 0)
        g2.translate(lanes[0] - 50, i*(SECTIONHEIGHT/40)-SECTIONHEIGHT/2, 80);
      else 
        g2.translate(lanes[2] + 50, i*(SECTIONHEIGHT/40)-SECTIONHEIGHT/2, 80);
      g2 = new THREE.Mesh(g2, pm);
      g2.updateMatrix();
      pg.merge(g2.geometry, g2.matrix, 1);
    }
	}

	var trail = new THREE.Mesh(pg, pm);
  trail.position.y = index * SECTIONHEIGHT + SECTIONHEIGHT/2;

  OC[index%NRSECTIONS]['trail'].push(trail);
  OC[index%NRSECTIONS].state['trail'] = true;

	scene.add(trail);

  var pg = new THREE.PlaneGeometry(TRAILWIDTH, SECTIONHEIGHT, 1, 1);
  pg.translate(0, SECTIONHEIGHT/2, 0);
  var pm = new THREE.MeshPhongMaterial({
    color:0xFFFDD0,
    opacity:1,
    shading:THREE.FlatShading
  });

	var trail = new THREE.Mesh(pg, pm);
  trail.position.z =0;
  trail.position.y = index * SECTIONHEIGHT;
  OC[index%NRSECTIONS]['trail'].push(trail);
  OC[index%NRSECTIONS].state['trail'] = true;
  scene.add(trail);

}