import {Chart} from 'chart.js';

import { HarmonicSignal } from './siganls/harmonic.signal';
import { ChartBuilder } from './helpers/chart.builder';

let chartSignal: Chart = null;
let chartRestoreSignal: Chart = null;
let chartAmplitudeSpectrum: Chart = null;
let chartPhaseSpectrum: Chart = null;

const A = 1;
const N = 256;

const ctxSignal = document.getElementById('chart-signal');
const ctxRestoreSignal = document.getElementById('chart-restore-signal');
const ctxAmplitudeSpectrum = document.getElementById('chart-amplitude-spectrum');
const ctxPhaseSpectrum = document.getElementById('chart-phase-spectrum');

// const sliderN: HTMLInputElement = <HTMLInputElement>document.getElementById('freq-sampling-input');
const sliderF: HTMLInputElement = <HTMLInputElement>document.getElementById('freq-signal-input');

// const valN = document.getElementById('freq-sampling');
const valFreq = document.getElementById('freq-signal');

// sliderN.oninput = buildGraphics;
sliderF.oninput = buildGraphics;

buildGraphics();

function clearAll() {
    if (!chartSignal) return;
    chartSignal.destroy();
    chartRestoreSignal.destroy();
    chartAmplitudeSpectrum.destroy();
    chartPhaseSpectrum.destroy();
}

function buildGraphics() {
    clearAll();
    valFreq.innerHTML = sliderF.value;
    const signal = new HarmonicSignal(A, parseInt(sliderF.value), N);
    signal.initSignal();
    const { srcSignal, rstrSignal, amplitudeSpectrum, phaseSpectrum } = signal;

    // @ts-ignore

    new Chart(ctxSignal, {
        type: 'line',
        data: {
            labels: Array.from(Array(srcSignal.length).keys()).map(item => item.toString()),
            datasets: [{
                data: srcSignal,
                label: 'signal',
                borderColor: 'red',
                borderWidth: 1,
            }, {
                data: rstrSignal,
                label: 'rstrSignal',
                borderColor: 'green',
                borderWidth: 1,
            }]
        },
    });

    /*chartSignal = ChartBuilder.build(ctxSignal, srcSignal, 'signal', 'red');
    chartRestoreSignal = ChartBuilder.build(ctxRestoreSignal, rstrSignal, 'rstrSignal', 'green');*/

    chartAmplitudeSpectrum = ChartBuilder.build(ctxAmplitudeSpectrum, amplitudeSpectrum, 'amplitudeSpectrum', 'blue');
    chartPhaseSpectrum = ChartBuilder.build(ctxPhaseSpectrum, phaseSpectrum, 'phaseSpectrum', 'yellow');
}


