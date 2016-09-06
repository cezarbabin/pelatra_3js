// camera setup
/*
camera.position.z = 30;
camera.position.y = -85;
camera.rotation.x = 90 * Math.PI / 180;

TRAILWIDTH = 230;

*/


Temple = function(index) {
	var columnMaterial = new THREE.MeshPhongMaterial({
	  color:0xFFFFFF,
	  transparent:true,
	  wireframe:true,
	  shading:THREE.FlatShading,
  });
	var generalGeo = new THREE.Geometry();
	

	OC[index%NRSECTIONS].state['underWorld'] = true;

	for (var i = 0; i < 50; i++){
		for (var j = 0; j < 2; j++){
			var column = new THREE.BoxGeometry( 10, 10, 130);
			for (var k = 0; k < 5; k ++){
				if (k == 4){
					var step = new THREE.BoxGeometry( 120, 10, 40);
					if (j == 0)
						step.translate(52, 0,0);
					else 
						step.translate(-52, 0,0);
				}
				else 
					var step = new THREE.BoxGeometry( 15, 10, 10);
				if (j == 0)
					step.translate(-k*6-2, 0, 65+10*k );
				else 
					step.translate(k*6+2, 0, 65+10*k );
				var s = new THREE.Mesh(step, columnMaterial);
				s.updateMatrix();
				column.merge(s.geometry, s.matrix);
			}
			if (j == 0)
				column.translate(70/2, (SECTIONHEIGHT/50) * i, 50);
			else 
				column.translate(-70/2, (SECTIONHEIGHT/50) * i, 50);
			var c = new THREE.Mesh(column, columnMaterial);
			c.updateMatrix();
			
			//c.position.x = ;
			generalGeo.merge(c.geometry, c.matrix);

		}
		
		//scene.add(c);
	}
	var columns = new THREE.Mesh(generalGeo, columnMaterial);
	columns.position.y = SECTIONHEIGHT * index;
	OC[index%NRSECTIONS]['underWorld'].push(columns);
	scene.add(columns);


	///// WALL COLOR
	var pg = new THREE.BoxGeometry( 1, SECTIONHEIGHT,200);
  pg.translate(0, 0, 100);
  var pm = new THREE.MeshPhongMaterial({
		color:0x004829,
		opacity:0.8,
		wireframe:true,
		shading:THREE.FlatShading,
	});

  for (var i = 0; i < 2; i++){
  	var trail = new THREE.Mesh(pg, pm);
	  trail.position.z = 0;
	  if (i == 0)
	  	trail.position.x = -TRAILWIDTH/3;
	  else 
	  	trail.position.x = TRAILWIDTH/3;
	  trail.position.y = index * SECTIONHEIGHT + SECTIONHEIGHT/2;
	  OC[index%NRSECTIONS]['underWorld'].push(trail);
	  OC[index%NRSECTIONS].state['underWorld'] = true;
	  scene.add(trail);
  }

	//// TRAIL COLOR
	var pg = new THREE.PlaneGeometry(TRAILWIDTH, SECTIONHEIGHT, 100, 100);
  var pm = new THREE.MeshPhongMaterial({
                                       color:0x041506,
                                       opacity:0.3,
                                       wireframe:true,
                                       shading:THREE.FlatShading,
                                       });

	var trail = new THREE.Mesh(pg, pm);
  trail.position.z =0;
  trail.position.y = index * SECTIONHEIGHT + SECTIONHEIGHT/2;
  OC[index%NRSECTIONS]['trail'].push(trail);
  OC[index%NRSECTIONS].state['trail'] = true;
  scene.add(trail);

 
}