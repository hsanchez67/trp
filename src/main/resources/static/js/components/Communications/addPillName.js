var AddPillName = React.createClass({
    getInitialState: function(){
        return {
            search: '',
            showResults: false,
            data: []
        }
    },
    render: function() {
        return (
            <span>
                <div id="add-pill-name" className="input-group">
                    <span className="input-group-addon"><span className="glyphicon glyphicon-plus-sign" aria-hidden="true"></span></span>
                    <input ref="search" className="form-control input-sm search" type="text" placeholder="Type Name or Email" value={this.props.search} onKeyDown={this.handleKeyDown} onChange={this.onSearchChanged} />
                    { this.state.showResults ? <AddPillNameResults data={this.state.data} handleAddUser={this.handleAddUser.bind(this)} /> : null }
                </div>
            </span>
        )
    },
    handleAddUser: function(id) {
        this.setState({
            search: '',
            showResults: false
        });
        ReactDOM.findDOMNode(this.refs.search).value = '';
        this.props.handleAddUser(id);
    },
    handleBlur: function() {
        this.setState({
            search: '',
            showResults: false
        });
        ReactDOM.findDOMNode(this.refs.search).value = '';
    },
    handleKeyDown: function(e) {
        console.log(e.keyCode);
        var ESC =  27;
        if( e.keyCode == ESC ) {
            this.setState({
                search: '',
                showResults: false
            });
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
            console.log('Search term: '+ ReactDOM.findDOMNode(this.refs.search).value);
            var query = ReactDOM.findDOMNode(this.refs.search).value;
            if (query.length > 1) {
                $.ajax({
                    url: '/userSearch',
                    dataType: 'json',
                    type: 'POST',
                    data: 'search='+query,
                    success: function(data) {
                        console.log(data);
                        if ($.isEmptyObject(data)) {
                            this.onClearSearch();
                        } else {
                            console.log(data._embedded.userDTOList);
                            this.setState({data: data._embedded.userDTOList});
                        }
                    }.bind(this),
                    error: function (xhr, status, err) {
                        console.error(this.props.url, status, err.toString());
                    }.bind(this)
                });
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
    }
});

var AddPillNameResults = React.createClass({
    handleAddUser: function(id) {
        this.props.handleAddUser(id);
    },
    render: function() {
        return (
            <div id="results" className="search-results">
                <ul>
                    {
                        this.props.data.map(function (obj) {
                            return <AddPillNameResultObj key={obj.id} data={obj} firstName={obj.firstName} lastName={obj.lastName} profession={obj.profession} handleAddUser={this.handleAddUser.bind(this, obj.id)} />
                        }.bind(this))
                    }
                </ul>
            </div>
        );
    }
});

var imgMaxWidth = {
    width: '40px',
    height: '40px',
    position: 'relative',
    top: '0'
};

var AddPillNameResultObj = React.createClass({
    getInitialState: function() {
        return {
            id: this.props.id
        };
    },
    handleAddUser: function() {
        this.props.handleAddUser(this.state.id);
    },
    render: function() {
        return (
            <li className="divider margin-bottom-10" key={this.props.key}>
                <div className="row">
                    <div className="col-sm-12">
                        <div className="col-sm-2">
                            <img className="img-circle" src={'/api/remoteFiles/view/' + this.props.data.avatar} style={imgMaxWidth} />
                        </div>
                        <div className="col-sm-8">
                            <div className="clearfix text-left">
                                <div className="font-500">{this.props.firstName+ ' ' + this.props.lastName}</div>
                                <div>{this.props.profession}</div>
                            </div>
                        </div>
                        <div className="col-sm-2">
                            <div><button type="button" onClick={this.handleAddUser} className="btn btn-xs btn-primary">Add</button></div>
                        </div>
                    </div>
                </div>
            </li>
        )
    }
});