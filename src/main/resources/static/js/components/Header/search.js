var NavSearch = React.createClass({
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
                <input ref='search' type='text' className='form-control input-sm search' placeholder='Search' value={this.props.search} onKeyDown={this.handleKeyDown} onChange={this.onSearchChanged} />
                { this.state.showResults ? <Results data={this.state.data} handleBlur={this.handleBlur} handleAddUserToCurrentGroup={this.handleAddUserToCurrentGroup.bind(this)} label={this.props.label} /> : null }
            </span>
        )
    },
    handleBlur: function() {
        this.setState({
            search: '',
            showResults: false
        });
        ReactDOM.findDOMNode(this.refs.search).value = '';
    },
    handleAddUserToCurrentGroup: function(id) {
        this.setState({
            search: '',
            showResults: false
        });
        ReactDOM.findDOMNode(this.refs.search).value = '';
        this.props.handleAddUserToCurrentGroup(id);
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

var Results = React.createClass({
    handleAddUserToCurrentGroup: function(id) {
        this.props.handleAddUserToCurrentGroup(id);
    },
    getInitials: function(name) {
        var initials = name.match(/\b\w/g);
        initials = (initials.shift() + initials.pop()).toUpperCase();
        return initials;
    },
    render: function() {
        return (
            <div id="results" className="search-results">
                <ul>
                {
                    this.props.data.map(function (obj) {
                        var initials = this.getInitials(obj.firstName+" "+obj.lastName);
                        return <ResultObj key={obj.id} data={obj} initials={initials} firstName={obj.firstName} lastName={obj.lastName} handleBlur={this.props.handleBlur} handleAddUserToCurrentGroup={this.handleAddUserToCurrentGroup.bind(this, obj.id)} label={this.props.label} />
                    }.bind(this))
                }
                </ul>
            </div>
        );
    }
});

var imgMaxWidth = {
    width: '60px',
    height: '60px',
    position: 'relative',
    top: '0',
    marginBottom: '10px'
};

var ResultObj = React.createClass({
    handleAddUserToCurrentGroup: function() {
        this.props.handleAddUserToCurrentGroup(this.props.data.id);
    },
    render: function() {
        var buttonLabel = "Add To Group";
        if (this.props.label != null && this.props.label != '') {
            buttonLabel = this.props.label;
        }
        return (
            <li className="divider margin-bottom-10" key={this.props.key}>
                <div className="clearfix">
                    <div className="col-sm-2">
                        <AvatarPic username={this.props.data.avatar} initials={this.props.initials} />
                    </div>
                    <div className="col-sm-10">
                        <div className="clearfix">
                            <div className="full-name">{this.props.firstName+ ' ' + this.props.lastName}</div>
                            <div className="user-score"><i className="fa fa-star"></i> {this.props.data.score}</div>
                            <div>
                                <a type="button" href={'/profile/'+this.props.data.id} onClick={this.props.handleBlur} className="btn btn-xs btn-primary">Profile</a>&nbsp;
                                <button type="button" onClick={this.handleAddUserToCurrentGroup} className="btn btn-xs btn-primary">{buttonLabel}</button>
                            </div>
                        </div>
                    </div>
                </div>
            </li>
        )
    }
});

var AvatarPic = React.createClass({
    render: function() {
        var image;
        if (this.props.username=='') {
            image = <img  src="../images/120px-blank.png" className="img-circle" style={imgMaxWidth} />
        }else if (this.props.username == 'default' && this.props.initials != '') {
            image = <div className="avatar-circle"><img className="hidden" id={this.props.id} /><span className="initials">{this.props.initials}</span></div>;
        } else {
            image = <img src={'/api/remoteFiles/view/' + this.props.username} className="img-circle" style={imgMaxWidth} />;
        }
        return (
            <span>{image}</span>
        );
    }
});