import { Chart } from "chart.js";
import { PoliHarmonicSignal } from './siganls/poli.harmonic.signal';
import { ChartBuilder } from './helpers/chart.builder';

let chartSignal: Chart = null;
let chartRestoreSignal: Chart = null;
let chartAmplitudeSpectrum: Chart = null;
let chartPhaseSpectrum: Chart = null;

const N = 256;
const listA: number[] = [ 1, 3, 5, 8, 10, 12, 16];
const listPhases: number[] = [ Math.PI / 6, Math.PI / 4, Math.PI / 3, Math.PI / 2, 3 * Math.PI / 4, Math.PI];

const ctxSignal = document.getElementById('poli-chart-signal');
const ctxRestoreSignal = document.getElementById('poli-chart-restore-signal');
const ctxAmplitudeSpectrum = document.getElementById('poli-chart-amplitude-spectrum');
const ctxPhaseSpectrum = document.getElementById('poli-chart-phase-spectrum');

const sliderF: HTMLInputElement = <HTMLInputElement>document.getElementById('poli-freq-signal-input');
const valFreq = document.getElementById('poli-freq-signal');
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

    const signal = new PoliHarmonicSignal(listA, Number(valFreq), listPhases, N);
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

    //chartSignal = ChartBuilder.build(ctxSignal, srcSignal, 'signal', 'red');
    //chartRestoreSignal = ChartBuilder.build(ctxRestoreSignal, rstrSignal, 'rstrSignal', 'green');
    chartAmplitudeSpectrum = ChartBuilder.build(ctxAmplitudeSpectrum, amplitudeSpectrum, 'amplitudeSpectrum', 'blue');
    chartPhaseSpectrum = ChartBuilder.build(ctxPhaseSpectrum, phaseSpectrum, 'phaseSpectrum', 'yellow');
}


