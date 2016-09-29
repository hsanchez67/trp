var ShortListContent = React.createClass({
    displayName: 'shortListContent',
    getInitialState(){
        return {
            svg: '',
            user: this.props.user,
            shortlist: this.props.shortlist
        };
    },
    handleHideModal() {
        console.log("shortListContent.handleHideModal");
        React.unmountComponentAtNode(document.getElementById('my-modal-2'));
    },
    getUser: function(u, sl) {
        var name = u.firstName + " " + u.lastName;
        var initials = name.match(/\b\w/g);
        initials = (initials.shift() + initials.pop()).toUpperCase();
        var user = {
            "id": u.id,
            "name": u.firstName + " " + u.lastName,
            "email": u.email,
            "avatar": u.avatar,
            "img": "/api/remoteFiles/view/" + u.avatar,
            "score": u.score == '10.00' ? '10' : u.score.substring(0, u.score.indexOf(".")+2),
            "initials" : initials,
            "children": sl
        };
        return user;
    },
    getChildren: function(c) {
        var name = c.firstName + " " + c.lastName;
        var initials = name.match(/\b\w/g);
        initials = (initials.shift() + initials.pop()).toUpperCase();
        return {
            "id": c.id,
            "name": c.firstName + " " + c.lastName,
            "email": c.email,
            "avatar": c.avatar,
            "img": "/api/remoteFiles/view/" + c.avatar,
            "score": c.score == '10.00' ? '10' : c.score.substring(0, c.score.indexOf(".")+2),
            "initials": initials
        };
    },
    componentWillReceiveProps:  function(nextProps) {
        if (!$.isEmptyObject(nextProps.shortlist) && !$.isEmptyObject(nextProps.user) && $('#shortList-tree').html().length == 0) {
       /*     this.setState({
                shortlist: nextProps.shortlist,
                user: nextProps.user
            }); */
            console.log("ShortListContent:prepareComponentState:shortlist");
            console.log(nextProps.shortlist);
            var sl = [];
            $.each(nextProps.shortlist, function(index, value) {
                var child = this.getChildren(value);
                sl.push(child);
            }.bind(this));
            var user = this.getUser(nextProps.user, sl);
            console.log(JSON.stringify(user));

            var margin = {top: 20, right: 10, bottom: 20, left: 10};
            // no sidebar width is 960
            var width = 740 - margin.left - margin.right,
                height = 740 - margin.top - margin.bottom;


            var svg = d3.select("#shortList-tree").append("svg")
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

            var root = user;
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
                //  showExpandedView(d3.select(this))
                console.log("shortListContent");
                console.log(d.id);
                var myModal =  <MyModal id={d.id} username={d.avatar} inititals={d.initials} handleHideModal={this.handleHideModal} />
                ReactDOM.render(myModal, document.getElementById('my-modal-2'));
            }.bind(this));

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

            d3.selection.prototype.moveToFront = function() {
                return this.each(function(){
                    this.parentNode.appendChild(this);
                });
            };

        }
    },
    componentDidMount: function() {

    },
    render: function () {
        return (
            <div className="tab-pane fade text-left" id="shortList-content">
                <div id="shortList-tree"></div>
                <div ref="my-modal-2" id="my-modal-2"></div>
            </div>
        );
    },
});
