'use strict';

var NetworkContent = React.createClass({
    displayName: 'NetworkContent',
    getInitialState: function getInitialState() {
        return {
            svg: '',
            user: this.props.user,
            myNetwork: this.props.myNetwork
        };
    },
    handleSearchNode: function handleSearchNode() {
        //find the node
        var selectedVal = document.getElementById('searchNetwork').value;
        var node = this.state.svg.selectAll(".node");
        console.log(selectedVal);

        if (selectedVal == "none") {
            node.style("stroke", "white").style("stroke-width", "1");
        } else {
            var selected = node.filter(function (d, i) {
                return d.name != selectedVal;
            });
            if (selected != null) {
                selected.style("opacity", "0");
                var link = this.state.svg.selectAll(".link2");
                link.style("opacity", "0");
                d3.selectAll(".node, .link2").transition().duration(5000).style("opacity", 1);
            }
        }
    },
    handleHideModal: function handleHideModal() {
        console.log("networkContent.handleHideModal");
        React.unmountComponentAtNode(document.getElementById('my-modal'));
    },
    getUser: function getUser(u, sl) {
        var name = u.firstName + " " + u.lastName;
        var initials = name.match(/\b\w/g);
        initials = (initials.shift() + initials.pop()).toUpperCase();
        var user = {
            "id": u.id,
            "name": u.firstName + " " + u.lastName,
            "email": u.email,
            "avatar": u.avatar,
            "img": "/api/remoteFiles/view/" + u.avatar,
            "score": u.score == '10.00' ? '10' : u.score.substring(0, u.score.indexOf(".") + 2),
            "initials": initials,
            "children": sl
        };
        return user;
    },
    getChildren: function getChildren(c) {
        var name = c.firstName + " " + c.lastName;
        var initials = name.match(/\b\w/g);
        initials = (initials.shift() + initials.pop()).toUpperCase();
        return {
            "id": c.id,
            "name": c.firstName + " " + c.lastName,
            "email": c.email,
            "avatar": c.avatar,
            "img": "/api/remoteFiles/view/" + c.avatar,
            "score": c.score == '10.00' ? '10' : c.score.substring(0, c.score.indexOf(".") + 2),
            "initials": initials
        };
    },
    componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
        if (!$.isEmptyObject(nextProps.myNetwork) && !$.isEmptyObject(nextProps.user) && $('#network-tree').html().length == 0) {
            var searchNode = function searchNode() {
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
            };

            var flatten = function flatten(root) {
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
            };

            /*   this.setState({
                   myNetwork: nextProps.myNetwork,
                   user: nextProps.user
               }); */
            console.log("prepareComponentState:componentWillReceiveProps:myNetwork");
            console.log(nextProps.myNetwork);
            var sl = [];
            $.each(nextProps.myNetwork, (function (index, value) {
                var child = this.getChildren(value);
                sl.push(child);
            }).bind(this));
            var user = this.getUser(nextProps.user, sl);
            console.log(JSON.stringify(user));

            var width = 720,
                height = 720;

            var svg = d3.select("#network-tree").append("svg").attr("width", width).attr("height", height);

            svg.append("svg:clipPath").attr("id", "centerAvatarClip").append("svg:circle").attr("cx", "0").attr("cy", "0").attr("r", 20);

            svg.append("svg:clipPath").attr("id", "centerAvatarClip2").append("svg:circle").attr("cx", "0").attr("cy", "0").attr("r", 40);

            svg.append("svg:use").attr("id", "topmost").attr("xlink:href", "");

            this.setState({ svg: svg });

            var force = d3.layout.force().gravity(.03).distance(120).charge(-300).size([width, height]);

            var root = user;
            var nodes = flatten(root),
                links = d3.layout.tree().links(nodes);
            console.log("Nodes and Links:");
            console.log(nodes);
            console.log(links);

            nodes.forEach(function (d, i) {
                d.x = width / 2 + i;
                d.y = height / 2 + 100 * d.depth;
            });

            root.fixed = true;
            root.x = width / 2;
            root.y = height / 2;

            force.nodes(nodes).links(links).start();

            var optArray = [];
            for (var i = 0; i < nodes.length - 1; i++) {
                optArray.push(nodes[i].name);
            }

            optArray = optArray.sort();
            optArray = $.unique(optArray);

            $(function () {
                $("#searchNetwork").autocomplete({
                    source: optArray
                });
            });

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
                    return d.name + ' - ' + d.score;
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
                //window.location.href='/profile/'+d.url;
                console.log("networkContent");
                console.log(d.id);
                var myModal = React.createElement(MyModal, { id: d.id, username: d.avatar, initials: d.initials, handleHideModal: this.handleHideModal });
                ReactDOM.render(myModal, document.getElementById('my-modal'));
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
        }
    },
    componentDidMount: function componentDidMount() {},
    render: function render() {
        return React.createElement(
            'div',
            { className: 'tab-pane fade', id: 'my-network-content' },
            React.createElement(
                'div',
                { className: 'navbar-form' },
                React.createElement(
                    'div',
                    { className: 'ui-widget' },
                    React.createElement('input', { className: 'form-control', type: 'text', id: 'searchNetwork' }),
                    React.createElement(
                        'button',
                        { type: 'button', className: 'btn btn-primary', onClick: this.handleSearchNode },
                        React.createElement('span', { className: 'glyphicon glyphicon-search' })
                    )
                )
            ),
            React.createElement('div', { id: 'network-tree' }),
            React.createElement('div', { ref: 'my-modal', id: 'my-modal' })
        );
    }
});