// code based on https://bl.ocks.org/heybignick/3faf257bbbbc7743bb72310d03b86ee8
function create_graph(container, detailContainer,dataFile) {
    $(container).width($(container).parent().width())
    $(container).height($(container).parent().height())
    
    var svg = d3.select(container)
    var width = $(container).width()
    var height = $(container).height()
    console.log(width + " "+ height)
    var radius = 7

   // var color = d3.scaleOrdinal(d3.schemeCategory20);
    var simulation = d3.forceSimulation()
        .force("link", d3.forceLink().id(function (d) { return d.id; }))
        .force("charge", d3.forceManyBody())
        .force("center", d3.forceCenter(width / 2, height / 2));

    d3.json(dataFile).then(function (graph) {

        var link = svg.append("g")
            .attr("class", "links")
            .selectAll("line")
            .data(graph.links)
            .enter().append("line")
            .attr("stroke-width", function (d) { return Math.sqrt(d.value); });

        var node = svg.append("g")
            .attr("class", "nodes")
            .selectAll("g")
            .data(graph.nodes)
            .enter().append("g")
            .on("click", showInfos)


        var circles = node.append("circle")
            .attr("r", radius)
            .attr("class", getNodeClass)
            .call(d3.drag()
                .on("start", dragstarted)
                .on("drag", dragged)
                .on("end", dragended))
            
        colorNodes()
        /*var labels = node.append("text")
            .text(function (d) {
                return d.name;
            })
            .attr('x', 6)
            .attr('y', 3);*/

        node.append("title")
            .text(function (d) { return d.name; });

        simulation
            .nodes(graph.nodes)
            .on("tick", ticked);

        simulation.force("link")
            .links(graph.links);

        function ticked() {
            link
                .attr("x1", function (d) { return d.source.x; })
                .attr("y1", function (d) { return d.source.y; })
                .attr("x2", function (d) { return d.target.x; })
                .attr("y2", function (d) { return d.target.y; });

            node
                .attr("transform", function (d) {
                    return "translate(" + d.x + "," + d.y + ")";
                })
                .attr("cx", function(d) { return d.x = Math.max(radius, Math.min(width - radius, d.x)); })
                .attr("cy", function(d) { return d.y = Math.max(radius, Math.min(height - radius, d.y)); });
        }
    });

    function dragstarted(d) {
        if (!d3.event.active) simulation.alphaTarget(0.3).restart();
        d.fx = d.x;
        d.fy = d.y;
    }

    function dragged(d) {
        d.fx = d3.event.x;
        d.fy = d3.event.y;
    }

    function dragended(d) {
        if (!d3.event.active) simulation.alphaTarget(0);
        d.fx = null;
        d.fy = null;
    }

    function showInfos(d){

        colorNodes()
        d3.select(this).select("circle")
                       .style("fill", "pink")

        loadAthlete(d.name,get_current_year())
    }

    function getNodeClass(d){
        switch(d.group){
            case 0: return "athlete"
            case 1: return "overall"
            case 2: return "downhill"
            case 3: return "super-g"
            case 4: return "giant-slalom"
            case 5: return "slalom"
            case 6: return "combined"
            case 7: return "parallel"
        }
    }

    function colorNodes(){
        d3.selectAll('.nodes>g>circle.athlete').style('fill', 'black')
        d3.selectAll('.nodes>g>circle.overall').style('fill', 'red')
        d3.selectAll('.nodes>g>circle.downhill').style('fill', 'blue')
        d3.selectAll('.nodes>g>circle.super-g').style('fill', 'purple')
        d3.selectAll('.nodes>g>circle.giant-slalom').style('fill', 'yellow')
        d3.selectAll('.nodes>g>circle.slalom').style('fill', 'orange')
        d3.selectAll('.nodes>g>circle.combined').style('fill', 'green')
        d3.selectAll('.nodes>g>circle.parallel').style('fill', 'gray')
    }
}
