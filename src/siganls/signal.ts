export class Signal {
    A: number;
    freq: number;

    srcSignal: number[];
    rstrSignal: number[];

    amplitudeSpectrum: number[];
    phaseSpectrum: number[];

    countHarmonic: number;
    N: number;

    protected sinComponents: number[];
    protected cosComponents: number[];

    protected getSinComponents() {
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

    protected getCosComponents() {
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

    protected getAmplitudeSpectrum()
    {
        let amplitudeSpectrum: number[] = [];
        for (let j = 0; j < this.countHarmonic; j++) {
            amplitudeSpectrum.push(Math.sqrt(this.sinComponents[j]**2 + this.cosComponents[j]**2));
        }
        return amplitudeSpectrum;
    }

    protected getPhaseSpectrum() {
        let phaseSpectrum: number[] = [];
        for (let j = 0; j < this.countHarmonic; j++) {
            phaseSpectrum.push(Math.atan2(this.sinComponents[j], this.cosComponents[j]));
        }
        return phaseSpectrum;
    }
}
