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

let type_clicked;

//enrollment
function total_enrollment() {

    var enrollment = Highcharts.chart('enrollment', {
        chart: {
            type: 'spline'
        },
        title: {
            text: 'Total Enrollment Fall 2013 - Fall 2018',
            style: {
                fontSize: 26
            }
        },

        legend: {
            symbolWidth: 80,
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
                            type_clicked = 'Graduate';
                            display_button();
                            enrolled('graduate', 'Graduate Enrollment');

                        } else {
                            type_clicked = 'Undergraduate';
                            display_button();
                            enrolled('undergraduate', 'Undergraduate Enrollment');
                        };
                    }
                }
            },
            spline: {
                lineWidth: 4,
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
            color: '#FF2A7F'
        }, {
            name: 'Undergraduate',
            data: [1587, 1439, 1450, 1501, 1498, 1404],
            color: '#2A7FFF'
        }]
    });
}

total_enrollment();

function enrolled(type, mytitle) {

    var chartz = Highcharts.chart('enrollment', {
        chart: {
            type: 'spline'
        },
        title: {
            text: mytitle,
            style: {
                fontSize: 26
            }
        },
        legend: {
            symbolWidth: 80,
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
                        display_button();
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
            spline: {
                lineWidth: 4,
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
            name: 'Actual',
            data: [893, 851, 838, 826, 825, 768],
            color: '#FF2A7F'
        }),

            chartz.addSeries({
                name: 'Projected',
                data: [873, 939, 1025, 1000, 971, 1000],
                color: '#FF2A7F',
                dashStyle: 'shortdot'
            })
    } else {
        chartz.addSeries({
            name: 'Actual',
            data: [1587, 1439, 1450, 1501, 1498, 1404],
            color: '#2A7FFF'
        }),

            chartz.addSeries({
                name: 'Projected',
                data: [1746, 1564, 1559, 1566, 1570, 1578],
                color: '#2A7FFF',
                dashStyle: 'shortdot'
            })
    }
}

// additional breakdown; optional display

function enrollment_department(file, mytitle) {
    $.get(file, function (csv) {
        $('#enrollment').highcharts({
            chart: {
                type: 'spline'
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
            exporting: {
                buttons: {
                    customButton: {
                        text: '<< Back',
                        x: -50,
                        onclick: function () {
                            display_button();
                            total_enrollment();
                        }
                    }
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


function display_button() {
    let x = document.getElementById("mybutton");
    if (x.style.display === 'none') {
        x.style.display = 'block';
    } else {
        x.style.display = 'none';
    }

}

var departments = document.querySelector(".btn");
departments.addEventListener('click', function () {
    // departments.innerText = '<< Back';  
    if (type_clicked == 'Graduate') {
        enrollment_department('data/graduate_department.csv', "Graduate Enrollement by Departments");

    } else {

        enrollment_department('data/undergrad_department.csv', "Undergraduate Enrollement by Departments");

    }

});

