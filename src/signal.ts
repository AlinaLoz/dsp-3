export class Signal {
    A: number;
    freq: number;

    srcSignal: number[];
    rstrSignal: number[];

    amplitudeSpectrum: number[];
    phaseSpectrum: number[];

    countHarmonic: number;
    N: number;

    private sinComponents: number[];
    private cosComponents: number[];

    constructor(A: number, freq: number, N: number) {
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

    private generateSignal() {
        let sign: number[] = [];
        for (let i = 0; i < this.N * 2; i++){
            sign.push(this.A * Math.cos(2 * Math.PI * this.freq * i / this.N));
        }
        return sign;
    }


    private restoreSignal() {
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

    private getSinComponents() {
        let sinComponents: number[] = [];
        for (let j = 0; j < this.countHarmonic; j++)
        {
            let sinValue = 0.0;
            for(let i = 0; i < this.N; i++) {
                sinValue += this.srcSignal[i] * Math.sin(2 * Math.PI * i * j / this.N);
            }
            sinComponents.push(2 * sinValue / this.N);
        }
        return sinComponents;
    }

    private getCosComponents() {
        let cosComponents: number[] = [];
        for (let j = 0; j < this.countHarmonic; j++)
        {
            let sinValue = 0.0;
            for(let i = 0; i < this.N; i++) {
                sinValue += this.srcSignal[i] * Math.cos(2 * Math.PI * i * j / this.N);
            }
            cosComponents.push(2 * sinValue / this.N);
        }
        return cosComponents;
    }

    private getAmplitudeSpectrum()
    {
        let amplitudeSpectrum: number[] = [];
        for (let j = 0; j < this.countHarmonic; j++) {
            amplitudeSpectrum.push(Math.sqrt(this.sinComponents[j]**2 + this.cosComponents[j]**2));
        }
        return amplitudeSpectrum;
    }

    private getPhaseSpectrum() {
        let phaseSpectrum: number[] = [];
        for (let j = 0; j < this.countHarmonic; j++) {
            phaseSpectrum.push(Math.atan(this.sinComponents[j] / this.cosComponents[j]));
        }
        return phaseSpectrum;
    }
}
