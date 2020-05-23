var osm = L.tileLayer('http://a.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>',
    maxZoom: 18
});

var oa_summer = oam.api.tilelayer(L, 'oa_map');
var oa_winter = oam.api.tilelayer(L, 'oa_map_winter');

var mymap = L.map('mapid', {
    center: [46, 8],
    zoom: 7,
    layers: [oa_summer]
});

L.control.layers({
    "Outdooractive Summer": oa_summer,
    "Outdooractive Winter": oa_winter,
    "OpenStreetMap": osm
}).addTo(mymap);


var LeafIcon = L.Icon.extend({
    options: {
        iconSize: [38, 95],
        iconAnchor: [22, 94],
        popupAnchor: [-3, -76]
    }
});

var fisIcon = new LeafIcon({ iconUrl: './img/FIS.png' });

var markersList = {};

var markers = L.layerGroup().addTo(mymap);


function load_new_events(locations){
    markers.clearLayers();
    markersList = {};
    for(var key in locations) {
        if( ! (key in markersList)) {
            var event = locations[key];
            var marker = L.marker(events_location[event], {icon: fisIcon}).bindPopup(event).on('click', function (e) {
                mymap.flyTo(e.latlng, 6, {
                    duration: 2, // in seconds
                    noMoveStart: true
                });
            });

            markers.addLayer(marker);
            markersList[event] = marker;
        }
    }
}



function go_to_point(event) {
    markersList[event].fire("click",{latlng:events_location[event]});
}

