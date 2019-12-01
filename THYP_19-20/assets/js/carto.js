// Merci à "https://stackoverflow.com/questions/54773945/amcharts-4-drill-map-get-country-iso-code" pour l'utilisaition des ISO code

var chart = am4core.create("carto", am4maps.MapChart);
var groupData = [
  {
    "name": "Pays visité 1 fois",
    "color": "#797979",
    "data": [
      {
        "title": "Espagne",
        "id": "ES", 
        "customData": "1"
      },
    {
        "title": "Italie",
        "id": "IT",
        "customData": "1"
      },
    {
        "title": "Angleterre",
        "id": "GB",
        "customData": "1"
      },
    {
        "title": "Allemagne",
        "id": "DE",
        "customData": "1"
      }, 
    {
        "title": "Maroc",
        "id": "MA",
        "customData": "1"
      },  
    {
        "title": "Egypte",
        "id": "EG",
        "customData": "1"
      },  
    {
        "title": "Jordanie",
        "id": "JO",
        "customData": "1"
      }, 
    {
        "title": "Luxembourg",
        "id": "LU",
        "customData": "1"
      }, 
    ]
  },
  {
    "name": "Pays visité 2 fois",
    "color": "#313841",
    "data": [
 	{
        "title": "Arabie-Saoudite",
        "id": "SA",
        "customData": "2"
      }    
    ]
  },
  {
    "name": "Pays visité 3 fois ou plus",
    "color": "#3F5B57",
    "data": [
      {
        "title": "Algerie",
        "id": "DZ",
        "customData": "plus de 3"
      },
      {
        "title": "France",
        "id": "FR",
        "customData": "Plus de 3 "
      },
    ]
  }
];
var excludedCountries = ["AQ"];

am4core.ready(function() {
am4core.useTheme(am4themes_animated);

chart.geodata = am4geodata_worldLow;
chart.projection = new am4maps.projections.Miller();
chart.exporting.menu = new am4core.ExportMenu();
chart.zoomControl = new am4maps.ZoomControl();
chart.homeZoomLevel = 2.5;
chart.homeGeoPoint = { longitude: 40, latitude: 40 };

var homeButton = new am4core.Button();
homeButton.events.on("hit", function() {
  chart.goHome();
});

homeButton.icon = new am4core.Sprite();
homeButton.padding(7, 5, 7, 5);
homeButton.width = 30;
homeButton.icon.path = "M16,8 L14,8 L14,16 L10,16 L10,10 L6,10 L6,16 L2,16 L2,8 L0,8 L8,0 L16,8 Z M16,8";
homeButton.marginBottom = 10;
homeButton.parent = chart.zoomControl;
homeButton.insertBefore(chart.zoomControl.plusButton);

groupData.forEach(function(group) {
  var series = chart.series.push(new am4maps.MapPolygonSeries());
  series.name = group.name;
  series.useGeodata = true;
  var includedCountries = [];
  group.data.forEach(function(country) {
    includedCountries.push(country.id);
    excludedCountries.push(country.id);
  });
  series.include = includedCountries;

  series.fill = am4core.color(group.color);

  series.setStateOnChildren = true;
  series.calculateVisualCenter = true;

  var mapPolygonTemplate = series.mapPolygons.template;
  mapPolygonTemplate.fill = am4core.color(group.color);
  mapPolygonTemplate.fillOpacity = 0.8;
  mapPolygonTemplate.nonScalingStroke = true;
  mapPolygonTemplate.tooltipPosition = "fixed";


  mapPolygonTemplate.events.on("out", function(event) {
    series.mapPolygons.each(function(mapPolygon) {
      mapPolygon.isHover = false;
    })
  })
 
  var hoverState = mapPolygonTemplate.states.create("hover");
  hoverState.properties.fill = am4core.color("#878484");

  mapPolygonTemplate.tooltipText = "{title} visité {customData} fois"; 
  series.data = JSON.parse(JSON.stringify(group.data));
});

var series = chart.series.push(new am4maps.MapPolygonSeries());
var seriesName = "Pays non visités";
series.name = seriesName;
series.useGeodata = true;
series.exclude = excludedCountries;
series.fillOpacity = 0.5;
series.hiddenInLegend = true;
series.color = "white"
series.mapPolygons.template.nonScalingStroke = true;
series.mapPolygons.template.tooltipText = "{name}";

chart.legend = new am4maps.Legend();
chart.legend.paddingLeft = 27;
chart.legend.paddingRight = 27;
chart.legend.marginBottom = 15;
chart.legend.width = am4core.percent(90);
chart.legend.valign = "bottom";
chart.legend.contentAlign = "left";
chart.legend.color = "white";


chart.legend.itemContainers.template.interactionsEnabled = false;

}); 