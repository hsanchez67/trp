var width = 800,
    height = 500;

var force = d3.layout.force()
    .gravity(.2)
    .charge(-200)
    .size([width, height]);

var svg = d3.select("body").append("svg:svg")
    .attr("width", width)
    .attr("height", height);

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

force.nodes(nodes)
    .links(links)
    .start();

var link = svg.selectAll("line")
    .data(links)
    .enter()
    .insert("svg:line")
    .attr("class", "link2");


var node = svg.selectAll("circle.node")
    .data(nodes)
    .enter().append("g")
    .append("svg:circle")
    .attr("r", 12)
    .attr("class", "node2")
    .call(force.drag);

node.append("image")
    .attr("xlink:href", function(d) {return d.img})
    .attr("x", -12)
    .attr("y", -12)
    .attr("width", 24)
    .attr("height", 24);

node.append("text")
    .attr("dx", 0)
    .attr("dy", 55)
    .attr("text-anchor", "middle")
    .text(function(d) { return d.name });

force.on("tick", function(e) {

    link.attr("x1", function(d) { return d.source.x; })
        .attr("y1", function(d) { return d.source.y; })
        .attr("x2", function(d) { return d.target.x; })
        .attr("y2", function(d) { return d.target.y; });

    node.attr("cx", function(d) { return d.x; })
        .attr("cy", function(d) { return d.y; });

});

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

function getData() {
    return {
        "id" : 1,
        "name": "Don Yoakum",
        "img": "../images/user-profile-don.png",
        "children": [{
            "id" : 2,
            "name": "Bobby Flay",
            "img": "../images/user-profile-bobby.png",
            "children": [{
                "id" : 3,
                "name": "Adam West",
                "img": "../images/user-profile-image.png",
                "children": [{
                    "id" : 4,
                    "name": "Austin Powers",
                    "img": "../images/user-profile-image-1.png",
                    "size": 3938
                }, {
                    "id" : 5,
                    "name": "James Dean",
                    "img": "../images/user-profile-image-2.png",
                    "size": 3812
                }, {
                    "id" : 6,
                    "name": "Angela Ashes",
                    "img": "../images/user-profile-image-3.png",
                    "size": 6714
                }, {
                    "id" : 8,
                    "name": "Tito Mendez",
                    "img": "../images/user-profile-image-4.png",
                    "size": 743
                }]
            }, {
                "id" : 9,
                "name": "Juan Perez",
                "img": "../images/user-profile-image-5.png",
                "children": [{
                    "name": "Stephanie Sims",
                    "img": "../images/user-profile-image-1.png",
                    "size": 3534
                }, {
                    "id" : 10,
                    "name": "LinkDistance",
                    "size": 5731
                }, {
                    "id" : 11,
                    "name": "MaxFlowMinCut",
                    "size": 7840
                }, {
                    "id" : 12,
                    "name": "ShortestPaths",
                    "size": 5914
                }, {
                    "id" : 13,
                    "name": "SpanningTree",
                    "size": 3416
                }]
            }, {
                "id" : 14,
                "name": "optimization",
                "children": [{
                    "name": "AspectRatioBanker",
                    "size": 7074
                }]
            }]
        }, {
            "id" : 15,
            "name": "animate",
            "children": [{
                "name": "interpolate",
                "children": [{
                    "name": "ArrayInterpolator",
                    "size": 1983
                }, {
                    "id" : 16,
                    "name": "ColorInterpolator",
                    "size": 2047
                }, {
                    "id" : 17,
                    "name": "DateInterpolator",
                    "size": 1375
                }, {
                    "id" : 18,
                    "name": "Interpolator",
                    "size": 8746
                }, {
                    "id" : 19,
                    "name": "MatrixInterpolator",
                    "size": 2202
                }, {
                    "id" : 20,
                    "name": "NumberInterpolator",
                    "size": 1382
                }, {
                    "id" : 21,
                    "name": "ObjectInterpolator",
                    "size": 1629
                }, {
                    "id" : 22,
                    "name": "PointInterpolator",
                    "size": 1675
                }, {
                    "id" : 23,
                    "name": "RectangleInterpolator",
                    "size": 2042
                }]
            }, {
                "id" : 24,
                "name": "ISchedulable",
                "size": 1041
            }, {
                "id" : 25,
                "name": "Parallel",
                "size": 5176
            }, {
                "id" : 26,
                "name": "Pause",
                "size": 449
            }, {
                "id" : 27,
                "name": "Scheduler",
                "size": 5593
            }, {
                "id" : 28,
                "name": "Sequence",
                "size": 5534
            }, {
                "id" : 29,
                "name": "Transition",
                "size": 9201
            }, {
                "id" : 30,
                "name": "Transitioner",
                "size": 19975
            }, {
                "id" : 31,
                "name": "TransitionEvent",
                "size": 1116
            }, {
                "id" : 32,
                "name": "Tween",
                "size": 6006
            }]
        }, {
            "id" : 33,
            "name": "data",
            "children": [{
                "id" : 34,
                "name": "converters",
                "children": [{
                    "id" : 35,
                    "name": "Converters",
                    "size": 721
                }, {
                    "id" : 36,
                    "name": "DelimitedTextConverter",
                    "size": 4294
                }, {
                    "id" : 37,
                    "name": "GraphMLConverter",
                    "size": 9800
                }, {
                    "id" : 38,
                    "name": "IDataConverter",
                    "size": 1314
                }, {
                    "id" : 39,
                    "name": "JSONConverter",
                    "size": 2220
                }]
            }, {
                "id" : 40,
                "name": "DataField",
                "size": 1759
            }, {
                "id" : 41,
                "name": "DataSchema",
                "size": 2165
            }, {
                "id" : 42,
                "name": "DataSet",
                "size": 586
            }, {
                "id" : 43,
                "name": "DataSource",
                "size": 3331
            }, {
                "id" : 44,
                "name": "DataTable",
                "size": 772
            }, {
                "id" : 45,
                "name": "DataUtil",
                "size": 3322
            }]
        }]
    };
}