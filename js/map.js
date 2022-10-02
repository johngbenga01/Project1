// Initialise map
var map = L.map('map', {
    zoomControl: false,

}).setView([6.52, 3.53], 10);



// custom zoom bar control that includes a Zoom Home function
L.Control.zoomHome = L.Control.extend({
    options: {
        position: 'topleft',
        zoomInText: '+',
        zoomInTitle: 'Zoom in',
        zoomOutText: '-',
        zoomOutTitle: 'Zoom out',
        zoomHomeText: '<i class="fa fa-home" style="line-height:1.65;"></i>',
        zoomHomeTitle: 'Zoom home'
    },

    onAdd: function(map) {
        var controlName = 'gin-control-zoom',
            container = L.DomUtil.create('div', controlName + ' leaflet-bar'),
            options = this.options;

        this._zoomInButton = this._createButton(options.zoomInText, options.zoomInTitle,
            controlName + '-in', container, this._zoomIn);
        this._zoomHomeButton = this._createButton(options.zoomHomeText, options.zoomHomeTitle,
            controlName + '-home', container, this._zoomHome);
        this._zoomOutButton = this._createButton(options.zoomOutText, options.zoomOutTitle,
            controlName + '-out', container, this._zoomOut);

        this._updateDisabled();
        map.on('zoomend zoomlevelschange', this._updateDisabled, this);

        return container;
    },

    onRemove: function(map) {
        map.off('zoomend zoomlevelschange', this._updateDisabled, this);
    },

    _zoomIn: function(e) {
        this._map.zoomIn(e.shiftKey ? 3 : 1);
    },

    _zoomOut: function(e) {
        this._map.zoomOut(e.shiftKey ? 3 : 1);
    },

    _zoomHome: function(e) {
        map.setView([6.52, 3.53], 10);
    },

    _createButton: function(html, title, className, container, fn) {
        var link = L.DomUtil.create('a', className, container);
        link.innerHTML = html;
        link.href = '#';
        link.title = title;

        L.DomEvent.on(link, 'mousedown dblclick', L.DomEvent.stopPropagation)
            .on(link, 'click', L.DomEvent.stop)
            .on(link, 'click', fn, this)
            .on(link, 'click', this._refocusOnMap, this);

        return link;
    },

    _updateDisabled: function() {
        var map = this._map,
            className = 'leaflet-disabled';

        L.DomUtil.removeClass(this._zoomInButton, className);
        L.DomUtil.removeClass(this._zoomOutButton, className);

        if (map._zoom === map.getMinZoom()) {
            L.DomUtil.addClass(this._zoomOutButton, className);
        }
        if (map._zoom === map.getMaxZoom()) {
            L.DomUtil.addClass(this._zoomInButton, className);
        }
    }
});

var zoomHome = new L.Control.zoomHome();
zoomHome.addTo(map);
//Test

//L.DomUtil.setOpacity(map.zoomControl.getContainer(), 100); // set opacity of zoom buttons

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
        area = (turf.area(feature) / 1000000).toFixed(3)
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
        area = (turf.area(feature) / 1000000).toFixed(3)
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
        area = (turf.area(feature) / 1000000).toFixed(3)
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
        area = (turf.area(feature) / 1000000).toFixed(3)
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
        area = (turf.area(feature) / 1000000).toFixed(3)
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
        area = (turf.area(feature) / 1000000).toFixed(3)
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
        area = (turf.area(feature) / 1000000).toFixed(3)
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
}) //.addTo(map)

// Add measure control

L.control.measure({ 
    primaryLengthUnit: 'kilometers', 
    secondaryLengthUnit: 'meters',
    primaryAreaUnit: 'sqmeters', 
    secondaryAreaUnit: undefined 
}).addTo(map);

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


// Full screen map view

// var mapId = document.getElementById("map");
// function fullScreenView(){
//     mapId.requestFullscreen();
// }


// Add layer control to map
L.control.layers(baseLayers, overlays, { collapsed: true }).addTo(map);

// Map print

$(`.print-map`).click(function () {

    window.print();
});
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