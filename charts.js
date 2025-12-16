//GRAF 1 (Lønpotentiale - InfoPage1 HTML)
let chart1;
const ctx = document.querySelector('#chart1');
const labels = [
    'Information og kommunikation',
    'Andre sektorer'
];

//const monthlySalary2024 = [56141, 45642];
// fallback værdier
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
// fetch til første søjle
fetch('http://localhost:3000/2024/it')
    .then(res => res.json())
    .then(data => {
        // opdaterer graf-indhold hvis json-propertien har en talværdi, og hvis grafen allerede eksisterer (med fallback værdier).
        if (typeof data?.y2024 === 'number' && chart1) {
            chart1.data.datasets[0].data[0] = data.y2024;
            chart1.update();
        }
    })
    .catch(() => {
    });

// fetch til anden søjle
fetch('http://localhost:3000/2024/otherSectors')
    .then(res => res.json())
    .then(data => {
        // opdaterer graf-indhold hvis json-propertien har en talværdi, og hvis grafen allerede eksisterer (med fallback værdier).
        if (typeof data?.y2024 === 'number' && chart1) {
            chart1.data.datasets[0].data[1] = data.y2024;
            chart1.update();
        }
    })
    .catch(() => {
    });
// Graferne i chart.js ændrer sig ikke dynamisk, hvis deres talværdier bliver ændret. Derfor er det nødvendigt med chart.update()

if (ctx){
chart1 = new Chart(ctx, {
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
                //max: 60000, // x-akse slutter på 60.000
                grid: { display: false },
                ticks: {
                    stepSize: 5000 /*interval på 5000*/,

                    // sætter "kr." på index 0 på x-aksen
                    callback: function(value,index) {
                        if (index === 0) {
                            return "kr."
                        }
                        // .toLocaleString() formaterer values til DK-syntaks. Fx. 5000 --> 5.000 eller 25000 --> 25.000
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
                formatter: function(value) {
                    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") +" kr.";
                }}
        }
    },
    plugins: [ChartDataLabels, insideCategoryLabels]
});
}

//GRAF 2 (Lønpotentiale - InfoPage1 HTML)
let chart2;
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
    'rgba(162,200,196,0.7)',
    'rgba(130,188,181,0.7)',
    'rgba(88,166,159,0.7)',
    'rgba(42,136,127,0.7)',
    'rgba(15,118,110, 0.7)',
    'rgba(111,66,193, 0.7)'
];

if (ctx2){
chart2 = new Chart(ctx2, {
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
                    stepSize: 5000, // interval på 5000,
                    callback: function(value, index) {
                        if (index === 0) {
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
                    maxRotation: 90,
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
                formatter: function(value) {
                    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") +" kr.";
                }}
        }
    },
    plugins: [ChartDataLabels]
});
}


// GRAF 3 (Lønudviklingen - InfoPage2 HTML)
let chart3;
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
chart3 = new Chart(ctx3, {
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
                    /// AI til at lave custom labels, så mellemrum visuelt kan tilføjes
                    // tilføjer mellemrum mellem labels i toppen af grafen
                    generateLabels: (chart) => {
                        const datasets = chart.data.datasets;
                        return datasets.map((dataset, i) => ({
                            text: dataset.label + "      ", // manuel spacing mellem labels her
                            fillStyle: dataset.borderColor,
                            hidden: !chart.isDatasetVisible(i),
                            datasetIndex: i,
                            textAlign: 'center',
                        }));
                    }
                }
            },

            // indstillinger til pop-up-boksen
            tooltip: {
                backgroundColor: 'rgba(23, 49, 62, 0.95)',
                titleColor: '#fff',
                bodyColor: '#fff',

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

                    // starter display fra index 1 (år 2014)
                    return index > 0;
                },
                formatter: function(value, context) {
                    const dataset = context.dataset.data;
                    const index = context.dataIndex;

                    // tom plads for index 0 (år 2013)
                    if (index === 0) return '';

                    // udregner procent difference
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


let chart4;
const sectorLabels = {
    id: 'sectorLabels',
    afterDatasetsDraw(chart, args, pluginOptions = {}) {
        const { ctx } = chart;

        if (!pluginOptions.itText || !pluginOptions.mediaText) return;

        const metaBottom = chart.getDatasetMeta(0);
        const metaTop    = chart.getDatasetMeta(1);

        if (!metaBottom?.data?.length || !metaTop?.data?.length) return;

        metaBottom.data.forEach((barBottom, index) => {
            const barTop = metaTop.data[index];
            if (!barTop) return;

            const bottom = barBottom.base;
            const top    = barTop.y;

            const midY = (top + bottom) / 2;
            const x = barBottom.x;

            const text =
                index === 0
                    ? pluginOptions.itText
                    : pluginOptions.mediaText;


            if (typeof text !== 'string') return;

            const lines = text.split('\n');
            const lineHeight = 12;
            const startY = midY - ((lines.length - 1) * lineHeight) / 2;

            ctx.save();
            ctx.fillStyle = '#ffffff';
            ctx.font = 'bold 10px Arial';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';

            lines.forEach((line, i) => {
                ctx.fillText(line, x, startY + i * lineHeight);
            });

            ctx.restore();
        });
    }
};

Chart.register(sectorLabels);

// Chart for query 2.
async function loadChart2() {
    const res = await fetch('http://localhost:3000/studie/uddannelse');
    const rows = await res.json();

    const itDegrees = [
        'Datamatiker',
        'Økonomi og it',
        'PB i IT-arkitektur'
    ];

    const mediaDegrees = [
        'Multimediedesign',
        'Designteknolog',
        'PB indenfor Design og business'
    ];

    const labels = ['Kønsfordeling på IT-uddannelser', 'Kønsfordeling på Medieuddannelser'];

    // Summen af alt så jeg kan få listen af uddannelser samt køn.
    function sumFor(degreeList, gender) {
        return rows.reduce((sum, r) => {
            const isDegree = degreeList.includes(r.INSTITUTIONSAKT_BETEGNELSE);
            const isGender = r.Køn === gender;
            return isDegree && isGender ? sum + r.Antal : sum;
        }, 0);
    }

    // Her får jeg det reelle antal af studerende for hver uddannelse, så jeg kan konverter til procent.
    const itWomen  = sumFor(itDegrees, 'Kvinde');
    const itMen    = sumFor(itDegrees, 'Mand');
    const medWomen = sumFor(mediaDegrees, 'Kvinde');
    const medMen   = sumFor(mediaDegrees, 'Mand');

    // Her ville jeg konvertere til procent per sektor, så hver bar giver 100%
    const itTotal    = itWomen + itMen;
    const mediaTotal = medWomen + medMen;

    const womenData = [
        itTotal    ? (itWomen  / itTotal)    * 100 : 0,  // IT - Få de rigtige procent frem for hver sektor & køn
        mediaTotal ? (medWomen / mediaTotal) * 100 : 0   // Media - Få de rigtige procent frem for hver sektor & køn
    ];

    const menData = [
        itTotal    ? (itMen  / itTotal)    * 100 : 0,    // IT - Samme her få de rigtige procent frem for hver sektor & køn
        mediaTotal ? (medMen / mediaTotal) * 100 : 0     // Media - Samme her få de rigtige procent frem for hver sektor & køn
    ];

    const ctx4 = document.getElementById('chart4').getContext('2d');
    if(ctx4){
    chart4 = new Chart(ctx4, {
        type: 'bar',
        data: {
            labels,
            datasets: [
                {
                    label: 'Kvinde',
                    data: womenData,
                    backgroundColor: '#d491e8'
                },
                {
                    label: 'Mand',
                    data: menData,
                    backgroundColor: '#3b82f6'
                }
            ]
        },
        options: {
            responsive: true,
            plugins: {
                tooltip: {
                    callbacks: {
                        label: (context) => {
                            const label = context.dataset.label || '';
                            const value = context.parsed.y;
                            const rounded = Math.round(value);
                            return `${label}: ${rounded}%`;
                        }
                    }
                },
                sectorLabels: {
                    itText: itDegrees.join('\n'),
                    mediaText: mediaDegrees.join('\n')
                }
            },
            scales: {
                x: { stacked: true},
                y: {
                    stacked: true,
                    beginAtZero: true,
                    max: 100,
                    title: { display: true, text: 'Målt i procent' }
                }
            }
        }
    });
}}
document.addEventListener('DOMContentLoaded', () => {
    loadChart2();
});

