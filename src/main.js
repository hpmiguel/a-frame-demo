import { Tile } from "./components/tile.js";

document.addEventListener("DOMContentLoaded", function(event) {

    console.log("DOM fully loaded");

    console.log("bootstraping components!!!!");

    let tile = new Tile({
        width: 0.5,
        height: 0.1,
        depth: 0.5,
        color: 'orange',
        initPos: '-1 2.5 -3'
    });

    // only one movement
    // tile.onLoad.then(()=> {
    //     console.log('on load tile', tile.getPosition());
    //     tile.moveYAxis(-1)
    // });

    // a list of movements
    const movements = [()=>tile.moveYAxis(-1), ()=>tile.moveXAxis(1), ()=>tile.moveZAxis(-1)]

    // sequential
    tile.onLoad.then(()=> {
        console.log('on load tile', tile.getPosition());
        movements[0]()
            .then(movements[1])
            .then(movements[2]);
    });

    // parallel
    // tile.onLoad.then(()=> {
    //     console.log('on load tile', tile.getPosition());
    //     movements.map(mov => mov());
    // });

});

