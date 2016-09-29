var NewContactsModal = React.createClass({
    getInitialState: function() {
        return {
            contacts: this.props.contacts,
            size: this.props.contacts.length
        };
    },
    componentDidMount(){
        console.log("Inside NewContactsModal");
        console.log(this.props.user);
        var options = {
            "backdrop" : "static",
            "show" : "true"
        }
        $(ReactDOM.findDOMNode(this)).modal(options);
        $(ReactDOM.findDOMNode(this)).on('hidden.bs.modal', this.props.handleHideModal);
        CKEDITOR.replace('includeMessage',
            {
                removePlugins: 'toolbar',
                allowedContent: 'p h1 h2 strong em; a[!href]; img[!src,width,height];'
            } );

        var html = "<div style='width:100%; margin:0 auto;'><img src='/api/remoteFiles/view/b101469c-885b-4139-bace-0b815bfc02db'></div>Congratulations! You've been invited by "+this.props.user.firstName+" "+this.props.user.lastName+"  to join " +
                    "the premier network of real estate and home services professionals.<br><br>Click here to activate your free membership: " +
                    "[Activation Link]";
        CKEDITOR.instances['includeMessage'].setData(html);
    },
    handleSubmit: function(e) {
        e.preventDefault();
        var data = this.getFormData();
        data.contacts = this.props.contacts;
        data.message = CKEDITOR.instances['includeMessage'].getData();
        var formData = JSON.stringify(data, null, ' ');
        console.log(formData);
        var results = [];
        $.ajax({
            type: "POST",
            url: "/importContacts",
            async:   true,
            data: formData,
            success: function(result) {
                console.log("Inside Success");
                results = result;
                console.log(results);
                this.props.handleResults(results.contacts.length);
                $("#closeButton").trigger('click');
            }.bind(this),
            error: function(error) {
                alert('Create import error message');
            },
            dataType: "json",
            contentType : "application/json"
        });
    },
    getFormData: function () {
        return {
            id: this.refs.id.getDOMNode().value,
            message: '',
            contacts: []
        };
    },
    render(){
        return (
            <div className="modal fade">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <form onSubmit={this.handleSubmit}>
                            <div className="modal-header">
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={this.props.handleHideModal}><span aria-hidden="true">&times;</span></button>
                                <h5 className="modal-title"><strong>You selected {this.state.size} contacts.</strong></h5>
                            </div>
                            <div className="modal-body">
                                <input type="hidden" ref="id" name="id" value={this.props.user.id} />
                                <div className="row">
                                    <div id="contacts-region-container" className="col-md-12">
                                        <div className="panel">
                                            <div className="panel-body">
                                                <div id="contacts-region">
                                                    <PillList contacts={this.state.contacts} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-12">
                                        <div className="panel">
                                            <div className="panel-body">
                                                <div className="row">
                                                    <textarea id="includeMessage" name="includeMessage" ref="includeMessage" className="form-control" rows="10"></textarea>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="submit" className="btn btn-primary">Submit</button>
                                <button id="closeButton" type="button" className="btn btn-default" data-dismiss="modal" onClick={this.props.handleHideModal}>Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    },
    propTypes:{
        handleHideModal: React.PropTypes.func.isRequired
    }
});

var PillList = React.createClass({
    render: function() {
        var createContact = function(contact) {
            console.log(contact);
            return(
                <PillName>{contact.firstName}</PillName>
            );
        };
        return (
                <ul>{this.props.contacts.map(createContact)}</ul>
        );
    }
});

var PillName = React.createClass({
    getInitialState: function() {
        return {
            active: false,
            name: this.props.children
        };
    },
    handleClick: function(elem){
     /*   $('#contacts-region li.pill').each(function() {
            $(this).removeClass('selected');
        });
        if (this.state.active) {
            this.setState({active: false});
        } else {
            this.setState({active: true});
        }
        */
    },
    handleRemove: function() {
        console.log(this.props.children);
    },
    render: function() {
        let selectedClass = classNames({
            'pill selected': this.state.active,
            'pill': !this.state.active
        });
        return (
            /*<li className={selectedClass} onClick={this.handleClick.bind(this)}><span className="pill-name">{this.props.children}</span><RemoveContactButton clickHandler={this.handleRemove} /></li> */
            <li className={selectedClass} onClick={this.handleClick.bind(this)}><span className="pill-name">{this.props.children}</span></li>
        );
    }
});

var RemoveContactButton = React.createClass ({
    render: function() {
        return (
            <button type="button" className="close" aria-label="Remove" onClick={this.props.clickHandler}><span aria-hidden="true">&times;</span></button>
        )
    }
});