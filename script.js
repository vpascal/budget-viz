// Define a few vars
var zoom;

//table row highlihgt

function row_highlight(){
$('table tr').each(function(a,b){
    $(b).click(function(){
         $('table tr').css('background','#ffffff');
         $(this).css('background','#ffbb00');   
    });
});
}


// funnel summary

function funnel(){
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

  row_highlight(); 

};

// allocations

function allocation(file, title){

$.get(file, function(csv) {
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
            }}},

        yAxis: {
            title: {
                text: 'Amount'
            }
        }
    });
});

row_highlight();

};


// revenue

function gross_revenue(file, title){

zoom = "gross_revenue('revenue.csv","Gross Revenue by Department')";

$.get(file, function(csv) {
    $('#stage').highcharts({
        chart: {
            type: 'line'
        },
        data: {
            csv: csv
        },
        title: {
            text:  title,
            style: {
            fontSize: 22
            } 
        },
        xAxis: {
         labels:{
           style: {
            fontSize: 18
          }
        }
      },
        yAxis: {
            title: {
                text: 'Revenue'
            },
            labels:{
              style: {
                fontSize: 16
              }
            }
        }
    });
});

 row_highlight();

};

// gross revenue

var revenue_aftertax = gross_revenue;

// pie chart

function piechart(){

 row_highlight(); 

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
        color:'#000000',
        connectorColor: '#000000',
        format: '{point.name}: {point.percentage: .1f}%  <br> Amount:' +'$'+'{point.y: ,.0f}',
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
                        if(this.name =='Centers and Programs'){
                            allocation('allocation.csv','College Allocations by Centers and Programs');
                        } else {
                            allocation('depart_allocation.csv','College Allocations by Departments')
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


})};



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

