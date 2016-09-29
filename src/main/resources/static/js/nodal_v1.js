var width = 960,
    height = 680

var svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height);

var force = d3.layout.force()
    .gravity(.08)
    .distance(200)
    .charge(-400)
    .size([width, height]);

d3.json("../data/mynetwork.json", function(error, json) {
    if (error) throw error;

    force
        .nodes(json.nodes)
        .links(json.links)
        .start();

    var link = svg.selectAll(".link")
        .data(json.links)
        .enter().append("line")
        .attr("class", "link");

    var node = svg.selectAll(".node")
        .data(json.nodes)
        .enter().append("g")
        .attr("class", "node")
        .call(force.drag);

    node.append("image")
        .attr("xlink:href", function(d) {return d.nodeImgUrl})
        .attr("x", -40)
        .attr("y", -40)
        .attr("width", 80)
        .attr("height", 80);

    node.append("text")
        .attr("dx", 0)
        .attr("dy", 55)
        .attr("text-anchor", "middle")
        .text(function(d) { return d.name });

    force.on("tick", function() {
        link.attr("x1", function(d) { return d.source.x; })
            .attr("y1", function(d) { return d.source.y; })
            .attr("x2", function(d) { return d.target.x; })
            .attr("y2", function(d) { return d.target.y; });

        node.attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });
    });
});