import gsap from 'gsap';
import * as packageInfo from '../../package.json';

class Ions {
    _ions;
    ions;

    constructor() {
        this.ions = document.querySelectorAll('.ion');
    }

    set ionsState(state) {
        this._ions = state;

        if(this._ions) {
            this.ions.forEach((ion) => {
                ion.style.opacity = '100%';
                ion.style.pointerEvents = 'all';
            })
        }else{
            this.ions.forEach((ion) => {
                ion.style.opacity = '50%';
                ion.style.pointerEvents = 'none';
            })
        }
    }
}

class Button {
    static newButtonText: string = 'asd';

    static render(buttonText) {
        this.newButtonText = buttonText;
        document.querySelector('.button-area').innerHTML = `<a class="waves-effect waves-light btn deep-purple darken-2">${this.newButtonText}</a>`;
    }
}

class PreLoader {
    static newWidth: number = 1;

    static value(width) {
        this.newWidth = width;
    }

    static setLoader() {
        return `<div class="progress deep-purple lighten-3" style="width: 350px"><div class="determinate deep-purple darken-1" style="width: ${this.newWidth}%"></div></div> <span>Carregando...</span>`
    }
}

interface ISidebarInfo {
    buildingName: string;
    buildingDesc: string;
    isBuilding: boolean;
    category: string; 
}

class SidebarInfo implements ISidebarInfo {
    category = null;
    buildingName;
    buildingDesc;
    isBuilding

    constructor(buildingName, buildingDesc, isBuilding) {
        this.buildingName = buildingName;
        this.buildingDesc = buildingDesc;
        this.isBuilding = isBuilding;

        this.isBuilding ? this.buildingName = `Bloco ${this.buildingName}` : this.buildingName;
        this.isBuilding ? this.category = 'Prédio' : this.category = 'Construção';
    }

    render () {
        document.querySelector<HTMLElement>('.blockName').innerText = this.buildingName;
        document.querySelector<HTMLElement>('.buildingCategory span').innerText = this.category;
        document.querySelector('.blockInfo p').innerHTML = this.buildingDesc;
        window.screen.width <= 425 ? gsap.to('.blockInfoSidebar', {width: '100%'}) : gsap.to('.blockInfoSidebar', {width: '350px'});
    }

    closeSidebar(threeJSCamera, labelRenderer) {
        document.querySelector('.ion').addEventListener('click', () => {
            gsap.to('.blockInfoSidebar', {width: '0px'})
            gsap.to(threeJSCamera.position, {x: 0, y: 0, z: 1, duration: 1.5, ease: "Power4.easeOut"})
            gsap.to(threeJSCamera.rotation, {x: 0, y: 0, z: 0, duration: 1.5, ease: "Power4.easeOut", onComplete(){gsap.to(labelRenderer.domElement, {opacity: 1})}})
        })
    }
}

class Version {
    static display() {
        let projectVersion = document.createElement('div');
        projectVersion.innerText = packageInfo.version;
        projectVersion.classList.add('version');
        document.querySelector('body').appendChild(projectVersion);
    }
}

export {Ions, Button, PreLoader, SidebarInfo, Version}