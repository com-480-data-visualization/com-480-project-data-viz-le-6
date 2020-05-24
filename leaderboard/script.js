
function setup(date, file) {

function centisToMinutesAndSeconds(centis) {
    if(centis == 0) {
        return "AB";
    }
    var minutes = Math.floor(centis / 6000);
    var seconds = ((centis % 6000) / 100);
    return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
}


var header_name = ["Rank", "Name", "Nationality", "Time"];

// use es6 string templates to populate rows
    const rowTemplate = (d) => {
        return `
  <td>${d.ath_rank}</td>
  <td>${d.ath_name}</td>
  <td>${d.ath_country}</td>
  <td>${centisToMinutesAndSeconds(d.ath_time)}</td>
  `;
    };




// read data from the url
    d3.csv(file).then( function (data) {



        var filtered = data.filter(d => d.date === date);
        // select viz and append table
        console.log(filtered[0]);
        d3.select("#venue").text(filtered[0].venue);
        d3.select("#event").text(filtered[0].event);
        const table = d3.select("#viz").append("table");

        // append headers
        const header = table.append("thead")
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
            .on("click", d => console.log(d.ath_name));

    });
}