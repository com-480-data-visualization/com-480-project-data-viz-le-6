function venueImage(venue) {
    if (venue.slice(-1) === ".") {
        return venue + "jpg";
    }
    return venue + ".jpg";
}

function setup(date, file, isMen) {
    $('#venue').html('')    
    $('#event').html('')   
    $('#country_name').html('')   
    $('#flag').html('') 
    $('#race-image').html('')  
    $('#race-table').html('')

    function centisToMinutesAndSeconds(centis) {
        if (centis == 0) {
            return "AB";
        }
        var minutes = Math.floor(centis / 6000);
        var seconds = ((centis % 6000) / 100);
        return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
    }


    var header_name = ["#", "", "Name", "Country", "Time"];

    // use es6 string templates to populate rows
    const rowTemplate = (d) => {
        return `
  <td>${d.ath_rank}</td>
  <td> <img class="img-fluid rounded-circle" src=${'"' + d.photo + '"'}</td>
  <td>${d.ath_name}</td>
  <td>${d.ath_country_name}</td>
  <td>${centisToMinutesAndSeconds(d.ath_time)}</td>

  `;
    };


    // read data from the url
    d3.csv(file).then(function (data) {


        var filtered = data.filter(d => d.date === date);
        // select viz and append table

        d3.select("#venue").text(filtered[0].venue);
        d3.select("#event").text(filtered[0].event);
        d3.select("#country_name").text(date);
        var src = "./img/events/" + venueImage(filtered[0].venue);
        console.log(encodeURI(src));
        $("#race-image").html('<img class="img-fluid rounded" src='+encodeURI(src)+'>');

        var src = "https://www.countryflags.io/" + filtered[0].country + "/flat/64.png";
        $('#flag').html('<img src="'+src+'" class="img-fluid rounded">')

        const table = d3.select("#race-table").append("table").attr('class', 'table table-striped table-hover');

        // append headers
        const header = table.append("thead").attr('class', 'thead-dark')
            .selectAll('th')
            .data(header_name)
            .enter()
            .append('th')
            .text(d => d);

        // append rows with rowTemplate
        const rows = table.append("tbody")
            .selectAll("tr")
            .data(filtered)
            .enter()
            .append("tr")
            .html(rowTemplate)
            .on("click", d => loadAthlete(d.ath_name, get_current_year()));

    });
}