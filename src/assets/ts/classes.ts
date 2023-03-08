import gsap from 'gsap';
import * as packageInfo from '../../../package.json';

export class UI_Audio {
    static hover(audioSrc: string) {
        let audio: HTMLAudioElement = new Audio(audioSrc);
        audio.play();
    }

    static click(audioSrc: string) {
        let audio: HTMLAudioElement = new Audio(audioSrc);
        audio.play();
    }
}

export class Ions {
    static ions = document.querySelectorAll('.ion');

    static set setState(state: boolean) {
        if(state) {
            this.ions.forEach((ion: any) => {
                ion.style.opacity = '100%';
                ion.style.pointerEvents = 'all';
            })
        }else{
            this.ions.forEach((ion: any) => {
                ion.style.opacity = '50%';
                ion.style.pointerEvents = 'none'; 
            })
        }
    }
}

export class Button {
    static newButtonText: string = '';

    static render(buttonText: string) {
        this.newButtonText = buttonText;
        document.querySelector('.button-area')!.innerHTML = `<a class="waves-effect waves-light btn deep-purple darken-2">${this.newButtonText}</a>`;
    }
}

export class PreLoader {
    static newWidth: number = 1;

    static value(width: number) {
        this.newWidth = width;
    }

    static setLoader() {
        return `<div class="progress deep-purple lighten-3" style="width: 350px"><div class="determinate deep-purple darken-1" style="width: ${this.newWidth}%"></div></div> <span>Carregando...</span>`
    }
}

interface ISidebarInfo {
    category: string;
    buildingName: string;
    buildingDesc: string;
    isBuilding: boolean; 
}

export class SidebarInfo implements ISidebarInfo {
    category = '';
    buildingName = '';
    buildingDesc = '';
    isBuilding = false;

    constructor(buildingName: string, buildingDesc: string, isBuilding: boolean) {
        this.buildingName = buildingName;
        this.buildingDesc = buildingDesc;
        this.isBuilding = isBuilding;

        this.isBuilding ? this.buildingName = `Bloco ${this.buildingName}` : this.buildingName;
        this.isBuilding ? this.category = 'Prédio' : this.category = 'Construção';
    }

    render () {
        document.querySelector<HTMLElement>('.blockName')!.innerText = this.buildingName;
        document.querySelector<HTMLElement>('.buildingCategory span')!.innerText = this.category;
        document.querySelector('.blockInfo p')!.innerHTML = this.buildingDesc;
        window.screen.width <= 425 ? gsap.to('.blockInfoSidebar', {width: '100%'}) : gsap.to('.blockInfoSidebar', {width: '350px'});
    }

    // closeSidebar(threeJSCamera, labelRenderer) {
    //     document.querySelector('.ion')!.addEventListener('click', () => {
    //         gsap.to('.blockInfoSidebar', {width: '0px'})
    //         gsap.to(threeJSCamera.position, {x: 0, y: 0, z: 1, duration: 1.5, ease: "Power4.easeOut"})
    //         gsap.to(threeJSCamera.rotation, {x: 0, y: 0, z: 0, duration: 1.5, ease: "Power4.easeOut", onComplete(){gsap.to(labelRenderer.domElement, {opacity: 1})}})
    //     })
    // }
}

export class Version {
    static display() {
        let projectVersion = document.createElement('div');
        projectVersion.innerText = packageInfo.version;
        projectVersion.classList.add('version');
        document.querySelector('body')!.appendChild(projectVersion);
    }
}