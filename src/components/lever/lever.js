import { LeverAction } from "./lever-action.js";

class Lever {

    _componentId = 'a-lever';

    _entityRef = {};

    onLoad;

    constructor (attrs) {
        this.onLoad = new Promise((resolve) => {
            LeverAction.register(this.rotate);
            this._append(attrs, resolve);
        });
    }

    _append = (attrs, resolve) => {
        const sceneEl = document.querySelector('a-scene');
        this._entityRef = document.createElement('a-cylinder');
        this._entityRef.setAttribute('id', this._componentId);
        let attrsKeys = Object.keys(attrs);
        attrsKeys.forEach((key) => {
            this._entityRef.setAttribute(key, attrs[key]);
        });
        this._entityRef.setAttribute(LeverAction.componentId, '');
        this._entityRef.setAttribute('id', this._componentId);
        sceneEl.appendChild(this._entityRef);
        setTimeout(() => resolve('inserted!'), 0);
        console.log('inserted level');
    }

    isActivated = () => this._entityRef.getAttribute('rotation').z === -45

    rotate = () => new Promise((resolve) => {
        const refreshRate = 100; // segs
        const angularPrecision = 10; // displace angle interpolation
        const frames = 90 / angularPrecision; // movements to render
        let angleToRender = this._entityRef.getAttribute('rotation').z;
        for(let i=1; i<=frames; i++) {
            setTimeout(() => {
                angleToRender = angleToRender - angularPrecision;
                this._entityRef.setAttribute('rotation', '0 0 ' + angleToRender);
                if (i === frames) resolve("rotated!");
            }, refreshRate * i);
        }
    })

}

export { Lever }
