import { PoliHarmonicSignal } from './poli.harmonic.signal';

export class FiltersHarmonicSignal extends PoliHarmonicSignal {
    lf: number;
    hf: number;
    LFSignal: number[];
    HFSignal: number[];
    BothFilteredSignal: number[];

    constructor(amplitudes: number[], freq: number, phases: number[], N: number, lf: number, hf: number) {
        super(amplitudes, freq, phases, N);
        this.lf = lf;
        this.hf = hf;
    }

    initSignal() {
        this.srcSignal = this.generateSignal();
        this.sinComponents = this.getSinComponents();
        this.cosComponents = this.getCosComponents();
        this.amplitudeSpectrum = this.getAmplitudeSpectrum();
        this.phaseSpectrum = this.getPhaseSpectrum();
        this.LFSignal = this.restoreSignalWithPhase(0, this.lf);
        this.HFSignal = this.restoreSignalWithPhase(this.hf, this.countHarmonic);
        this.BothFilteredSignal = this.restoreSignalWithPhase(this.lf, this.hf);
    }
}

