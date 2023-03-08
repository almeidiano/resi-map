// ThreeJS library import
import { AmbientLight, LoadingManager, Color, PerspectiveCamera, Scene, WebGLRenderer } from 'three';

// ThreeJS addons 
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { CSS2DRenderer, CSS2DObject } from 'three/examples/jsm/renderers/CSS2DRenderer.js';

// Other libraries imports

// JS
import gsap from 'gsap';
import tippy from 'tippy.js';
import introJs from 'intro.js';

// CSS
import 'materialize-css/dist/css/materialize.min.css';
import 'materialize-css/dist/js/materialize.js';
import 'tippy.js/dist/tippy.css';
import 'intro.js/minified/introjs.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

// Vanilla project imports
import {UI_Audio, Ions, Button, Version, SidebarInfo, PreLoader} from './classes'; 
import allBuildings from './buildings';
import '../css/style.css';

// ThreeJS object instantiation
const manager = new LoadingManager();
const loader = new GLTFLoader(manager);
const scene = new Scene();
const light = new AmbientLight();
const camera = new PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
const renderer = new WebGLRenderer({antialias: true, alpha: true});

renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

// Setting initial cam pos & light 
camera.position.set(0, 0, 1.2700000000000002);
light.intensity = 1.50;
scene.add(light);

// Enabling orbit controls to future changes 
const controls = new OrbitControls( camera, renderer.domElement );
controls.update();
Button.render('Começar');
Version.display();

// Loading 3D file and setting it's position
loader.load( './resi_complete.gltf', function ( gltf: any ) {
    scene.background = new Color( 0x71BCE1 );
    scene.add( gltf.scene );

    gltf.scene.position.x = -2.99999999999998;
    gltf.scene.position.y = 1.7600000000000016;
    gltf.scene.position.z = -1.740000000000001;

    gltf.scene.quaternion._w = 0.43279318769409064;
    gltf.scene.quaternion._x = 0.4780076701383027;
    gltf.scene.quaternion._y = -0.5130005247426389;
    gltf.scene.quaternion._z = -0.5665943748293979;

    //this keydown event is used to manipulate the cam at development 

    // document.addEventListener('keydown', (event) => {
    //     var code = event.code;
    
    //     switch (code) {
    //         // pos
    //         case 'ArrowUp':
    //             camera.position.y += 0.01;
    //         break;
    //         case 'ArrowDown':
    //             camera.position.y -= 0.01;
    //         break;
    //         case 'ArrowLeft':
    //             camera.position.x -= 0.01;
    //         break;
    //         case 'ArrowRight':
    //             camera.position.x += 0.01;
    //         break;
    //         case 'KeyS':
    //             camera.position.z -= 0.01;
    //         break;
    //         case 'KeyW':
    //             camera.position.z += 0.01;
    //         break;

    //         //rotation
    //         case 'KeyI':
    //             camera.rotation.y += 0.01;
    //         break;
    //         case 'KeyK':
    //             camera.rotation.y -= 0.01;
    //         break;
    //         case 'KeyJ':
    //             camera.rotation.x -= 0.01;
    //         break;
    //         case 'KeyL':
    //             camera.rotation.x += 0.01;
    //         break;
    //         case 'KeyQ':
    //             camera.rotation.z -= 0.01;
    //         break;
    //         case 'KeyE':
    //             camera.rotation.z += 0.01;
    //         break;
    //     }
    
    //     console.log(camera);
    // }, false);

}, undefined, function ( error: any ) {
	console.error( error );
} );

// Creating 2D renderer
const labelRenderer = new CSS2DRenderer();
labelRenderer.setSize(window.innerWidth, window.innerHeight);
labelRenderer.domElement.style.position = "absolute";
labelRenderer.domElement.style.top = "0px";
labelRenderer.domElement.style.opacity = '0';
document.body.appendChild(labelRenderer.domElement);

var buildingList = [];

// For each building, it creates a label div
for(let i = 0; i < allBuildings.length; i++) {
    const building = document.createElement("i");
    building.className = 'fa-regular fa-circle-dot';
    
    if (allBuildings[i].isBuilding) {
        building.setAttribute('block', allBuildings[i].name);
    } else {
        building.setAttribute('buildingName', allBuildings[i].name);
    }

    // Passing all labels as a 2D renderer object, setting it position and adding to the scene
    building.style.marginTop = "-1em";
    let buildingObj = new CSS2DObject(building);
    buildingObj.position.set(allBuildings[i].x,allBuildings[i].y,0);
    scene.add(buildingObj);
    buildingList.push(buildingObj);

    if(allBuildings[i].isBuilding) {
        tippy(building, {
            content: `Bloco ${allBuildings[i].name}`,
            arrow: true,
            placement: 'right'
        });
    }else{
        tippy(building, {
            content: allBuildings[i].name,
            arrow: true,
            placement: 'right'
        });  
    }

    building.onmouseover = () => {
        UI_Audio.hover('./hover.mp3');
    }
    
    // On label click, go to building position and showing it respective info
    building.onclick = () => {
        Ions.setState = false;
        UI_Audio.click('./click.mp3');
        let blockTarget = building.getAttribute('block');
        let buildingTarget = building.getAttribute('buildingName');

        if (buildingTarget) {
            gsap.to(labelRenderer.domElement, {opacity: 0});
            let buildingInfo = allBuildings.filter(obj => Object.values(obj).includes(buildingTarget));
            const sidebarInfo = new SidebarInfo(buildingInfo[0].name, buildingInfo[0].desc, buildingInfo[0].isBuilding);

            if(buildingInfo) {
                gsap.to(camera.position, {x: buildingInfo[0].camPositionX, y: buildingInfo[0].camPositionY, z: buildingInfo[0].camPositionZ, duration: buildingInfo[0].camDurationPosition, ease: "Power4.easeInOut"})
                gsap.to(camera.rotation, {x: buildingInfo[0].camRotationX, y: buildingInfo[0].camRotationY, z: buildingInfo[0].camRotationZ, duration: buildingInfo[0].camDurationRotation, ease: "Power4.easeInOut", onComplete(){sidebarInfo.render(), Ions.setState = true}})
            }

        }else if(blockTarget) {
            gsap.to(labelRenderer.domElement, {opacity: 0});
            let buildingInfo = allBuildings.filter(obj => Object.values(obj).includes(blockTarget))
            const sidebarInfo = new SidebarInfo(buildingInfo[0].name, buildingInfo[0].desc, buildingInfo[0].isBuilding);

            if(buildingInfo) {
                gsap.to(camera.position, {x: buildingInfo[0].camPositionX, y: buildingInfo[0].camPositionY, z: buildingInfo[0].camPositionZ, duration: buildingInfo[0].camDurationPosition, ease: "Power4.easeInOut"})
                gsap.to(camera.rotation, {x: buildingInfo[0].camRotationX, y: buildingInfo[0].camRotationY, z: buildingInfo[0].camRotationZ, duration: buildingInfo[0].camDurationRotation, ease: "Power4.easeInOut", onComplete(){sidebarInfo.render(), Ions.setState = true}})
            }
        }
    }
}

// Loading bar
manager.onStart = function () {
    let progressArea = document.querySelector('.progress-area');
    progressArea!.innerHTML = PreLoader.setLoader(); 
};

// ignoring the unused url parameter

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
manager.onProgress = function (url: any, itemsLoaded: number, itemsTotal: number ) {
    let progressArea = document.querySelector('.progress-area');
    progressArea!.innerHTML = PreLoader.setLoader(); 

    if(itemsTotal > 5) {
        const loadedItems = itemsLoaded/itemsTotal * 100;
        PreLoader.newWidth = loadedItems; 
        progressArea!.innerHTML = PreLoader.setLoader();
    }
};

manager.onLoad = function ( ) {
    setTimeout(() => {
        document.querySelector<HTMLElement>('.progress-area')!.style.display = 'none';
        document.querySelector<HTMLElement>('.sidebar')!.style.display = 'block';
        gsap.to('canvas', {opacity: 1, duration: 2, ease: "power3.out"});
        gsap.to('.title-discover', {opacity: 1, y: 0, duration: 1, ease: "power3.out", onComplete(){gsap.to('.main-title h1', {opacity: 1, y: 0, duration: 1, ease: "power3.out", onComplete(){gsap.to('.begin-area a', {opacity: 1, duration: 1})}})}});
    }, 1000);

    document.querySelector('.begin-area a')!.addEventListener('click', function() {
        setTimeout(() => {
            let beginArea = document.querySelector<HTMLElement>('.begin-area');
            beginArea!.style.opacity = "0";
            beginArea!.style.zIndex = "0";
            gsap.to(camera.position, {x: 0, y: 0, z: 1, duration: 1.5, ease: "Power4.easeOut"})
            gsap.to('canvas', {filter: "blur(0px)", onComplete(){gsap.to(labelRenderer.domElement, {opacity: 1, duration: 1, onComplete(){introJs('.globe').start()}})}});
        }, 250);

        document.querySelector('.ion')!.addEventListener('click', () => {
            gsap.to('.blockInfoSidebar', {width: '0px'})
            gsap.to(camera.position, {x: 0, y: 0, z: 1, duration: 1.5, ease: "Power4.easeOut"})
            gsap.to(camera.rotation, {x: 0, y: 0, z: 0, duration: 1.5, ease: "Power4.easeOut", onComplete(){gsap.to(labelRenderer.domElement, {opacity: 1})}})
        })
    })  
};

function animate() {
    window.requestAnimationFrame(animate);
    renderer.render( scene, camera );
    labelRenderer.render(scene, camera);
}

function resize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    labelRenderer.setSize(window.innerWidth, window.innerHeight);
}

animate();
window.addEventListener('resize', resize, false);