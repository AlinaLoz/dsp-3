import {Signal} from "./signal";

export class HarmonicSignal extends Signal {
    constructor(A: number, freq: number, N: number) {
        super();
        this.A = A;
        this.N = N;
        this.freq = freq;
        this.countHarmonic = Number(N / 2);
    }

    initSignal() {
        this.srcSignal = this.generateSignal();
        this.sinComponents = this.getSinComponents();
        this.cosComponents = this.getCosComponents();
        this.amplitudeSpectrum = this.getAmplitudeSpectrum();
        this.phaseSpectrum = this.getPhaseSpectrum();
        this.rstrSignal = this.restoreSignal();
    }

    protected generateSignal() {
        let sign: number[] = [];
        for (let i = 0; i < this.N * 2; i++){
            sign.push(this.A * Math.cos(2 * Math.PI * this.freq * i / this.N));
        }
        return sign;
    }


    protected restoreSignal() {
        let resoreSignal: number[] = [];
        for (let i = 0; i < this.N * 2; i++){
            let val = 0;
            for (let j = 0; j < this.countHarmonic; j++){
                val += this.amplitudeSpectrum[j] * Math.cos(2 * Math.PI * i * j / this.N - this.phaseSpectrum[j]);
            }
            resoreSignal[i] = val;
        }
        return resoreSignal;
    }
}
