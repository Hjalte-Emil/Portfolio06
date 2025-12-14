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
if (ctx){
new Chart(ctx, {
    type: 'bar', // (Horizontal) laver horisontal i options.
    data: {
        labels: labels,
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
            padding: {right: 60} // reserverer 60px til teksten inde i Canvas, så teksten ikke bliver clipped
        },
        scales: {
            y: {
                grid: { display: false },
                ticks: { display: false }
            },
            x: {
                beginAtZero: true,
                max: 60000, // x-akse slutter på 60.000
                grid: { display: false },
                ticks: {
                    stepSize: 5000 /*interval på 5000*/,
                    callback: function(value) {
                        if (value === 0) {
                            return "kr."
                        }
                        return value.toLocaleString();
                    }
                }
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

                /// Formaterer labels fra fx. 40000 til 40.000 kr.
                formatter: function(value, context) {
                    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") +" kr.";
                }}
        }
    },
    plugins: [ChartDataLabels, insideCategoryLabels]
});
}

//GRAF 2 (Lønpotentiale - InfoPage1 HTML)
const ctx2 = document.querySelector('#chart2');
const labels2 = [
    'Hoteller & restauranter',
    'Sundhed & socialvæsen',
    'Handel',
    'Undervisning',
    'Kultur & fritd',
    'Information & kommunikation'
];

const monthlySalaryAll2024 = [39772, 42769, 45905, 49831, 49933, 56141];
const backgroundColors2 = [
    /*'rgba(111,66,193, 0.7)'*/
    'rgba(162,200,196,0.7)',
    'rgba(130,188,181,0.7)',
    'rgba(88,166,159,0.7)',
    'rgba(42,136,127,0.7)',
    'rgba(15,118,110, 0.7)',
    'rgba(111,66,193, 0.7)'
];

if (ctx2){
new Chart(ctx2, {
    type: 'bar',
    data: {
        labels: labels2,
        datasets: [{
            label: 'Månedsløn',
            data: monthlySalaryAll2024,
            backgroundColor: backgroundColors2,
            borderWidth: 0,
            borderRadius: 4, // blødhed af kanter på søjler
            //barThickness: 80, // tykkelsen på søjler
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        layout: {
            //padding: {right: 60} // reserverer 60px til teksten inde i Canvas, så teksten ikke bliver clipped
        },
        scales: {
            y: {
                grid: { display: false },
                ticks: { display: true,
                    stepSize: 5000 /*interval på 5000*/,
                    callback: function(value) {
                        if (value === 0) {
                            return "kr."
                        }
                        return value.toLocaleString();
                    }}
            },
            x: {
                beginAtZero: true,
                //max: 60000, // x-akse slutter på 60.000
                grid: { display: false },
                ticks: { display: true,
                    color: '#17313E',
                    font: {
                        size: 14,
                        weight: 'bold'
                    },
                    maxRotation: 10,
                    minRotation: 0,
                    padding: 4,
                    // callbackfunktion splitter lange navne ved mellemrum
                    callback: function(value, index) {
                        const label = this.getLabelForValue(index);
                        return label.split(" ");
                    }},

            }
        },
        plugins: {
            legend: { display: false },
            tooltip: { enabled: true },
            datalabels: {
                anchor: 'end',
                align: 'end',
                color: '#000',
                font: { weight: 'bold', size: 20 },

                /// Formaterer labels fra fx. 40000 til 40.000 kr.
                formatter: function(value, context) {
                    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") +" kr.";
                }}
        }
    },
    plugins: [ChartDataLabels]
});
}


// GRAF 3 (Lønudviklingen - InfoPage2 HTML)
const ctx3 = document.querySelector('#chart3');
const years = [
    2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024
];
const data = {
    labels: years,
    datasets: [
        {
            label: 'Information og kommunikation',
            data: [
                43416, 43941, 45259, 45212, 46017, 46727, 47840, 48449, 49728, 51246, 53571, 56141
            ],
            borderColor: 'rgba(111,66,193, 1)',
            backgroundColor: 'rgba(111,66,193, 0.2)',
            borderWidth: 4,
            tension: 0,
            pointRadius: 2,
            pointHoverRadius: 30
        },
        {
            label: 'Andre sektorer',
            data: [
                34905, 35362, 35750, 36413, 37335, 37999, 38890, 39850, 40621, 41721, 42977, 46362
            ],
            borderColor: 'rgba(15,118,110, 1)',
            backgroundColor: 'rgba(15,118,110, 0.2)',
            borderWidth: 4,
            tension: 0,
            pointRadius: 2,
            pointHoverRadius: 30
        }
    ]
};

if (ctx3){
new Chart(ctx3, {
    type: 'line',
    data: data,
    options: {
        responsive: true,
        interaction: {
            mode: 'index',
            intersect: false
        },
        plugins: {
            legend: {
                position: 'top',
                labels: {
                    font: {
                        size: 18, // bigger text
                        weight: 'bold'
                    },
                    // tilføjer mellemrum mellem labels i toppen af grafen
                    generateLabels: (chart) => {
                        const datasets = chart.data.datasets;
                        return datasets.map((dataset, i) => ({
                            text: dataset.label + "      ",
                            fillStyle: dataset.borderColor,
                            hidden: !chart.isDatasetVisible(i),
                            datasetIndex: i,
                            // add extra horizontal spacing by modifying text
                            textAlign: 'center',
                            // optional: you could append some spaces or use boxWidth
                            // text: dataset.label + '    ' // adds manual spacing
                        }));
                    }
                }
            },

            // indstillinger til pop-up-boksen
            tooltip: {
                backgroundColor: 'rgba(23, 49, 62, 0.95)',
                titleColor: '#ffffff',
                bodyColor: '#ffffff',

                borderColor: 'rgba(255, 255, 255, 0.15)',
                borderWidth: 1,

                cornerRadius: 12,
                padding: 12,

                titleFont: {
                    size: 14,
                    weight: 'bold'
                },
                bodyFont: {
                    size: 13
                },

                displayColors: true,
                boxPadding: 6,
                titleAlign: 'center',

                // formaterer "År" og "kr." ind i tooltippet
                callbacks: {
                    title: (tooltipItems) => {
                        return `År ${tooltipItems[0].label}`;
                    },
                    label: (context) => {
                        const value = context.parsed.y;
                        return `${context.dataset.label}: ${value.toLocaleString()} kr.`;
                    }
                }
            },
            // viser den procentuelle stigning i lønnen hvert år over hvert punkt i grafen
            datalabels: {
                color: '#17313E',
                anchor: 'end',
                align: 'top',
                font: {
                    size: 14,
                    weight: 'bold'
                },
                display: function(context) {
                    const index = context.dataIndex;
                    const totalPoints = context.chart.data.labels.length;

                    // starter display fra index 1 (år 2014)
                    return index > 0;
                },
                formatter: function(value, context) {
                    const dataset = context.dataset.data;
                    const index = context.dataIndex;

                    // tom plads for index 0 (år 2013)
                    if (index === 0) return '';

                    const prevValue = dataset[index - 1];
                    const increase = ((value - prevValue) / prevValue) * 100;

                    // returnerer med 1 decimal.
                    return increase.toFixed(1) + '%';
                }

            }
        },
        scales: {
            y: {
                ticks: {
                    callback: function(value,index) {
                        if (index === 0) {
                            return "kr."
                        }
                        return value.toLocaleString();
                    }
                },
                grid: {display: true}
            },
            x: {
                grid: {display: false}
            }
        },

    },
    plugins: [ChartDataLabels]
});
}
