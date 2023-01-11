import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { AmbientLight, LoadingManager, Color, PerspectiveCamera, Raycaster, Scene, Vector2, WebGLRenderer } from 'three';
import { CSS2DRenderer, CSS2DObject } from 'three/addons/renderers/CSS2DRenderer.js';
import gsap from 'gsap';
import tippy from 'tippy.js';
import 'tippy.js/dist/tippy.css';
import 'tippy.js/animations/scale.css';
import 'tippy.js/themes/light.css';
import allBuildings from './buildings.js';

const pointer = new Vector2();
const raycaster = new Raycaster();

const manager = new LoadingManager();
const loader = new GLTFLoader(manager);
const scene = new Scene();
const light = new AmbientLight();
const camera = new PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new WebGLRenderer({antialias: true, alpha: true});
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

camera.position.set(0, 0, 1.2700000000000002);

light.intensity = 1.50;
scene.add(light);

const controls = new OrbitControls( camera, renderer.domElement );
controls.update();

loader.load( 'resi_complete.gltf', function ( gltf ) {
    scene.background = new Color( 0x71BCE1 );
    scene.add( gltf.scene );

    gltf.scene.position.x = -2.99999999999998;
    gltf.scene.position.y = 1.7600000000000016;
    gltf.scene.position.z = -1.740000000000001;

    gltf.scene.quaternion._w = 0.43279318769409064;
    gltf.scene.quaternion._x = 0.4780076701383027;
    gltf.scene.quaternion._y = -0.5130005247426389;
    gltf.scene.quaternion._z = -0.5665943748293979;

}, undefined, function ( error ) {

	console.error( error );

} );

    var buildingLabel;
    var buildingList = [];
    var buildingObj = {};

    for(let i = 0; i < allBuildings.length; i++) {
        const building = document.createElement("div");
        building.className = "label";
        
        if (allBuildings[i].isBuilding) {
            building.setAttribute('block', allBuildings[i].name);
        } else {
            building.setAttribute('name', allBuildings[i].name);
        }
    
        building.style.marginTop = "-1em";
        buildingObj = new CSS2DObject(building);
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
    }

    const labelRenderer = new CSS2DRenderer();
    labelRenderer.setSize(window.innerWidth, window.innerHeight);
    labelRenderer.domElement.style.position = "absolute";
    labelRenderer.domElement.style.top = "0px";
    labelRenderer.domElement.style.opacity = 0;
    document.body.appendChild(labelRenderer.domElement);

    function ionCommand(state) {
        if(state === 'activate') {
            document.querySelector('.ion').style.opacity = "100%";
            document.querySelector('.ion').style.pointerEvents = 'all';
        }else if(state === 'deactivate') {
            document.querySelector('.ion').style.opacity = "50%";
            document.querySelector('.ion').style.pointerEvents = 'none';
        }
    }

    manager.onLoad = function ( ) {
        setTimeout(() => {
            document.querySelector('.progress-area').style.display = 'none';
            document.querySelector('.sidebar').style.display = 'block';
            gsap.to('canvas', {opacity: 1, duration: 2, ease: "power3.out"});
            gsap.to('.title-discover', {opacity: 1, y: 0, duration: 1, ease: "power3.out", onComplete(){gsap.to('.main-title h1', {opacity: 1, y: 0, duration: 1, ease: "power3.out", onComplete(){gsap.to('.begin-area button', {opacity: 1, duration: 1})}})}});
        }, 1000);
    
        document.querySelector('.begin-area button').addEventListener('click', function() {
            document.querySelector('.begin-area').style.opacity = 0;
            document.querySelector('.begin-area').style.zIndex = 0;
            ionCommand('activate');
            gsap.to(camera.position, {x: 0, y: 0, z: 1, duration: 1.5, ease: "Power4.easeOut"})
            gsap.to('canvas', {filter: "blur(0px)", onComplete(){gsap.to(labelRenderer.domElement, {opacity: 1, duration: 1})}});

            document.querySelector('.ion').addEventListener('click', () => {
                closeSidebar();
                gsap.to(camera.position, {x: 0, y: 0, z: 1, duration: 1.5, ease: "Power4.easeOut"})
                gsap.to(camera.rotation, {x: 0, y: 0, z: 0, duration: 1.5, ease: "Power4.easeOut", onComplete(){gsap.to(labelRenderer.domElement, {opacity: 1})}})
            })
        })  
    };
    
    manager.onProgress = function ( url, itemsLoaded, itemsTotal ) {
        let progressValue = document.querySelector('.progress-value');  
        const loadedItems = itemsLoaded/itemsTotal * 100;

        progressValue.style.width = `${loadedItems}%`;
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

        const ui = document.querySelector('.blocksUi');
        ui.style.aspectRatio = window.innerWidth / window.innerHeight;
      }

    function showSidebarInfo(buildingName, buildingCategory, buildingDesc, isBuilding) {
        
        if(isBuilding) {
            document.querySelector('.blockName').innerText = `Bloco ${buildingName}`;
        }else{
            document.querySelector('.blockName').innerText = buildingName;
        }

        document.querySelector('.buildingCategory span').innerText = buildingCategory;
        document.querySelector('.blockInfo p').innerHTML = buildingDesc;
        gsap.to('.blockInfoSidebar', {width: '350px'})
    }

    function closeSidebar() {
        gsap.to('.blockInfoSidebar', {width: '0px'})
    }

    function onMouseClick(block) {
        let blockTarget = block.target.getAttribute('block');
        let buildingTarget = block.target.getAttribute('name');

        if (buildingTarget) {
            gsap.to(labelRenderer.domElement, {opacity: 0});
            ionCommand('deactivate');
            let buildingInfo = allBuildings.filter(obj => Object.values(obj).includes(buildingTarget))

            if(buildingInfo) {
                gsap.to(camera.position, {x: buildingInfo[0].camPositionX, y: buildingInfo[0].camPositionY, z: buildingInfo[0].camPositionZ, duration: buildingInfo[0].camDurationPosition, ease: "Power4.easeInOut"})
                gsap.to(camera.rotation, {x: buildingInfo[0].camRotationX, y: buildingInfo[0].camRotationY, z: buildingInfo[0].camRotationZ, duration: buildingInfo[0].camDurationRotation, ease: "Power4.easeInOut", onComplete(){showSidebarInfo(buildingInfo[0].name, buildingInfo[0].category, buildingInfo[0].desc, buildingInfo[0].isBuilding), ionCommand('activate')}})
            }

        }else if(blockTarget) {
            gsap.to(labelRenderer.domElement, {opacity: 0});
            ionCommand('deactivate');
            let buildingInfo = allBuildings.filter(obj => Object.values(obj).includes(blockTarget))

            if(buildingInfo) {
                gsap.to(camera.position, {x: buildingInfo[0].camPositionX, y: buildingInfo[0].camPositionY, z: buildingInfo[0].camPositionZ, duration: buildingInfo[0].camDurationPosition, ease: "Power4.easeInOut"})
                gsap.to(camera.rotation, {x: buildingInfo[0].camRotationX, y: buildingInfo[0].camRotationY, z: buildingInfo[0].camRotationZ, duration: buildingInfo[0].camDurationRotation, ease: "Power4.easeInOut", onComplete(){showSidebarInfo(buildingInfo[0].name, buildingInfo[0].category, buildingInfo[0].desc, buildingInfo[0].isBuilding), ionCommand('activate')}})
            }
        }
    }

    animate();
    window.addEventListener('resize', resize, false);
    document.addEventListener('click', onMouseClick );