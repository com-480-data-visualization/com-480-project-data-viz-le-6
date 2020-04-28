var osm = L.tileLayer('http://a.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>',
    maxZoom: 18
});

var oa_summer = oam.api.tilelayer(L, 'oa_map');
var oa_winter = oam.api.tilelayer(L, 'oa_map_winter');

var mymap = L.map('mapid', {
    center: [46.8131873, 8.22421],
    zoom: 9,
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

L.marker([46.605000, 7.921340], { icon: fisIcon }).bindPopup("Wengen").addTo(mymap);
L.marker([46.68387, 7.86638], { icon: fisIcon }).bindPopup("Interlaken").addTo(mymap);
L.marker([46.307165438, 7.476331428], { icon: fisIcon }).bindPopup("Crans-Montana").addTo(mymap);
