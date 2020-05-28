var osm = L.tileLayer('http://a.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>',
    maxZoom: 18
});

var oa_winter = oam.api.tilelayer(L, 'oa_map_winter');

var mymap = L.map('mapid', {
    center: [46, 8],
    zoom: 6,
    layers: [oa_winter]
});


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

function load_race(date){
    setup(date, "data/race_results_"+get_suffix()+".csv", true);
}

function getPopup(venue, type) {
    var links = '';

    for (var i = 0; i < type.length; i++) {
        var event = type[i].event;
        var date = type[i].date;
        var className = "click" + event + date;
        links += '<a style="font-size: 15px;" onclick="load_race('+"'"+ date +"'" +')" class="'+className+'" href="#" > '+ event +'</a> <br>';
    }


    html_text = '<div style="text-align: center;">' +
        "<h3>"+venue+"</h3> " +
        '<img src="./img/events/' + venueImage(venue)  + '"  width="150px" /><br> <br>'+links + "</div>";


    return html_text;
}

function load_new_events(locations){
    markers.clearLayers();
    markersList = {};
    venueEvents = {};
    for(var key in locations) {
        if( ! (locations[key][0] in venueEvents)) {
            venueEvents[locations[key][0]] = [{"event":locations[key][1], "date" :key}];
        } else {

            venueEvents[locations[key][0]] = venueEvents[locations[key][0]].concat([{"event":locations[key][1], "date" :key}]);

        }
    }


    for(var key in venueEvents) {
        if( ! (key in markersList)) {
            var event = key;
            var marker = L.marker(events_location[event]).bindPopup(getPopup(event, venueEvents[key])).on('click', function (e) {
                //console.log(e.latlng);
                mymap.flyTo([e.latlng.lat + 1.7, e.latlng.lng], 6, {
                    duration: 2, // in seconds
                    noMoveStart: true
                });
            });

            markers.addLayer(marker);
            markersList[event] = marker;

        }
    }
    
   // console.log(document.getElementById("clickDownhill1967-03-03"));
}



function go_to_point(event) {

    mymap.flyTo([markersList[event[0]]._latlng.lat + 1.5, markersList[event[0]]._latlng.lng], 6, {
        duration: 2, // in seconds
        noMoveStart: true
    });

    markersList[event[0]].openPopup();

}

