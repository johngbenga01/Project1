// Initialise map
var map = L.map('map',{

 
}).setView([6.52, 3.53 ], 10);

//Test

L.DomUtil.setOpacity(map.zoomControl.getContainer(), 100); // set opacity of zoom buttons

// Add Esri tile layer
//var esri = L.esri.basemapLayer('Topographic').addTo(map)

// Add osm tile layer to map
var osm = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: "ESA, Open Street Map"
   
}).addTo(map);

var googleStreets = L.tileLayer('http://{s}.google.com/vt?lyrs=m&x={x}&y={y}&z={z}', {
    maxZoom: 20,
    subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
    attribution: "ESA, Google"
});

var googleTraffic = L.tileLayer('https://{s}.google.com/vt/lyrs=m@221097413,traffic&x={x}&y={y}&z={z}', {
        maxZoom: 20,
        minZoom: 2,
        subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
    });

var googleHybrid = L.tileLayer('http://{s}.google.com/vt?lyrs=s,h&x={x}&y={y}&z={z}', {
    maxZoom: 20,
    subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
    attribution: "ESA, Google"
});

var googleSat = L.tileLayer('http://{s}.google.com/vt?lyrs=s&x={x}&y={y}&z={z}', {
    maxZoom: 20,
    subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
    attribution: "ESA, Google"
}) //.addTo(map);


var googleTerrain = L.tileLayer('http://{s}.google.com/vt?lyrs=p&x={x}&y={y}&z={z}', {
    maxZoom: 20,
    subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
    attribution: "ESA, Google"
});


//var marker = L.marker([7, -1.09]).addTo(map)

// Styling of layers
var waterStyle = {
    color: null,
    opacity: 100,
    fill: true,
    fillColor: "#0064c8",
    weight: 1,
    fillOpacity: 100

};


var grasslandStyle = {
    color: null,
    opacity: 100,
    fill: true,
    fillColor: "#ffff4c",
    weight: 1,
    fillOpacity: 100

};


var builtupStyle = {
    color: null,
    opacity: 100,
    fill: true,
    fillColor: "#fa0000",
    weight: 1,
    fillOpacity: 100

};


var croplandStyle = {
    color: null,
    opacity: 100,
    fill: true,
    fillColor: "#f096ff",
    weight: 1,
    fillOpacity: 100

};


var treesStyle = {
    color: null,
    opacity: 100,
    fill: true,
    fillColor: "#006400",
    weight: 1,
    fillOpacity: 100

};


var shrublandStyle = {
    color: null,
    opacity: 100,
    fill: true,
    fillColor: "#ffbb22",
    weight: 1,
    fillOpacity: 100

};

var lagosStyle = {
    color: "black",
    opacity: 100,
    fill: true,
    fillColor: "#ffbb22",
    weight: 1,
    fillOpacity: 0

};



// Add Geojson Layers

var lagosLayer = L.geoJson(lagos, {
    style: lagosStyle,
    onEachFeature: function(feature, layer) {
        area = (turf.area(feature)/1000000).toFixed(3)
        center_lng = turf.center(feature).geometry.coordinates[0].toFixed(2)
        center_lat = turf.center(feature).geometry.coordinates[1].toFixed(2)

        label = `LGA Name: ${feature.properties.NAME_2} <br>`
        label += `State: ${feature.properties.NAME_1} <br>`
        label += `CRS Area: ${area} sqkm <br>`
        label += `Center: ${center_lng} (x), ${center_lat} (y)<br>`

        layer.bindPopup(label)
    }


}).addTo(map)

var waterLayer = L.geoJson(water, {
    style: waterStyle,
    onEachFeature: function(feature, layer) {
        area = (turf.area(feature)/1000000).toFixed(3)
        center_lng = turf.center(feature).geometry.coordinates[0].toFixed(2)
        center_lat = turf.center(feature).geometry.coordinates[1].toFixed(2)

        label = `LC Type: Water (Total)<br>`
        label += `GEE Area: ${feature.properties.dimension} sqkm<br>`
        label += `CRS Area: ${area} sqkm <br>`
        label += `Center: ${center_lng} (x), ${center_lat} (y)<br>`

        layer.bindPopup(label)
    }


}).addTo(map)


var grasslandLayer = L.geoJson(grassland, {
    style: grasslandStyle,
    onEachFeature: function(feature, layer) {
        area = (turf.area(feature)/1000000).toFixed(3)
        center_lng = turf.center(feature).geometry.coordinates[0].toFixed(2)
        center_lat = turf.center(feature).geometry.coordinates[1].toFixed(2)

        label = `LC Type: Grassland (Total)<br>`
        label += `GEE Area: ${feature.properties.dimension} sqkm<br>`
        label += `CRS Area: ${area} sqkm <br>`
        label += `Center: ${center_lng} (x), ${center_lat} (y)<br>`

        layer.bindPopup(label)
    }


}).addTo(map)


var builtupLayer = L.geoJson(builtup, {
    style: builtupStyle,
    onEachFeature: function(feature, layer) {
        area = (turf.area(feature)/1000000).toFixed(3)
        center_lng = turf.center(feature).geometry.coordinates[0].toFixed(2)
        center_lat = turf.center(feature).geometry.coordinates[1].toFixed(2)

        label = `LC Type: Built up (Total)<br>`
        label += `GEE Area: ${feature.properties.dimension} sqkm<br>`
        label += `CRS Area: ${area} sqkm <br>`
        label += `Center: ${center_lng} (x), ${center_lat} (y)<br>`

        layer.bindPopup(label)
    }


}).addTo(map)


var croplandLayer = L.geoJson(cropland, {
    style: croplandStyle,
    onEachFeature: function(feature, layer) {
        area = (turf.area(feature)/1000000).toFixed(3)
        center_lng = turf.center(feature).geometry.coordinates[0].toFixed(2)
        center_lat = turf.center(feature).geometry.coordinates[1].toFixed(2)

        label = `LC Type: Cropland (Total)<br>`
        label += `GEE Area: ${feature.properties.dimension} sqkm<br>`
        label += `CRS Area: ${area} sqkm <br>`
        label += `Center: ${center_lng} (x), ${center_lat} (y)<br>`

        layer.bindPopup(label)
    }


}).addTo(map)


var treesLayer = L.geoJson(trees, {
    style: treesStyle,
    onEachFeature: function(feature, layer) {
        area = (turf.area(feature)/1000000).toFixed(3)
        center_lng = turf.center(feature).geometry.coordinates[0].toFixed(2)
        center_lat = turf.center(feature).geometry.coordinates[1].toFixed(2)

        label = `LC Type: Tree (Total)<br>`
        label += `GEE Area: ${feature.properties.dimension} sqkm<br>`
        label += `CRS Area: ${area} sqkm <br>`
        label += `Center: ${center_lng} (x), ${center_lat} (y)<br>`

        layer.bindPopup(label)
    }


}).addTo(map)


var shrublandLayer = L.geoJson(shrubland, {
    style: shrublandStyle,
    onEachFeature: function(feature, layer) {
        area = (turf.area(feature)/1000000).toFixed(3)
        center_lng = turf.center(feature).geometry.coordinates[0].toFixed(2)
        center_lat = turf.center(feature).geometry.coordinates[1].toFixed(2)

        label = `LC Type: Shrubland (Total)<br>`
        label += `GEE Area: ${feature.properties.dimension} sqkm<br>`
        label += `CRS Area: ${area} sqkm <br>`
        label += `Center: ${center_lng} (x), ${center_lat} (y)<br>`

        layer.bindPopup(label)
    }


}).addTo(map)





// Add WMS layers
var waterBodiesWMS = L.tileLayer.wms("http://localhost:8080/geoserver/geospatial/wms", {
    layers: 'geospatial:Water2020_tif',
    format: 'image/png',
    transparent: true,
    attribution: ""
})//.addTo(map)


// Basemaps
var baseLayers = {
    "OpenStreetMap": osm,
    "Google Street": googleStreets,
    "Google Hybrid": googleHybrid,
    "Google Satelite": googleSat,
    "Google Terrain": googleTerrain,
    "Google Traffic": googleTraffic,
    //"Esri": esri
};

// Layers
var overlays = {
    "LGAs": lagosLayer,
    "Water 2020": waterLayer,
    "Grassland 2020": grasslandLayer,
    "Builtup 2020": builtupLayer,
    "Cropland 2020": croplandLayer,
    "Trees 2020": treesLayer,
    "Shrubland 2020": shrublandLayer,
    "Water Tile": waterBodiesWMS,
};

// Add layer control to map
L.control.layers(baseLayers, overlays,{ collapsed: true }).addTo(map);


// Add leaflet print control
L.control.browserPrint({ position: 'topleft' }).addTo(map);

// Add measure control
// var map = L.map('map', {
//   measureControl: true
// });
// mouse move coordinate
map.on("mousemove", function(e) {
    $("#coordinate").html(`Lat:${e.latlng.lat.toFixed(3)}, Lng: ${e.latlng.lng.toFixed(3)}`)
})


// Adding scale to map
L.control.scale().addTo(map);