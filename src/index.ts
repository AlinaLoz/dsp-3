import { DSPBuilder } from "./DSPBuilder";

const ctx = document.getElementById('chart');
const sliderN: HTMLInputElement = <HTMLInputElement>document.getElementById('inp-n');
const sliderK: HTMLInputElement = <HTMLInputElement>document.getElementById('inp-k');
const sliderPhi: HTMLInputElement = <HTMLInputElement>document.getElementById('inp-phi');

const valN = document.getElementById('val-n');
const valK = document.getElementById('val-k');
const valPhi = document.getElementById('val-phi');

sliderN.oninput = buildGraphics;
sliderK.oninput = buildGraphics;
sliderPhi.oninput = buildGraphics;

buildGraphics();

function buildGraphics() {
    valN.innerHTML =  sliderN.value;
    valK.innerHTML = sliderK.value;
    valPhi.innerHTML = sliderPhi.value;

    const N: number = parseInt(sliderN.value);
    const K: number = parseInt(sliderK.value);
    const phi: number = parseInt(sliderPhi.value);

    const dsp = new DSPBuilder(N, K, phi);
    dsp.generateParameters();
    dsp.buildGraphics(ctx);
}


