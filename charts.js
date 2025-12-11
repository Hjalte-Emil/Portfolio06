//GRAF 1 (Lønpotentiale - InfoPage1 HTML)
const ctx = document.querySelector('#chart1');
const labels = [
    'Information og kommunikation',
    'Andre sektorer'
];

const monthlySalary2024 = [56141, 45642];
const backgroundColors = [
    'rgba(111,66,193, 0.7)',

    'rgba(15,118,110, 0.7)'
];

/// Brugt AI til at lave et plugin, der kan display labelnavne inde i de horisontale søjler.
// Plugin to draw category labels inside horizontal bars
const insideCategoryLabels = {
    id: 'insideCategoryLabels',
    afterDatasetsDraw(chart, args, options) {
        const { ctx, chartArea, scales: { x, y } } = chart;
        // Safety: ensure scale bandwidth exists (category scale)
        const band = y.getBandWidth ? y.getBandWidth() : (y.getBandwidth ? y.getBandwidth() : 0);

        chart.data.labels.forEach((label, index) => {
            // center Y for the bar
            const barCenterY = y.getPixelForValue(index) + band / 2;

            // compute left inside position: a little inside the "start" of the bar area
            // find the pixel for the axis minimum (not always 0)
            const axisMinValue = x.min ?? 0;
            const leftOfBar = x.getPixelForValue(axisMinValue);
            const paddingInside = options.padding || 20;
            const xPos = leftOfBar + paddingInside;

            // if label would overflow the bar (optional): we don't measure bar width here,
            // we just ensure text is visible inside the chart area
            ctx.save();
            ctx.font = options.font || 'bold 1.5rem sans-serif';
            ctx.textBaseline = 'middle';
            ctx.textAlign = 'left';
            ctx.fillStyle = '#fff';
            // Draw the label
            ctx.fillText(label, xPos, barCenterY);
            ctx.restore();
        });
    }
};
///

new Chart(ctx, {
    type: 'bar', // (Horizontal) laver horisontal i options.
    data: {
        labels,
        datasets: [{
            label: 'Månedsløn',
            data: monthlySalary2024,
            backgroundColor: backgroundColors,
            borderWidth: 0,
            borderRadius: 4, // blødhed af kanter på søjler
            barThickness: 80, // tykkelsen på søjler
        }]
    },
    options: {
        indexAxis: 'y', // horizontal bars
        responsive: true,
        maintainAspectRatio: false,
        layout: {
            //padding: {right: 60} // reserverer 60px til teksten inde i Canvas, så teksten ikke bliver clipped
        },
        scales: {
            y: {
                grid: { display: false },
                ticks: { display: false }
            },
            x: {
                beginAtZero: true,
                //max: 60000, // x-akse slutter på 60.000
                grid: { display: false },
                ticks: { stepSize: 5000 } // interval på 5000
            }
        },
        plugins: {
            legend: { display: false },
            tooltip: { enabled: true },
            datalabels: {
                anchor: 'end',
                align: 'right',
                color: '#000',
                font: { weight: 'bold', size: 20 },

                /// Formaterer labels fra fx. 40000 til 40.000
                formatter: function(value, context) {
                    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
            }}
        }
    },
    plugins: [ChartDataLabels, insideCategoryLabels]
});
