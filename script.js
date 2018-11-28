'use strict';
// Define a few vars
var zoom;

//table row highlihgt


$('table tr').each(function (a, b) {
    $(b).click(function () {
        $('table tr').css('background', '#ffffff');
        $(this).css('background', '#ffbb00');
    });
});



// funnel summary

function funnel() {
    Highcharts.chart('stage', {
        chart: {
            type: 'funnel'
        },
        title: {
            text: 'Revenue Summary 2016-17',
            style: {
                fontSize: 22
            }
        },
        plotOptions: {
            series: {
                dataLabels: {
                    enabled: true,
                    format: '<b>{point.name}</b> ({point.y:,.0f})',
                    color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black',
                    softConnector: true,
                    style: {
                        fontSize: 17,
                        fontWeight: 200,
                        lineHeight: 20
                    }
                },
                center: ['35%', '50%'],
                neckWidth: '20%',
                neckHeight: '15%',
                width: '45%'
            }
        },
        colors: ["#ff3d00", "#ffc400", "#616161"],
        legend: {
            enabled: false
        },
        series: [{
            name: 'Amount',
            data: [
                ['Gross Revenue', 3632853],
                ['Revenue After Taxes', 3178745],
                ['Net College Revenue', 2464927]
            ]
        }]
    });
    zoom = 'funnel';

};

// allocations

function allocation(file, title) {

    $.get(file, function (csv) {
        $('#stage').highcharts({
            chart: {
                type: 'bar'

            },

            data: {
                csv: csv
            },

            title: {
                text: title
            },

            plotOptions: {
                series: {
                    color: '#f15c80'
                }
            },


            exporting: {
                buttons: {
                    customButton: {
                        text: '<< Back',
                        x: -50,
                        onclick: function () {
                            piechart();
                        }
                    }
                }
            },

            yAxis: {
                title: {
                    text: 'Amount'
                }
            }
        });
    });

};


// revenue

function gross_revenue(file, title) {

    $.get(file, function (csv) {
        $('#stage').highcharts({
            chart: {
                type: 'line'
            },
            data: {
                csv: csv
            },
            title: {
                text: title,
                style: {
                    fontSize: 22
                }
            },
            xAxis: {
                labels: {
                    style: {
                        fontSize: 18
                    }
                }
            },
            yAxis: {
                title: {
                    text: 'Revenue'
                },
                labels: {
                    style: {
                        fontSize: 16
                    }
                }
            }
        });
    });

    zoom = "gross_revenue('data/revenue.csv','Gross Revenue by Department')";


};

// gross revenue

var revenue_aftertax = gross_revenue;

// pie chart

function piechart() {

    zoom = 'piechart';

    Highcharts.chart('stage', {
        chart: {
            type: 'pie',
            options3d: {
                enabled: true,
                alpha: 45,
                beta: 0
            }
        },


        title: {
            text: 'Departmental and Center Allocations: 2016-17',
            style: {
                fontSize: 22
            }
        },

        subtitle: {
            text: 'Click to drill down'
        },

        tooltip: {
            valuePrefix: "$",
            pointFormat: '{series.name}: {point.percentage:.1f}%  <br> Amount: {point.y} '
        },

        plotOptions: {
            pie: {
                allowPointSelect: true,
                depth: 35,
                cursor: 'pointer',
                dataLabels: {
                    enabled: true,
                    color: '#000000',
                    connectorColor: '#000000',
                    format: '{point.name}: {point.percentage: .1f}%  <br> Amount:' + '$' + '{point.y: ,.0f}',
                    style: {
                        fontSize: 17,
                        fontWeight: 200,
                        lineHeight: 20
                    }
                },
                showInLegend: true,
                point: {
                    events: {
                        click: function () {
                            if (this.name == 'Centers and Programs') {
                                allocation('data/allocation.csv', 'College Allocations by Centers and Programs');
                            } else {
                                allocation('data/depart_allocation.csv', 'College Allocations by Departments')
                            };
                        }
                    }
                }
            }
        },


        series: [{
            name: 'Percent',
            colorByPoint: true,
            data: [{
                name: 'Departments',
                color: '#FF6107',
                y: 1699207
            }, {
                name: 'Centers and Programs',
                color: '#429FFD',
                y: 864433
            }]
        }]


    })
};

//Events

$(window).ready(function () {
    funnel();
});


$('#zoom').click(function () {
    $('#summary').toggle();
    $('#stage').toggleClass('fullscreen');
    window[zoom]().reflow();
});

$('#plus').click(function () {
    $('#stage').toggle();
    $('#summary').toggleClass('fullscreen');
    $(this).toggleClass('w3-text-orange');
    $('table').toggleClass('w3-large');
    $('table').toggleClass('w3-xlarge');
    $('#zoom').toggle();
});


$('th').click(function () {
    funnel();
});


$('#revenue').click(function () {

    gross_revenue("data/revenue.csv", "Gross Revenue by Department");
});


$('#aftertax').click(function () {
    revenue_aftertax("data/aftertax.csv", "Revenue After University Taxes");
});



$('#pie').click(function () {
    piechart();
});



//enrollment
function total_enrollment() {

    var enrollment = Highcharts.chart('enrollment', {
        chart: {
            type: 'area'
        },
        title: {
            text: 'Total Enrollment Fall 2013 - Fall 2018',
            style: {
                fontSize: 26
            }
        },

        legend: {
            itemStyle: {
                fontSize: 22,
                fontWeight: 400
            }
        },
        xAxis: {
            categories: ['2013', '2014', '2015', '2016', '2017', '2018'],
            crosshair: true,
            tickmarkPlacement: 'on',
            labels: {
                style: {
                    fontSize: '22px'
                }
            },
            title: {
                enabled: false
            }
        },
        yAxis: {
            labels: {
                style: {
                    fontSize: '22px'
                }
            },
            title: {
                text: 'Headcount'
            },
        },
        tooltip: {
            shared: true,
            useHTML: true,
            headerFormat: '<small>{point.key}</small><table><tr><td style="color: "black"">Total: </td>' +
                '<td style="text-align: right"><b>{point.total}</b></td></tr>',
            pointFormat:
                '<tr><td style="color: "black"">{series.name}: </td>' +
                '<td style="text-align: right"><b>{point.y}</b></td></tr>',
            footerFormat: '</table>',
            style: {
                fontSize: '22px'
            }


        },
        plotOptions: {
            series: {
                fillOpacity: 1,
                animation: {
                    duration: 2000
                },
                cursor: 'pointer',
                events: {
                    click: function () {
                        if (this.name == 'Graduate') {
                            enrolled('graduate', 'Graduate Enrollment');
                        } else {
                            enrolled('undergraduate', 'Undergraduate Enrollment');
                        };
                    }
                }
            },
            area: {
                stacking: 'normal',
                lineWidth: 2,
                marker: {
                    radius: 6,
                    lineWidth: 1,
                    lineColor: '#FFFFFF'
                }
            }
        },
        series: [{
            name: 'Graduate',
            data: [893, 851, 838, 826, 825, 768],
            color: '#EF8949'
        }, {
            name: 'Undergraduate',
            data: [1587, 1439, 1450, 1501, 1498, 1404],
            color: '#FDDD7A'
        }]
    });
}

total_enrollment();

function enrolled(type, mytitle) {

    var chartz = Highcharts.chart('enrollment', {
        chart: {
            type: 'line'
        },
        title: {
            text: mytitle,
            style: {
                fontSize: 26
            }
        },
        legend: {
            itemStyle: {
                fontWeight: 400,
                fontSize: 22
            }
        },
        xAxis: {
            categories: ['2013', '2014', '2015', '2016', '2017', '2018'],
            crosshair: true,
            tickmarkPlacement: 'on',
            labels: {
                style: {
                    fontSize: '22px'
                }
            },
            title: {
                enabled: false
            }
        },
        yAxis: {
            min: 0,
            labels: {
                style: {
                    fontSize: '22px'
                }
            },
            title: {
                text: 'Headcount'
            },
        },
        tooltip: {
            shared: true,
            useHTML: true,
            headerFormat: '<small>{point.key}</small><table>',
            pointFormat:
                '<tr><td style="color: "black"">{series.name}: </td>' +
                '<td style="text-align: right"><b>{point.y}</b></td></tr>',
            footerFormat: '</table>',
            style: {
                fontSize: '22px'
            }


        },
        series: [],

        exporting: {
            buttons: {
                customButton: {
                    text: '<< Back',
                    x: -50,
                    onclick: function () {
                        total_enrollment();
                    }
                }
            }
        },

        plotOptions: {
            series: {
                fillOpacity: 1,
                animation: {
                    duration: 2000
                },
                cursor: 'pointer'
            },
            line: {
                lineWidth: 2,
                marker: {
                    radius: 6,
                    lineWidth: 1,
                    lineColor: '#FFFFFF'
                }
            }
        }
    });

    if (type == 'graduate') {
        chartz.addSeries({
            name: 'Graduate: Actual',
            data: [893, 851, 838, 826, 825, 768],
            color: '#EF8949'
        }),

            chartz.addSeries({
                name: 'Graduate: Projected',
                data: [873, 939, 1025, 1000, 971, 1000],
                color: '#00B2EE'
            })
    } else {
        chartz.addSeries({
            name: 'Undergraduate: Actual',
            data: [1587, 1439, 1450, 1501, 1498, 1404],
            color: '#EF8949'
        }),

            chartz.addSeries({
                name: 'Undergraduate: Projected',
                data: [1746, 1564, 1559, 1566, 1570, 1578],
                color: '#00B2EE'
            })
    }
}

// additional breakdown; optional display

function enrollment_department(file, mytitle) {

    $.get(file, function (csv) {
        $('#enrollment').highcharts({
            chart: {
                type: 'line'
            },
            data: {
                csv: csv
            },
            title: {
                text: mytitle,
                style: {
                    fontSize: 22
                }
            },
            legend: {
                itemStyle: {
                    fontSize: 22,
                    fontWeight: 400
                }
            },
            xAxis: {
                categories: ['2013', '2014', '2015', '2016', '2017', '2018'],
                crosshair: true,
                tickmarkPlacement: 'on',
                labels: {
                    style: {
                        fontSize: '22px'
                    }
                },
                title: {
                    enabled: false
                }
            },
            yAxis: {
                title: {
                    text: 'Revenue'
                },
                labels: {
                    style: {
                        fontSize: 16
                    }
                }
            }
        });
    });

};
