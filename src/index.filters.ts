import { Chart } from "chart.js";
import { ChartBuilder } from './helpers/chart.builder';
import { FiltersHarmonicSignal } from "./siganls/filters.harmonic.signal";

let chartSignal: Chart = null;
let chartRestoreSignalLF: Chart = null;
let chartRestoreSignalHF: Chart = null;
let chartRestoreSignalLHF: Chart = null;

const N = 256;
const listA: number[] = [ 1, 3, 5, 8, 10, 12, 16];
const listPhases: number[] = [ Math.PI / 6, Math.PI / 4, Math.PI / 3, Math.PI / 2, 3 * Math.PI / 4, Math.PI];

const ctxSignal = document.getElementById('filters-chart-signal');
const ctxRestoreSignalLF = document.getElementById('filters-chart-lf');
const ctxRestoreSignalHF= document.getElementById('filters-chart-hf');
const ctxRestoreSignalLHF= document.getElementById('filters-chart-lhf');

const sliderF: HTMLInputElement = <HTMLInputElement>document.getElementById('filters-freq-input');
const sliderLF: HTMLInputElement = <HTMLInputElement>document.getElementById('filters-freq-lf-input');
const sliderHF: HTMLInputElement = <HTMLInputElement>document.getElementById('filters-freq-hf-input');

const valFreq = document.getElementById('filters-freq');
const valFreqLF = document.getElementById('filters-freq-lf');
const valFreqHF = document.getElementById('filters-freq-hf');

sliderF.oninput = buildGraphics;
sliderLF.oninput = buildGraphics;
sliderHF.oninput = buildGraphics;

buildGraphics();

function clearAll() {
    if (!chartSignal) return;
    chartSignal.destroy();
    chartRestoreSignalLF.destroy();
    chartRestoreSignalHF.destroy();
    chartRestoreSignalLHF.destroy();
}

function buildGraphics() {
    clearAll();
    valFreq.innerHTML = sliderF.value;
    valFreqLF.innerHTML = sliderLF.value;
    valFreqHF.innerHTML = sliderHF.value;

    const freq = Number(sliderF.value);
    const freqLF = Number(sliderLF.value);
    const freqHF = Number(sliderHF.value);

    const signal = new FiltersHarmonicSignal(listA, freq, listPhases, N, freqLF, freqHF);
    signal.initSignal();

    const { srcSignal, LFSignal, HFSignal, BothFilteredSignal } = signal;

    chartSignal = ChartBuilder.build(ctxSignal, srcSignal, 'signal', 'red');
    chartRestoreSignalLF = ChartBuilder.build(ctxRestoreSignalLF, LFSignal, 'LFSignal', 'green');
    chartRestoreSignalHF = ChartBuilder.build(ctxRestoreSignalHF, HFSignal, 'HFSignal', 'blue');
    chartRestoreSignalLHF = ChartBuilder.build(ctxRestoreSignalLHF, BothFilteredSignal, 'BothFilteredSignal', 'yellow');
}


