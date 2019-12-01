	Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJmZDU4ZTc1Ny1lNzY1LTRjZTUtYTRiNi01NDUyNTgxMzk5ZDAiLCJpZCI6MTc3NDQsInNjb3BlcyI6WyJhc3IiLCJnYyJdLCJpYXQiOjE1NzI3MTMzMDR9.ZNbowgR4cEYZ_ZbP_5hWxiZklesGmb_eil0Wwvfxg-A';
    
    var viewer = new Cesium.Viewer('cesium');

    viewer.fitBounds(country.getBounds);

    viewer.dataSources.add(Cesium.GeoJsonDataSource.load('assets/js/countries/3_visites.json',{
        stroke: Cesium.Color.RED,
        fill: Cesium.Color.RED.withAlpha(0.5),
        strokeWidth: 3
    }));    

    viewer.dataSources.add(Cesium.GeoJsonDataSource.load('assets/js/countries/2_visites.json',{
        stroke: Cesium.Color.CORAL,
        fill: Cesium.Color.CORAL.withAlpha(0.5),
        strokeWidth: 3
    }));

    viewer.dataSources.add(Cesium.GeoJsonDataSource.load('assets/js/countries/1_visite.json',{
        stroke: Cesium.Color.YELLOW,
        fill: Cesium.Color.YELLOW.withAlpha(0.5),
        strokeWidth: 3
    }));