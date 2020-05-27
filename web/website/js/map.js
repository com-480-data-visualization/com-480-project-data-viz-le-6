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

function load_race(date){
    setup(date, "data/race_results_"+get_suffix()+".csv", true);
}

function getPopup(venue, type) {
    //console.log(type);

    var links = '<div style=\"text-align: center;\">';

    for (var i = 0; i < type.length; i++) {
        var event = type[i].event;
        var date = type[i].date;
        //Do something
        var className = "click" + event + date;
        links += '<a onclick="load_race('+"'"+ date +"'" +')" class="'+className+'" href="#" >'+ event +'</a> <br>';
        //links += '<script> $(".'+ className + '").on("click", function(){console.log("dab"); </script>'

        //jQuery("body").on('click','a.'+className, function(e){
        //    e.preventDefault();
        //    console.log(className);
        //    console.log(event, date);
        //});
    }

    links+= "</div>";

    html_text = "<h3>"+venue+"</h3> <br>" +
        '<div style="text-align: center;"><img src="./img/events/' + venueImage(venue)  + '"  width="150px" /></div><br>'+links;


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
                console.log(e.latlng);
                mymap.flyTo([e.latlng.lat + 1.5, e.latlng.lng], 6, {
                    duration: 2, // in seconds
                    noMoveStart: true
                });
            });

            markers.addLayer(marker);
            markersList[event] = marker;

        }
    }
    
    console.log(document.getElementById("clickDownhill1967-03-03"));
}



function go_to_point(event) {

    mymap.flyTo([markersList[event[0]]._latlng.lat + 1.5, markersList[event[0]]._latlng.lng], 6, {
        duration: 2, // in seconds
        noMoveStart: true
    });

    markersList[event[0]].openPopup();

}

