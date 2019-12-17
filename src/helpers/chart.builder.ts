import { Chart } from 'Chart.js';

export class ChartBuilder {

    static build(ctx: any, data: number[], label: string, borderColor: string) {

        return new Chart(ctx, {
            type: 'line',
            data: {
                labels: Array.from(Array(data.length).keys()).map(item => item.toString()),
                datasets: [{
                    data,
                    label,
                    borderColor,
                    borderWidth: 1,
                }]
            },
        });
    }
}
