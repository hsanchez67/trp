$( document ).ready(function() {
    var margin = {top: 20, right: 10, bottom: 20, left: 10};
    // no sidebar width is 960
    var width = 740 - margin.left - margin.right,
        height = 740 - margin.top - margin.bottom;


    var svg = d3.select("#shortList-content").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    svg.append("svg:clipPath")
        .attr("id","centerAvatarClip")
        .append("svg:circle")
        .attr("cx", "0")
        .attr("cy", "0")
        .attr("r", 40);

    svg.append("svg:use")
        .attr("id", "topmost")
        .attr("xlink:href", "");

    var force = d3.layout.force()
        .gravity(.03)
        .distance(200)
        .charge(-400)
        .size([width, height]);

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

    force
        .nodes(nodes)
        .links(links)
        .start();

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
        .attr("id", function (d) { return d.id})
        .call(force.drag);

    node.append("image")
        .attr("xlink:href", function (d) {
            return d.img
        })
        .attr("x", -40)
        .attr("y", -40)
        .attr("width", "80px")
        .attr("height", "80px")
        .attr("clip-path", "url(#centerAvatarClip)");

    node.append("svg:circle")
        .attr("class","aux-border")
        .attr("cx", "0")
        .attr("cy", "0")
        .attr("r", 40);

    node.append("svg:circle")
        .attr("class", function(d) {
            var border = "score-green";
            if (d.score < 2.5) border = "score-red";
            if (d.score >= 2.5 && d.score < 5) border = "score-yellow";
            if (d.score >= 5 && d.score < 7.5) border = "score-blue";
            return border;
        })
        .attr("cx", "35")
        .attr("cy", "-35")
        .attr("r", 15);

    node.append("text")
        .attr("dx", 35)
        .attr("dy", -30)
        .attr("text-anchor", "middle")
        .attr("class", "score-label")
        .text(function (d) {
            return d.score
        });

    node.append("text")
        .attr("dx", 0)
        .attr("dy", 55)
        .attr("text-anchor", "middle")
        .text(function (d) {
            return d.name
        });

    node.on("mouseover", function(d){
        // name_hover.attr("style","display:block");
    }).on("mouseout",function(d){
       // name_hover.attr("style","display:none");
    }).on("click", function(d){
        showExpandedView(d3.select(this))
    });

    force.on("tick", function () {
        nodes[nodes.length-1].x = width / 2;
        nodes[nodes.length-1].y = height / 2;

        link.attr("x1", function (d) {
            return d.source.x;
        })
            .attr("y1", function (d) {
                return d.source.y;
            })
            .attr("x2", function (d) {
                return d.target.x;
            })
            .attr("y2", function (d) {
                return d.target.y;
            });

        node.attr("cx", function(d) { return d.x = Math.max(15, Math.min(width - 15, d.x)); })
            .attr("cy", function(d) { return d.y = Math.max(15, Math.min(height - 15, d.y)); });

        node.attr("transform", function (d) {
            return "translate(" + d.x + "," + d.y + ")";
        });
    });

    var missing_image = "../images/default_avatar_male_gray.jpg";

    var showExpandedView = function(d3Element){
        // Remove all child elements of the person
        d3Element.selectAll("*").remove();
        // Remove any other expanded view that could be open
        d3.selectAll("g.person-expanded").remove();
        //Get details from API
        console.log(d3Element[0][0].__data__.avatar);
        var avatar = d3Element[0][0].__data__.avatar;
        var source = '/api/users/search/findByAvatar?avatar='+avatar;
        $.get(source, function (result) {
            if (result != null) {
                console.log(result);
                var data = result._embedded.users[0];
                var html = '<div class="text-center"><div class="name"><strong>';
                html = html + data.firstName + '</strong> '+data.lastName+'<strong>.</strong></div>';
                html = html + '<h4>' + data.profession + '</h4><h5>KELLER WILLIAMS Realty</h5><small class="label label-warning label-as-location">Granite Bay, CA</small>';
                html = html + '<div class="buttons"><a class="btn btn-primary btn-xs"  href="/introduction/'+data.id+'" role="button">Introduce '+ data.firstName + '...</a> ';
                html = html + ' <a class="btn btn-primary btn-xs"  href="#" onclick="loadPerson()" role="button">See '+ data.firstName + '\'s short list...</a></div></div>';
                console.log(html);

                var person_expanded = d3Element
                    .append("svg:g")
                    .attr("id", "person-expanded")
                    .attr("class", "person-expanded person expanded");

                person_expanded
                    .append("svg:rect")
                    .attr("class","expanded-bg")
                    .attr("width", 420)
                    .attr("height", 250)
                    .attr("x", -60)
                    .attr("y", -60)
                    .attr("rx", 10)
                    .attr("ry", 10);

                person_expanded
                    .append("svg:g")
                    .attr("clip-path", "url(#centerAvatarClip)")
                    //   .attr("transform", "translate(8,8)")
                    .append("svg:image")
                    .attr("xlink:href", function(d){ return d.img || missing_image;})
                    .attr("width", "80px")
                    .attr("height", "80px")
                    .attr("x", -40)
                    .attr("y", -40);

                person_expanded
                    .append("svg:circle")
                    .attr("class", "aux-border")
                    .attr("cx", "0")
                    .attr("cy", "0")
                    .attr("r", 40);

                person_expanded
                    .append("svg:circle")
                    .attr("class", function(d) {
                        var border = "score-green";
                        if (d.score < 2.5) border = "score-red";
                        if (d.score >= 2.5 && d.score < 5) border = "score-yellow";
                        if (d.score >= 5 && d.score < 7.5) border = "score-blue";
                        return border;
                    })
                    .attr("cx", "35")
                    .attr("cy", "-35")
                    .attr("r", 15);

                person_expanded
                    .append("text")
                    .attr("dx", 35)
                    .attr("dy", -30)
                    .attr("text-anchor", "middle")
                    .attr("class", "score-label")
                    .text(function (d) {
                        return d.score
                    });

                person_expanded
                    .append('foreignObject')
                    .attr('x', 45)
                    .attr('y', -20)
                    .attr('width', 300)
                    .attr('height', 150)
                    .append("xhtml:div")
                    .attr("id","profileDetails")
                    .html(html);


                d3Element.attr("transform", function(d) {
                    d.x = 200;
                    d.y = 150;
                    d.center = true;
                    return "translate("+ d.x +","+ d.y +")";
                });
                d3Element.moveToFront();
                //  d3Element.on("mousedown.drag", null);
                var closeBtn = person_expanded
                    .append("svg:foreignObject")
                    .attr("width", 25)
                    .attr("height", 25)
                    .attr("y", "-45px")
                    .attr("x", "325px");

                closeBtn
                    .append("xhtml:span")
                    .attr("class", "control glyphicon glyphicon-remove")
                    .style("cursor","pointer")
                    .on("click", function (d, i) {
                        d3.event.stopPropagation();
                        showPictureOnlyView(d3Element);
                        d.center = false;
                        d.fixed = false;
                        showPictureOnlyView(d3Element);
                        force.stop().start();
                    });
            }
        }.bind(this));
    }

    var showPictureOnlyView = function(d3Element) {
            // Remove the person-expanded view
        //d3.selectAll(d3Element[0][0].childNodes).remove();
        d3Element.selectAll("*").remove();

        // Add element again...... picture / score / name
        d3Element
            .append("image")
            .attr("xlink:href", function (d) {
                return d.img
            })
            .attr("x", -40)
            .attr("y", -40)
            .attr("width", "80px")
            .attr("height", "80px")
            .attr("clip-path", "url(#centerAvatarClip)");

        d3Element
            .append("svg:circle")
            .attr("class","aux-border")
            .attr("cx", "0")
            .attr("cy", "0")
            .attr("r", 40);

        d3Element
            .append("svg:circle")
            .attr("class", function(d) {
                var border = "score-green";
                if (d.score < 2.5) border = "score-red";
                if (d.score >= 2.5 && d.score < 5) border = "score-yellow";
                if (d.score >= 5 && d.score < 7.5) border = "score-blue";
                return border;
            })
            .attr("cx", "35")
            .attr("cy", "-35")
            .attr("r", 15);

        d3Element
            .append("text")
            .attr("dx", 35)
            .attr("dy", -30)
            .attr("text-anchor", "middle")
            .attr("class", "score-label")
            .text(function (d) {
                return d.score
            });

        d3Element
            .append("text")
            .attr("dx", 0)
            .attr("dy", 55)
            .attr("text-anchor", "middle")
            .text(function (d) {
                return d.name
            });

        d3Element.on("click", function(d){
            showExpandedView(d3.select(this))
        });
    }

    d3.selection.prototype.moveToFront = function() {
        return this.each(function(){
            this.parentNode.appendChild(this);
        });
    };

    function getData() {
        return {
            "id": 0,
            "name": "John Stein",
            "email": "johnStein@gmail.com",
            "avatar": "2b3c1c87-1c8c-495d-a1f7-a7ab4aa20b35",
            "img": "/api/remoteFiles/view/2b3c1c87-1c8c-495d-a1f7-a7ab4aa20b35",
            "score": "9.4",
            "children": [{
                "id": 1,
                "name": "Jennifer Hudson",
                "email": "jenniferHudson@gmail.com",
                "avatar": "01efb1ad-3a5a-493f-8b85-cd0a8c92299c",
                "img": "/api/remoteFiles/view/01efb1ad-3a5a-493f-8b85-cd0a8c92299c",
                "score": "8.4"
            }, {
                "id": 2,
                "name": "Adam West",
                "email": "adamWest@gmail.com",
                "avatar": "25f87a33-df25-4207-a584-d705defbc9eb",
                "img": "/api/remoteFiles/view/25f87a33-df25-4207-a584-d705defbc9eb",
                "score": "7.5"
            }, {
                "id": 3,
                "name": "Austin Powers",
                "email": "austionPowers@gmail.com",
                "avatar": "b72b9f28-4446-4938-9210-0f759086e8fd",
                "img": "/api/remoteFiles/view/b72b9f28-4446-4938-9210-0f759086e8fd",
                "score": "9.0"
            }, {
                "id": 4,
                "name": "Mia Ham",
                "email": "miaHamm@gmail.com",
                "avatar": "74cdd847-9edf-4327-8346-f8df32a771a0",
                "img": "/api/remoteFiles/view/74cdd847-9edf-4327-8346-f8df32a771a0",
                "score": "9.3"
            }, {
                "id": 5,
                "name": "Joe Jackson",
                "email": "joeJackson@gmail.com",
                "avatar": "e76729f8-a7a6-47d4-905f-9f7dd68fa498",
                "img": "/api/remoteFiles/view/e76729f8-a7a6-47d4-905f-9f7dd68fa498",
                "score": "7.7"
            }, {
                "id": 6,
                "name": "Johnny Walker",
                "email": "johnnyWalker@gmail.com",
                "avatar": "229fbf25-4083-418d-85b1-6eb0d528f625",
                "img": "/api/remoteFiles/view/229fbf25-4083-418d-85b1-6eb0d528f625",
                "score": "8.7"
            }, {
                "id": 7,
                "name": "Angela Ashes",
                "email": "angelaAshes@gmail.com",
                "avatar": "15ba46f0-7abf-4721-9144-7c3f96ef9147",
                "img": "/api/remoteFiles/view/15ba46f0-7abf-4721-9144-7c3f96ef9147",
                "score": "8.3"
            }, {
                "id": 8,
                "name": "Sean Steinbeck",
                "email": "seanSteinbeck@gmail.com",
                "avatar": "9b6f0c1e-8f96-4ade-8639-a8041aa023e5",
                "img": "/api/remoteFiles/view/9b6f0c1e-8f96-4ade-8639-a8041aa023e5",
                "score": "9.2"
            }, {
                "id": 9,
                "name": "Heather Lambert",
                "email": "heatherLambert@gmail.com",
                "avatar": "05b1e274-ac01-4870-8594-72cbff2b1323",
                "img": "/api/remoteFiles/view/05b1e274-ac01-4870-8594-72cbff2b1323",
                "score": "7.9"
            } , {
                "id": 10,
                "name": "Jennifer Lawrence",
                "email": "jenniferLawrence@gmail.com",
                "avatar": "bbd6e84c-47c9-4de4-878d-9539d3049016",
                "img": "/api/remoteFiles/view/bbd6e84c-47c9-4de4-878d-9539d3049016",
                "score": "10"
            } , {
                "id": 11,
                "name": "Charlie Sheen",
                "email": "charlie.sheen@gmail.com",
                "avatar": "avatar-20",
                "img": "/api/remoteFiles/view/13e4671d-74c3-4b29-8913-49aa55cd825c",
                "score": "6.3"
            }
            ]
        }
    }

});