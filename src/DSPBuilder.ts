import { Chart } from 'Chart.js';

export class DSPBuilder {
    private setM: number[] = [];
    private setA: number[] = [];
    private setSKZ_1: number[] = [];
    private setSKZ_2: number[] = [];

    constructor(
        private readonly N: number,
        private readonly K: number,
        private readonly phi: number,
    ) {
        this.N = N;
        this.K = K;
        this.phi = phi;
    }

    generateParameters() {
        for (let M = this.K; M < 5 * this.N; M++) {
            let [cos, sin, itemX] = [0.0, 0.0, 0.0];
            let [sumItemX, sumSquareItemX] = [0, 0];
            for (let n = 1; n < M; n++) {
                itemX = Math.sin(2 * Math.PI * n / this.N + this.phi);
                sumItemX += itemX;
                sumSquareItemX += Math.pow(itemX, 2);
                sin += itemX * Math.sin(2 * Math.PI * n / M);
                cos += itemX * Math.cos(2 * Math.PI * n / M);
            }
            const a  =  2 * sin / M;
            const b  =  2 * cos / M;
            this.setA.push(Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2)));
            let tmp = sumSquareItemX / (M + 1);
            this.setSKZ_1.push(Math.sqrt((tmp)));
            tmp = tmp - Math.pow((sumItemX / (M + 1)), 2);
            this.setSKZ_2.push(Math.sqrt(tmp));
            this.setM.push(M);
        }
    }

    buildGraphics(ctx: any) {
        console.log(this.setA);
        const chartA = new Chart(ctx, {
            type: 'line',
            data: {
                labels: this.setM.map(m => m.toString()),
                datasets: [{
                    label: 'amplitude',
                    borderColor: 'red',
                    borderWidth: 1,
                    data: this.setA.map(a => 1 - a),
                }, {
                    label: 'skz 1',
                    borderColor: 'green',
                    borderWidth: 1,
                    data: this.setSKZ_1.map(skz => 0.707 - skz),
                }, {
                    label: 'skz 2',
                    borderColor: 'blue',
                    borderWidth: 1,
                    data: this.setSKZ_2.map(skz => 0.707 - skz),
                }]
            },
        });
    }
}
