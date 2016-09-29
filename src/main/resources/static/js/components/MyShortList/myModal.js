var wellSmallNoBottomPadding = {
    marginBottom: '0'
};

var MyModal = React.createClass({
    getInitialState(){
        return {
        	user: [],
            id: this.props.id,
            username: '',
            avatar: this.props.username,
            name: '',
            source: '/api/users/'+this.props.id,
            score: 0,
            initials: this.props.initials,
            contactNotes: ''
        }
    },
    componentDidMount(){
        if(this.state.id != 0  && this.state.source != '') {
            $.get(this.state.source, function (result) {
                var data = result;
                console.log(data);
                if ($.type(data) === "string") {
                    if (data.indexOf('loginPage.js') != -1) {
                        window.location.href = '/login';
                    }
                }
                if (this.isMounted() && !$.isEmptyObject(result)) {
                    var name = data.firstName + " " + data.lastName;
                    var initials = name.match(/\b\w/g);
                    initials = (initials.shift() + initials.pop()).toUpperCase();
                    this.setState({
                    	user: data,
                        username: data.firstName.toLowerCase() + '.' + data.lastName.toLowerCase(),
                        name: data.firstName + ' ' + data.lastName,
                        score: data.score == null ? 0 : data.score,
                        initials: initials
                    });
                    $(ReactDOM.findDOMNode(this)).modal('show');
                    $(ReactDOM.findDOMNode(this)).on('hidden.bs.modal', this.props.handleHideModal);
                }
            }.bind(this));
            this.getContactNotes();
            $("#myModalContactNotes").on("shown", function (element, test) {
                $(test.input.$input[0]).attr("cols", "50")
            });
        }
    },
    getContactNotes: function() {
        // Get contact notes
        console.log("MyModal:getContactNotes:");
        var data = {
            ownerUserId: $('#id').val(),
            targetUserId: this.props.id,
        };
        var formData = JSON.stringify(data, null, ' ');
        $.ajax({
            type: "POST",
            url: "/getContactNotes",
            async:   true,
            data: formData,
            success: function(result){
                console.log(result)
                if (!$.isEmptyObject(result)) {
                    this.setState({
                        contactNotes: result.content
                    });
                }
                this.initializeContactNotes();
            }.bind(this),
            dataType: "json",
            contentType : "application/json"
        });
    },
    initializeContactNotes: function() {
        var id = $('#id').val();
        var id2 = this.props.id;
        console.log("MyModal:componentDidUpdate:id:");
        console.log(id);

        $('#myModalContactNotes').editable({
            type: 'textarea',
            pk: id,
            url: '/saveContactNotes',
            mode: 'inline',
            send: 'always',
            ajaxOptions: {
                contentType: 'application/json',
                type: 'post',
                dataType: 'json' //assuming json response
            },
            params: function (params) {
                var data = {
                    ownerUserId: id,
                    targetUserId: id2,
                    content: params.value
                };
                return JSON.stringify(data);
            },
            success: function (data) {
                console.log("Success data below:");
                console.log(data)
            },
            error: function (errors) {
                console.log(errors.responseText)
            },
            rows: 10
        });
    },
    render(){
        var borderClass = classNames({
           'btn btn-primary btn-circle btn-circle-green': this.state.score >= 7.5,
           'btn btn-primary btn-circle btn-circle-blue': this.state.score >= 5 && this.state.score < 7.5,
           'btn btn-primary btn-circle btn-circle-yellow': this.state.score >= 2.5 && this.state.score < 5,
           'btn btn-primary btn-circle btn-circle-red': this.state.score < 2.5
        });
        return (
            <div id="avatarProfile" className="modal fade">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={this.props.handleHideModal}><span aria-hidden="true">&times;</span></button>
                            <h4 className="modal-title"><strong>{this.state.user.firstName}</strong> {this.state.user.lastName}<strong>.</strong></h4>
                        </div>
                        <div className="modal-body">
                            <div className="row">
                                <div className="col-md-4">
                                    <div className="text-center margin-bottom-20" id="user">
                                        <ProfilePic2 username={this.state.avatar} initials={this.state.initials} />
                                        <span className="score score-as-badge">
                                            <span ref="btn-circle" className={borderClass} >{this.state.score}</span>
                                        </span>
                                        <div className="buttons">
                                            <a href={'/introduction/' +this.state.user.id} role="button" className="btn btn-xs btn-primary">
                                                <i className="fa fa-share-alt" title={'Introduce ' + this.state.user.firstName} aria-hidden="true"></i>
                                                <span className="sr-only">Introduce {this.state.user.firstName}</span>
                                            </a>
                                            <a href={'/referral/' +this.state.user.id} role="button" className="btn btn-xs btn-primary">
                                                <i className="fa fa-arrow-right" title={'Refer ' + this.state.user.firstName} aria-hidden="true"></i>
                                                <span className="sr-only">Refer {this.state.user.firstName}</span>
                                            </a>
                                            <a href={'/profile/' +this.state.user.id} role="button" className="btn btn-xs btn-primary">
                                                <i className="fa fa-user" title={'View ' + this.state.user.firstName + ' profile'} aria-hidden="true"></i>
                                                <span className="sr-only">View {this.state.user.firstName}'s profile</span>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-8">
                                    <div className="text-center margin-bottom-20" id="userDetails">
                                        <ProfileBits2 profile={this.state.user} />
                                    </div>
                                </div>
                                <div className="col-md-12">
                                    <div className="well well-sm clearfix margin-top-20" style={wellSmallNoBottomPadding}>
                                        <div className="form-group text-left">
                                            <label for="myModalContactNotes" className="col-sm-12 control-label">Notes</label>
                                            <div className="col-sm-12">
                                                <a href="#" id="myModalContactNotes" ref="myModalContactNotes" data-type="textarea" className="editable editable-click" data-title="Personal notes for this Contact">{this.state.contactNotes}</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <div className="compliance-button">
                                <a onClick={this.props.getHistory} className="btn btx-xs btn-primary pointer">
                                    <span>
                                        <i className="fa fa-list"></i>
                                        <i className="fa fa-check fa-0x-check"></i>
                                    </span>
                                </a>
                            </div>
                            <button type="button" className="btn btn-default" data-dismiss="modal" onClick={this.props.handleHideModal}>Close</button>
                        </div>
                    </div>
                </div>
            </div>

        )
    },
    propTypes:{
        handleHideModal: React.PropTypes.func.isRequired
    }
});

var ProfilePic2 = React.createClass({
    render: function() {
        var image;
        if (this.props.username == 'default' && this.props.initials != '') {
            image = <div className="avatar-circle"><span className="initials">{this.props.initials}</span></div>;
        } else {
            image = <img src={'/api/remoteFiles/view/' + this.props.username} className="img-circle" />;
        }
        return (
            <span>{image}</span>
        );
    }
});