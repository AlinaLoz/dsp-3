import { Signal } from './signal';

const COUNT_HARMONIC = 30;

export class PoliHarmonicSignal extends Signal {

    listA: number[] = [];
    freq: number;
    listPhases: number[] = [];

    constructor(amplitudes: number[], freq: number, phases: number[], N: number) {
        super();
        this.freq = freq;
        this.N = N;
        this.listA = amplitudes;
        this.listPhases = phases;
        this.countHarmonic = Number(N / 2);
    }

    initSignal() {
        this.srcSignal = this.generateSignal();
        this.sinComponents = this.getSinComponents();
        this.cosComponents = this.getCosComponents();
        this.amplitudeSpectrum = this.getAmplitudeSpectrum();
        this.phaseSpectrum = this.getPhaseSpectrum();
        this.rstrSignal = this.restoreSignalWithPhase(0, this.countHarmonic);
    }

    generateSignal() {
        let sign: number[] = [];
        const amplitude: number[] = [];
        const phase: number[]  = [];

        for (let j = 0; j < COUNT_HARMONIC; j++) {
            const rndIndexA = Math.floor(Math.random() * this.listA.length);
            const rndIndexPhase = Math.floor(Math.random() * this.listPhases.length);
            amplitude.push(this.listA[rndIndexA]);
            phase.push(this.listPhases[rndIndexPhase]);
        }

        for (let i = 0; i < this.N; i++) {
            let  tmp = 0;
            for (let j = 0; j < COUNT_HARMONIC; j++){
                tmp += amplitude[j] * Math.cos(2 * Math.PI * j * i / this.N - phase[j]);
            }
            sign[i] = tmp;
        }
        return sign;
    }

    // number harmonic === access frequency
    restoreSignalWithPhase(minFreq: number, maxFreq: number) {
        let values: number[] = [];

        console.log(minFreq, maxFreq);

        for (let i = 0; i < this.N; i++) {
            let tmp = 0;
            for (let j = minFreq; j < maxFreq; j++) {
                tmp += this.amplitudeSpectrum[j] * Math.cos(2 * Math.PI * i * j / this.N - this.phaseSpectrum[j]);
            }
            values.push(tmp + this.amplitudeSpectrum[0] / 2);
        }
        return values;
    }

    restoreSignalWithoutPhase(countHarmonic: number, withPhase = true) {
        let values: number[] = [];
        for (let i = 0; i < this.N; i++) {
            let tmp = 0;
            for (let j = 0; j < countHarmonic; j++) {
                tmp += this.amplitudeSpectrum[j] * Math.cos(2 * Math.PI * i * j / this.N);
            }
            values.push(tmp + this.amplitudeSpectrum[0] / 2);
        }
        return values;
    }
}

