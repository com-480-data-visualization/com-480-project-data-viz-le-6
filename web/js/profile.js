function whenDocumentLoaded(action) {
    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", action);
    } else {
        action();
    }
}

function drawGraphCareer(data, stack, colors, maxPoints) {
    // Graph constants
    const width = 500
    const height = 500
    const margin = { top: 10, right: 0, bottom: 50, left: 50 };
    const chartData = stack(data);
    const xScale = d3.scaleBand()
        .domain(data.map(d => d.season))
        .range([margin.left, width - margin.right])
        .padding(0.2);
    const yScale = d3.scaleLinear()
        .domain([0, maxPoints])
        .range([height - margin.bottom, margin.top]);
    const xAxis = d3.axisBottom(xScale)
        .tickSizeOuter(0);
    const yAxis = d3.axisLeft(yScale);

    // Graph creation
    const svg = d3.select("#career_graph");
    svg.selectAll("*").remove();
    svg.attr('width', width)
        .attr('height', height);

    // Graph definition
    const groups = svg.append('g')
        .selectAll('g')
        .data(chartData)
        .join('g')
        .style('fill', (d, i) => colors(d.key));

    // Bar drawing
    groups.selectAll('rect')
        .data(d => d)
        .join('rect')
        .attr('x', d => xScale(d.data.season))
        .attr('y', d => yScale(d[1] | 0))
        .attr('height', d => yScale(d[0]) - yScale(d[1] | 0))
        .attr('width', xScale.bandwidth());

    // Axes
    svg.append('g')
        .attr('transform', `translate(0,${height - margin.bottom})`)
        .call(xAxis)
        .selectAll("text")
        .attr("y", 0)
        .attr("x", -35)
        .attr("dy", ".35em")
        .attr("transform", "rotate(-90)")
        .style("text-anchor", "start");
    svg.append('g')
        .attr('transform', `translate(${margin.left},0)`)
        .call(yAxis)
        .select('.domain').remove();

    // Legend
    legend({
        color: colors,
        html_id: "#legend_career_graph",
        title: "Type of events",
        tickSize: 0,
        width: width,
    })
}

function drawGraphEvent(data, categories, colors, maxPoints) {
    // Graph constants
    const width = 500
    const height = 200


    const margin = { top: 10, right: 20, bottom: 50, left: 100 };
    const stack = d3.stack().keys(categories);
    const xScale = d3.scaleLinear()
        .domain([0, 100])
        .range([margin.left, width - margin.right]);
    const yScale = d3.scaleBand()
        .domain(categories)
        .range([height - margin.bottom, margin.top])
        .padding(0.2);
    const xAxis = d3.axisBottom(xScale)
        .tickSizeOuter(0);
    const yAxis = d3.axisLeft(yScale);

    // Graph creation
    const svg = d3.select("#mean_graph");
    svg.selectAll("*").remove();
    svg.attr('width', width)
        .attr('height', height);

    // Graph definition
    const groups = svg.append('g')
        .selectAll('g')
        .data(data)
        .join('g')
        .style('fill', d => colors(d.event));

    // Bar drawing
    groups.selectAll('rect')
        .data(data)
        .join('rect')
        .attr('y', d => yScale(d.event))
        .attr('x', d => margin.left)
        .attr('width', d => xScale(d.value | 0) - xScale(0))
        .attr('height', yScale.bandwidth())
        .style('fill', d => colors(d.event));

    // Axes
    svg.append('g')
        .attr('transform', `translate(0,${height - margin.bottom})`)
        .call(xAxis);
    svg.append('g')
        .attr('transform', `translate(${margin.left},0)`)
        .call(yAxis);
}

function loadAthlete(name, currentYear = 2020) {
    selectedAthlete = name
    // Modify biography
    d3.json("./data/ath.json").then(function (data) {
        const photo = $(".ath_photo");
        let photoLink = data[name]['photo'];
        if (photoLink == "" || !photoLink) {
            photoLink = 'img/placeholder_male.jpg'
        }
        photo.attr('src', photoLink);
        const nameEl = $(".ath_name");
        nameEl.html(name);
        $(".ath_details").html("");
        const birthdate = data[name]['bd'];
        $(".ath_details").append("<p>Date of birth: " + (birthdate ? birthdate : "") + "</p>");
        const club = data[name]['club'];
        $(".ath_details").append("<p>Club: " + (club ? club : "") + "</p>");
        $(".ath_details").append("<p>Country: " + data[name]['country'] + "</p>");
    });

    // Add graph 1
    parsedName = name.toLowerCase().replace(/ /g, "_");
    d3.json("data/careers/" + parsedName + ".json").then(function (rawData) {
        // Souce: https://observablehq.com/@thetylerwolf/day-9-stacked-bar-chart
        // https://observablehq.com/@d3/stacked-bar-chart

        // Parsing data
        var radios = document.getElementsByName('time');
        let data = [];
        let maxPoints = 100;
        for (season in rawData) {
            if (radios[1].checked && currentYear < season) {
                continue;
            }
            if (radios[2].checked && currentYear != season) {
                continue;
            }
            let s = {};
            let seasonPoints = 0;
            s['season'] = season;
            for (event in rawData[season]) {
                const points = rawData[season][event]['points'];
                s[event] = points;
                seasonPoints += points;
            }
            if (maxPoints < seasonPoints) {
                maxPoints = seasonPoints;
            }
            data.push(s);
        }

        const categories = ['Downhill', 'Super G', 'Combined', 'Giant Slalom', 'Slalom', 'Parallel'];
        const stack = d3.stack().keys(categories);
        const colors = d3.scaleOrdinal(d3.schemeSet3).domain(categories);

        drawGraphCareer(data, stack, colors, maxPoints);

        // Parsing data
        data = [];
        data_tmp = {};
        for (const key of categories) {
            data_tmp[key] = [0, 0];
        }
        for (season in rawData) {
            if (radios[1].checked && currentYear < season) {
                continue;
            }
            if (radios[2].checked && currentYear != season) {
                continue;
            }
            for (event in rawData[season]) {
                data_tmp[event][0] += rawData[season][event]['points'];
                data_tmp[event][1] += rawData[season][event]['n'];
            }
        }
        for (const key of categories) {
            data.push({ "event": key, "value": [(data_tmp[key][1] == 0 ? 0 : data_tmp[key][0] / data_tmp[key][1])] });
        }
        drawGraphEvent(data, categories, colors, maxPoints);
        $('#see-stats').prop('disabled', false);
    });
}

whenDocumentLoaded(() => {
    // Search function
    const el = document.getElementById("search_button");
    const input = document.getElementById("ath_search");
    el.addEventListener("click", () => {
        const name = input.value;
        loadAthlete(name);
    }, false);
    input.addEventListener("keyup", function (event) {
        if (event.keyCode === 13) { // Enter pressed
            event.preventDefault();
            el.click();
        }
    });
    d3.json("./data/ath.json").then(function (json) {
        const athletes = Object.keys(json);
        // Source: https://goodies.pixabay.com/javascript/auto-complete/demo.html
        new autoComplete({
            selector: '#ath_search',
            minChars: 1,
            source: function (term, suggest) {
                term = term.toLowerCase();
                var suggestions = [];
                for (i = 0; i < athletes.length; i++)
                    if (~(athletes[i]).toLowerCase().indexOf(term)) {
                        suggestions.push(athletes[i]);
                    }
                suggest(suggestions);
            },
        });
    });
});