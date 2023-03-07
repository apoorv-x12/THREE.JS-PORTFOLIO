import * as THREE from 'three';
import { Scene } from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';


// camera,scene,renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
camera.position.z =100;
const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#apoorv')
});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize( window.innerWidth, window.innerHeight );

// torus
const torusTexture = new THREE.TextureLoader().load( "./img/pexels-rotekirsche-5438789.jpg" );
const tgeometry = new THREE.TorusGeometry(14, 3, 10, 65);
const tmaterial = new THREE.MeshStandardMaterial( { map:torusTexture} );
const torus = new THREE.Mesh( tgeometry, tmaterial );
scene.add( torus );

// lights
const plight = new THREE.PointLight(0xff0000);
plight.position.set( 5, 5, 5 );
const light = new THREE.AmbientLight( 0x404040, 5);
scene.add( plight , light);

//helpers
const pointLightHelper = new THREE.PointLightHelper(plight);
const gridHelper = new THREE.GridHelper(200,50);
//scene.add(gridHelper , pointLightHelper);

//controls
const controls = new OrbitControls( camera, renderer.domElement );

//star generation
function stars(){
	const geometry = new THREE.SphereGeometry(1.8*Math.random(),15,15);
    const material = new THREE.MeshStandardMaterial( {
		 color: new THREE.Color(Math.random(), Math.random(), Math.random()) ,
	} );
	const star= new THREE.Mesh( geometry, material );

	const [x,y,z]=Array(3).fill().map(()=> THREE.MathUtils.randFloatSpread(280));
	star.position.set(x,y,z);
	scene.add(star);
}
Array(900).fill().forEach(stars);
//////////////////////////////////////////////

// spaceTexture
const spaceTexture = new THREE.TextureLoader().load( "./img/orion-nebula.jpg" );
scene.background=spaceTexture;

// myAvatar
const myTexture = new THREE.TextureLoader().load( "./img/my pic.jpeg" );
const myAvatar = new THREE.Mesh(
	new THREE.BoxGeometry( 7, 7, 7 ),
    new THREE.MeshStandardMaterial({map:myTexture}),
);
scene.add(myAvatar);

// myPlanets                            
const apPlanets = [];
const pos=[[40,-38],[50,38],[-40,-38],[-15,38]];
const planetNames=['mandalas-1084082','fractal-952750','pexels-merlin','pexels-turga'];
function planetMaker(){
		const planetTexture = new THREE.TextureLoader().load( "./img/planet 1.jpg" );
		const planetNormalTexture = new THREE.TextureLoader().load( "./img/moon.jpg" );
		const myPlanet = new THREE.Mesh(
	    new THREE.SphereGeometry(9,64,38),
        new THREE.MeshStandardMaterial({normalMap:planetNormalTexture,map:planetTexture}),
      );
        myPlanet.position.x=15;
        myPlanet.position.z=-38;

	return myPlanet;
	}

const k=15;
for (let i=0; i<4;i++) {
const myPlanet =planetMaker();
const planetTexture = new THREE.TextureLoader().load( `./img/${planetNames[i]}.jpg` );
myPlanet.material.map=planetTexture;
myPlanet.position.set(pos[i][0],0,pos[i][1])
//myPlanet.position.x+=k*i;
//myPlanet.position.z-=k*i;
apPlanets.push(myPlanet);
scene.add(apPlanets[i]);
}
/*
const planetTexture = new THREE.TextureLoader().load( "./img/planet 1.jpg" );
const planetNormalTexture = new THREE.TextureLoader().load( "./img/moon.jpg" );
const myPlanet1 = new THREE.Mesh(
	new THREE.SphereGeometry(9,64,38),
    new THREE.MeshStandardMaterial({map:planetTexture,normalMap:planetNormalTexture}),
);
myPlanet1.position.x=15;
myPlanet1.position.z=-38;
scene.add(myPlanet1);
*/

// addEventListeners

function camMove(){
	const t = document.body.getBoundingClientRect().top;
	apPlanets.forEach(x=>{
		    x.rotation.x+=0.01;
			x.rotation.y+=0.01;
			x.rotation.z+=0.01;
	})
    	 myAvatar.rotation.y += 0.01;
         myAvatar.rotation.z += 0.01;
	camera.position.z = t * -0.1;
    camera.position.x = t * -0.02;
    camera.rotation.y = t * -0.2;
   }
document.body.onscroll=camMove;

// animate
function animate() {
	requestAnimationFrame( animate );
	
	// update global 3d assets
    torus.rotation.x+=0.02;
	torus.rotation.y+=0.02;
	torus.rotation.z+=0.02;
	apPlanets.forEach(x=>{
		    x.rotation.x+=0.01;
			x.rotation.y+=0.01;
			x.rotation.z+=0.01;
	})
    myAvatar.rotation.y += 0.005;
    myAvatar.rotation.z += 0.005;
	controls.update();
	renderer.render( scene, camera );
}
animate();


//console.log(apPlanets)