var graph;

const data = [
    {
        x: 1617253200000,
        y: 10.5
    },
    {
        x: 1617256800000,
        y: 34
    },
    {
        x: 1617290900000,
        y: 12
    }
];

const config = {
    responsive: true,
    clip:false,
    plugins: {
        tooltip: {
            callbacks: {
                title: function (context) {
                    const timeString = new Date(context[0].parsed.x).toLocaleTimeString(navigator.language, {
                        hour: '2-digit',
                        minute: '2-digit'
                    })

                    return timeString
                }
            }
        },
        dragData: {
            round: 1,
            dragX: true,
            showTooltip: true,
            onDragStart: function (e, datasetIndex, index, value) {
            },
            onDrag: function (e, datasetIndex, index, value) {
                e.target.style.cursor = 'grabbing'
                // allow dragging within 10 minute range
                const coeff = 600000; //1000 * 60 * 10;
                const rounded = Math.round(value.x / coeff) * coeff
                const roundedY = Math.round(value.y*2)/2;
                graph.data.datasets[datasetIndex].data[index].x = rounded
                graph.data.datasets[datasetIndex].data[index].y = roundedY
            },
            onDragEnd: function (e, datasetIndex, index, value) {
                e.target.style.cursor = 'default'
            },
        },
    },
    scales: {
        x: {
            type: 'linear',
            min: 1617228000000,
            max: 1617314400000,
            ticks: {
                callback(v) {
                    return new Date(v).toLocaleTimeString(navigator.language, {
                        hour: '2-digit',
                        minute: '2-digit'
                    })
                },
            }
        },
        y: {
            beginAtZero: true,
            steps: 0.5,
            stepValue: 0.5,
            max: 35
        },
    }
};

(function() {
    var ctx = document.querySelector("#myChart");
    graph = new Chart(ctx, {
        type: 'line',
        data: {
    
            datasets: [{
                label: "Heat graph",
                data,
                stepped: true,
                borderWidth: 2.5,
                fill: false,
                pointRadius: 10,
                pointHitRadius: 26,
                showLine: true
            }]
        },
        options: config
    });
})();