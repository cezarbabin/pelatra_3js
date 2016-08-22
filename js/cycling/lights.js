Lights = function(){
	hemisphereLight = new THREE.HemisphereLight(0xffffff,0xffffff, .9)
  //hemisphereLight = new THREE.HemisphereLight(0x5ECDAE,0x0000ff, .2)
  shadowLight = new THREE.DirectionalLight(0x2f6657, .6);
  shadowLight.position.set(150, 350, 350);
  shadowLight.castShadow = true;
  shadowLight.shadow.camera.left = -400;
  shadowLight.shadow.camera.right = 400;
  shadowLight.shadow.camera.top = 400;
  shadowLight.shadow.camera.bottom = -400;
  shadowLight.shadow.camera.near = 1;
  shadowLight.shadow.camera.far = 1000;
  shadowLight.shadow.mapSize.width = 2048;
  shadowLight.shadow.mapSize.height = 2048;

  // BLUE LIGHT
  scene.add(hemisphereLight);
  scene.add(shadowLight);

  //var light = new THREE.AmbientLight( 0x008000, .1 );
  //scene.add( light );

  
 // var light = new THREE.AmbientLight( 0xffa500, .2 );
 // scene.add(light);

 

  var light = new THREE.AmbientLight(0xFFC0CB, .6);
  //scene.add(light);

  var hemiLight = new THREE.DirectionalLight( 0x1c3d34, 0.9 ); 
  hemiLight.position.set( 0, 1, 0 );
  scene.add( hemiLight );

  var hemiLight = new THREE.DirectionalLight( 0x1c3d34, 0.9 ); 
  hemiLight.position.set( 0, -1, 0 );
  scene.add( hemiLight );

  var hemiLight = new THREE.DirectionalLight( 0x1c3d34, 0.1 ); 
  hemiLight.position.set( 1, 0, 0 );
  scene.add( hemiLight );

  var hemiLight = new THREE.DirectionalLight( 0x1c3d34, 0.1 ); 
  hemiLight.position.set( -1, 0, 0 );
  scene.add( hemiLight );

  // SECTION LIGHTING
  /*
  var hemiLight = new THREE.DirectionalLight( 0xFCF75E, 0.6 ); 
  hemiLight.position.set( 1, 0, 0 );
  scene.add( hemiLight );

  var hemiLight = new THREE.DirectionalLight( 0xFCF75E, 0.6 ); 
  hemiLight.position.set( -1, 0, 0 );
  scene.add( hemiLight );

*/


           
  //shadowLight.position.set(0, 1, 0);

}