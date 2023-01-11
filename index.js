import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { AmbientLight, LoadingManager, Color, PerspectiveCamera, Raycaster, Scene, Vector2, WebGLRenderer } from 'three';
import { CSS2DRenderer, CSS2DObject } from 'three/addons/renderers/CSS2DRenderer.js';
import gsap from 'gsap';
import tippy from 'tippy.js';
import 'tippy.js/dist/tippy.css';
import 'tippy.js/animations/scale.css';
import 'tippy.js/themes/light.css';

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

    // all buildings coodirnates 
    const allBuildings = [
        {camPositionX: -0.24000000000000005, camPositionY: -1.500000000000001, camPositionZ: -0.9100000000000014, camRotationX: 0.5400000000000003, camRotationY: 0.4600000000000002, camRotationZ: 0.6500000000000004, camDurationPosition: 2, camDurationRotation: 2, isBuilding: true, name: 'A', category: 'Bloco', desc: 'Apenas um bloco comum.', x: -0.19000000000000006, y: -0.5800000000000003},
        {camPositionX: 0.02000000000000008, camPositionY: -1.2999999999999998, camPositionZ: -0.91, camRotationX: 0.54, camRotationY: 0.46, camRotationZ: 0.65, camDurationPosition: 2, camDurationRotation: 2, isBuilding: true, name: 'B', category: 'Bloco', desc: 'Alguns moradores deduzem que o apartamento do terceiro andar, virado para o lado nascente tenha a melhor vista do condomínio.', x: -0.07000000000000003, y: -0.4900000000000002},
        {camPositionX: -0.9100000000000006, camPositionY: -1.2799999999999998, camPositionZ: -0.9500000000000001, camRotationX: 0.54, camRotationY: -0.5400000000000006, camRotationZ: -0.7400000000000009, camDurationPosition: 2, camDurationRotation: 2, isBuilding: true, name: 'C', category: 'Bloco', desc: "Más-línguas apontam que os moradores deste bloco estão fortemente armados caso surja alguma invasão nas plantações da Caixa d'água.", x: -0.2400000000000001, y: -0.4900000000000002},
        {camPositionX: 0.020000000000000004, camPositionY: -0.7899999999999999, camPositionZ: -1.03, camRotationX: 0.64, camRotationY: -0.4200000000000002, camRotationZ: -0.6000000000000003, camDurationPosition: 1.5, camDurationRotation: 2, isBuilding: true, name: 'D', category: 'Bloco', desc: 'Apenas um bloco comum.', x: 0.12999999999999995, y: -0.25},
        {camPositionX: -0.16, camPositionY: -0.85, camPositionZ: -0.94, camRotationX: 0.64, camRotationY: 0.019999999999999997, camRotationZ: 0.02, camDurationPosition: 1.5, camDurationRotation: 2, isBuilding: true, name: 'E', category: 'Bloco', desc: 'Apenas um bloco comum.', x: -0.040000000000000036, y: -0.25},
        {camPositionX: -0.24999999999999956, camPositionY: -0.7300000000000002, camPositionZ: -0.9500000000000001, camRotationX: 0.5, camRotationY: 0.51, camRotationZ: 0.74, camDurationPosition: 2, camDurationRotation: 2, isBuilding: true, name: 'F', category: 'Bloco', desc: 'Provavelmente esse é um dos blocos mais tranquilos do condomínio.', x: -0.21000000000000008, y: -0.25},
        {camPositionX: 0.6300000000000003, camPositionY: -0.48, camPositionZ: -0.97, camRotationX: 0.5, camRotationY: 0.51, camRotationZ: 0.74, camDurationPosition: 2, camDurationRotation: 2, isBuilding: true, name: 'G', category: 'Bloco', desc: 'Prédio onde eu moro.', x: 0.18, y: -0.15999999999999992},
        {camPositionX: 0.2400000000000001, camPositionY: -0.48, camPositionZ: -0.97, camRotationX: 0.5, camRotationY: 0.51, camRotationZ: 0.74, camDurationPosition: 2, camDurationRotation: 2, isBuilding: true, name: 'H', category: 'Bloco', desc: 'Prédio onde moram os dois caras mais legais do Residencial.', x: 0.009999999999999969, y: -0.15999999999999992},
        {camPositionX: -0.17999999999999994, camPositionY: -0.47999999999999976, camPositionZ: -0.97, camRotationX: 0.5, camRotationY: 0.51, camRotationZ: 0.74, camDurationPosition: 2, camDurationRotation: 2, isBuilding: true, name: 'I', category: 'Bloco', desc: 'Apenas um bloco comum.', x: -0.16000000000000003, y: -0.15999999999999992},
        {camPositionX: -1.1400000000000003, camPositionY: -0.5100000000000001, camPositionZ: -0.9400000000000001, camRotationX: 0.5, camRotationY: -0.6300000000000007, camRotationZ:  -0.8900000000000011, camDurationPosition: 2, camDurationRotation: 2, isBuilding: true, name: 'J', category: 'Bloco', desc: 'Apenas um bloco comum.', x: -0.3300000000000002, y: -0.15999999999999992},
        {camPositionX: 1.0700000000000007, camPositionY: -0.23999999999999977, camPositionZ: -0.97, camRotationX: 0.5, camRotationY: 0.51, camRotationZ: 0.74, camDurationPosition: 2, camDurationRotation: 2, isBuilding: true, name: 'L', category: 'Bloco', desc: 'Um bloco super decorado.', x: 0.3900000000000002, y: -0.06999999999999992},
        {camPositionX: 0.72, camPositionY: -0.26, camPositionZ: -0.97, camRotationX: 0.5, camRotationY: 0.51, camRotationZ: 0.74, camDurationPosition: 2, camDurationRotation: 2, isBuilding: true, name: 'M', category: 'Bloco', desc: 'Após um homem transtornado entrar e causar muita confusão no topo desse bloco, os moradores tornaram o hall deste bloco seguro e decorado.', x: 0.24000000000000005, y: -0.06999999999999992},
        {camPositionX: 0.33000000000000007, camPositionY: -0.24999999999999978, camPositionZ: -0.97, camRotationX: 0.5, camRotationY: 0.51, camRotationZ: 0.74, camDurationPosition: 2, camDurationRotation: 2, isBuilding: true, name: 'N', category: 'Bloco', desc: 'Apenas um bloco comum.', x: 0.06999999999999998, y: -0.06999999999999992},
        {camPositionX: -0.6199999999999997, camPositionY: -0.27, camPositionZ: -0.94, camRotationX: 0.5, camRotationY: -0.63, camRotationZ: -0.89, camDurationPosition: 1.5, camDurationRotation: 2, isBuilding: true, name: 'O', category: 'Bloco', desc: 'Apenas um bloco comum.', x: -0.10000000000000002, y: -0.06999999999999992},
        {camPositionX: -1.0399999999999998, camPositionY: -0.2699999999999998, camPositionZ: -0.94, camRotationX: 0.5, camRotationY: -0.63, camRotationZ: -0.89, camDurationPosition: 2, camDurationRotation: 2, isBuilding: true, name: 'P', category: 'Bloco', desc: 'Um bloco onde seu hall é bem-apresentado.', x: -0.27000000000000013, y: -0.06999999999999992},
        {camPositionX: -0.7899999999999998, camPositionY: -0.31000000000000016, camPositionZ: -0.8900000000000001, camRotationX: 0.5000000000000002, camRotationY: 0.5100000000000002, camRotationZ: 0.7400000000000004, camDurationPosition: 2, camDurationRotation: 2, isBuilding: true, name: 'Q', category: 'Bloco', desc: 'Um bloco onde o lado nascente tem a melhor visão para o estacionamento.', x: -0.4500000000000003, y: -0.06999999999999992},
        {camPositionX: 0.970000000000001, camPositionY: 0.56, camPositionZ: -0.89, camRotationX: 0.5, camRotationY: 0.51, camRotationZ: 0.74, camDurationPosition: 2, camDurationRotation: 2, isBuilding: true, name: 'R', category: 'Bloco', desc: 'O lado nascente deste prédio provavelmente é uma das áreas mais tranquilas do condomínio..', x: 0.35000000000000014, y: 0.33000000000000024},
        {camPositionX: -0.7099999999999995, camPositionY: 0.5900000000000006, camPositionZ: -0.96, camRotationX: 0.5, camRotationY: -0.63, camRotationZ: -0.89, camDurationPosition: 2, camDurationRotation: 2, isBuilding: true, name: 'S', category: 'Bloco', desc: 'Apenas um bloco comum.', x: -0.15000000000000002, y: 0.33000000000000024},
        {camPositionX: -0.5399999999999998, camPositionY: 0.5600000000000005, camPositionZ: -0.89, camRotationX: 0.5, camRotationY: 0.51, camRotationZ: 0.74, camDurationPosition: 2, camDurationRotation: 2, isBuilding: true, name: 'T', category: 'Bloco', desc: 'Apenas um bloco comum.', x: -0.3400000000000002, y: 0.33000000000000024},
        {camPositionX: 0.8299999999999998, camPositionY: 0.8100000000000003, camPositionZ: -0.89, camRotationX: 0.5, camRotationY: 0.51, camRotationZ: 0.74, camDurationPosition: 2, camDurationRotation: 2, isBuilding: true, name: 'U', category: 'Bloco', desc: 'O lado nascente deste prédio provavelmente também é uma das áreas mais tranquilas do condomínio.', x: 0.3000000000000001, y: 0.4300000000000003},
        {camPositionX: 0.19, camPositionY: 0.7200000000000002, camPositionZ: -0.9, camRotationX: 0.6900000000000002, camRotationY: 0, camRotationZ: 0, camDurationPosition: 1.5, camDurationRotation: 1.5, isBuilding: true, name: 'V', category: 'Bloco', desc: 'Apenas um bloco comum.', x: 0.11999999999999995, y: 0.45000000000000034},
        {camPositionX: 0.05999999999999998, camPositionY: 0.9900000000000002, camPositionZ: -0.9, camRotationX: 0.69, camRotationY: 0, camRotationZ: 0, camDurationPosition: 2, camDurationRotation: 2, isBuilding: true, name: 'W', category: 'Bloco', desc: 'Apenas um bloco comum.', x: 0.05999999999999998, y: 0.5600000000000004},
        {camPositionX: -0.02, camPositionY: 0.8099999999999999, camPositionZ: -0.89, camRotationX: 0.5, camRotationY: 0.51, camRotationZ: 0.74, camDurationPosition: 2, camDurationRotation: 2, isBuilding: true, name: 'X', category: 'Bloco', desc: 'Em 2015, o apartamento do terceiro andar desse prédio pegou fogo. <br/><br/> Vários extintores de incêndio de outros blocos foram ultilizados para conter o fogo que alastrou em todo esse apartamento, até que os bombeiros chegaram e finalmente acabaram com as chamas. Infelizmente, dois pets morreram nesse evento. <br/><br/> Apesar disso tudo, esse é apenas mais um bloco comum.', x: -0.10000000000000002, y: 0.4300000000000003},
        {camPositionX: -0.42999999999999994, camPositionY: 0.8200000000000003, camPositionZ: -0.89, camRotationX: 0.5, camRotationY: 0.51, camRotationZ: 0.74, camDurationPosition: 2, camDurationRotation: 2, isBuilding: true, name: 'Y', category: 'Bloco', desc: 'O Bloco Y é destacado por ser muito seguro e bem-apresentado. <br/><br/> Além desse bloco possuir um portão com tranca/destranca automático, os moradores possuem o bom senso de sempre manter o portão fechado. Tornando esse bloco o mais seguro do condomínio.', x: -0.29000000000000015, y: 0.4300000000000003},
        {camPositionX: 0.6799999999999998, camPositionY: 1.0800000000000003, camPositionZ: -0.89, camRotationX: 0.5, camRotationY: 0.51, camRotationZ: 0.74, camDurationPosition: 2, camDurationRotation: 2, isBuilding: true, name: 'Z', category: 'Bloco', desc: 'O lado nascente deste prédio provavelmente também é uma das áreas mais tranquilas do condomínio.', x: 0.25000000000000006, y: 0.5400000000000004},
        {camPositionX: 0.6600000000000004, camPositionY: 0.28000000000000014, camPositionZ: -0.9900000000000014, camRotationX: -6.071532165918825e-17, camRotationY: -0.5600000000000003, camRotationZ: -1.5500000000000012, camDurationPosition: 2, camDurationRotation: 2, isBuilding: false, name: 'Salão de festas', category: 'construção', desc: 'Recém-reformado, o salão de festas é um local feito para os condômicos para eventuais festas, reuniões e assembléias. <br/><br/> Nesse salão, há dois quartinhos, duas salas com acessórios para os participantes usarem, a área do salão em si, e uma área livre onde há um muro que divide o condomínio e a área da Força Áerea.', x: 0.4200000000000002, y: 0.07000000000000009},
        {camPositionX: 0.25000000000000105, camPositionY: -0.6300000000000001, camPositionZ: -1, camRotationX: 0.5, camRotationY: -0.63, camRotationZ: -0.89, camDurationPosition: 2, camDurationRotation: 2, isBuilding: false, name: 'Área do Willa', category: 'construção', desc: 'Área do condomínio onde Willames reside. Até hoje, não se sabe o motivo dele estar ai, há especulações de que Willames trabalhou bastante no condomínio, tanto que esta área foi dada como "pagamento" para ele. <br/><br/> Trata-se de uma área onde há dois quartinhos, um banheiro e a área livre em si, que é precária.', x: 0.26000000000000006, y: -0.19999999999999996},
        {camPositionX: -0.7000000000000004, camPositionY: -1.1900000000000008, camPositionZ: -0.8700000000000013, camRotationX: -0.07000000000000006, camRotationY: 0.5400000000000003, camRotationZ: 1.8600000000000014, camDurationPosition: 2, camDurationRotation: 2, isBuilding: false, name: "Caixa d’água", category: 'construção', desc: "Por muito tempo, a Caixa d'água foi um local escuro e descuidado, lembrado apenas para manutenções. <br/><br/> Contudo, por conta dos esforços dos moradores perto desta região, a Caixa d'água atualmente encontra-se reformada, tendo novos locais e melhorias, tais como: estacionamento, iluminação, decorações, plantações e até câmeras de segurança.", x: -0.3800000000000002, y: -0.6500000000000004},
        {camPositionX: 0.20000000000000004, camPositionY:  0.4700000000000003, camPositionZ: -0.9000000000000014, camRotationX: 0.5499999999999999, camRotationY: 0, camRotationZ: 0, camDurationPosition: 1.5, camDurationRotation: 1.5, isBuilding: false, name: 'Quadra', category: 'construção', desc: 'A quadra é o principal local de encontro do condomínio. <br/><br/> Este local é constantemente frequentado por visitantes no qual é ultilizado para reuniões, <a target="_blank" href="https://pt.wikipedia.org/wiki/Pelada_(futebol)">peladas</a>, etc.', x: 0.08999999999999997, y: 0.31000000000000016}
    ];

    var buildingLabel;

    for(let i = 0; i < allBuildings.length; i++) {
        const building = document.createElement("div");
        building.className = "label";
        
        if (allBuildings[i].isBuilding) {
            building.setAttribute('block', allBuildings[i].name);
        } else {
            building.setAttribute('name', allBuildings[i].name);
        }
    
        building.style.marginTop = "-1em";
        buildingLabel = new CSS2DObject(building);
        buildingLabel.position.set(allBuildings[i].x,allBuildings[i].y,0);
        scene.add(buildingLabel);

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