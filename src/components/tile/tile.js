
class Tile {

  _componentName = 'a-tile';

  _entityRef = {};

  onLoad;

  constructor (attrs) {
    this.onLoad = new Promise((resolve) => {
      this._register(attrs, resolve);
      this._append();
    });
  }

  _register = (attrs, resolve) => {
    console.log('register tile');
    const self = this;
    AFRAME.registerComponent(this._componentName, {
      schema: {
        width: {type: 'number', default: 1},
        height: {type: 'number', default: 1},
        depth: {type: 'number', default: 1},
        color: {type: 'color', default: 'red'}
      },
      init: function () {
        console.log('tile init');

        this.data = attrs;

        const data = this.data;
        const el = this.el;

        // Create geometry.
        this.geometry = new THREE.BoxBufferGeometry(data.width, data.height, data.depth);

        // Create material.
        this.material = new THREE.MeshStandardMaterial({color: data.color});

        // Create mesh.
        this.mesh = new THREE.Mesh(this.geometry, this.material);

        // Set mesh on entity.
        el.setObject3D('mesh', this.mesh);

        // Set initial position
        self.setPosition(attrs.initPos);
        resolve("initialized!");
      },
      update: function (oldData) {
        console.log('tile updated');
      }
    });
  }

  _append = () => {
    const sceneEl = document.querySelector('a-scene');
    this._entityRef = document.createElement('a-entity');
    this._entityRef.setAttribute(this._componentName, '');
    sceneEl.appendChild(this._entityRef);
  }

  setPosition = (coordinates) => this._entityRef.setAttribute('position', coordinates);

  getPosition = () => this._entityRef.getAttribute('position');

  _getPosToDisplace = (axis) => {
    const {x, y, z} = this.getPosition();
    if (axis === 'x-axis') return x;
    if (axis === 'y-axis') return y;
    if (axis === 'z-axis') return z;
  }

  _getStrToDisplace = (posToRender, axis) => {
    const {x, y, z} = this.getPosition();
    if (axis === 'x-axis') return `${posToRender} ${y} ${z}`;
    if (axis === 'y-axis') return `${x} ${posToRender} ${z}`;
    if (axis === 'z-axis') return `${x} ${y} ${posToRender}`;
  }

  _move = (displacement, axis) => new Promise((resolve) => {
    const refreshRate = 200; // segs
    const precision = 0.1; // displace pos interpolation
    const frames = Math.abs(displacement) / precision; // movements to render
    const frameDisplacement = displacement > 0 ? precision : -precision;
    let posToRender = this._getPosToDisplace(axis);
    for(let i=1; i<=frames; i++) {
      setTimeout(() => {
        posToRender = posToRender + frameDisplacement;
        const strPos = this._getStrToDisplace(posToRender, axis);
        // console.log('strPos', strPos);
        this.setPosition(strPos);
        if (i === frames) resolve("moved!");
      }, refreshRate * i);
    }
  })

  moveYAxis = (displacement) => this._move(displacement, 'y-axis')

  moveXAxis = (displacement) => this._move(displacement, 'x-axis')

  moveZAxis = (displacement) => this._move(displacement, 'z-axis')

}

export { Tile }
