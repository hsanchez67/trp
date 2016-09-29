var width = 960;
    height = 720;

var svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height);

var force = d3.layout.force()
    .gravity(.03)
    .distance(200)
    .charge(-400)
    .size([width, height]);

var root = getData();
var nodes = flatten(root),
    links = d3.layout.tree().links(nodes);


nodes.forEach(function(d, i) {
    d.x = width/2 + i;
    d.y = height/2 + 100 * d.depth;
});

root.fixed = true;
root.x = width / 2;
root.y = height / 2;

    force
        .nodes(nodes)
        .links(links)
        .start();
/*
    var link = svg.selectAll(".link")
        .data(json.links)
        .enter().append("line")
        .attr("class", "link");
*/

function flatten(root) {
    var nodes = [];
    function recurse(node, depth) {
        if (node.children) {
            node.children.forEach(function(child) {
                recurse(child, depth + 1);
            });
        }
        node.depth = depth;
        nodes.push(node);
    }
    recurse(root, 1);
    console.log("hello");
    return nodes;
}

var link = svg.selectAll("line")
    .data(links)
    .enter()
    .insert("svg:line")
    .attr("class", "link2");

    var node = svg.selectAll(".node")
        .data(nodes)
        .enter().append("g")
        .attr("class", "node")
        .call(force.drag);

    node.append("image")
        .attr("xlink:href", function(d) {return d.img})
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

function getData() {
    return {
        "id": 1,
        "name": "Don Yoakum",
        "img": "../images/user-profile-don.png",
        "children": [{
            "id": 2,
            "name": "Bobby Flay",
            "img": "../images/user-profile-bobby.png",
            "children": [{
                "id": 3,
                "name": "Adam West",
                "img": "../images/user-profile-image.png"
            }, {
                "id": 4,
                "name": "Austin Powers",
                "img": "../images/user-profile-image-1.png",
                "size": 3938
            }, {
                "id": 5,
                "name": "James Dean",
                "img": "../images/user-profile-image-2.png",
                "size": 3812
            }]
        }, {
            "id": 9,
            "name": "Juan Perez",
            "img": "../images/user-profile-image-5.png",
            "children": [{
                "name": "Stephanie Sims",
                "img": "../images/user-profile-image-6.png",
                "size": 3534
            }, {
                "id": 6,
                "name": "Angela Ashes",
                "img": "../images/user-profile-image-3.png",
                "size": 6714
            }, {
                "id": 8,
                "name": "Tito Mendez",
                "img": "../images/user-profile-image-4.png",
                "size": 743
            }]
        }]
    }
}
