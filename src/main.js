import { Tile } from "./components/tile/tile.js";
import { Lever } from "./components/lever/lever.js";

document.addEventListener("DOMContentLoaded", function(event) {

    console.log("DOM fully loaded");

    console.log("bootstraping components!!!!");

    let tile = new Tile({
        width: 0.5,
        height: 0.05,
        depth: 0.3,
        color: 'orange',
        initPos: '-0.25 0.1 -4'
    });

    let lever = new Lever({
        position: "-1.5 0.1 -3.3",
        rotation: "0 0 45",
        radius: "0.03",
        height: "0.3",
        color: "#FFC65D"
    });

    lever.onLoad.then(() => {
        // lever.switching();
        // lever.switching.then(() => {
        //     tile.moveZAxis(1);
        // });
    });

});

