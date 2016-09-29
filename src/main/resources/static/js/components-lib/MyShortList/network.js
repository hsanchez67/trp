"use strict";

$(document).ready(function () {
    var width = 720,
        height = 720;

    var svg = d3.select("#my-network-content").append("svg").attr("width", width).attr("height", height);

    svg.append("svg:clipPath").attr("id", "centerAvatarClip").append("svg:circle").attr("cx", "0").attr("cy", "0").attr("r", 20);

    svg.append("svg:clipPath").attr("id", "centerAvatarClip2").append("svg:circle").attr("cx", "0").attr("cy", "0").attr("r", 40);

    svg.append("svg:use").attr("id", "topmost").attr("xlink:href", "");

    var force = d3.layout.force().gravity(.03).distance(120).charge(-300).size([width, height]);

    var root = getData();
    var nodes = flatten(root),
        links = d3.layout.tree().links(nodes);

    nodes.forEach(function (d, i) {
        d.x = width / 2 + i;
        d.y = height / 2 + 100 * d.depth;
    });

    root.fixed = true;
    root.x = width / 2;
    root.y = height / 2;

    force.nodes(nodes).links(links).start();
    /*
     var link = svg.selectAll(".link")
     .data(json.links)
     .enter().append("line")
     .attr("class", "link");
     */

    var optArray = [];
    for (var i = 0; i < nodes.length - 1; i++) {
        optArray.push(nodes[i].name);
    }

    optArray = optArray.sort();

    $(function () {
        $("#searchNetwork").autocomplete({
            source: optArray
        });
    });

    function searchNode() {
        console.log('here');
        //find the node
        var selectedVal = document.getElementById('searchNetwork').value;
        var node = svg.selectAll(".node");
        console.log(node);

        if (selectedVal == "none") {
            node.style("stroke", "white").style("stroke-width", "1");
        } else {
            var selected = node.filter(function (d, i) {
                return d.name != selectedVal;
            });
            selected.style("opacity", "0");
            var link = svg.selectAll(".link");
            link.style("opacity", "0");
            d3.selectAll(".node, .link").transition().duration(5000).style("opacity", 1);
        }
    }

    function flatten(root) {
        var nodes = [];
        function recurse(node, depth) {
            if (node.children) {
                node.children.forEach(function (child) {
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

    var link = svg.selectAll("line").data(links).enter().insert("svg:line").attr("class", "link2");

    var node = svg.selectAll(".node").data(nodes).enter().append("g").attr("class", "node").call(force.drag);

    node.append("image").attr("xlink:href", function (d) {
        return d.img;
    }).attr("x", -20).attr("y", -20).attr("width", 40).attr("height", 40).attr("clip-path", "url(#centerAvatarClip)");

    node.append("svg:circle").attr("class", "aux-border").attr("cx", "0").attr("cy", "0").attr("r", 20);

    node.on("mouseover", function (d) {
        var g = d3.select(this);

        //g.moveToFront();

        var name_hover = g.append("svg:g").classed('name-hover', true).attr("transform", "translate(28,-12)");

        name_hover.append("svg:rect").attr("class", "rect");

        name_hover.append("svg:text").attr("class", "text").attr("transform", "translate(10,16)").text(function (d) {
            var t = d.name + ' - ' + d.score;
            return t;
        });

        name_hover.select("rect.rect").attr("rx", 5).attr("ry", 5).attr("width", function (d) {
            return d.name ? d.name.length * 7 + 35 : 0;
        }).attr("height", 24);
        /*
        var info = g.append('text')
            .classed('info', true)
            .attr("dx", 0)
            .attr("dy", 22)
            .attr("text-anchor", "middle")
            .text(function(d) { return d.name });
        */
    }).on("mouseout", function () {
        d3.select(this).select('g.name-hover').remove();
    }).on("click", (function (d) {
        window.location.href = '/profile/' + d.url;
    }).bind(this));

    force.on("tick", function () {
        link.attr("x1", function (d) {
            return d.source.x;
        }).attr("y1", function (d) {
            return d.source.y;
        }).attr("x2", function (d) {
            return d.target.x;
        }).attr("y2", function (d) {
            return d.target.y;
        });

        node.attr("transform", function (d) {
            return "translate(" + d.x + "," + d.y + ")";
        });
    });

    d3.selection.prototype.moveToFront = function () {
        return this.each(function () {
            this.parentNode.appendChild(this);
        });
    };

    function getModalHtml(d) {
        html = '<div id="avatarProfile" className="modal fade">';
        html = html + '<div class="text-center"><div class="name"><strong>';
        html = html + d.name + '</strong></div>';
        html = html + '<h4>Real Estate Agent</h4><h5>KELLER WILLIAMS Realty</h5><small class="label label-warning label-as-location">Granite Bay, CA</small>';
        html = html + '<div class="buttons"><a class="btn btn-primary btn-xs"  href="/introduction/' + d.id + '" role="button">Introduce ' + d.name + '...</a> ';
        html = html + ' <a class="btn btn-primary btn-xs"  href="#" onclick="loadPerson()" role="button">See ' + d.name + '\'s short list...</a></div></div></div>';
        return html;
    }

    function getData() {
        return {
            "id": 0,
            "name": "John Stein",
            "url": "john.stein",
            "email": "johnStein@gmail.com",
            "avatar": "2b3c1c87-1c8c-495d-a1f7-a7ab4aa20b35",
            "img": "/api/remoteFiles/view/2b3c1c87-1c8c-495d-a1f7-a7ab4aa20b35",
            "score": "9.4",
            "children": [{
                "id": 1,
                "name": "Jennifer Hudson",
                "url": "jennifer.hudson",
                "email": "jenniferHudson@gmail.com",
                "avatar": "01efb1ad-3a5a-493f-8b85-cd0a8c92299c",
                "img": "/api/remoteFiles/view/01efb1ad-3a5a-493f-8b85-cd0a8c92299c",
                "score": "8.4",
                "children": [{
                    "id": 11,
                    "name": "Samantha Stevens-Gray",
                    "url": "samantha.stevens-gray",
                    "email": "samantha.stevens@gmail.com",
                    "avatar": "c5dd3983-712a-4e68-82d4-6fc83b529c95",
                    "img": "/api/remoteFiles/view/c5dd3983-712a-4e68-82d4-6fc83b529c95",
                    "score": "8.8"
                }, {
                    "id": 12,
                    "name": "John Woo",
                    "url": "john.woo",
                    "email": "john.woo@gmail.com",
                    "avatar": "9e90cfed-99e5-48ae-ae5d-ccb8cac55cd4",
                    "img": "/api/remoteFiles/view/9e90cfed-99e5-48ae-ae5d-ccb8cac55cd4",
                    "score": "7.2"
                }]
            }, {
                "id": 2,
                "name": "Adam West",
                "url": "adam.west",
                "email": "adamWest@gmail.com",
                "avatar": "25f87a33-df25-4207-a584-d705defbc9eb",
                "img": "/api/remoteFiles/view/25f87a33-df25-4207-a584-d705defbc9eb",
                "score": "7.5"
            }, {
                "id": 3,
                "name": "Austin Powers",
                "url": "austin.powers",
                "email": "austionPowers@gmail.com",
                "avatar": "b72b9f28-4446-4938-9210-0f759086e8fd",
                "img": "/api/remoteFiles/view/b72b9f28-4446-4938-9210-0f759086e8fd",
                "score": "9.0",
                "children": [{
                    "id": 13,
                    "name": "Viktor Chevchenko",
                    "url": "viktor.chevchenko",
                    "email": "vicktor.chevchenko@gmail.com",
                    "avatar": "e7c5b628-1dfd-4387-9bb3-9cbf6b3a04bc",
                    "img": "/api/remoteFiles/view/e7c5b628-1dfd-4387-9bb3-9cbf6b3a04bc",
                    "score": "4.5"
                }]
            }, {
                "id": 4,
                "name": "Mia Hamm",
                "url": "mia.hamm",
                "email": "mia.hamm@gmail.com",
                "avatar": "74cdd847-9edf-4327-8346-f8df32a771a0",
                "img": "/api/remoteFiles/view/74cdd847-9edf-4327-8346-f8df32a771a0",
                "score": "9.3",
                "children": [{
                    "id": 14,
                    "name": "Tyler Summers",
                    "url": "tyler.summers",
                    "email": "tyler.summers@gmail.com",
                    "avatar": "0015473a-00a7-428e-aef6-f055c016079d",
                    "img": "/api/remoteFiles/view/0015473a-00a7-428e-aef6-f055c016079d",
                    "score": "9.3"
                }, {
                    "id": 15,
                    "name": "Steve Hammer",
                    "url": "steve.hammer",
                    "email": "steve.hammer@gmail.com",
                    "avatar": "81f6c326-d491-4d59-8ee9-081630a09fa8",
                    "img": "/api/remoteFiles/view/81f6c326-d491-4d59-8ee9-081630a09fa8",
                    "score": "9.1"
                }, {
                    "id": 16,
                    "name": "Rich Hernandez",
                    "url": "rick.hernandez",
                    "email": "rich.hernandez@gmail.com",
                    "avatar": "9099d8d4-2de2-4433-a63d-1422ea90b48a",
                    "img": "/api/remoteFiles/view/9099d8d4-2de2-4433-a63d-1422ea90b48a",
                    "score": "9.9"
                }]
            }, {
                "id": 5,
                "name": "Joe Jackson",
                "url": "joe.jackson",
                "email": "joeJackson@gmail.com",
                "avatar": "e76729f8-a7a6-47d4-905f-9f7dd68fa498",
                "img": "/api/remoteFiles/view/e76729f8-a7a6-47d4-905f-9f7dd68fa498",
                "score": "7.7",
                "children": [{
                    "id": 17,
                    "name": "Susie Wong",
                    "url": "susie.wong",
                    "email": "susie.wong@gmail.com",
                    "avatar": "709dfa4f-f02a-426d-8f8c-20d3366a2da9",
                    "img": "/api/remoteFiles/view/709dfa4f-f02a-426d-8f8c-20d3366a2da9",
                    "score": "9.6"
                }, {
                    "id": 18,
                    "name": "Scott Henderson",
                    "url": "scott.henderson",
                    "email": "scott.henderson@gmail.com",
                    "avatar": "78ef12fc-8481-4c3e-8c59-fc848f831067",
                    "img": "/api/remoteFiles/view/78ef12fc-8481-4c3e-8c59-fc848f831067",
                    "score": "8.9"
                }]
            }, {
                "id": 6,
                "name": "Johnny Walker",
                "url": "johnny.walker",
                "email": "johnnyWalker@gmail.com",
                "avatar": "229fbf25-4083-418d-85b1-6eb0d528f625",
                "img": "/api/remoteFiles/view/229fbf25-4083-418d-85b1-6eb0d528f625",
                "score": "8.7"
            }, {
                "id": 7,
                "name": "Angela Ashes",
                "url": "angela.ashes",
                "email": "angelaAshes@gmail.com",
                "avatar": "15ba46f0-7abf-4721-9144-7c3f96ef9147",
                "img": "/api/remoteFiles/view/15ba46f0-7abf-4721-9144-7c3f96ef9147",
                "score": "8.3"
            }, {
                "id": 8,
                "name": "Sean Steinbeck",
                "url": "sean.steinbeck",
                "email": "seanSteinbeck@gmail.com",
                "avatar": "9b6f0c1e-8f96-4ade-8639-a8041aa023e5",
                "img": "/api/remoteFiles/view/9b6f0c1e-8f96-4ade-8639-a8041aa023e5",
                "score": "9.2",
                "children": [{
                    "id": 19,
                    "name": "Henry Jackson",
                    "url": "henry.jackson",
                    "email": "henry.jackson@gmail.com",
                    "avatar": "a4579f61-47a3-477a-a538-4fd3fb95f919",
                    "img": "/api/remoteFiles/view/a4579f61-47a3-477a-a538-4fd3fb95f919",
                    "score": "8.3"
                }, {
                    "id": 20,
                    "name": "William Hung ",
                    "url": "william.hung",
                    "email": "will.hung@gmail.com",
                    "avatar": "ff2eba43-85e3-4c8e-a193-35a27b5b1477",
                    "img": "/api/remoteFiles/view/ff2eba43-85e3-4c8e-a193-35a27b5b1477",
                    "score": "9.8"
                }, {
                    "id": 21,
                    "name": "Charlie Sheen",
                    "url": "charlie.sheen",
                    "email": "charlie.sheen@gmail.com",
                    "avatar": "13e4671d-74c3-4b29-8913-49aa55cd825c",
                    "img": "/api/remoteFiles/view/13e4671d-74c3-4b29-8913-49aa55cd825c",
                    "score": "6.3"
                }]
            }, {
                "id": 9,
                "name": "Heather Lambert",
                "url": "heather.lambert",
                "email": "heatherLambert@gmail.com",
                "avatar": "05b1e274-ac01-4870-8594-72cbff2b13239",
                "img": "/api/remoteFiles/view/05b1e274-ac01-4870-8594-72cbff2b1323g",
                "score": "7.9"
            }, {
                "id": 10,
                "name": "Jennifer Lawrence",
                "url": "jennifer.lawrence",
                "email": "jenniferLawrence@gmail.com",
                "avatar": "bbd6e84c-47c9-4de4-878d-9539d3049016",
                "img": "/api/remoteFiles/view/bbd6e84c-47c9-4de4-878d-9539d3049016",
                "score": "10",
                "children": [{
                    "id": 22,
                    "name": "Martin Hampton",
                    "url": "martin.hamtpon",
                    "email": "martin.hampton@gmail.com",
                    "avatar": "e54068cc-9089-4780-b3cb-fbb07e5e62f0",
                    "img": "/api/remoteFiles/view/e54068cc-9089-4780-b3cb-fbb07e5e62f0",
                    "score": "8.3"
                }, {
                    "id": 23,
                    "name": "Karla Waters",
                    "url": "karla.waters",
                    "email": "karla.waters@gmail.com",
                    "avatar": "fd7f6027-b7d5-4b88-85a1-1475c6299002",
                    "img": "/api/remoteFiles/view/fd7f6027-b7d5-4b88-85a1-1475c6299002",
                    "score": "9.1"
                }, {
                    "id": 24,
                    "name": "Jeremy Sonderland",
                    "url": "jeremy.sonderland",
                    "email": "jerermy.sonderland@gmail.com",
                    "avatar": "cd324ef0-27f3-44c8-9a4b-afe48cf997f7",
                    "img": "/api/remoteFiles/view/cd324ef0-27f3-44c8-9a4b-afe48cf997f7",
                    "score": "8.9"
                }]
            }]
        };
    }
});