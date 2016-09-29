var ImportsSearch = React.createClass({
    getInitialState: function(){
        return {
            search: '',
            showResults: false,
            data: []
        }
    },
    componentWillReceiveProps: function(newProps) {

    },
    handleFilterUpdate: function(filteredValue) {
        this.props.updateFilter(filteredValue);
        this.onClearSearch();
        ReactDOM.findDOMNode(this.refs.search).value = '';
    },
    render: function() {
        return (
            <div id="search-box" className="navbar-form">
                <div className="ui-widget">
                    <div className="input-group">
                            <input className="form-control" type="text" ref="search" placeholder="Search" id="search" value={this.props.search} onKeyDown={this.handleKeyDown} onChange={this.onSearchChanged} />
                            <div className="input-group-addon"><span className="glyphicon glyphicon-search"></span></div>
                            { this.state.showResults ? <ImportResults updateFilter={this.handleFilterUpdate} data={this.state.data} /> : null }
                    </div>
                </div>
            </div>
        )
    },
    handleKeyDown: function(e) {
        console.log(e.keyCode);
        var ESC =  27;
        if( e.keyCode == ESC ) {
            this.onClearSearch();
            ReactDOM.findDOMNode(this.refs.search).value = '';
        }
    },
    onSearchChanged: function() {
        if (this.promise) {
            clearInterval(this.promise)
        }
        this.setState({
            search: ReactDOM.findDOMNode(this.refs.search).value,
            showResults: true
        });
        this.promise = setTimeout(function () {
            console.log('Search term: '+ ReactDOM.findDOMNode(this.refs.search).value)
            var query = ReactDOM.findDOMNode(this.refs.search).value
            console.log("Right before search");
            console.log(this.props.imports);
            var options = this.props.imports;
            if (query.length > 1) {
                var data = $.grep(options, function(n){
                   return n.name.indexOf(query) == 0;
                });
                console.log(data);
                this.setState({data: data});
            } else {
                this.onClearSearch();
            }
            //  console.log("After timeout: "+ this.state.search);
        }.bind(this), 200);
    },
    onClearSearch: function() {
        this.setState({
            search: '',
            showResults: false
        });
        console.log(this.state.search);
    },
});

var ImportResults = React.createClass({
    handleFilterUpdate: function(id) {
        console.log(id);
        this.props.updateFilter(id);
    },
    render: function() {
        var content;
        if (this.props.data.length > 0) {
            var items = this.props.data.map(function(item) {
                return (
                    <li className="divider" id={item.id}>
                        <a onClick={this.handleFilterUpdate.bind(this, item.id)}>
                            <div className="clearfix">
                                <div className="col-sm-12">
                                    <div className="clearfix">
                                        <div><p>{item.name}</p></div>
                                    </div>
                                </div>
                            </div>
                        </a>
                    </li>
                )
            }.bind(this));
            content = <ul>{items}</ul>
        } else {
            content = <p>No results found</p>
        }
        return (
            <div id="results" className="import-search-results">
                {content}
            </div>
        );
    }
});